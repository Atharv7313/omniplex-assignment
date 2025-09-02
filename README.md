Omniplex Internship Assignment - Summary of Work
Submitted by: Atharv Kishor
Deployment Link: https://omniplex-assignment-ten.vercel.app/

This document outlines the tasks completed for the Omniplex internship assignment. The primary goals were to set up the project locally, integrate Stripe for payments, and deploy the application. Along the way, several bugs and environmental challenges were identified and resolved.

1. Local Setup & API Configuration
The first challenge was getting the application to run locally due to its dependency on numerous external APIs.

Issue: The project required API keys from services like OpenAI, Bing Search, OpenWeatherMap, Alpha Vantage, and Finnhub. The application would not start without them.

Solution:

Created free-tier accounts for all required services to obtain the necessary API keys.

Established a .env.local file to manage all secret keys, preventing them from being committed to version control.

Restarted the development server to ensure the new environment variables were loaded correctly.

Issue: OpenAI API Blocker

The core functionality of the app was blocked by the requirement for a paid OpenAI API key.

Solution: To keep the application functional without incurring costs, I implemented a mock API strategy. I modified two key backend routes (/api/tools/route.ts and /api/chat/route.ts) to simulate the expected responses from OpenAI. The tools route now uses simple keyword detection to select a function, and the chat route returns a hardcoded streaming response. This allowed the rest of the application's logic to proceed as expected.

2. In-App and API Integration Bugs
Once the app was running, several runtime errors occurred when interacting with the integrated APIs.

Issue: 500 Internal Server Error for Weather API

When prompting for weather, the application would crash. The terminal log showed an error: OpenWeatherMap API key is undefined.

Solution: This was traced back to the backend not having access to the environment variables. Creating the .env.local file and restarting the server resolved this.

Issue: 401 Unauthorized for Weather API

Even with the correct key, the weather API returned a 401 error.

Solution: Research indicated that new OpenWeatherMap API keys require a brief activation period and sometimes email verification. After waiting and ensuring the account was verified, the API calls succeeded.

Issue: Stripe Integration Failures

StripeAuthenticationError: The initial attempt to create a checkout session resulted in a 401 error, indicating the API key was not being provided.

No such price Error: After fixing the authentication, Stripe returned a 400 error, stating the Price ID was invalid.

Solution: Both issues were related to environment variable management. I systematically re-copied both the Secret Key (sk_test_...) and the Price ID (price_...) directly from the Stripe Sandbox dashboard, ensuring they were both from the correct "Test mode" environment. A final server restart synchronized these values and fixed the payment flow.

3. Deployment Challenges
The final task of deploying the application presented its own set of platform-specific challenges.

Issue: Azure Deployment Blocked

The initial deployment attempt to a free Azure account failed with a DenyAssignmentAuthorizationFailed error.

Analysis: The error log indicated a subscription-level security policy [UNUSUALACTIVITY] FULL DENY ASSIGNMENT was automatically applied to the account, blocking the creation of new resources. This was an account-level lock from Microsoft and could not be resolved through configuration changes.

Solution: Strategic Pivot to Vercel To meet the assignment's goal of a live deployment, I pivoted to Vercel, the platform created by the developers of Next.js. This demonstrated adaptability in the face of an external blocker.

Issue: Vercel Build Failure

The first Vercel deployment failed during the build step with a strict linting error: react/no-unescaped-entities.

Solution: I identified that an unescaped apostrophe in the payment cancellation page (/payment/cancel/page.tsx) was violating the production build rules. I corrected this by replacing ' with its HTML entity equivalent, &apos;. After committing this fix, the Vercel deployment completed successfully.

This assignment was a valuable exercise in real-world development, from initial setup and debugging to deployment and overcoming platform-specific hurdles.
