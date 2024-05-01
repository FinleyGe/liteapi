import {CurlGenerator} from "curl-generator";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  return new Response(
    CurlGenerator(data.data),
  );
});
