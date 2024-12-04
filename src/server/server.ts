import express from "express";
import { getPayloadClient } from "../utils/get-payload";
import { nextApp, nextHandler } from "../utils/next-utils";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  // Marking the function as async to use await
  try {
    // Initialize Payload and resolve the Promise
    const payload = await getPayloadClient({
      initOptions: {

        onInit: async (cms:any) => {
          cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
        },
      },
    });

    // Use Next.js handler for handling requests
    app.use((req, res) => nextHandler(req, res));

    // Prepare the Next.js application
    await nextApp.prepare();

    // Log and start the server
    payload.logger.info("Next.js Server Started");

    app.listen(PORT, () => {
      payload.logger.info(`Next.js URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    });

  } catch (error) {
    console.error("Error starting the application:", error);
  }
};

start();
