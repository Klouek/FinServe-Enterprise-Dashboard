import React, { useState } from "react";
import { DollarSign, ShieldCheck, ArrowRight, Lock, Fingerprint, CheckCircle2, Clock } from "lucide-react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_AWAITING_FUNDS = [
  { id: "APP-2026-003", company: "Summit Healthcare Partners", amount: "$850,000", approvedBy: "Credit Committee B", time: "2 hours ago", status: "Ready" },
  { id: "APP-2026-009", company: "PrimeTech CyberSec", amount: "$750,000", approvedBy: "John Doe (Delegated)", time: "5 hours ago", status: "Ready" },
  { id: "APP-2026-005", company: "Golden Harvest AgriCorp", amount: "$400,000", approvedBy: "Credit Committee A", time: "1 day ago", status: "Ready" }
];

/**
 * Disbursements Treasury Queue Component
 * 
 * Manages the final stage of the lending lifecycle. Applications explicitly approved 
 * by the Credit Committee appear here awaiting physical fund deployment.
 * Implements a strict Cryptographic 2FA / Biometric authorization mock-flow 
 * representing IPS wire transfer security measures.
 */
export default function Disbursements() {
  const [items, setItems] = useState(MOCK_AWAITING_FUNDS);
  const [selectedMfa, setSelectedMfa] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuthorize = (id: string) => {
    setSelectedMfa(id);
  };

  const confirmTransfer = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setItems(prev => prev.filter(item => item.id !== selectedMfa));
      setIsProcessing(false);
      setSelectedMfa(null);
    }, 2500);
  };

  return (
    <div className="p-6 lg:p-8 w-full h-full overflow-y-auto bg-slate-100/50 relative animate-in fade-in duration-500">
      
      {/* 2FA Modal */}
      <AnimatePresence>
        {selectedMfa && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl border p-6 w-full max-w-sm"
            >
              <div className="size-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4 text-indigo-600">
                {isProcessing ? <Fingerprint className="size-6 animate-pulse" /> : <Lock className="size-6" />}
              </div>
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Cryptographic Authorization</h3>
              <p className="text-center text-sm text-slate-500 mb-6 leading-relaxed">
                You are about to authorize a wire transfer to the client's verified core banking account. Please authenticate.
              </p>
              
              <div className="space-y-3">
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 py-6" 
                  onClick={confirmTransfer}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing IPS Transfer..." : "Approve with Biometrics"}
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => !isProcessing && setSelectedMfa(null)} disabled={isProcessing}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              <DollarSign className="size-6 text-emerald-600" /> Funds Disbursement Queue
            </h2>
            <p className="text-sm text-slate-500 mt-1">Final stage. Approved applications awaiting secure treasury wire transfer.</p>
          </div>
          <Badge className="bg-slate-800 text-white font-mono">{items.length} Pending</Badge>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          {items.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center">
              <CheckCircle2 className="size-12 text-emerald-400 mb-3" />
              <h3 className="text-lg font-bold text-slate-700">All Queue Cleared</h3>
              <p className="text-slate-500 text-sm">No funds currently awaiting disbursement.</p>
            </div>
          ) : (
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                      <DollarSign className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.company}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{item.id}</span>
                        <span className="flex items-center gap-1"><ShieldCheck className="size-3 text-indigo-500" /> {item.approvedBy}</span>
                        <span className="flex items-center gap-1"><Clock className="size-3" /> {item.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Wire Amount</span>
                      <span className="text-xl font-black text-slate-800">{item.amount}</span>
                    </div>
                    <Button 
                      className="bg-emerald-600 hover:bg-emerald-700 font-bold text-xs h-9 tracking-wide"
                      onClick={() => handleAuthorize(item.id)}
                    >
                      Authorize Wire <ArrowRight className="size-3.5 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
