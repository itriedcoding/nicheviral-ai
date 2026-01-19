import { useState } from "react";
import { ToolGrid } from "./tools/ToolGrid";
import { ToolWorkspace } from "./tools/ToolWorkspace";

export function Tools() {
  const [activeTool, setActiveTool] = useState("script");

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Creator Tools</h2>
        <p className="text-muted-foreground">Supercharge your content creation with 20+ advanced AI tools.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ToolGrid activeTool={activeTool} setActiveTool={setActiveTool} />
        <div className="lg:col-span-2">
          <ToolWorkspace activeTool={activeTool} />
        </div>
      </div>
    </div>
  );
}