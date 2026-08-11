const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export interface ChatHistoryItem {
  role: "user" | "model";
  parts: { text: string }[];
}

// Sends the conversation so far to our backend and gets ELIS's reply back.
export async function sendChatMessage(
  systemPrompt: string,
  history: ChatHistoryItem[],
  message: string,
): Promise<string> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ systemPrompt, history, message }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to reach the AI server.");
  }

  const data = await response.json();
  return data.text as string;
}
