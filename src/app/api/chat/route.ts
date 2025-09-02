// import OpenAI from "openai"; // --- OpenAI is no longer needed
import { StreamingTextResponse } from "ai";

// const openai = new OpenAI({ // --- We will mock the stream instead
//   apiKey: process.env.OPENAI_API_KEY,
// });

export const runtime = "edge";

// --- MOCK STREAMING FUNCTION ---
function createMockStream() {
  const mockResponseText = "This is a mock response from the AI. I am not a real model, but I can stream text to demonstrate the application's functionality without needing an API key.";
  const words = mockResponseText.split(" ");

  const stream = new ReadableStream({
    async start(controller) {
      for (const word of words) {
        const chunk = word + " ";
        controller.enqueue(new TextEncoder().encode(chunk));
        // Add a small delay to simulate real-time streaming
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      controller.close();
    },
  });

  return stream;
}

export async function POST(req: Request) {
  // We can still get the messages if we want to log them or customize the response
  const { messages } = await req.json();
  console.log("Received messages for mock chat:", messages);

  // Instead of calling OpenAI, we create our own mock stream
  const stream = createMockStream();

  // Return a StreamingTextResponse with our mock stream
  return new StreamingTextResponse(stream);
}
