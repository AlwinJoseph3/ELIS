import React, { useState } from 'react';
import { Plus, MessageSquare, Trash2, Clock } from 'lucide-react';
import { Session } from '../../hooks/useSessions';
import { formatDistanceToNow } from 'date-fns';
import { Modal } from '../ui/Modal';

interface SidebarProps {
  sessions: Session[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onCreateSession: () => void;
  onDeleteSession: (id: string, e: React.MouseEvent) => void;
  isOpen: boolean; // For mobile toggle
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  isOpen
}) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-20 w-64 bg-zinc-950 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 flex flex-col
      `}
    >
      <div className="p-4 border-b border-zinc-800">
         <button 
           onClick={onCreateSession}
           className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm shadow-lg shadow-cyan-900/20"
         >
           <Plus className="w-4 h-4" />
           New Diagnostic
         </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {sessions.length === 0 && (
            <div className="text-center text-zinc-500 text-xs py-8">
                No past sessions.
            </div>
        )}
        {sessions.map(session => (
          <div 
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`
              group w-full text-left p-3 rounded-md cursor-pointer transition-all content-start relative
              ${activeSessionId === session.id 
                ? 'bg-zinc-900 text-zinc-100 border border-zinc-700/50 shadow-sm' 
                : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent'}
            `}
          >
             <div className="flex items-start gap-3 pr-6">
                <MessageSquare className={`w-4 h-4 mt-0.5 shrink-0 ${session.isSolved ? 'text-cyan-400' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate block mb-1">
                        {session.title || 'Untitled Session'}
                    </h3>
                    <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tryFormatDate(session.createdAt)}
                    </p>
                </div>
             </div>
             
             <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDeleteId(session.id);
                }}
                className="absolute right-2 top-3 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 text-zinc-600 hover:text-red-400 rounded-md transition-all"
                title="Delete Session"
             >
                 <Trash2 className="w-3 h-3" />
             </button>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-zinc-800 flex flex-col items-center gap-2">
        <span className="text-xs text-zinc-600">ELIS v0.1.0-alpha</span>
        <button 
            onClick={() => setShowClearConfirm(true)}
            className="text-[10px] flex items-center gap-1 text-zinc-700 hover:text-red-400 transition-colors uppercase tracking-wider font-semibold"
        >
            <Trash2 className="w-3 h-3" />
            Clear Storage
        </button>
      </div>

      <Modal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        title="Delete Session?"
      >
        <div className="space-y-4">
            <p className="text-zinc-400 text-sm">
                Are you sure you want to delete this session? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
                <button 
                    onClick={() => setConfirmDeleteId(null)}
                    className="px-4 py-2 rounded text-zinc-400 hover:text-zinc-200 transition-colors text-sm"
                >
                    Cancel
                </button>
                <button 
                    onClick={(e) => {
                        if (confirmDeleteId) {
                            onDeleteSession(confirmDeleteId, e);
                            setConfirmDeleteId(null);
                        }
                    }}
                    className="px-4 py-2 rounded bg-red-950/50 text-red-500 hover:bg-red-900/50 border border-red-500/20 transition-colors text-sm font-medium"
                >
                    Delete
                </button>
            </div>
        </div>
      </Modal>

      <Modal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        title="Clear All Storage?"
      >
        <div className="space-y-4">
            <p className="text-zinc-400 text-sm">
                Warning: This will delete ALL chat sessions and your API key. The application will be reset to its initial state.
            </p>
            <div className="flex gap-3 justify-end">
                <button 
                    onClick={() => setShowClearConfirm(false)}
                    className="px-4 py-2 rounded text-zinc-400 hover:text-zinc-200 transition-colors text-sm"
                >
                    Cancel
                </button>
                <button 
                    onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}
                    className="px-4 py-2 rounded bg-red-950/50 text-red-500 hover:bg-red-900/50 border border-red-500/20 transition-colors text-sm font-medium"
                >
                    Yes, Clear Everything
                </button>
            </div>
        </div>
      </Modal>
    </aside>
  );
};

// Helper to avoid crashing if date-fns fails or invalid date
function tryFormatDate(timestamp: number) {
    try {
        return formatDistanceToNow(timestamp, { addSuffix: true });
    } catch (e) {
        return 'Recently';
    }
}
