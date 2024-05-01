import {toJsonString} from "curlconverter";

export default defineEventHandler(async (event) => {
  return new Response(
    toJsonString((await readBody(event)).curl)
  );
});
