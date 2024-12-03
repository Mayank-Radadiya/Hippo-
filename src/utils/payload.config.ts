import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";


export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [],
  routes: {
    admin: "/sell",
  },
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- DigitalHippo",
      favicon: "src/app/favicon.ico",
      ogImage: "public/thumbnail.jpg",
    },
  },
  editor: slateEditor({}),
  rateLimit: {
    max: 2000,
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript:{
    outputFile: path.resolve(__dirname,"payload.types.ts")
  }
});
