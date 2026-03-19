export interface FilterInfo {
  name: string;
  price: number;
  lifeMonths: number;
}

export interface PurifierModel {
  id: string;
  brand: string;
  model: string;
  flux: number; // G
  wastewaterRatio: string; // e.g. 2:1
  purchasePrice: number; // Initial price CNY
  filters: FilterInfo[];
  features: string[];
  image: string;
}

export const PURIFIER_DATA: PurifierModel[] = [
  // 小米 (Xiaomi)
  {
    id: 'xiaomi-600g',
    brand: '小米 (Xiaomi)',
    model: '600G (MR624)',
    flux: 600,
    wastewaterRatio: '2:1',
    purchasePrice: 1299,
    filters: [
      { name: 'RO反渗透滤芯 (3年长效)', price: 499, lifeMonths: 36 },
      { name: 'PPC复合滤芯', price: 199, lifeMonths: 12 }
    ],
    features: ['米家App联动', '侧抽式滤芯', '双芯过滤'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/512px-Xiaomi_logo_%282021-%29.svg.png'
  },
  {
    id: 'xiaomi-800g',
    brand: '小米 (Xiaomi)',
    model: '800G (MR824)',
    flux: 800,
    wastewaterRatio: '3:1',
    purchasePrice: 1599,
    filters: [
      { name: 'RO反渗透滤芯 (5年长效)', price: 899, lifeMonths: 60 },
      { name: 'PPC复合滤芯', price: 219, lifeMonths: 12 }
    ],
    features: ['米家App联动', '无陈水技术', '全时鲜水'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/512px-Xiaomi_logo_%282021-%29.svg.png'
  },
  {
    id: 'xiaomi-1000g',
    brand: '小米 (Xiaomi)',
    model: '1000G (MR1082)',
    flux: 1000,
    wastewaterRatio: '3:1',
    purchasePrice: 1999,
    filters: [
      { name: 'RO反渗透滤芯 (5年长效)', price: 999, lifeMonths: 60 },
      { name: 'PPC复合滤芯', price: 219, lifeMonths: 12 }
    ],
    features: ['米家App联动', '无陈水技术', '双芯过滤'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/512px-Xiaomi_logo_%282021-%29.svg.png'
  },
  {
    id: 'xiaomi-1200g',
    brand: '小米 (Xiaomi)',
    model: '1200G (MR1282)',
    flux: 1200,
    wastewaterRatio: '3:1',
    purchasePrice: 2499,
    filters: [
      { name: 'RO反渗透滤芯 (5年长效)', price: 1099, lifeMonths: 60 },
      { name: 'PPC复合滤芯', price: 219, lifeMonths: 12 }
    ],
    features: ['米家App联动', '3.2L/min大流量', '无陈水2.0'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/512px-Xiaomi_logo_%282021-%29.svg.png'
  },
  {
    id: 'xiaomi-400g',
    brand: '小米 (Xiaomi)',
    model: '400G (MR424)',
    flux: 400,
    wastewaterRatio: '1:1',
    purchasePrice: 999,
    filters: [
      { name: 'RO反渗透滤芯', price: 499, lifeMonths: 24 },
      { name: 'PPC复合滤芯', price: 199, lifeMonths: 12 }
    ],
    features: ['入门首选', '厨下式紧凑设计', '米家联动'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/512px-Xiaomi_logo_%282021-%29.svg.png'
  },
  // 海尔 (Haier)
  {
    id: 'haier-fresh-800g',
    brand: '海尔 (Haier)',
    model: '鲜活系列 800G (HRO8H88-2)',
    flux: 800,
    wastewaterRatio: '2:1',
    purchasePrice: 1599,
    filters: [
      { name: 'RO反渗透滤芯', price: 699, lifeMonths: 36 },
      { name: 'PCB复合滤芯', price: 199, lifeMonths: 12 }
    ],
    features: ['全时鲜水', '五级过滤', '静音设计'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Haier_logo.svg/512px-Haier_logo.svg.png'
  },
  {
    id: 'haier-fresh-1000g',
    brand: '海尔 (Haier)',
    model: '鲜活系列 1000G (HRO10H88-2)',
    flux: 1000,
    wastewaterRatio: '3:1',
    purchasePrice: 1899,
    filters: [
      { name: 'RO反渗透滤芯', price: 899, lifeMonths: 36 },
      { name: 'PCB复合滤芯', price: 199, lifeMonths: 12 }
    ],
    features: ['全时鲜水', '双芯过滤', '智能龙头'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Haier_logo.svg/512px-Haier_logo.svg.png'
  },
  {
    id: 'haier-jade-1000g',
    brand: '海尔 (Haier)',
    model: '玉净系列 1000G (HRO10H99-2)',
    flux: 1000,
    wastewaterRatio: '3:1',
    purchasePrice: 1999,
    filters: [
      { name: 'RO反渗透滤芯', price: 999, lifeMonths: 48 },
      { name: 'PCB复合滤芯', price: 219, lifeMonths: 12 }
    ],
    features: ['全时鲜水', '玉石白面板', '侧抽式'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Haier_logo.svg/512px-Haier_logo.svg.png'
  },
  {
    id: 'haier-jade-800g',
    brand: '海尔 (Haier)',
    model: '玉净系列 800G (HRO8H99-2)',
    flux: 800,
    wastewaterRatio: '2:1',
    purchasePrice: 1699,
    filters: [
      { name: 'RO反渗透滤芯', price: 799, lifeMonths: 48 },
      { name: 'PCB复合滤芯', price: 219, lifeMonths: 12 }
    ],
    features: ['全时鲜水', '玉石白面板', '五级精滤'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Haier_logo.svg/512px-Haier_logo.svg.png'
  },
  {
    id: 'haier-fresh-1200g',
    brand: '海尔 (Haier)',
    model: '鲜活系列 1200G (HRO12H88-2)',
    flux: 1200,
    wastewaterRatio: '3:1',
    purchasePrice: 2399,
    filters: [
      { name: 'RO反渗透滤芯', price: 1099, lifeMonths: 36 },
      { name: 'PCB复合滤芯', price: 199, lifeMonths: 12 }
    ],
    features: ['3.2L/min大流量', '全时鲜水', '智能数显'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Haier_logo.svg/512px-Haier_logo.svg.png'
  },
  // 美的 (Midea)
  {
    id: 'midea-swan-800g',
    brand: '美的 (Midea)',
    model: '白天鹅 800G (MRC1882-800G)',
    flux: 800,
    wastewaterRatio: '2:1',
    purchasePrice: 1599,
    filters: [
      { name: 'RO反渗透滤芯', price: 799, lifeMonths: 48 },
      { name: 'PAC复合滤芯', price: 199, lifeMonths: 12 }
    ],
    features: ['自清洁系统', '侧抽式滤芯', '低噪音'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Midea_logo.svg/512px-Midea_logo.svg.png'
  },
  {
    id: 'midea-swan-1000g',
    brand: '美的 (Midea)',
    model: '白天鹅 1000G (MRC1982-1000G)',
    flux: 1000,
    wastewaterRatio: '3:1',
    purchasePrice: 1799,
    filters: [
      { name: 'RO反渗透滤芯', price: 899, lifeMonths: 48 },
      { name: 'PAC复合滤芯', price: 199, lifeMonths: 12 }
    ],
    features: ['自清洁系统', '侧抽式滤芯', '低噪音'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Midea_logo.svg/512px-Midea_logo.svg.png'
  },
  {
    id: 'midea-star-1000g',
    brand: '美的 (Midea)',
    model: '星河系列 1000G (MRC1982-1000G-S)',
    flux: 1000,
    wastewaterRatio: '3:1',
    purchasePrice: 2199,
    filters: [
      { name: 'RO反渗透滤芯', price: 999, lifeMonths: 60 },
      { name: 'PAC复合滤芯', price: 219, lifeMonths: 12 }
    ],
    features: ['星河面板', '无陈水技术', '智能数显'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Midea_logo.svg/512px-Midea_logo.svg.png'
  },
  {
    id: 'midea-star-1200g',
    brand: '美的 (Midea)',
    model: '星河系列 1200G (MRC2082-1200G)',
    flux: 1200,
    wastewaterRatio: '3:1',
    purchasePrice: 2599,
    filters: [
      { name: 'RO反渗透滤芯', price: 1099, lifeMonths: 60 },
      { name: 'PAC复合滤芯', price: 219, lifeMonths: 12 }
    ],
    features: ['星河面板', '3.15L/min流量', '无陈水2.0'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Midea_logo.svg/512px-Midea_logo.svg.png'
  },
  {
    id: 'midea-baize-1000g',
    brand: '美的 (Midea)',
    model: '白泽系列 1000G (MRC1982-1000G-B)',
    flux: 1000,
    wastewaterRatio: '3:1',
    purchasePrice: 1899,
    filters: [
      { name: 'RO反渗透滤芯', price: 899, lifeMonths: 48 },
      { name: 'PAC复合滤芯', price: 199, lifeMonths: 12 }
    ],
    features: ['高性价比', '侧抽式', '智能提醒'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Midea_logo.svg/512px-Midea_logo.svg.png'
  },
  // 佳尼特 (A.O. Smith / Chanit)
  {
    id: 'aosmith-chanit-800g',
    brand: '佳尼特 (A.O. Smith)',
    model: '大流量 800G',
    flux: 800,
    wastewaterRatio: '2:1',
    purchasePrice: 2299,
    filters: [
      { name: 'RO反渗透滤芯', price: 799, lifeMonths: 36 },
      { name: 'CP复合滤芯', price: 299, lifeMonths: 12 }
    ],
    features: ['专利RO膜', '长效滤芯', '售后保障'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/A._O._Smith_logo.svg/512px-A._O._Smith_logo.svg.png'
  },
  {
    id: 'aosmith-chanit-1000g',
    brand: '佳尼特 (A.O. Smith)',
    model: '大流量 1000G',
    flux: 1000,
    wastewaterRatio: '3:1',
    purchasePrice: 2699,
    filters: [
      { name: 'RO反渗透滤芯', price: 999, lifeMonths: 36 },
      { name: 'CP复合滤芯', price: 299, lifeMonths: 12 }
    ],
    features: ['专利RO膜', '大流量', '静音'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/A._O._Smith_logo.svg/512px-A._O._Smith_logo.svg.png'
  },
  {
    id: 'aosmith-chanit-1200g',
    brand: '佳尼特 (A.O. Smith)',
    model: '大流量 1200G',
    flux: 1200,
    wastewaterRatio: '3:1',
    purchasePrice: 3299,
    filters: [
      { name: 'RO反渗透滤芯', price: 1199, lifeMonths: 36 },
      { name: 'CP复合滤芯', price: 299, lifeMonths: 12 }
    ],
    features: ['专利RO膜', '3.1L/min流量', '高产水率'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/A._O._Smith_logo.svg/512px-A._O._Smith_logo.svg.png'
  },
  {
    id: 'aosmith-chanit-600g',
    brand: '佳尼特 (A.O. Smith)',
    model: '专利RO 600G',
    flux: 600,
    wastewaterRatio: '2:1',
    purchasePrice: 1899,
    filters: [
      { name: 'RO反渗透滤芯', price: 699, lifeMonths: 36 },
      { name: 'CP复合滤芯', price: 299, lifeMonths: 12 }
    ],
    features: ['专利RO膜', '紧凑机身', '经典款'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/A._O._Smith_logo.svg/512px-A._O._Smith_logo.svg.png'
  },
  // 沁园 (Truliva / Qinyuan)
  {
    id: 'truliva-qinyuan-800g',
    brand: '沁园 (Truliva)',
    model: '海王系列 800G',
    flux: 800,
    wastewaterRatio: '2:1',
    purchasePrice: 1399,
    filters: [
      { name: 'RO反渗透滤芯', price: 599, lifeMonths: 36 },
      { name: 'PGP复合滤芯', price: 159, lifeMonths: 12 }
    ],
    features: ['除菌率99.9%', '智能显示龙头', '紧凑机身'],
    image: 'https://logo.clearbit.com/truliva.com'
  },
  {
    id: 'truliva-qinyuan-1000g',
    brand: '沁园 (Truliva)',
    model: '海王系列 1000G',
    flux: 1000,
    wastewaterRatio: '3:1',
    purchasePrice: 1699,
    filters: [
      { name: 'RO反渗透滤芯', price: 799, lifeMonths: 36 },
      { name: 'PGP复合滤芯', price: 159, lifeMonths: 12 }
    ],
    features: ['除菌率99.9%', '大流量', '智能数显'],
    image: 'https://logo.clearbit.com/truliva.com'
  },
  {
    id: 'truliva-qinyuan-1200g',
    brand: '沁园 (Truliva)',
    model: '海王系列 1200G',
    flux: 1200,
    wastewaterRatio: '3:1',
    purchasePrice: 2199,
    filters: [
      { name: 'RO反渗透滤芯', price: 899, lifeMonths: 36 },
      { name: 'PGP复合滤芯', price: 159, lifeMonths: 12 }
    ],
    features: ['除菌率99.9%', '3L/min流量', '全时鲜水'],
    image: 'https://logo.clearbit.com/truliva.com'
  },
  {
    id: 'truliva-qinyuan-whale-800g',
    brand: '沁园 (Truliva)',
    model: '小白鲸 800G',
    flux: 800,
    wastewaterRatio: '2:1',
    purchasePrice: 1599,
    filters: [
      { name: 'RO反渗透滤芯', price: 699, lifeMonths: 36 },
      { name: 'PGP复合滤芯', price: 159, lifeMonths: 12 }
    ],
    features: ['小白鲸外观', '静音', '智能提醒'],
    image: 'https://logo.clearbit.com/truliva.com'
  }
];

export function calculateTCO(purifier: PurifierModel, years: number = 3): number {
  let total = purifier.purchasePrice;
  purifier.filters.forEach(filter => {
    const replacements = Math.floor((years * 12 - 1) / filter.lifeMonths);
    total += replacements * filter.price;
  });
  return total;
}
