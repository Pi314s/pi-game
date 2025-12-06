export interface Holder {
  rank: number;
  address: string;
  percentage: string;
  value: string;
}

export interface ChartDataPoint {
  date: string;
  price: number;
  displayPrice: string;
}

export interface EcosystemLink {
  name: string;
  url: string;
  category: 'Marketplace' | 'Wallet' | 'Explorer' | 'Tool' | 'Social' | 'Analytics';
}

export interface TokenStat {
  label: string;
  value: string;
  subValue?: string;
  isCopyable?: boolean;
}