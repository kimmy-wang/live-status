import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { fetchTwitchChannelStatus } from "./utils/fetch";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (!event.body) {
    return;
  }

  const body = JSON.parse(event.body);

  const data = await fetchTwitchChannelStatus(body?.channel ?? "thebs_chen");
  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
};

export { handler };
