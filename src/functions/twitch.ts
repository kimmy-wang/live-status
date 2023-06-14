import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { fetchTwitchChannelStatus } from "./utils/fetch";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const data = await fetchTwitchChannelStatus(event.queryStringParameters?.channel ?? "thebs_chen");
  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
};

export { handler };
