"use client";
import { useState } from "react";
import { Mic, Send } from "lucide-react";

export function CommandBar() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 22px", background: "rgba(5,8,12,0.92)", backdropFilter: "blur(16px)", borderTop: "1px solid #1B2A36", zIndex: 10 }}>
      <div style={{ height: 50, background: "rgba(8,14,20,0.88)", border: focused ? "1px solid rgba(211,154,46,0.45)" : "1px solid #273644", borderRadius: 14, display: "flex", alignItems: "center", padding: "0 14px", gap: 10, transition: "border-color 200ms" }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, background: "radial-gradient(circle, rgba(211,154,46,0.28), rgba(39,182,214,0.12))", border: "1px solid rgba(211,154,46,0.38)" }} />
        <input value={value} onChange={e => setValue(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder="Fale com Andy..." style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 13.5, color: "#F4F7FA", fontFamily: "Inter, sans-serif" }} onKeyDown={e => e.key === "Enter" && setValue("")} />
        <button style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #273644", background: "transparent", color: "#AAB6C2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Mic size={13} /></button>
        <button onClick={() => setValue("")} style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid rgba(211,154,46,0.28)", background: "rgba(211,154,46,0.10)", color: "#F0B84A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Send size={13} /></button>
      </div>
    </div>
  );
}
