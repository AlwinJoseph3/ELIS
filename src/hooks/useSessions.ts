import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type SessionMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type Session = {
  id: string;
  title: string;
  problemCode: string;
  stuckPoint: string;
  messages: SessionMessage[];
  isSolved: boolean;
  createdAt: number;
};

export function useSessions() {
  const [sessions, setSessions] = useLocalStorage<Session[]>('elis_sessions', []);
  const [activeSessionId, setActiveSessionId] = useLocalStorage<string>('elis_active_session', '');

  const createSession = useCallback(() => {
    const newSession: Session = {
      id: crypto.randomUUID(),
      title: 'New Session',
      problemCode: '',
      stuckPoint: '',
      messages: [],
      isSolved: false,
      createdAt: Date.now()
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    return newSession.id;
  }, [setSessions, setActiveSessionId]);

  const updateSession = useCallback((id: string, updates: Partial<Session>) => {
    setSessions(prev => prev.map(s => {
      if (s.id !== id) return s;
      
      // Auto-generate title from first problem code line or stuck point if still default 'New Session'
      // Auto-generate title from stuck point (preferred) or problem code
      let newTitle = updates.title || s.title;
      
      // If we have a stuck point update and haven't set a real title yet (or overwriting code-based title which we don't explicitly track but assume if stuckPoint was empty)
      if (updates.stuckPoint && (!s.stuckPoint || s.title === 'New Session')) {
           const cleanLine = updates.stuckPoint.split('\n')[0].trim();
           if (cleanLine) {
              newTitle = cleanLine.substring(0, 40) + (cleanLine.length > 40 ? '...' : '');
          }
      } 
      // Fallback: Use problem code if we don't have a title yet and no stuck point
      else if (s.title === 'New Session' && updates.problemCode && !s.stuckPoint && !updates.stuckPoint) {
           const firstLine = updates.problemCode.split('\n').find(l => l.trim().length > 0) || '';
           const cleanLine = firstLine.replace(/^(\/\/|#|\/\*)\s*/, '').trim();
           if (cleanLine) {
               newTitle = cleanLine.substring(0, 40) + (cleanLine.length > 40 ? '...' : '');
           }
      }

      return { ...s, ...updates, title: newTitle };
    }));
  }, [setSessions]);

  const removeSession = useCallback((id: string) => {
    setSessions(prev => {
        const remaining = prev.filter(s => s.id !== id);
        if (id === activeSessionId) {
            setActiveSessionId(remaining.length > 0 ? remaining[0].id : '');
        }
        return remaining;
    });
  }, [setSessions, activeSessionId, setActiveSessionId]);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
  
  // Ensure we always have at least one session? Optional.
  // if (!activeSession && sessions.length === 0) {
     // Side effect warning: Can't update state during render.
     // Better handled by component.
  // }

  return {
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    createSession,
    updateSession,
    removeSession
  };
}
