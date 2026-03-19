"use client";

import React, { useState, useEffect } from "react";
import { MOCK_APPLICATIONS, LoanApplication } from "@/lib/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import {
  Building2, ChevronRight, FileText, BrainCircuit, ShieldCheck,
  Activity, CheckCircle2, AlertTriangle, Briefcase,
  Send, Search, Inbox, RefreshCw, UserCheck, ShieldAlert,
  Server, DollarSign, Edit3, Save, Database, Download, CheckCircle, Network, User, Bell, Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RiskEngine from "@/components/RiskEngine";
import Disbursements from "@/components/Disbursements";
import LoginScreen from "@/components/LoginScreen";
import AuditTimeline, { AuditLogEntry } from "@/components/AuditTimeline";

/**
 * CreditOpsWorkspace: Main Application Layout & Controller Component
 * 
 * Serves as the central command architecture for FinServe's internal lending operations.
 * Implements a Split-Pane UI facilitating continuous appraisal context without tab switching.
 * 
 * Core Mechanics:
 * - Scenario Stress Test: Translates theoretical macro risk (Interest Rates, Revenue Loss) 
 *   into a live mathematical DSCR re-calculation:
 *   [Calculated DSCR = Original DSCR * (1 - revDrop%) / (1 + intHike%)]
 *   This highlights cash flow vulnerability before the loan ever crosses the critical 1.0 threshold.
 * - Human-in-the-loop (HitL): Secures Gemini's LLM draft into an editable buffer, ensuring
 *   the final cryptographic routing is definitively approved by human jurisdiction.
 */
