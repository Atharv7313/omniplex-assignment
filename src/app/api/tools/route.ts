// import OpenAI from "openai"; // --- OpenAI is no longer needed

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // --- We will mock the response instead

// --- MOCK HELPER FUNCTION ---
// This function simulates the response from OpenAI when it decides to call a tool.
function createMockToolResponse(toolName: string, args: object) {
  return {
    choices: [
      {
        message: {
          tool_calls: [
            {
              function: {
                name: toolName,
                arguments: JSON.stringify(args),
              },
            },
          ],
        },
      },
    ],
  };
}

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const messages = await req.json();

  // --- MOCKED LOGIC START ---
  // We'll inspect the last message to decide which tool to "call".
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || "";
  let mockResponse;

  if (lastMessage.includes("weather in")) {
    const location = lastMessage.split("weather in")[1].trim();
    mockResponse = createMockToolResponse("weather", { location });
  } else if (
    lastMessage.includes("stock price for") ||
    lastMessage.includes("stock for")
  ) {
    const symbol = lastMessage.split(" for ")[1].trim().toUpperCase();
    mockResponse = createMockToolResponse("stock", { symbol });
  } else if (lastMessage.startsWith("define ")) {
    const word = lastMessage.split("define ")[1].trim();
    mockResponse = createMockToolResponse("dictionary", { word });
  } else if (lastMessage.startsWith("search for ")) {
    const query = lastMessage.split("search for ")[1].trim();
    mockResponse = createMockToolResponse("search", { query });
  } else {
    // If no specific tool is detected, default to chat mode.
    mockResponse = { choices: [{ message: { tool_calls: null } }] };
  }
  // --- MOCKED LOGIC END ---

  // The rest of the original logic can now process our fake response
  try {
    const response = mockResponse; // Use our mocked response

    // Check if tool_calls are present in the response
    const toolCalls = response.choices[0].message?.tool_calls;
    if (!toolCalls) {
      return new Response(JSON.stringify({ mode: "chat", arg: "" }), {
        status: 200,
      });
    }

    // Process the tool calls if present
    const firstToolCall = toolCalls[0];
    const modeAndArguments = firstToolCall.function.arguments;

    return new Response(
      JSON.stringify({
        mode: firstToolCall.function.name,
        arg: modeAndArguments,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in mocked tool route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the input" }),
      { status: 500 }
    );
  }
}
