import React from "react";
import { Database, ShieldCheck, FileDigit, Edit3, BrainCircuit } from "lucide-react";

export type AuditLogEntry = {
  id: string;
  time: string;
  action: string;
  details: string;
  type: "system" | "compliance" | "ai" | "manual";
};

/**
 * AuditTimeline Component
 * 
 * Renders an immutable, visually sequential compliance log.
 * Tracks deterministic API handshakes, automated AML sweeps (LexisNexis), 
 * AI vectorization timestamps, and most importantly: Manual Human Overrides.
 * This guarantees strict non-repudiation tracing for internal risk auditors.
 * 
 * @param {AuditLogEntry[]} logs - Chronological array of systemic events.
 */
export default function AuditTimeline({ logs }: { logs: AuditLogEntry[] }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "system": return <Database className="size-3.5 text-slate-500" />;
      case "compliance": return <ShieldCheck className="size-3.5 text-emerald-600" />;
      case "ai": return <BrainCircuit className="size-3.5 text-indigo-600" />;
      case "manual": return <Edit3 className="size-3.5 text-amber-600" />;
      default: return <FileDigit className="size-3.5 text-slate-500" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case "system": return "bg-slate-50 border-slate-200";
      case "compliance": return "bg-emerald-50 border-emerald-200";
      case "ai": return "bg-indigo-50 border-indigo-200";
      case "manual": return "bg-amber-50 border-amber-200";
      default: return "bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-sm p-4 mt-4 overflow-hidden">
      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
        Audit Log (Compliance Trail)
      </h3>
      
      <div className="space-y-0 relative pl-2">
        <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 relative z-10 pb-4 last:pb-0">
            <div className={`size-8 rounded-full border flex items-center justify-center shrink-0 ${getBg(log.type)}`}>
               {getIcon(log.type)}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-mono font-bold">{log.time}</p>
              <p className="text-sm font-semibold text-slate-800">{log.action}</p>
              <p className="text-xs text-slate-500">{log.details}</p>
            </div>
          </div>
        ))}

        {logs.length === 0 && (
          <div className="text-xs text-slate-400 italic py-2">No audit logs available.</div>
        )}
      </div>
    </div>
  );
}
