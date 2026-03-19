"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{ value: string; onValueChange: (v: string) => void }>({ value: "", onValueChange: () => {} })

export function Tabs({ defaultValue, value, onValueChange, className, children }: any) {
  const [tab, setTab] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : tab

  const handleTabChange = (v: string) => {
    if (!isControlled) {
      setTab(v)
    }
    if (onValueChange) {
      onValueChange(v)
    }
  }
  
  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleTabChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children }: any) {
  return (
    <div className={cn("inline-flex items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-500", className)}>
      {children}
    </div>
  )
}

export function TabsTrigger({ value, className, children, disabled }: any) {
  const { value: selectedValue, onValueChange } = React.useContext(TabsContext)
  const isSelected = selectedValue === value
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSelected ? "bg-white text-slate-900 shadow-sm" : "hover:bg-slate-200/50 hover:text-slate-900",
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className, children }: any) {
  const { value: selectedValue } = React.useContext(TabsContext)
  if (selectedValue !== value) return null
  return (
    <div className={cn("mt-4 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2", className)}>
      {children}
    </div>
  )
}
