"use client";
import { useEffect, useRef, useState } from "react";
import type { ActivityEntry } from "@/lib/supabase";

const BUFFER = 50;
const POLL_MS = 8000;

const TYPE_META: Record<string, { label: string; color: string }> = {
  prompt:      { label: "msg",    color: "#c4b5fd" },
  thinking:    { label: "think",  color: "#7dd3fc" },
  tool_use:    { label: "tool",   color: "#fdba74" },
  tool_result: { label: "result", color: "#d4d4d8" },
  text:        { label: "text",   color: "#F4F7FA" },
  status:      { label: "status", color: "#fde047" },
  error:       { label: "error",  color: "#fca5a5" },
  log:         { label: "log",    color: "#86efac" },
};

function esc(s: string) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

function Row({ e }: { e: ActivityEntry }) {
  const meta = TYPE_META[e.type] ?? TYPE_META.text;
  const ts = new Date(e.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 6, padding: "5px 12px", borderBottom: "1px solid rgba(255,255,255,0.025)", fontSize: 11 }}>
      <span style={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: 9, color: "#6F7D89", flexShrink: 0, paddingTop: 1 }}>{ts}</span>
      <span style={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: 8, fontWeight: 600, padding: "1px 5px", borderRadius: 3, flexShrink: 0, background: `${meta.color}20`, color: meta.color, border: `1px solid ${meta.color}35` }}>{meta.label}</span>
      <span style={{ color: "#AAB6C2", fontSize: 11, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }} dangerouslySetInnerHTML={{ __html: esc(e.content) }} />
    </div>
  );
}

export function LiveActivity({ initial }: { initial: ActivityEntry[] }) {
  const [entries, setEntries] = useState<ActivityEntry[]>(initial.slice(-BUFFER));
  const [connected, setConnected] = useState(true);
  const [newCount, setNewCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastTsRef = useRef<string>(initial[initial.length - 1]?.created_at ?? new Date().toISOString());
  const userScrolledUp = useRef(false);

  const scrollToBottom = () => {
    if (scrollRef.current) { scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); setNewCount(0); }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => { userScrolledUp.current = (el.scrollHeight - el.scrollTop - el.clientHeight) > 60; };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    async function poll() {
      try {
        const res = await fetch(`/api/activity?since=${encodeURIComponent(lastTsRef.current)}`);
        if (!res.ok) throw new Error();
        const fresh: ActivityEntry[] = await res.json();
        setConnected(true);
        if (fresh.length > 0) {
          lastTsRef.current = fresh[fresh.length - 1].created_at;
          setEntries(prev => [...prev, ...fresh].slice(-BUFFER));
          if (userScrolledUp.current) setNewCount(c => c + fresh.length);
          else setTimeout(scrollToBottom, 50);
        }
      } catch { setConnected(false); }
      timer = setTimeout(poll, POLL_MS);
    }
    timer = setTimeout(poll, POLL_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { if (!userScrolledUp.current) scrollToBottom(); }, [entries]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <style>{`@keyframes logIn { from { opacity:0; transform:translateY(-3px); } to { opacity:1; transform:none; } }`}</style>
      {newCount > 0 && (
        <button onClick={scrollToBottom} style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", zIndex: 10, background: "rgba(200,232,0,0.15)", border: "1px solid rgba(200,232,0,0.35)", color: "#C8E800", fontSize: 10, fontWeight: 700, padding: "4px 14px", borderRadius: 20, cursor: "pointer" }}>{newCount} novos ↓</button>
      )}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {entries.length === 0 ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: '"IBM Plex Mono",monospace', fontSize: 10, color: "#6F7D89" }}>aguardando atividade...</div>
        ) : entries.map(e => <Row key={e.id} e={e} />)}
      </div>
      <div style={{ padding: "5px 12px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 6, background: "rgba(5,8,12,0.6)" }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, background: connected ? "#44D083" : "#E5484D" }} />
        <span style={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: 8, color: connected ? "#44D083" : "#E5484D" }}>{connected ? `LIVE · poll ${POLL_MS/1000}s` : "RECONECTANDO..."}</span>
        <span style={{ marginLeft: "auto", fontFamily: '"IBM Plex Mono",monospace', fontSize: 8, color: "#6F7D89" }}>{entries.length} eventos</span>
      </div>
    </div>
  );
}
