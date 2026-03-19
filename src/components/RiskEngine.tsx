import React from "react";
import { ShieldAlert, BarChart3, Activity, TrendingUp, ShieldCheck, AlertTriangle } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Progress } from "./ui/Progress";

/**
 * RiskEngine Dashboard Component
 * 
 * Visualizes macroeconomic portfolio health and sector concentration limits.
 * Translates raw portfolio values into visual threshold limit warnings to enforce Basel III
 * and internal compliance guidelines dynamically in real-time.
 */
export default function RiskEngine() {
  return (
    <div className="p-6 lg:p-8 w-full h-full overflow-y-auto bg-slate-100/50 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              <BarChart3 className="size-6 text-indigo-600" /> Executive Risk Dashboard
            </h2>
            <p className="text-sm text-slate-500 mt-1">Live macroeconomic portfolio monitoring & Basel III liquidity metrics.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border shadow-sm">
            <span className="relative flex size-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Oracle Cloud DB Synced</span>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-5 border shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Portfolio Exposure</p>
            <h3 className="text-3xl font-black text-slate-800">$142.5M</h3>
            <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
              <TrendingUp className="size-3" /> +2.4% vs last quarter
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border shadow-sm ring-1 ring-amber-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-bl-full -mr-8 -mt-8"></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">NPL Ratio (Non-Performing)</p>
            <h3 className="text-3xl font-black text-amber-600">3.8%</h3>
            <p className="text-xs text-amber-600 font-semibold mt-2 flex items-center gap-1">
              <AlertTriangle className="size-3" /> Approaching 4.0% internal threshold
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Avg Portfolio DSCR</p>
            <h3 className="text-3xl font-black text-slate-800">1.45x</h3>
            <p className="text-xs text-slate-500 font-semibold mt-2">Highly liquid borrower base</p>
          </div>
        </div>

        {/* Data Visualization Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Sector Concentration */}
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Activity className="size-4 text-indigo-500" /> Sector Concentration Limits
            </h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-700">Commercial Real Estate</span>
                  <span className="text-slate-500">45% / 50% Limit</span>
                </div>
                <Progress value={90} className="h-2.5" indicatorClassName="bg-indigo-500" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-700">Industrial Manufacturing</span>
                  <span className="text-slate-500">22% / 30% Limit</span>
                </div>
                <Progress value={73} className="h-2.5" indicatorClassName="bg-emerald-500" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-700">Retail & E-commerce</span>
                  <span className="text-rose-600 font-bold">18% / 15% Limit (OVERWEIGHT)</span>
                </div>
                <Progress value={100} className="h-2.5" indicatorClassName="bg-rose-500" />
              </div>
            </div>
          </div>

          {/* Automated Compliance Alerts */}
          <div className="bg-white rounded-xl p-6 border shadow-sm flex flex-col">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldAlert className="size-4 text-rose-500" /> Automated Compliance Alerts
            </h4>
            
            <div className="flex-1 space-y-3">
              <div className="bg-rose-50/50 border border-rose-100 p-3 rounded-lg flex items-start gap-3">
                <div className="mt-0.5 size-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="size-3" />
                </div>
                <div>
                  <p className="text-xs font-bold text-rose-800 uppercase">Sector Limit Breach</p>
                  <p className="text-xs text-slate-600 mt-1">Retail sector exposure has exceeded the Q1 Risk Committee mandate of 15%.</p>
                </div>
                <Badge className="ml-auto bg-white text-rose-600 border border-rose-200 text-[9px] hover:bg-rose-50 cursor-pointer">View</Badge>
              </div>

              <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-lg flex items-start gap-3">
                <div className="mt-0.5 size-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Activity className="size-3" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-800 uppercase">Macro Volatility Watch</p>
                  <p className="text-xs text-slate-600 mt-1">Interest rate futures indicate a 50bps hike. Stress test pending to calculate LTV impact.</p>
                </div>
                <Badge className="ml-auto bg-white text-amber-600 border border-amber-200 text-[9px] hover:bg-amber-50 cursor-pointer">Run Test</Badge>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex items-start gap-3">
                <div className="mt-0.5 size-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="size-3" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-800 uppercase">Basel III Liquidity Guard</p>
                  <p className="text-xs text-slate-600 mt-1">Tier 1 Capital reserves remain perfectly stabilized. No action strictly required.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
