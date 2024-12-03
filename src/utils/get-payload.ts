import dotenv from "dotenv";
import path from "path";
//Payload A CMS (Content Management System) library that you're initializing.
import type { InitOptions } from "payload/config";
import payload, {Payload } from "payload";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});


let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export async function getPayloadClient({
  initOptions,
}: Args = {}){
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("Payload secret is required");
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local:initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset the promise to allow retries
    throw error;
  }

  return cached.client;
}
