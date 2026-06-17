import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CommandBar } from "./CommandBar";
import type { ReactNode } from "react";

interface PageShellProps { children: ReactNode; activePath: string; title: string; path: string; }

export function PageShell({ children, activePath, title, path }: PageShellProps) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar activePath={activePath} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", position: "relative" }}>
        <Topbar title={title} path={path} />
        <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
        <CommandBar />
      </div>
    </div>
  );
}
