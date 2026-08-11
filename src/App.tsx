import { useState, useEffect } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { Sidebar } from "./components/layout/Sidebar";
import { ProblemInput } from "./components/features/ProblemInput";
import { ChatInterface } from "./components/features/ChatInterface";
import { sendChatMessage } from "./lib/gemini";
import { SYSTEM_PROMPT } from "./lib/prompts";
import { useSessions, SessionMessage } from "./hooks/useSessions";
import confetti from "canvas-confetti";

function App() {
  const {
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    createSession,
    updateSession,
    removeSession,
  } = useSessions();

  const [stuckPoint, setStuckPoint] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Trigger confetti when solved
  useEffect(() => {
    if (activeSession?.isSolved) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#06b6d4", "#22d3ee", "#67e8f9", "#a1a1aa", "#ffffff"],
      });
    }
  }, [activeSession?.isSolved]);

  const generateAIResponse = async (
    userMessage: string,
    contextMessages: SessionMessage[],
    currentProblemCode: string,
  ) => {
    try {
      // Same history shape as before — just sent to our own server now,
      // which forwards it to Gemini using the key it holds privately.
      const history = contextMessages.map((m) => ({
        role: m.role === "user" ? ("user" as const) : ("model" as const),
        parts: [{ text: m.content }],
      }));

      let prompt = userMessage;
      if (contextMessages.length === 0) {
        prompt = `Here is my problem code/context:\n\`\`\`\n${currentProblemCode}\n\`\`\`\n\nStuck Point: ${userMessage}\n\nDiagnose my logic gap.`;
      }

      return await sendChatMessage(SYSTEM_PROMPT, history, prompt);
    } catch (error) {
      console.error("Chat Error:", error);
      return "I'm having trouble connecting to my neural core. Please try again in a moment.";
    }
  };

  const handleDiagnose = async () => {
    if (!activeSession) return;

    // Auto-create session if none? But useSessions handles default activeSession usually.
    // If problem code is empty, warn.
    if (!activeSession.problemCode.trim()) {
      alert("Please enter a problem or code snippet first.");
      return;
    }
    if (!stuckPoint.trim()) return;

    setIsAnalyzing(true);

    const userMsg: SessionMessage = { role: "user", content: stuckPoint };
    const currentMessages = activeSession.messages;
    const updatedMessages = [...currentMessages, userMsg];

    // Update session state immediately with user message
    updateSession(activeSession.id, {
      messages: updatedMessages,
      stuckPoint: stuckPoint, // Save last stuck point if needed or just use logic
    });
    setStuckPoint("");

    let aiResponseText = await generateAIResponse(
      stuckPoint,
      currentMessages,
      activeSession.problemCode,
    );

    let solved = false;
    if (aiResponseText.includes("[SOLVED]")) {
      solved = true;
      aiResponseText = aiResponseText.replace("[SOLVED]", "").trim();
    }

    // Update with AI response
    updateSession(activeSession.id, {
      messages: [
        ...updatedMessages,
        { role: "assistant", content: aiResponseText },
      ],
      isSolved: solved,
    });

    setIsAnalyzing(false);
  };

  const handleHint = async () => {
    if (!activeSession) return;
    setIsAnalyzing(true);
    const hintRequest =
      "Give me a small hint to nudge me in the right direction, based on our conversation.";
    const aiResponseText = await generateAIResponse(
      hintRequest,
      activeSession.messages,
      activeSession.problemCode,
    );

    updateSession(activeSession.id, {
      messages: [
        ...activeSession.messages,
        { role: "assistant", content: aiResponseText },
      ],
    });
    setIsAnalyzing(false);
  };

  const handleResend = async () => {
    if (!activeSession || activeSession.messages.length === 0) return;

    // Find last user message
    const lastUserMsgIndex = activeSession.messages.findLastIndex(
      (m) => m.role === "user",
    );
    if (lastUserMsgIndex === -1) return;

    const lastUserContent = activeSession.messages[lastUserMsgIndex].content;

    // Truncate history to remove any subsequent assistant messages (failed or otherwise)
    // We want the state to be: [..., UserMsg] -> waiting for response
    const trucatedMessages = activeSession.messages.slice(
      0,
      lastUserMsgIndex + 1,
    );

    // Update UI immediately to remove old response
    updateSession(activeSession.id, { messages: trucatedMessages });
    setIsAnalyzing(true);

    // Context for AI is everything BEFORE the user message
    const contextMessages = activeSession.messages.slice(0, lastUserMsgIndex);

    let aiResponseText = await generateAIResponse(
      lastUserContent,
      contextMessages,
      activeSession.problemCode,
    );

    let solved = false;
    if (aiResponseText.includes("[SOLVED]")) {
      solved = true;
      aiResponseText = aiResponseText.replace("[SOLVED]", "").trim();
    }

    // Append new response to the truncated history
    updateSession(activeSession.id, {
      messages: [
        ...trucatedMessages,
        { role: "assistant", content: aiResponseText },
      ],
      isSolved: solved,
    });
    setIsAnalyzing(false);
  };

  const handleMetaphor = async () => {
    if (!activeSession) return;
    setIsAnalyzing(true);
    const metaphorRequest =
      "Explain the core concept or logic error in my problem using a creative, non-tech metaphor (like cooking, traffic, or architecture). Keep it brief and vivid.";
    const aiResponseText = await generateAIResponse(
      metaphorRequest,
      activeSession.messages,
      activeSession.problemCode,
    );

    updateSession(activeSession.id, {
      messages: [
        ...activeSession.messages,
        { role: "assistant", content: aiResponseText },
      ],
    });
    setIsAnalyzing(false);
  };

  const handleGiveUp = async () => {
    if (!activeSession) return;
    setIsAnalyzing(true);
    const prompt =
      "I give up. Please explain the answer and the solution clearly.";

    // Add user message "I give up"
    const updatedMessages = [
      ...activeSession.messages,
      { role: "user", content: "I give up." } as SessionMessage,
    ];
    updateSession(activeSession.id, { messages: updatedMessages });

    const aiResponseText = await generateAIResponse(
      prompt,
      updatedMessages,
      activeSession.problemCode,
    );

    // Giving up solves the problem? Technically yes, the user gets the answer.
    updateSession(activeSession.id, {
      messages: [
        ...updatedMessages,
        {
          role: "assistant",
          content: aiResponseText,
          isGiveUpReply: true,
        } as any,
      ], // Cast for temp property if needed or just content
      isSolved: true,
    });
    setIsAnalyzing(false);
  };

  return (
    <MainLayout
      sidebar={
        <Sidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={setActiveSessionId}
          onCreateSession={createSession}
          onDeleteSession={(id, e) => {
            e.stopPropagation();
            removeSession(id);
          }}
          isOpen={sidebarOpen}
        />
      }
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <ProblemInput
        value={activeSession?.problemCode || ""}
        onChange={(code) => {
          if (activeSession)
            updateSession(activeSession.id, { problemCode: code });
        }}
      />
      <ChatInterface
        stuckPoint={stuckPoint}
        setStuckPoint={setStuckPoint}
        messages={activeSession?.messages || []}
        onDiagnose={handleDiagnose}
        onHint={handleHint}
        onMetaphor={handleMetaphor}
        onResend={handleResend}
        onGiveUp={handleGiveUp}
        isAnalyzing={isAnalyzing}
        isSolved={activeSession?.isSolved}
      />
    </MainLayout>
  );
}

export default App;
