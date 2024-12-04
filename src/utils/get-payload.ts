import dotenv from "dotenv";
import path from "path";
import payload, { InitOptions, Payload } from "payload";

dotenv.config();

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: any;
}

export const getPayloadClient = async ({
  initOptions = {},
}: Args = {}) => {  
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error(
      "PAYLOAD_SECRET environment variable is required but not defined."
    );
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      mongoURL: process.env.MONGO_URL, // Use `mongoURL` for database connection
      local: process.env.NODE_ENV === "development", // Set `local` based on the environment
      ...initOptions, // Spread the rest of the init options
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset the promise on error
    throw error;
  }

  return cached.client;
};
