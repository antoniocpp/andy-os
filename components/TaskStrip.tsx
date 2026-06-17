"use client";
import React, { useEffect, useRef, useState } from "react";
import type { ActivityEntry } from "@/lib/supabase";

const POLL_MS = 15_000;

function TaskCard({ entry }: { entry: ActivityEntry }) {
  const ts = new Date(entry.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const isActive = entry.task_status === "in_progress";
  return (
    <div style={{
      minWidth: 210, maxWidth: 260, flexShrink: 0,
      padding: "10px 13px",
      background: isActive ? "rgba(68,208,131,0.07)" : "rgba(10,22,33,0.6)",
      border: isActive ? "1px solid rgba(68,208,131,0.35)" : "1px solid #1B2A36",
      borderRadius: 10,
      display: "flex", flexDirection: "column", gap: 5,
      position: "relative",
      boxShadow: isActive ? "0 0 16px rgba(68,208,131,0.08)" : "none",
    }}>
      {isActive && (
        <div style={{
          position: "absolute", top: -1, left: -1, right: -1,
          height: 2, borderRadius: "10px 10px 0 0",
          background: "linear-gradient(90deg, #44D083, rgba(68,208,131,0.3))",
        }} />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#F4F7FA", lineHeight: 1.3, flex: 1 }}>
          {entry.task_title ?? "Tarefa"}
        </span>
        <span style={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: 8, color: "#6F7D89", flexShrink: 0, paddingTop: 1 }}>{ts}</span>
      </div>
      <p style={{
        margin: 0, fontSize: 10, color: "#7A8A98", lineHeight: 1.45,
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
      } as React.CSSProperties}>{entry.content}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
        <div style={{
          width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
          background: isActive ? "#44D083" : "#4A5A68",
          boxShadow: isActive ? "0 0 5px rgba(68,208,131,0.9)" : "none",
        }} />
        <span style={{
          fontFamily: '"IBM Plex Mono",monospace', fontSize: 8, fontWeight: 600,
          color: isActive ? "#44D083" : "#4A5A68",
          textTransform: "uppercase", letterSpacing: "0.09em",
        }}>
          {isActive ? "em andamento" : "concluída"}
        </span>
      </div>
    </div>
  );
}

export function TaskStrip({ initial }: { initial: ActivityEntry[] }) {
  const tasks = initial.filter(e => e.type === "task");
  const [entries, setEntries] = useState<ActivityEntry[]>(tasks);
  const lastTsRef = useRef<string>(initial[initial.length - 1]?.created_at ?? new Date().toISOString());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    async function poll() {
      try {
        const res = await fetch(`/api/activity?since=${encodeURIComponent(lastTsRef.current)}`);
        if (res.ok) {
          const fresh: ActivityEntry[] = await res.json();
          if (fresh.length > 0) {
            lastTsRef.current = fresh[fresh.length - 1].created_at;
            const taskFresh = fresh.filter(e => e.type === "task");
            if (taskFresh.length > 0) {
              setEntries(prev => [...prev, ...taskFresh].slice(-20));
            }
          }
        }
      } catch { /* ignore */ }
      timer = setTimeout(poll, POLL_MS);
    }
    timer = setTimeout(poll, POLL_MS);
    return () => clearTimeout(timer);
  }, []);

  const sorted = [...entries].sort((a, b) => {
    if (a.task_status === "in_progress" && b.task_status !== "in_progress") return -1;
    if (b.task_status === "in_progress" && a.task_status !== "in_progress") return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <>
      <style>{`.task-strip::-webkit-scrollbar { display: none; }`}</style>
      <div
        className="task-strip"
        style={{
          display: "flex", gap: 8, overflowX: "auto", padding: "10px 16px 12px",
          scrollbarWidth: "none",
        }}
      >
        {sorted.length === 0 ? (
          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: '"IBM Plex Mono",monospace', fontSize: 10, color: "#6F7D89",
            minHeight: 90,
          }}>
            aguardando tarefas...
          </div>
        ) : (
          sorted.map(e => <TaskCard key={e.id} entry={e} />)
        )}
      </div>
    </>
  );
}
