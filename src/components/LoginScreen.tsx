import React, { useState } from "react";
import { Server, Lock, Fingerprint, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

/**
 * FinServe Enterprise Access Gateway (LoginScreen)
 * 
 * Simulates a secure B2B entry barrier via Okta / Azure AD Single Sign-On.
 * Ensures strict role-bound access control (RBAC) before exposing sensitive 
 * systemic components and financial metrics.
 * 
 * @param {Function} onLogin - Callback triggering successful authentication state.
 */
export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      onLogin();
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] border border-slate-800 rounded-full opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] border border-slate-700 rounded-full opacity-20 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="size-16 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
              <Server className="size-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-2xl font-black text-white tracking-tight">FinServe <span className="text-slate-500">OPSCORE</span></h1>
            <p className="text-sm text-slate-400 mt-2">Enterprise Access Gateway</p>
          </div>

          <button 
            onClick={handleLogin}
            disabled={isAuthenticating}
            className="w-full h-12 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-white text-slate-900 font-bold text-sm rounded-lg flex items-center justify-center gap-3 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            {isAuthenticating ? (
              <>
                <RefreshCw className="size-5 animate-spin text-slate-600" /> Connecting to Okta SSO...
              </>
            ) : (
              <>
                <Lock className="size-4" /> Sign In via Enterprise SSO
              </>
            )}
          </button>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 font-mono text-center border-t border-slate-800 pt-6">
            <Fingerprint className="size-4" />
            End-to-End Encrypted Session. Authorized Personnel Only.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
