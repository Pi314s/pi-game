import { Holder, ChartDataPoint, EcosystemLink } from './types';

export const HOLDERS_DATA: Holder[] = [
  { rank: 1, address: "bc1p0s...w7fg9nqk6jsmsdnmg", percentage: "2.01%", value: "63,094,975,460,872" },
  { rank: 2, address: "bc1pag...rps34treuv9ssnwuh73", percentage: "1.25%", value: "39,217,088,151,975" },
  { rank: 3, address: "bc1p8h...p706prkj76fqae0afy", percentage: "1.11%", value: "34,793,172,982,982" },
  { rank: 4, address: "bc1pcc...adqd68uvyjdqny3lhr", percentage: "0.97%", value: "30,422,175,550,787.223" },
  { rank: 5, address: "bc1pgg...m0zl0v0s82uqnaaygm", percentage: "0.52%", value: "16,445,000,000,000" },
  { rank: 6, address: "bc1qvc...n93v2yyt68hjk8xphr", percentage: "0.40%", value: "12,591,497,210,527.35" },
  { rank: 7, address: "bc1p92...xr8wdkxchn7sskfnhz", percentage: "0.37%", value: "11,600,000,000,000" },
  { rank: 8, address: "bc1pas...rrg5gqy0cd3q9km54f", percentage: "0.28%", value: "8,676,779,709,918" },
];

export const HOLDERS_DISTRIBUTION = [
  { name: 'Top 10', value: 7.42, color: '#8b5cf6' }, // Violet
  { name: 'Top 11 ~ 50', value: 5.59, color: '#3b82f6' }, // Blue
  { name: 'Top 51 ~ 100', value: 3.58, color: '#14b8a6' }, // Teal
  { name: 'Top 101 ~ 500', value: 14.35, color: '#84cc16' }, // Lime
  { name: 'Others', value: 69.04, color: '#f43f5e' }, // Rose
];

const rawChartData = [
    { d: '12/25/2023', p: 0.00000119 * 1e8 }, // Earliest roughly
    { d: '12/28/2023', p: 0.00000294 * 1e8 },
    { d: '12/30/2023', p: 0.00000550 * 1e8 },
    { d: '1/2/2024', p: 0.00000500 * 1e8 },
    { d: '1/6/2024', p: 0.00000849 * 1e8 },
    { d: '1/8/2024', p: 0.00001848 * 1e8 },
    { d: '1/12/2024', p: 0.00001368 * 1e8 },
    { d: '3/21/2024', p: 0.00027999 * 1e8 },
    { d: '3/27/2024', p: 0.00008999 * 1e8 },
    { d: '4/8/2024', p: 0.00003690 * 1e8 },
    { d: '4/22/2024', p: 0.00021500 * 1e8 },
    { d: '4/26/2024', p: 0.00020999 * 1e8 },
    { d: '8/29/2024', p: 0.00015999 * 1e8 },
    { d: '11/14/2024', p: 0.00014899 * 1e8 },
    { d: '11/15/2024', p: 0.00011190 * 1e8 },
    { d: '11/20/2024', p: 0.00022999 * 1e8 },
];

export const CHART_DATA: ChartDataPoint[] = rawChartData.map(item => ({
    date: item.d,
    price: Math.round(item.p),
    displayPrice: `${Math.round(item.p)} sats`
}));

export const ECOSYSTEM_LINKS: EcosystemLink[] = [
  { name: 'UniSat', url: 'https://unisat.io', category: 'Marketplace' },
  { name: 'OKX Web3', url: 'https://web3.okx.com/explorer/bitcoin/token/brc20/5496738?channelId=unisat', category: 'Marketplace' },
  { name: 'Magic Eden', url: 'https://magiceden.io/ordinals', category: 'Marketplace' },
  { name: 'SuperEX', url: 'https://www.superex.com', category: 'Marketplace' },
  { name: 'DotSwap', url: 'https://www.dotswap.app/', category: 'Marketplace' },
  { name: 'Ordinals Wallet', url: 'https://ordinalswallet.com/collection/brc20-%F0%9D%9B%91', category: 'Marketplace' },
  
  { name: 'XVerse', url: 'https://xverse.app', category: 'Wallet' },
  { name: 'OrdinalSafe', url: 'https://ordinalsafe.xyz', category: 'Wallet' },
  { name: 'Hiro Wallet', url: 'https://wallet.hiro.so', category: 'Wallet' },
  
  { name: 'Ord.io', url: 'https://ord.io', category: 'Explorer' },
  { name: 'Ordinal Hub', url: 'https://ordinalshub.com', category: 'Explorer' },
  { name: 'Ordinals.com', url: 'https://ordinals.com', category: 'Explorer' },
  { name: 'Luminex', url: 'https://luminex.io', category: 'Explorer' },
  { name: 'OrdinalScan', url: 'https://ordinalscan.com', category: 'Explorer' },

  { name: 'Ordinal Tools', url: 'https://ordinalnews.io/ordinaltools/', category: 'Tool' },
  { name: 'Dune Analytics', url: 'https://dune.com', category: 'Analytics' },
  
  { name: 'Twitter (X)', url: 'https://x.com/pi3141s', category: 'Social' },
  { name: 'Telegram', url: 'https://t.me/brc20picoin', category: 'Social' },
];