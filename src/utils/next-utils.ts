import next from "next";

const PORT = Number(process.env.PORT) || 3000;

// Initialize the Next.js application
export const nextApp = next({
  dev: process.env.NODE_ENV !== "production", // Sets the app to development mode if NODE_ENV is not 'production'
  port: PORT, // The port on which the Next.js app will run
});

// Get the Next.js request handler
// Retrieves the request handler from the Next.js application.
// This handler processes all incoming HTTP requests and determines how to respond (e.g., serving pages or API routes).
//The nextHandler is exported for use in a custom server (e.g., an Express or Node.js server). It ensures all requests are properly routed through Next.js.
export const nextHandler = nextApp.getRequestHandler();
