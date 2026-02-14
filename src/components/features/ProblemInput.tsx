import React from 'react';
import { Code2 } from 'lucide-react';

interface ProblemInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProblemInput: React.FC<ProblemInputProps> = ({ value, onChange }) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col border-r border-zinc-800 p-6 bg-zinc-950 relative group transition-colors hover:bg-zinc-900/50">
      <div className="flex items-center gap-2 mb-4 text-zinc-400 uppercase text-xs font-semibold tracking-wider">
        <Code2 className="w-4 h-4" />
        The Problem
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="// Paste your code or describe the logic problem here..."
          className="w-full h-full bg-black/20 text-zinc-100 p-4 rounded-lg resize-none focus:ring-1 ring-cyan-500/50 outline-none font-mono text-sm leading-relaxed border border-zinc-800 focus:border-cyan-500/50 transition-all placeholder:text-zinc-700 custom-scrollbar"
          spellCheck={false}
        />
      </div>
      {/* Visual distraction-free tip */}
       <div className="mt-3 text-xs text-zinc-600 text-right">
        Isolate the specific block causing issues.
      </div>
    </div>
  );
};