export default function CreditOpsWorkspace() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"inbox" | "risk" | "disbursements">("inbox");
  const [apps, setApps] = useState<LoanApplication[]>(MOCK_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Automations State
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStep, setSyncStep] = useState(0);
  const [kycLoading, setKycLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [draftMemo, setDraftMemo] = useState<string>("");
  
  // Route Modal State
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [routingStep, setRoutingStep] = useState(0); // 0 = form, 1 = loading, 2 = done

  // Advanced Analytics & Audit
  const [showNotifications, setShowNotifications] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [hasEdited, setHasEdited] = useState(false);
  const [revDrop, setRevDrop] = useState(0);
  const [intHike, setIntHike] = useState(0);
  const [isScanningMedia, setIsScanningMedia] = useState(false);
  const [mediaResult, setMediaResult] = useState<string | null>(null);

  const filteredApps = apps.filter(app =>
    app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Initializes the workspace contextual state for a selected application.
   * Resets AI generation flags, zero-bounds the stress test sliders, and 
   * seeds the Immutable Audit Log with prior systemic integrations.
   * 
   * @param {LoanApplication} app - The selected CRM record payload.
   */
  const handleSelectApp = (app: LoanApplication) => {
    setSelectedApp(app);
    setDraftMemo("");
    setShowRouteModal(false);
    setRoutingStep(0);
    setRevDrop(0);
    setIntHike(0);
    setMediaResult(null);
    setHasEdited(false);

    const now = new Date();
    const t1 = new Date(now.getTime() - 15 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const t2 = new Date(now.getTime() - 12 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    setAuditLogs([
      { id: Date.now().toString() + "1", time: t1, action: `Application ${app.id} Imported from CRM`, details: "Webhook trigger from Salesforce", type: "system" },
      { id: Date.now().toString() + "2", time: t2, action: "KYC/AML check passed", details: "Provider: FinServe MockAPI", type: "compliance" }
    ]);
  };

  const handleSyncCRM = () => {
    setIsSyncing(true);
    setSyncStep(0);
    
    // Simulate multi-step CRM fetch
    setTimeout(() => setSyncStep(1), 800);
    setTimeout(() => setSyncStep(2), 1800);
    setTimeout(() => setSyncStep(3), 2800);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStep(0);
    }, 3500);
  };

  const handleRunKYC = () => {
    if (!selectedApp) return;
    setKycLoading(true);
    setTimeout(() => {
      const updatedApps = apps.map(a =>
        a.id === selectedApp.id ? { ...a, kycStatus: "Cleared" as const } : a
      );
      setApps(updatedApps);
      setSelectedApp(prev => prev ? { ...prev, kycStatus: "Cleared" } : prev);
      setKycLoading(false);
    }, 2000);
  };

  /**
   * Dispatches the CRM context and financial metrics to the Next.js API route.
   * Appends the finalized draft to the workspace and immutable audit log.
   */
  const handleGenerateDraft = async () => {
    if (!selectedApp) return;
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-memo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: selectedApp.context,
          companyName: selectedApp.companyName,
          requestedAmount: selectedApp.requestedAmount,
          financials: {
            revenue: selectedApp.annualRevenue,
            ebitda: selectedApp.ebitda,
            dscr: selectedApp.dscr,
            ltv: selectedApp.ltv,
            legalFlags: selectedApp.legalFlags
          }
        })
      });
      const data = await response.json();
      setDraftMemo(data.memoHtml);
      const t = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      setAuditLogs(prev => [...prev, {
        id: Date.now().toString(),
        time: t,
        action: "AI Credit Memo Draft generated",
        details: "Model: Gemini 3.1 Flash-Lite",
        type: "ai"
      }]);
    } catch (error) {
      console.error("Draft generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Triggers a multi-stage deterministic routing sequence.
   * Commits the human-approved Memo and locks the file state across the queue.
   */
  const handleRouteToCommittee = () => {
    setRoutingStep(1);
    setTimeout(() => setRoutingStep(2), 2000);
    setTimeout(() => {
      setShowRouteModal(false);
      setRoutingStep(0);
      setSelectedApp(null);
    }, 3500);
  };

  /**
   * Generates an unstyled HTML document representing the finalized Credit Memo 
   * and triggers the native browser print() methodology allowing Save-as-PDF.
   */
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Credit Memo - ${selectedApp?.companyName}</title>
            <style>
              body { font-family: sans-serif; padding: 40px; line-height: 1.6; color: #333; }
              h1 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-size: 24px; }
              p { white-space: pre-wrap; font-size: 14px; }
              .doc-header { margin-bottom: 30px; }
            </style>
          </head>
          <body>
            <div class="doc-header">
              <h1>Credit Memo: ${selectedApp?.companyName}</h1>
              <p>Application ID: ${selectedApp?.id}<br/>Industry: ${selectedApp?.industry}<br/>Amount: ${selectedApp?.requestedAmount}</p>
            </div>
            <p>${draftMemo}</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-slate-100 text-slate-900 font-sans overflow-hidden">

      {/* Dense Internal Top Navbar */}
      <header className="h-12 bg-slate-900 text-slate-300 flex items-center justify-between px-4 shrink-0 border-b border-slate-950 shadow-sm z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-white tracking-wide">
            <Server className="size-4 text-emerald-500" />
            FINSERVE <span className="text-slate-500">OPSCORE</span>
          </div>
          <nav className="flex items-center gap-1">
            <div 
              onClick={() => setActiveTab("inbox")} 
              className={`px-3 py-1.5 text-sm font-medium rounded cursor-pointer transition-colors ${activeTab === "inbox" ? "bg-slate-800 text-slate-100 shadow-inner" : "hover:bg-slate-800/50 hover:text-slate-100 text-slate-400"}`}
            >
              Appraisal Inbox
            </div>
            <div 
              onClick={() => setActiveTab("risk")} 
              className={`px-3 py-1.5 text-sm font-medium rounded cursor-pointer transition-colors ${activeTab === "risk" ? "bg-slate-800 text-slate-100 shadow-inner" : "hover:bg-slate-800/50 hover:text-slate-100 text-slate-400"}`}
            >
              Risk Engine
            </div>
            <div 
              onClick={() => setActiveTab("disbursements")} 
              className={`px-3 py-1.5 text-sm font-medium rounded cursor-pointer transition-colors ${activeTab === "disbursements" ? "bg-slate-800 text-slate-100 shadow-inner" : "hover:bg-slate-800/50 hover:text-slate-100 text-slate-400"}`}
            >
              Disbursements
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-5 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></div> Secure Gateway Active
          </div>
          
          <div className="w-px h-5 bg-slate-700"></div>
          
          {/* Notification Bell */}
          <div className="relative">
            <div 
              className="cursor-pointer hover:bg-slate-800 p-1.5 rounded-full transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="size-4 text-slate-400" />
              <div className="absolute top-1 right-1 size-2 bg-rose-500 rounded-full border border-slate-900"></div>
            </div>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  <div className="p-3 bg-slate-50 border-b border-slate-100 font-bold text-slate-700 text-sm">Notifications (2)</div>
                  <div className="divide-y divide-slate-100">
                    <div className="p-3 hover:bg-slate-50 flex items-start gap-3 cursor-pointer">
                      <div className="size-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">New Macro Alert</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Interest rate hike detected. Check Scenario Stress Test modules.</p>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-slate-50 flex items-start gap-3 cursor-pointer">
                      <div className="size-2 mt-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Disbursement Complete</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Wire transfer to APP-2026-003 cleared by Treasury.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="w-px h-5 bg-slate-700"></div>

          {/* User Profile */}
          <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-800 p-1 rounded-md pr-2">
            <div className="size-7 rounded-sm bg-indigo-600 border border-indigo-400 flex items-center justify-center text-white font-black text-sm shadow-inner">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold leading-none">John Doe</span>
              <span className="text-[9px] text-slate-400 font-mono mt-0.5">Role: Senior Officer (Lvl 5)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        
        {activeTab === "risk" && <RiskEngine />}
        {activeTab === "disbursements" && <Disbursements />}

        {/* CRM Sync Modal */}
        <AnimatePresence>
          {isSyncing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-xl shadow-2xl border p-6 w-full max-w-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                  <Network className="size-6 text-indigo-600" />
                  <h3 className="font-bold text-slate-800">Salesforce CRM Sync</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    {syncStep >= 1 ? <CheckCircle2 className="size-5 text-emerald-500" /> : <RefreshCw className="size-5 text-slate-400 animate-spin" />}
                    <span className={syncStep >= 1 ? "text-slate-800" : "text-slate-500"}>Authenticating API Handshake...</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    {syncStep >= 2 ? <CheckCircle2 className="size-5 text-emerald-500" /> : syncStep === 1 ? <RefreshCw className="size-5 text-indigo-500 animate-spin" /> : <div className="size-5 rounded-full border-2 border-slate-200" />}
                    <span className={syncStep >= 2 ? "text-slate-800" : syncStep === 1 ? "text-indigo-600 font-medium" : "text-slate-400"}>Querying new applications...</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    {syncStep >= 3 ? <CheckCircle2 className="size-5 text-emerald-500" /> : syncStep === 2 ? <RefreshCw className="size-5 text-indigo-500 animate-spin" /> : <div className="size-5 rounded-full border-2 border-slate-200" />}
                    <span className={syncStep >= 3 ? "text-slate-800 font-bold" : syncStep === 2 ? "text-indigo-600 font-medium" : "text-slate-400"}>
                      {syncStep >= 3 ? "10 Records successfully pulled." : "Downloading CRM payloads..."}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Route to Committee Modal */}
        <AnimatePresence>
          {showRouteModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center">
              <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl border p-6 w-full max-w-md">
                {routingStep === 0 && (
                  <>
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                      <Send className="size-6 text-indigo-600" />
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">Route to Credit Committee</h3>
                        <p className="text-xs text-slate-500">Securely sign and deploy the finalized memo.</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Select Routing Destination</label>
                        <select className="w-full text-sm border-slate-200 rounded-lg p-2.5 bg-slate-50 outline-none">
                          <option>Senior Credit Board ({'>'}$1M)</option>
                          <option>Retail Credit Group ({'<'}$1M)</option>
                          <option>Compliance Escalation</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Officer Comments (Optional)</label>
                        <textarea className="w-full text-sm border-slate-200 rounded-lg p-3 bg-slate-50 outline-none resize-none h-20" placeholder="e.g. Cleared pending flags, LTV looks solid."></textarea>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <AlertTriangle className="size-4 text-amber-600" />
                        <span className="text-xs text-amber-800 font-medium">This action applies your digital signature and locks the file.</span>
                      </div>
                      <div className="pt-2 flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={() => setShowRouteModal(false)}>Cancel</Button>
                        <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleRouteToCommittee}>Sign & Route Document</Button>
                      </div>
                    </div>
                  </>
                )}
                {routingStep === 1 && (
                  <div className="p-8 flex flex-col items-center justify-center text-center">
                    <RefreshCw className="size-10 text-indigo-500 animate-spin mb-4" />
                    <h3 className="font-bold text-slate-800">Applying Cryptographic Signature</h3>
                    <p className="text-sm text-slate-500 mt-2">Routing to the Senior Credit Board...</p>
                  </div>
                )}
                {routingStep === 2 && (
                  <div className="p-8 flex flex-col items-center justify-center text-center">
                    <CheckCircle className="size-12 text-emerald-500 mb-4" />
                    <h3 className="font-bold text-slate-800 text-xl">Successfully Routed</h3>
                    <p className="text-sm text-slate-500 mt-2">The memo is now in the Committee Queue.</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === "inbox" && (
          <>
            {/* Left Pane: Inbox List */}
        <div className="w-[350px] lg:w-[400px] bg-white border-r border-slate-300 flex flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
          <div className="p-3 border-b border-slate-200 bg-slate-50 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Inbox className="size-4" /> Queue ({filteredApps.length})
              </h2>
              <Button variant="outline" size="sm" onClick={handleSyncCRM} disabled={isSyncing} className="h-7 text-xs px-2 box-border border-slate-300 text-slate-600 bg-white">
                <RefreshCw className={`size-3 mr-1.5 ${isSyncing ? "animate-spin" : ""}`} />
                {isSyncing ? "Syncing..." : "Sync CRM"}
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
              <Input
                placeholder="Lookup Application ID or Company..."
                className="pl-8 h-8 text-xs bg-white border-slate-300 shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-50/50">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                onClick={() => handleSelectApp(app)}
                className={`p-3 border-b border-slate-200 cursor-pointer transition-colors ${selectedApp?.id === app.id
                    ? "bg-indigo-50/60 border-l-4 border-l-indigo-600 pl-2 shadow-inner"
                    : "bg-white border-l-4 border-l-transparent hover:bg-slate-50 pl-2"
                  }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-mono text-slate-500 font-semibold">{app.id}</span>
                  <span className="text-xs font-bold text-slate-800">{app.requestedAmount}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 truncate">{app.companyName}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <Briefcase className="size-3" /> {app.industry}
                  </span>
                  <Badge variant={app.kycStatus === "Cleared" ? "success" : app.kycStatus === "In Review" ? "warning" : "secondary"} className="text-[9px] px-1.5 py-0 h-4 rounded-sm">
                    {app.kycStatus}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane: Appraisal Workspace */}
        <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden relative">
          {!selectedApp ? (
            <div className="m-auto flex flex-col items-center justify-center text-slate-400">
              <Database className="size-16 mb-4 text-slate-300" />
              <p className="font-semibold text-slate-600">No application selected</p>
              <p className="text-xs mt-1">Select an active application from the Queue to begin appraisal.</p>
            </div>
          ) : (
            <div className="flex flex-col h-full animate-in fade-in duration-300">
              {/* Top Bar for Selected App Actions */}
              <div className="h-14 bg-white border-b border-slate-300 px-6 flex items-center justify-between shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-3">
                  <Badge className="bg-slate-800 font-mono text-xs rounded-sm hover:bg-slate-800">{selectedApp.id}</Badge>
                  <h1 className="text-lg font-black text-slate-800 tracking-tight">{selectedApp.companyName}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs font-semibold bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                    onClick={handleRunKYC}
                    disabled={selectedApp.kycStatus === "Cleared" || kycLoading}
                  >
                    {kycLoading ? <RefreshCw className="size-3.5 mr-2 animate-spin" /> : <ShieldCheck className="size-3.5 mr-2" />}
                    {selectedApp.kycStatus === "Cleared" ? "KYC Verified" : "Run KYC/AML API"}
                  </Button>
                </div>
              </div>

              {/* Scrollable Workspace Area */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">

                {/* Data Grid Section */}
                <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Database className="size-3.5" /> Core CRM & Financial Profile
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-slate-100">
                    <div className="p-3">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Industry</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedApp.industry}</p>
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Incorporation Date</p>
                      <p className="text-sm font-semibold text-slate-800 font-mono">{selectedApp.incorporationDate}</p>
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Num Employees</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedApp.numEmployees}</p>
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">FICO / Credit Score</p>
                      <p className="text-sm font-bold text-indigo-600">{selectedApp.creditScore}</p>
                    </div>

                    <div className="p-3 bg-slate-50/50">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Annual Revenue</p>
                      <p className="text-sm font-bold text-slate-800">{selectedApp.annualRevenue}</p>
                    </div>
                    <div className="p-3 bg-slate-50/50">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">EBITDA</p>
                      <p className="text-sm font-bold text-slate-800">{selectedApp.ebitda}</p>
                    </div>
                    <div className="p-3 bg-slate-50/50">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Net Income</p>
                      <p className={`text-sm font-bold ${selectedApp.netIncome.includes('-') ? 'text-rose-600' : 'text-slate-800'}`}>{selectedApp.netIncome}</p>
                    </div>
                    <div className="p-3 bg-slate-50/50">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Outstanding Debt</p>
                      <p className="text-xs font-semibold text-slate-700 truncate">{selectedApp.outstandingDebt}</p>
                    </div>

                    <div className="p-3 col-span-2">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Requested Amount & Purpose</p>
                      <p className="text-sm font-bold text-slate-800">{selectedApp.requestedAmount} <span className="text-slate-500 font-normal">for {selectedApp.purposeOfLoan}</span></p>
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">LTV / DSCR</p>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`h-5 text-[10px] ${parseInt(selectedApp.ltv) > 70 ? 'text-amber-600 border-amber-200 bg-amber-50' : 'text-emerald-600 border-emerald-200 bg-emerald-50'}`}>LTV: {selectedApp.ltv}</Badge>
                        <Badge variant="outline" className={`h-5 text-[10px] ${parseFloat(selectedApp.dscr) < 1.0 ? 'text-rose-600 border-rose-200 bg-rose-50' : 'text-emerald-600 border-emerald-200 bg-emerald-50'}`}>DSCR: {selectedApp.dscr}</Badge>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Legal / Compliance</p>
                      <p className={`text-xs font-bold ${selectedApp.legalFlags === "None" ? "text-emerald-600" : "text-amber-600"}`}>{selectedApp.legalFlags}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 border-t border-slate-100 bg-white">
                    <div className="p-4">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">CRM Analyst Notes</p>
                      <p className="text-sm text-slate-700 leading-relaxed font-serif">{selectedApp.context}</p>
                    </div>
                    <div className="p-4 bg-indigo-50/30 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] uppercase font-bold text-indigo-600 flex items-center gap-1.5">
                          <Globe className="size-3" /> AI Market Intelligence
                        </p>
                        <Button 
                          size="sm" variant="outline" 
                          className="h-6 text-[10px] px-2 bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                          onClick={() => {
                            setIsScanningMedia(true);
                            setTimeout(() => {
                              setMediaResult(selectedApp.legalFlags !== "None" 
                                ? "Wykryto wzmianki o problemach prawnych w prasie lokalnej. Zalecana ostrożność operacyjna." 
                                : "Brak negatywnych wzmianek w prasie finansowej. Znaleziono publiczną informację o nowym kontrakcie z rządem (Sentyment: Pozytywny).");
                              setIsScanningMedia(false);
                            }, 2000);
                          }}
                          disabled={isScanningMedia || mediaResult !== null}
                        >
                          {isScanningMedia ? "Scanning Web..." : "Scan Web for Risks"}
                        </Button>
                      </div>
                      <div className="flex-1 rounded bg-white border border-slate-100 p-3 text-xs text-slate-600 flex items-center justify-center text-center">
                        {isScanningMedia ? (
                          <span className="flex items-center gap-2 text-slate-400 animate-pulse"><Search className="size-3" /> Analyzing global news sources...</span>
                        ) : mediaResult ? (
                          <span className="text-indigo-800 font-medium leading-relaxed">{mediaResult}</span>
                        ) : (
                          <span className="text-slate-400 italic">Click scan to run Adverse Media Check</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scenario Stress Test */}
                <div className="bg-white border border-slate-200 rounded-md shadow-sm p-4 mt-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="size-3.5 text-indigo-500" /> Scenario Stress Test
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">Live Projected DSCR:</span>
                      <Badge variant="outline" className={`font-mono text-sm ${
                        (parseFloat(selectedApp.dscr) * (1 - revDrop/100) / (1 + intHike/100)) < 1.0 
                        ? "bg-rose-100 text-rose-700 border-rose-200 animate-pulse" 
                        : "bg-emerald-100 text-emerald-700 border-emerald-200"
                      }`}>
                        { (parseFloat(selectedApp.dscr) * (1 - revDrop/100) / (1 + intHike/100)).toFixed(2) }x
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 px-2 pb-2">
                    <div>
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                        <span>What if Revenue drops?</span>
                        <span className="text-rose-600">{revDrop}%</span>
                      </div>
                      <input 
                        type="range" min="0" max="50" value={revDrop} onChange={(e)=>setRevDrop(Number(e.target.value))}
                        className="w-full accent-rose-500" 
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                        <span>What if Interest Rates go up?</span>
                        <span className="text-amber-600">+{intHike}%</span>
                      </div>
                      <input 
                        type="range" min="0" max="5" step="0.5" value={intHike} onChange={(e)=>setIntHike(Number(e.target.value))}
                        className="w-full accent-amber-500" 
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Audit Trail Bomb */}
                <AuditTimeline logs={auditLogs} />

                {/* AI Drafting Area */}
                <div className="flex flex-col flex-1 min-h-[400px]">
                  <div className="flex items-center justify-between mb-2 mt-2">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Edit3 className="size-4" /> Credit Memo Narrative Draft
                    </h3>
                    <Button
                      size="sm"
                      onClick={handleGenerateDraft}
                      disabled={isGenerating || draftMemo.length > 0}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm h-8 text-xs font-bold"
                    >
                      {isGenerating ? <RefreshCw className="size-3.5 mr-2 animate-spin" /> : <BrainCircuit className="size-3.5 mr-2" />}
                      Generate Draft via Gemini
                    </Button>
                  </div>

                  <div className="flex-1 bg-white border border-slate-300 rounded-md shadow-inner flex flex-col relative overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
                    {!draftMemo && !isGenerating && (
                      <div className="m-auto text-center text-slate-400 p-6 flex flex-col items-center">
                        <FileText className="size-10 mb-3 text-slate-300" />
                        <p className="text-sm">Workspace is empty.</p>
                        <p className="text-xs mt-1">Click 'Generate Draft' to initialize the baseline memo from the CRM data.</p>
                      </div>
                    )}

                    <AnimatePresence>
                      {isGenerating && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10"
                        >
                          <BrainCircuit className="size-8 text-indigo-500 animate-bounce mb-3" />
                          <p className="text-sm font-bold text-slate-700">Gemini 3.1 synthesizing financial draft...</p>
                          <div className="w-48 h-1 bg-slate-200 mt-4 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-indigo-500" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.5 }} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {draftMemo && (
                      <textarea
                        className="w-full h-[500px] p-6 text-[13px] font-mono text-slate-800 leading-relaxed outline-none resize-none bg-transparent"
                        value={draftMemo}
                        onChange={(e) => {
                          setDraftMemo(e.target.value);
                          if (!hasEdited) {
                            setHasEdited(true);
                            const t = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                            setAuditLogs(prev => [...prev, {
                              id: Date.now().toString(),
                              time: t,
                              action: "Manual override by Analyst (John)",
                              details: "Direct workspace modifications applied",
                              type: "manual"
                            }]);
                          }
                        }}
                        placeholder="Memo draft goes here..."
                      />
                    )}
                  </div>
                </div>

                {/* Final Route Action */}
                <div className="pt-2 pb-6 flex justify-end items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 font-semibold border-slate-300 text-slate-700 bg-white"
                    disabled={!draftMemo}
                    onClick={handleDownloadPDF}
                  >
                    <Download className="size-4 mr-2" /> PDF
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowRouteModal(true)}
                    disabled={!draftMemo}
                    className="h-9 bg-slate-900 hover:bg-slate-800 text-white font-bold tracking-wide shadow-md"
                  >
                    <Send className="size-4 mr-2" />
                    Export & Route to Committee
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
}
