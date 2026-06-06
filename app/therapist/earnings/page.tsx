'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Wallet,
  TrendingUp,
  Clock,
  Video,
  ChevronDown,
  Banknote,
  Search,
  Bell,
  ChevronRight
} from 'lucide-react';
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
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 5500 },
  { name: 'Mar', earnings: 7800 },
  { name: 'Apr', earnings: 6200 },
  { name: 'May', earnings: 10500 },
  { name: 'Jun', earnings: 12450 },
];

export default function EarningsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-[#FAF8F5]" />;

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-inter relative pb-32 md:pb-12 w-full flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto pt-6 pb-12 px-4 md:px-8 relative z-10 flex flex-col gap-6">
        
        {/* Header Search & Doctor Profile details */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full border-b border-gray-100 pb-5">
          <div className="relative w-full max-w-[280px] sm:max-w-xs">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="w-full bg-white border border-gray-200/80 rounded-full py-2.5 pl-11 pr-5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1DA349]/20 focus:border-[#1DA349] transition-all shadow-sm"
            />
          </div>
          
          {/* Right Header: Notification, Avatar and Title */}
          <div className="flex items-center gap-3.5 mt-2 lg:mt-0 justify-between lg:justify-end shrink-0">
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm relative cursor-pointer">
              <Bell size={20} />
            </button>
            
            <div className="flex items-center gap-3 bg-white pl-3.5 pr-2.5 py-1.5 rounded-full border border-gray-200/60 shadow-xs shrink-0 select-none">
              <div className="flex flex-col items-end text-right">
                <span className="text-[13px] font-black text-gray-800">Dr. Samir Ahmed</span>
                <span className="text-[10px] font-semibold text-gray-400">Consultant Psychologist</span>
              </div>
              <div className="w-9 h-9 rounded-full overflow-hidden relative border border-gray-100 bg-gray-100 shrink-0">
                <Image 
                  src="https://randomuser.me/api/portraits/men/22.jpg" 
                  alt="Dr. Samir Ahmed" 
                  fill
                  className="object-cover" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Page Titles */}
        <div className="flex flex-col gap-1 w-full mt-2">
          <h1 className="text-[28px] md:text-[32px] font-black text-gray-800 tracking-tight leading-tight">
            Earnings
          </h1>
          <p className="text-[15px] font-bold text-gray-500">
            Welcome back, here is your financial summary for this month.
          </p>
        </div>

        {/* 2-Column Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
          
          {/* Left Column: Cards & Chart (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Available Earnings Card */}
            <div className="w-full bg-gradient-to-br from-[#1DA349] via-[#1DA349] to-[#0A6D32] rounded-[32px] p-6 shadow-md shadow-green-600/10 relative overflow-hidden flex flex-col gap-6 min-h-[220px]">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-12 -mb-12 blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between relative z-10 w-full">
                <span className="text-white/85 font-bold text-[14px]">Total Available Earnings</span>
                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-xs">
                  <Wallet className="text-white" size={18} />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5 relative z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-white font-black text-[44px] tracking-tight leading-none">12,450</span>
                  <span className="text-white/90 font-black text-[18px]">EGP</span>
                </div>
                <span className="text-white/70 text-[12px] font-bold">Last withdrawal was 3 days ago for 5,000 EGP</span>
              </div>

              <button className="w-full bg-white text-[#1DA349] font-black text-[15px] py-3.5 rounded-full shadow-md hover:bg-gray-50 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer relative z-10">
                Withdraw Earnings
              </button>
            </div>

            {/* Pending & Growth Small Grids */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-[28px] p-5 border border-gray-200/50 shadow-sm flex flex-col gap-3 group hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-full bg-[#EAF6ED] flex items-center justify-center text-[#1DA349]">
                  <Clock size={16} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Pending</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-[20px] font-black text-gray-800 leading-none">1,200</span>
                    <span className="text-[11px] font-black text-gray-400 uppercase">Egp</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[28px] p-5 border border-gray-200/50 shadow-sm flex flex-col gap-3 group hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-full bg-[#EAF6ED] flex items-center justify-center text-[#1DA349]">
                  <TrendingUp size={16} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Monthly Growth</span>
                  <span className="text-[20px] font-black text-gray-800 leading-none mt-1">+15%</span>
                  <span className="text-[10px] text-gray-400 font-bold mt-0.5">Compared to last month</span>
                </div>
              </div>
            </div>

            {/* Earnings Analysis chart */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/50 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-gray-800 font-black text-[17px] tracking-tight">Earnings Analysis</h3>
                  <span className="text-gray-400 text-[12px] font-bold">Revenue trend over the last 6 months</span>
                </div>
                <button className="bg-white border border-gray-200 hover:bg-gray-50 rounded-full px-4 py-2 flex items-center gap-1.5 text-xs font-bold text-gray-600 transition-colors shadow-xs cursor-pointer">
                  <span>Last 6 Months</span>
                  <ChevronDown size={14} className="text-gray-400" strokeWidth={2.5} />
                </button>
              </div>

              <div className="w-full h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1DA349" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#1DA349" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FAF8F5" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#8997A5', fontSize: 11, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', fontSize: 12 }}
                      labelStyle={{ fontWeight: 'bold', color: '#1D2D50' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="#1DA349" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorEarnings)" 
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Right Column: Performance Summary & Recent Transactions (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            
            {/* Performance Summary widget */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/50 shadow-sm flex flex-col gap-4">
              <h3 className="text-gray-800 font-black text-[17px] tracking-tight">Performance Summary</h3>
              <div className="h-px bg-gray-100" />
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                  <span>Avg. Session Income</span>
                  <span className="text-gray-800 font-black">450 EGP</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                  <span>Total Sessions (June)</span>
                  <span className="text-gray-800 font-black">28 Sessions</span>
                </div>
                
                <div className="h-px bg-gray-50 my-1" />
                
                <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                  <span>Goal Met</span>
                  <span className="text-[#1DA349] font-black">76%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1DA349] h-full w-[76%] rounded-full" />
                </div>
                <span className="text-[11.5px] text-gray-400 font-bold leading-tight">
                  76% of monthly earnings goal reached.
                </span>
              </div>
            </div>

            {/* Recent Transactions List */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-gray-800 font-black text-[17px] tracking-tight">Recent Transactions</h3>
                <button className="text-gray-400 hover:text-gray-600 font-bold text-[13px] hover:underline cursor-pointer">
                  View All
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {/* Transaction 1 */}
                <div className="bg-white rounded-[24px] p-4 flex items-center justify-between border border-gray-200/40 hover:border-gray-200 transition-colors shadow-xs group">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF6ED] text-[#1DA349] flex items-center justify-center shrink-0">
                      <Video size={18} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-gray-800 font-bold text-[14.5px] truncate">Consultation Session</span>
                      <span className="text-gray-400 text-[11px] font-semibold mt-0.5">12 June 2024</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-[#1DA349] font-black text-[15px]">+250 EGP</span>
                    <span className="bg-[#EAF6ED] text-[#1DA349] text-[9px] font-black px-2 py-0.5 rounded mt-1.5 uppercase tracking-wider select-none">Completed</span>
                  </div>
                </div>

                {/* Transaction 2 */}
                <div className="bg-white rounded-[24px] p-4 flex items-center justify-between border border-gray-200/40 hover:border-gray-200 transition-colors shadow-xs group">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <Wallet size={18} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-gray-800 font-bold text-[14.5px] truncate">Earnings Withdrawal</span>
                      <span className="text-gray-400 text-[11px] font-semibold mt-0.5">08 June 2024</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-red-550 font-black text-[15px]">-5,000 EGP</span>
                    <span className="bg-gray-100 text-gray-500 text-[9px] font-black px-2 py-0.5 rounded mt-1.5 uppercase tracking-wider select-none">Processing</span>
                  </div>
                </div>

                {/* Transaction 3 */}
                <div className="bg-white rounded-[24px] p-4 flex items-center justify-between border border-gray-200/40 hover:border-gray-200 transition-colors shadow-xs group">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF6ED] text-[#1DA349] flex items-center justify-center shrink-0">
                      <Video size={18} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-gray-800 font-bold text-[14.5px] truncate">Consultation Session</span>
                      <span className="text-gray-400 text-[11px] font-semibold mt-0.5">07 June 2024</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-[#1DA349] font-black text-[15px]">+450 EGP</span>
                    <span className="bg-[#EAF6ED] text-[#1DA349] text-[9px] font-black px-2 py-0.5 rounded mt-1.5 uppercase tracking-wider select-none">Completed</span>
                  </div>
                </div>

                {/* Transaction 4 */}
                <div className="bg-white rounded-[24px] p-4 flex items-center justify-between border border-gray-200/40 hover:border-gray-200 transition-colors shadow-xs group">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF6ED] text-[#1DA349] flex items-center justify-center shrink-0">
                      <Banknote size={18} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-gray-800 font-bold text-[14.5px] truncate">Performance Bonus</span>
                      <span className="text-gray-400 text-[11px] font-semibold mt-0.5">05 June 2024</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-[#1DA349] font-black text-[15px]">+1,000 EGP</span>
                    <span className="bg-[#EAF6ED] text-[#1DA349] text-[9px] font-black px-2 py-0.5 rounded mt-1.5 uppercase tracking-wider select-none">Completed</span>
                  </div>
                </div>
              </div>

              {/* Help footer */}
              <div className="text-center text-[12px] font-medium text-gray-450 leading-relaxed mt-2 select-none">
                Financial data updates hourly. For any inquiries, please contact support.
              </div>
            </div>

          </div>

        </div>
      </div>

      <TherapistBottomNav />
    </div>
  );
}
