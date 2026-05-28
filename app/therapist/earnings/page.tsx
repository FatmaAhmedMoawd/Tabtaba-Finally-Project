'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MoreHorizontal,
  Wallet,
  TrendingUp,
  Clock,
  Video,
  ChevronDown,
  Banknote
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { TherapistBottomNav } from '@/widgets/therapist/ui/therapist-bottom-nav';

const data = [
  { name: 'Jan', earnings: 1000 },
  { name: 'Feb', earnings: 1500 },
  { name: 'Mar', earnings: 1800 },
  { name: 'Apr', earnings: 1600 },
  { name: 'May', earnings: 2200 },
  { name: 'Jun', earnings: 2000 },
];

export default function EarningsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-[#F4F9F9]" />;

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F4F9F9] to-[#FDFDF5] font-inter relative pb-32 md:flex md:flex-col md:items-center w-full">
      <div className="w-full max-w-md mx-auto md:max-w-3xl pt-10 pb-6 px-6 relative">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between w-full mb-8"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-[32px] font-extrabold text-[#006D32] leading-tight tracking-tight">
              Earnings
            </h1>
            <p className="text-[#4F5B7B] text-[15px] font-medium opacity-80 leading-snug">
              Welcome back, here is your financial summary for this month.
            </p>
          </div>
          <div className="pt-2">
            <MoreHorizontal className="text-[#E2E8F0]" size={28} />
          </div>
        </motion.div>

        {/* Total Available Earnings Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full bg-gradient-to-br from-[#1DA349] via-[#1DA349] to-[#006D32] rounded-[32px] p-8 shadow-xl shadow-green-600/20 relative overflow-hidden mb-6"
        >
          {/* Subtle noise/texture would go here in real design */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-white/80 text-[15px] font-medium">Total Available Earnings</span>
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Wallet className="text-white" size={20} />
              </div>
            </div>
            
            <div className="text-center mb-8 flex items-baseline gap-2">
              <h2 className="text-white text-[48px] font-black leading-none">12,450</h2>
              <span className="text-white/80 text-[20px] font-bold">EGP</span>
            </div>

            <button className="w-full bg-white text-[#1DA349] font-black text-[17px] py-[18px] rounded-full shadow-lg shadow-black/5 hover:bg-gray-50 transition-colors active:scale-[0.98]">
              Withdraw Earnings
            </button>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-12 -mb-12 blur-xl"></div>
        </motion.div>

        {/* Small Data Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F1F5F9]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#EAF6ED] flex items-center justify-center">
                <Clock className="text-[#1DA349]" size={18} strokeWidth={2.5} />
              </div>
              <span className="text-[#4F5B7B] text-[15px] font-bold uppercase tracking-wide">Pending</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[24px] font-black text-[#1D2D50]">1,200</span>
              <span className="text-[#8997A5] text-[14px] font-bold uppercase">Egp</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F1F5F9]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#EAF6ED] flex items-center justify-center">
                <TrendingUp className="text-[#1DA349]" size={18} strokeWidth={2.5} />
              </div>
              <span className="text-[#4F5B7B] text-[15px] font-bold uppercase tracking-wide">Monthly Growth</span>
            </div>
            <span className="text-[24px] font-black text-[#1D2D50]">+15%</span>
          </motion.div>
        </div>

        {/* Earnings Analysis Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-[40px] p-8 shadow-sm border border-[#F1F5F9] mb-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[#006D32] font-black text-[20px] leading-tight">
              Earnings<br />Analysis
            </h3>
            <div className="bg-[#F8FAFC] rounded-full px-4 py-2 flex items-center gap-2 border border-[#E2E8F0] cursor-pointer">
              <span className="text-[#4F5B7B] text-[13px] font-bold">Last 6 Months</span>
              <ChevronDown size={14} className="text-[#BAC7D5]" strokeWidth={3} />
            </div>
          </div>

          <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1DA349" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1DA349" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8997A5', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1D2D50' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#1DA349" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorEarnings)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5 px-1">
            <h3 className="text-[#006D32] font-black text-[20px]">Recent Transactions</h3>
            <button className="text-[#4F5B7B] text-[14px] font-bold opacity-80 hover:opacity-100">View All</button>
          </div>

          <div className="flex flex-col gap-3">
            {/* Transaction 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 rounded-[28px] p-4 flex items-center justify-between border border-[#F1F5F9] hover:bg-white transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-[56px] h-[56px] rounded-2xl bg-[#EAF6ED] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Video className="text-[#1DA349]" size={22} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#1D2D50] text-[16px] font-black">Consultation Session</span>
                  <span className="text-[#8997A5] text-[13px] font-medium mt-0.5">12 June 2024</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-[#1DA349] font-black text-[17px]">+250 EGP</span>
                <span className="bg-[#EAF6ED] text-[#1DA349] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">Completed</span>
              </div>
            </motion.div>

            {/* Transaction 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/60 rounded-[28px] p-4 flex items-center justify-between border border-[#F1F5F9] hover:bg-white transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-[56px] h-[56px] rounded-2xl bg-[#F2F4F7] flex items-center justify-center group-hover:scale-105 transition-transform">
                   <Banknote className="text-[#1D2D50]" size={22} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#1D2D50] text-[16px] font-black leading-tight">Earnings<br />Withdrawal</span>
                  <span className="text-[#8997A5] text-[13px] font-medium mt-0.5">08 June 2024</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-[#C82A2A] font-black text-[17px]">-5,000 EGP</span>
                <span className="bg-[#F2F4F7] text-[#4F5B7B] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">Processing</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <TherapistBottomNav />
    </div>
  );
}
