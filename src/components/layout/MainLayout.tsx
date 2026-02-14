import React from 'react';
import { BrainCircuit, Server, Menu } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  onSidebarToggle?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, sidebar, onSidebarToggle }) => {
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans overflow-hidden">
      {/* Sidebar Area - passed from parent or null if not provided */}
      {sidebar}

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-950 relative transition-all duration-300">
          
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 flex items-center px-4 md:px-6 justify-between bg-zinc-900/50 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-3">
            {onSidebarToggle && (
                <button onClick={onSidebarToggle} className="md:hidden p-2 text-zinc-400 hover:bg-zinc-800 rounded-md">
                    <Menu className="w-5 h-5"/>
                </button>
            )}
            <BrainCircuit className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">ELIS <span className="text-zinc-500 text-sm font-normal">/ Diagnostic Tutor</span></h1>
            <h1 className="text-xl font-bold tracking-tight sm:hidden">ELIS</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
             <button 
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 shadow-[0_0_10px_rgba(20,184,166,0.1)] hover:bg-cyan-900/50 transition-colors cursor-pointer"
                title="Click to reset API Key"
             >
               <div className="relative">
                 <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-75"></div>
                 <Server className="w-3.5 h-3.5 text-cyan-500 relative z-10" />
               </div>
               <span className="text-xs font-medium text-cyan-500/90 tracking-wide uppercase">API Active</span>
             </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {children}
        </main>

        <Modal
            isOpen={showResetConfirm}
            onClose={() => setShowResetConfirm(false)}
            title="Reset API Key?"
        >
            <div className="space-y-4">
                <p className="text-zinc-400 text-sm">
                    This will remove your stored Gemini API Key. You will need to re-enter it to continue using the application.
                </p>
                <div className="flex gap-3 justify-end">
                    <button 
                        onClick={() => setShowResetConfirm(false)}
                        className="px-4 py-2 rounded text-zinc-400 hover:text-zinc-200 transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            localStorage.removeItem('GEMINI_API_KEY');
                            window.location.reload();
                        }}
                        className="px-4 py-2 rounded bg-red-950/50 text-red-500 hover:bg-red-900/50 border border-red-500/20 transition-colors text-sm font-medium"
                    >
                        Yes, Reset Key
                    </button>
                </div>
            </div>
        </Modal>
      </div>
    </div>
  );
};
