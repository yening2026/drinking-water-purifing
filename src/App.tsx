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
import { PURIFIER_DATA, PurifierModel } from './data';
import { getPurifierAdvice } from './services/gemini';

export default function App() {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const toggleModelSelection = (id: string) => {
    setSelectedModels(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

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

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900 font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">中国家用净水器选购指南</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#comparison" className="hover:text-emerald-600 transition-colors">产品对比</a>
            <a href="#tco" className="hover:text-emerald-600 transition-colors">成本分析</a>
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
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <ArrowRightLeft className="w-6 h-6 text-emerald-500" />
              主流型号对比
            </h3>
            <div className="text-sm text-slate-500">
              已选择 {selectedModels.length} 款产品进行对比
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PURIFIER_DATA.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-2xl border-2 transition-all overflow-hidden ${
                  selectedModels.includes(item.id) 
                    ? 'border-emerald-500 ring-4 ring-emerald-50/50 shadow-xl' 
                    : 'border-transparent shadow-md hover:shadow-lg'
                }`}
              >
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.model} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {item.brand}
                    </span>
                  </div>
                  <button 
                    onClick={() => toggleModelSelection(item.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                      selectedModels.includes(item.id) 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-white/90 text-slate-400 hover:text-emerald-500'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-slate-800 mb-2">{item.model}</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">流量 (Flux)</span>
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="font-mono font-bold text-lg">{item.flux}G</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">废水比</span>
                      <div className="flex items-center gap-1.5">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="font-mono font-bold text-lg">{item.wastewaterRatio}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {item.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">首发价格</span>
                      <span className="text-2xl font-black text-slate-900">¥{item.price}</span>
                    </div>
                    <button 
                      onClick={() => toggleModelSelection(item.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        selectedModels.includes(item.id)
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {selectedModels.includes(item.id) ? '已选择' : '加入对比'}
                    </button>
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
                        <td className="p-6 text-sm font-medium text-slate-500 border-b border-slate-50">RO滤芯寿命</td>
                        {compareModels.map(m => (
                          <td key={m.id} className="p-6 text-sm font-mono font-bold text-slate-900 border-b border-slate-50">{m.filterLife} 个月</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-6 text-sm font-medium text-slate-500 border-b border-slate-50">RO滤芯价格</td>
                        {compareModels.map(m => (
                          <td key={m.id} className="p-6 text-sm font-mono font-bold text-emerald-600 border-b border-slate-50">¥{m.filterCost}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-6 text-sm font-medium text-slate-500 border-b border-slate-50">3年预估总成本</td>
                        {compareModels.map(m => (
                          <td key={m.id} className="p-6 text-sm font-mono font-bold text-slate-900 border-b border-slate-50">¥{m.totalCost3Years}</td>
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
                  {PURIFIER_DATA.sort((a, b) => a.totalCost3Years - b.totalCost3Years).map(m => (
                    <div key={m.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                        <span>{m.brand} {m.model}</span>
                        <span>¥{m.totalCost3Years}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(m.totalCost3Years / 3000) * 100}%` }}
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
