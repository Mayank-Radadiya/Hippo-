
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import dotenv from "dotenv";
import { buildConfig } from "payload";


dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "";
const MONGODB_URL = process.env.MONGODB_URL;

const payload_Secret = process.env.PAYLOAD_SECRET;
if (!payload_Secret) {
  throw new Error("Missing environment variable: MONGODB_URL");
}

if (!MONGODB_URL) {
  throw new Error("Missing environment variable: MONGODB_URL");
}

export default buildConfig({
  secret: payload_Secret,
  db: mongooseAdapter({
    url: MONGODB_URL,
  }),
  collections: [
    {
      slug: "pages",
      fields: [
        {
          name: "title",
          type: "text",
        },
      ],
    },
  ],
  routes: {
    admin: "/sell",
  },
  admin: {
    user: "users",
    meta: {
      titleSuffix: "- DigitalHippo",
    },
  },
  editor: slateEditor({}), // Add the editor configuration
   typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});