import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageSquare, Lightbulb, Compass, Send, CheckCircle, Sparkles, Flag, RefreshCw, Brain } from 'lucide-react';

interface ChatInterfaceProps {
  stuckPoint: string;
  setStuckPoint: (value: string) => void;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  onDiagnose: () => void;
  onHint: () => void;
  onMetaphor: () => void;
  onResend: () => void;
  onGiveUp: () => void;
  isAnalyzing: boolean;
  isSolved?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  stuckPoint, 
  setStuckPoint, 
  messages, 
  onDiagnose,
  onHint,
  onMetaphor,
  onResend,
  onGiveUp,
  isAnalyzing,
  isSolved = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnalyzing]);

  return (
    <div className="w-full md:w-1/2 flex flex-col p-6 bg-zinc-950 relative">
       <div className="flex items-center gap-2 mb-4 text-zinc-400 uppercase text-xs font-semibold tracking-wider justify-between">
         <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Diagnostic Session
            {isSolved && <span className="text-cyan-400 flex items-center gap-1 animate-in fade-in duration-500"> — <CheckCircle className="w-3 h-3"/> Solved</span>}
         </div>
       </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar space-y-4 pr-2">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-3">
            <Compass className="w-10 h-10 opacity-20" />
            <p className="text-sm">Identify the gap. Bridge the logic.</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-lg p-4 text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  msg.role === 'user' 
                    ? 'bg-zinc-800 text-zinc-200 border border-zinc-700' 
                    : 'bg-cyan-950/30 text-cyan-100 border border-cyan-500/20'
                }`}
              >
                <ReactMarkdown 
                  components={{
                    p: (props: any) => <p className="mb-2 last:mb-0" {...props} />,
                    code: (props: any) => <code className="bg-zinc-950/50 px-1 py-0.5 rounded text-xs font-mono" {...props} />,
                    strong: (props: any) => <strong className="font-bold text-cyan-300" {...props} />,
                    em: (props: any) => <em className="italic text-zinc-300" {...props} />
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))
        )}
        {isAnalyzing && (
             <div className="flex justify-start">
               <div className="bg-cyan-950/30 border border-cyan-500/20 rounded-lg p-3 flex items-center gap-2">
                 <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
                 <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                 <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]" />
               </div>
             </div>
        )}
        <div ref={messagesEndRef} />
      </div>

       {/* Actions */}
       {messages.length > 0 && !isAnalyzing && !isSolved && (
         <div className="flex gap-3 justify-center mb-4 flex-wrap">
           <button 
             onClick={onResend}
             className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors px-4 py-2 rounded border border-zinc-700 hover:border-zinc-500 bg-zinc-900/30"
           >
             <RefreshCw className="w-3 h-3" />
             Resend
           </button>
           <button 
             onClick={onHint}
             className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-cyan-400 transition-colors px-4 py-2 rounded border border-zinc-700 hover:border-cyan-500/30 bg-zinc-900/30"
           >
             <Lightbulb className="w-3 h-3" />
             Hint
           </button>
           <button 
             onClick={onMetaphor}
             className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-purple-400 transition-colors px-4 py-2 rounded border border-zinc-700 hover:border-purple-500/30 bg-zinc-900/30"
           >
             <Brain className="w-3 h-3" />
             Metaphor
           </button>
           <button 
             onClick={onGiveUp}
             className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-red-400 transition-colors px-4 py-2 rounded border border-zinc-700 hover:border-red-500/30 bg-zinc-900/30"
           >
             <Flag className="w-3 h-3" />
             Give Up
           </button>
         </div>
       )}

       {/* Stuck Point Input */}
      <div className={`mt-auto relative bg-zinc-900/30 rounded-lg border focus-within:ring-1 transition-all ${isSolved ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(20,184,166,0.1)]' : 'border-zinc-700 focus-within:ring-cyan-400/50 focus-within:border-cyan-400/50'}`}>
         <textarea 
           value={stuckPoint}
           onChange={(e) => setStuckPoint(e.target.value)}
           placeholder={isSolved ? "Problem solved! Start a new session or ask a follow-up..." : "Type your stuck point here..."}
           className="w-full bg-transparent border-none text-zinc-100 p-4 focus:ring-0 outline-none resize-none h-[4.5rem] pr-14 text-sm scrollbar-hide"
           onKeyDown={(e) => {
             if (e.key === 'Enter' && !e.shiftKey) {
               e.preventDefault();
               onDiagnose();
             }
           }}
         />
         <button 
              onClick={onDiagnose}
              disabled={(!stuckPoint.trim() && !isSolved) || isAnalyzing}
              className={`absolute bottom-2 right-2 p-2 rounded-md transition-all duration-500 ${
                  isSolved 
                  ? 'bg-cyan-500 text-white shadow-lg animate-[bounce_1s_infinite]' 
                  : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 disabled:opacity-30 disabled:hover:bg-transparent'
              }`}
              title={isSolved ? "Solved!" : "Send"}
         >
              {isSolved ? <Sparkles className="w-5 h-5 fill-current" /> : <Send className="w-5 h-5" />}
         </button>
      </div>
    </div>
  );
};
