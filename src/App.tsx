/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Droplets, 
  Zap, 
  DollarSign, 
  ShieldCheck, 
  ChevronRight, 
  MessageCircle, 
  X, 
  Send,
  Info,
  ArrowRightLeft,
  Calculator,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { PURIFIER_DATA, PurifierModel, calculateTCO } from './data';
import { getPurifierAdvice } from './services/gemini';

export default function App() {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [detailModelId, setDetailModelId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'tco-report'>('list');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const toggleModelSelection = (id: string) => {
    setSelectedModels(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const toggleBrandSelection = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const brands = Array.from(new Set(PURIFIER_DATA.map(m => m.brand)));
  const filteredData = PURIFIER_DATA.filter(m => 
    selectedBrands.length === 0 || selectedBrands.includes(m.brand)
  );

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    const newMessage = { role: 'user' as const, content: userInput };
    setChatMessages(prev => [...prev, newMessage]);
    setUserInput('');
    setIsTyping(true);

    const aiResponse = await getPurifierAdvice(userInput);
    setChatMessages(prev => [...prev, { role: 'ai' as const, content: aiResponse }]);
    setIsTyping(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const compareModels = PURIFIER_DATA.filter(m => selectedModels.includes(m.id));
  const detailModel = PURIFIER_DATA.find(m => m.id === detailModelId);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900 font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setDetailModelId(null); setCurrentView('list'); }}>
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">中国家用净水器选购指南</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button onClick={() => { setDetailModelId(null); setCurrentView('list'); }} className={`hover:text-emerald-600 transition-colors ${currentView === 'list' && !detailModelId ? 'text-emerald-600' : ''}`}>产品对比</button>
            <button onClick={() => { setDetailModelId(null); setCurrentView('tco-report'); }} className={`hover:text-emerald-600 transition-colors ${currentView === 'tco-report' ? 'text-emerald-600' : ''}`}>全机型 TCO 详解</button>
            <a href="#guide" className="hover:text-emerald-600 transition-colors">选购常识</a>
          </nav>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>AI 选购助手</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {detailModel ? (
          <motion.section 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="p-8 md:p-12">
              <button 
                onClick={() => setDetailModelId(null)}
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors mb-8 font-medium"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                返回列表
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <div className="bg-slate-50 p-8 rounded-2xl flex items-center justify-center border border-slate-100">
                  <div className="text-center">
                    <span className="text-4xl font-black text-slate-200 uppercase tracking-widest block mb-2">
                      {detailModel.brand}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Water Purifier
                    </span>
                  </div>
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    {detailModel.brand}
                  </span>
                  <h2 className="text-4xl font-black text-slate-900 mb-6">{detailModel.model}</h2>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">净水流量</span>
                      <span className="text-2xl font-mono font-bold">{detailModel.flux}G</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">废水比</span>
                      <span className="text-2xl font-mono font-bold">{detailModel.wastewaterRatio}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      核心卖点
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {detailModel.features.map((f, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-sm">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">购机参考价</span>
                    <span className="text-4xl font-black text-slate-900">¥{detailModel.purchasePrice}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-8 md:p-10 text-white">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Calculator className="w-7 h-7 text-emerald-400" />
                  TCO 详细计算过程 (3年期)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">初始投入</span>
                    <span className="text-2xl font-mono font-bold">¥{detailModel.purchasePrice}</span>
                    <p className="text-xs text-slate-500 mt-2">包含机器及首套滤芯</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">3年滤芯支出</span>
                    <span className="text-2xl font-mono font-bold text-emerald-400">
                      ¥{calculateTCO(detailModel, 3) - detailModel.purchasePrice}
                    </span>
                    <p className="text-xs text-slate-500 mt-2">基于标准更换频次计算</p>
                  </div>
                  <div className="bg-emerald-500 p-6 rounded-xl shadow-lg shadow-emerald-500/20">
                    <span className="text-[10px] uppercase font-bold text-emerald-100 block mb-2">3年总持有成本</span>
                    <span className="text-3xl font-mono font-bold">¥{calculateTCO(detailModel, 3)}</span>
                    <p className="text-xs text-emerald-100 mt-2">平均每月支出 ¥{Math.round(calculateTCO(detailModel, 3) / 36)}</p>
                  </div>
                </div>

                <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-400" />
                  滤芯更换清单与频次
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-4 text-xs font-bold uppercase text-slate-500">滤芯名称</th>
                        <th className="py-4 text-xs font-bold uppercase text-slate-500">单价 (CNY)</th>
                        <th className="py-4 text-xs font-bold uppercase text-slate-500">建议寿命</th>
                        <th className="py-4 text-xs font-bold uppercase text-slate-500">3年更换次数</th>
                        <th className="py-4 text-xs font-bold uppercase text-slate-500">小计</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailModel.filters.map((f, i) => {
                        const count = Math.floor((3 * 12 - 1) / f.lifeMonths);
                        return (
                          <tr key={i} className="border-b border-white/5">
                            <td className="py-4 font-medium">{f.name}</td>
                            <td className="py-4 font-mono">¥{f.price}</td>
                            <td className="py-4 text-slate-400">{f.lifeMonths} 个月</td>
                            <td className="py-4 text-slate-400">{count} 次</td>
                            <td className="py-4 font-mono text-emerald-400">¥{count * f.price}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-10 p-6 bg-white/5 rounded-xl border border-white/10 flex items-start gap-4">
                  <Info className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  <div className="text-sm text-slate-400 leading-relaxed">
                    <p className="font-bold text-white mb-2">计算说明：</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>TCO (Total Cost of Ownership) 包含初始购机成本及后续滤芯维护费用。</li>
                      <li>计算公式：购机价 + ∑(滤芯单价 × 3年内更换次数)。</li>
                      <li>更换次数计算：floor((36个月 - 1) / 滤芯寿命)。机器自带的第一套滤芯不计入更换成本。</li>
                      <li>实际成本可能因电商促销活动、当地水质差异导致更换频次变化而有所波动。</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ) : currentView === 'tco-report' ? (
          <motion.section
            key="tco-report"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-4">全机型 TCO 成本详解报告</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                我们为您详细拆解了每一款主流净水器的 3 年持有成本，包含购机费用及所有滤芯的更换开支。
              </p>
            </div>

            {/* Brand Filter in Report View */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => toggleBrandSelection(brand)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                    selectedBrands.includes(brand)
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'
                  }`}
                >
                  {brand}
                </button>
              ))}
              {selectedBrands.length > 0 && (
                <button 
                  onClick={() => setSelectedBrands([])}
                  className="text-sm text-slate-400 hover:text-rose-500 font-medium ml-2"
                >
                  重置
                </button>
              )}
            </div>

            {filteredData.map((model) => (
              <div key={model.id} className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center shadow-sm">
                      <span className="text-xs font-black text-slate-400 uppercase">{model.brand}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{model.brand} {model.model}</h3>
                      <p className="text-sm text-slate-500">购机价: ¥{model.purchasePrice} | 流量: {model.flux}G</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">3年总成本 (TCO)</span>
                    <span className="text-3xl font-black text-emerald-600">¥{calculateTCO(model, 3)}</span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-emerald-500" />
                        计算过程
                      </h4>
                      <div className="space-y-3 text-sm text-slate-600">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span>初始购机成本</span>
                          <span className="font-mono font-bold">¥{model.purchasePrice}</span>
                        </div>
                        {model.filters.map((f, i) => {
                          const count = Math.floor((3 * 12 - 1) / f.lifeMonths);
                          return (
                            <div key={i} className="flex justify-between py-2 border-b border-slate-100">
                              <span>{f.name} ({count}次更换)</span>
                              <span className="font-mono font-bold">¥{count * f.price}</span>
                            </div>
                          );
                        })}
                        <div className="flex justify-between py-3 text-lg font-black text-slate-900">
                          <span>3年总计</span>
                          <span className="font-mono">¥{calculateTCO(model, 3)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Filter className="w-5 h-5 text-blue-500" />
                        滤芯详情
                      </h4>
                      <div className="space-y-4">
                        {model.filters.map((f, i) => (
                          <div key={i} className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
                            <div>
                              <p className="font-bold text-slate-800">{f.name}</p>
                              <p className="text-xs text-slate-500">建议寿命: {f.lifeMonths}个月</p>
                            </div>
                            <div className="text-right">
                              <p className="font-mono font-bold text-slate-900">¥{f.price}</p>
                              <p className="text-[10px] text-slate-400 uppercase">单价</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center">
                    <button 
                      onClick={() => setDetailModelId(model.id)}
                      className="flex items-center gap-2 text-emerald-600 font-bold hover:underline"
                    >
                      查看该型号完整详情 <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Info className="w-6 h-6" />
                如何看懂 TCO 报告？
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-bold text-emerald-800 mb-2">1. 购机成本 vs 维护成本</h4>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    有些机器购机便宜但滤芯极贵。例如，某型号购机仅 1399 元，但 3 年滤芯支出可能超过 1500 元。
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-800 mb-2">2. 滤芯寿命的真实性</h4>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    RO 膜通常标称 3-5 年，复合滤芯标称 1 年。如果您的当地水质较差（TDS &gt; 300），建议将更换频次提高 20%。
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-800 mb-2">3. 长期性价比之选</h4>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    通常 1000G 的大流量机器虽然购机贵，但其 RO 膜往往更耐用，长期分摊到每升水的成本反而更低。
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <>
            {/* Hero Section */}
            <section className="mb-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  专业、客观、透明
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  寻找最适合您的 <span className="text-emerald-600">RO 反渗透</span> 净水器
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
                  专注中国市场，剔除加热、矿物质等冗余功能。
                  通过流量、废水比、滤芯成本多维度对比，帮您做出明智选择。
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium">无加热功能</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium">纯净水 (无矿物质)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium">RO 反渗透技术</span>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Comparison Grid */}
            <section id="comparison" className="mb-20">
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-emerald-500" />
                  <h4 className="font-bold text-slate-800">按品牌筛选</h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => toggleBrandSelection(brand)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                        selectedBrands.includes(brand)
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                  {selectedBrands.length > 0 && (
                    <button 
                      onClick={() => setSelectedBrands([])}
                      className="text-sm text-slate-400 hover:text-rose-500 font-medium ml-2"
                    >
                      重置
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <ArrowRightLeft className="w-6 h-6 text-emerald-500" />
                  主流型号对比
                </h3>
                <div className="text-sm text-slate-500">
                  已选择 {selectedModels.length} 款产品进行对比
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredData.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setDetailModelId(item.id)}
                    className={`bg-white rounded-xl border-2 transition-all cursor-pointer p-4 flex flex-col justify-between ${
                      selectedModels.includes(item.id) 
                        ? 'border-emerald-500 ring-2 ring-emerald-50 shadow-md' 
                        : 'border-transparent shadow-sm hover:shadow-md hover:border-slate-200'
                    }`}
                  >
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                          {item.brand}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleModelSelection(item.id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            selectedModels.includes(item.id) 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-slate-100 text-slate-400 hover:text-emerald-500'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="text-base font-bold text-slate-800 leading-tight mb-3 line-clamp-2 h-10">
                        {item.model}
                      </h4>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-500" />
                          <span className="font-mono font-bold">{item.flux}G</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-blue-500" />
                          <span className="font-mono font-bold">{item.wastewaterRatio}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <span className="text-lg font-black text-slate-900">¥{item.purchasePrice}</span>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                        <span>查看 TCO</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Comparison Table */}
            <AnimatePresence>
              {selectedModels.length > 0 && (
                <motion.section 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-20 overflow-hidden"
                >
                  <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="text-xl font-bold text-slate-800">详细参数对比</h3>
                      <button 
                        onClick={() => setSelectedModels([])}
                        className="text-sm text-slate-400 hover:text-rose-500 font-medium transition-colors"
                      >
                        清除所有选择
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100">参数项目</th>
                            {compareModels.map(m => (
                              <th key={m.id} className="p-6 text-sm font-bold text-slate-800 border-b border-slate-100 min-w-[200px]">
                                {m.brand} {m.model}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-6 text-sm font-medium text-slate-500 border-b border-slate-50">净水流量</td>
                            {compareModels.map(m => (
                              <td key={m.id} className="p-6 text-sm font-mono font-bold text-slate-900 border-b border-slate-50">{m.flux}G</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-6 text-sm font-medium text-slate-500 border-b border-slate-50">废水比</td>
                            {compareModels.map(m => (
                              <td key={m.id} className="p-6 text-sm font-mono font-bold text-slate-900 border-b border-slate-50">{m.wastewaterRatio}</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-6 text-sm font-medium text-slate-500 border-b border-slate-50">3年总持有成本</td>
                            {compareModels.map(m => (
                              <td key={m.id} className="p-6 text-sm font-mono font-bold text-emerald-600 border-b border-slate-50">¥{calculateTCO(m, 3)}</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-6 text-sm font-medium text-slate-500">核心卖点</td>
                            {compareModels.map(m => (
                              <td key={m.id} className="p-6 text-sm text-slate-600">
                                <ul className="list-disc list-inside space-y-1">
                                  {m.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* TCO Analysis Section */}
            <section id="tco" className="mb-20">
              <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-6">不要只看机器价格</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                      净水器是典型的“耗材型”家电。很多机器首发价格便宜，但后期滤芯价格极高。
                      我们建议您关注 <strong>3-5 年的总持有成本 (TCO)</strong>。
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-emerald-500/20 p-2 rounded-lg">
                          <Calculator className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-bold">TCO 计算公式</h4>
                          <p className="text-sm text-slate-400">总成本 = 购机价格 + (滤芯单价 × 更换频率 × 年数)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                          <Filter className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-bold">滤芯寿命陷阱</h4>
                          <p className="text-sm text-slate-400">标称寿命通常为理想状态，实际寿命受当地水质 (TDS) 影响。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                      3年使用成本预估 (CNY)
                    </h4>
                    <div className="space-y-4">
                      {filteredData.sort((a, b) => calculateTCO(a, 3) - calculateTCO(b, 3)).map(m => (
                        <div key={m.id} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                            <span>{m.brand} {m.model}</span>
                            <span>¥{calculateTCO(m, 3)}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(calculateTCO(m, 3) / 4000) * 100}%` }}
                              className="h-full bg-emerald-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-[10px] text-slate-500 italic">
                      * 预估包含 RO 滤芯及前置复合滤芯的正常更换频率。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Buying Guide Section */}
            <section id="guide" className="mb-20">
              <h3 className="text-2xl font-bold text-slate-800 mb-8">选购常识 Q&A</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-500" />
                    什么是 G (Flux)？
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    G 代表加仑，指 24 小时内的产水量。目前主流是 600G-1000G。
                    1000G 的出水速度约为 2.6L/min，接满一杯水仅需几秒钟，体验更佳。
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    为什么不需要矿物质水？
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    人体摄入矿物质的主要来源是食物而非饮水。RO 膜能过滤掉重金属、细菌和病毒，
                    提供最纯净的 H2O。所谓的“矿物质滤芯”往往只是添加了少量矿物盐，性价比不高。
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    什么是“无陈水”技术？
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    传统 RO 机第一杯水 TDS 较高。无陈水技术通过纯水回流冲洗 RO 膜，
                    确保随时接水都是低 TDS，适合有婴儿或对水质敏感的家庭。
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-400" />
                    废水比 2:1 还是 3:1？
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    3:1 意味着产出 3 杯纯水仅浪费 1 杯废水，更环保。
                    但废水比越高，对 RO 膜的压力越大，滤芯寿命可能会受到微弱影响。
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Droplets className="w-5 h-5 text-emerald-500" />
            <span className="font-bold text-slate-800">中国家用净水器选购指南</span>
          </div>
          <p className="text-sm text-slate-400">
            © 2026 纯净生活实验室. 数据仅供参考，具体以厂商官网为准。
          </p>
        </div>
      </footer>

      {/* AI Chat Drawer */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">AI 选购助手</h3>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Powered by Gemini</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {chatMessages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-6">
                      <p className="text-slate-500 text-sm leading-relaxed">
                        您好！我是您的净水器选购助手。您可以问我：
                      </p>
                      <div className="mt-4 space-y-2">
                        <button 
                          onClick={() => setUserInput('哪款净水器的滤芯成本最低？')}
                          className="w-full text-left text-xs bg-white border border-slate-200 p-2 rounded-lg hover:border-emerald-500 transition-colors"
                        >
                          “哪款净水器的滤芯成本最低？”
                        </button>
                        <button 
                          onClick={() => setUserInput('家里4口人，推荐哪一款？')}
                          className="w-full text-left text-xs bg-white border border-slate-200 p-2 rounded-lg hover:border-emerald-500 transition-colors"
                        >
                          “家里4口人，推荐哪一款？”
                        </button>
                        <button 
                          onClick={() => setUserInput('小米和海尔的对比一下。')}
                          className="w-full text-left text-xs bg-white border border-slate-200 p-2 rounded-lg hover:border-emerald-500 transition-colors"
                        >
                          “小米和海尔的对比一下。”
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-emerald-500 text-white rounded-tr-none shadow-md shadow-emerald-100' 
                        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                    }`}>
                      {msg.role === 'ai' ? (
                        <div className="prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-headings:text-slate-900">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-6 border-t border-slate-100 bg-white">
                <div className="relative">
                  <input 
                    type="text" 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="输入您的问题..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!userInput.trim() || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
