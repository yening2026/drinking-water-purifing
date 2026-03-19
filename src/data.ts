export interface PurifierModel {
  id: string;
  brand: string;
  model: string;
  flux: number; // G
  wastewaterRatio: string; // e.g. 2:1
  filterLife: number; // months for RO
  filterCost: number; // CNY for RO
  totalCost3Years: number; // Estimated
  features: string[];
  price: number; // Initial price CNY
  image: string;
}

export const PURIFIER_DATA: PurifierModel[] = [
  {
    id: 'xiaomi-1000g',
    brand: '小米 (Xiaomi)',
    model: '1000G (MR1082)',
    flux: 1000,
    wastewaterRatio: '3:1',
    filterLife: 60,
    filterCost: 999,
    totalCost3Years: 2499,
    features: ['米家App联动', '无陈水技术', '双芯过滤'],
    price: 1999,
    image: 'https://picsum.photos/seed/xiaomi/400/300'
  },
  {
    id: 'haier-fresh-800g',
    brand: '海尔 (Haier)',
    model: '鲜活系列 800G',
    flux: 800,
    wastewaterRatio: '2:1',
    filterLife: 36,
    filterCost: 699,
    totalCost3Years: 2199,
    features: ['全时鲜水', '五级过滤', '静音设计'],
    price: 1599,
    image: 'https://picsum.photos/seed/haier/400/300'
  },
  {
    id: 'midea-swan-1000g',
    brand: '美的 (Midea)',
    model: '白天鹅 1000G',
    flux: 1000,
    wastewaterRatio: '3:1',
    filterLife: 48,
    filterCost: 899,
    totalCost3Years: 2399,
    features: ['自清洁系统', '侧抽式滤芯', '低噪音'],
    price: 1799,
    image: 'https://picsum.photos/seed/midea/400/300'
  },
  {
    id: 'aosmith-chanit-800g',
    brand: '佳尼特 (A.O. Smith)',
    model: '大流量 800G',
    flux: 800,
    wastewaterRatio: '2:1',
    filterLife: 36,
    filterCost: 799,
    totalCost3Years: 2899,
    features: ['专利RO膜', '长效滤芯', '售后保障'],
    price: 2299,
    image: 'https://picsum.photos/seed/aosmith/400/300'
  },
  {
    id: 'truliva-qinyuan-800g',
    brand: '沁园 (Truliva)',
    model: '海王系列 800G',
    flux: 800,
    wastewaterRatio: '2:1',
    filterLife: 36,
    filterCost: 599,
    totalCost3Years: 1999,
    features: ['除菌率99.9%', '智能显示龙头', '紧凑机身'],
    price: 1399,
    image: 'https://picsum.photos/seed/truliva/400/300'
  }
];
