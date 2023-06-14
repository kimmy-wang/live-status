import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

export interface LiveStatus {
  isLiving: boolean;
  viewers?: number;
}

export async function fetchTwitchChannelStatus(channel: string): Promise<LiveStatus> {
  const url = `https://www.twitch.tv/${channel}`;
  const data = await fetch(url);
  const $ = cheerio.load(await data.text());

  const liveNode = $('body div.tw-channel-status-text-indicator');
  console.log('liveNode', liveNode.html());
  const viewersNode = $('body p[data-a-target="animated-channel-viewers-count"]');
  const isLiving = !!liveNode;
  console.log('viewersNode', viewersNode.html());
  if (viewersNode) {
    const viewers = parseInt(viewersNode.find('span').text().trim(), 10);
    return { isLiving, viewers };
  }
  return { isLiving };
}

fetchTwitchChannelStatus('thebs_chen').then(console.info).catch(console.error);
