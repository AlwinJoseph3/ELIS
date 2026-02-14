import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

export const getGeminiModel = () => {
  if (!genAI) {
   // If no key, we might want to throw or return null to handle in UI
   // But for now, let's assume the user will provide it.
   // Or we can initialize lazily.
   const key = localStorage.getItem('GEMINI_API_KEY') || import.meta.env.VITE_GEMINI_API_KEY;
   if(key) {
        genAI = new GoogleGenerativeAI(key);
   }
  }
  
  if (!genAI) {
      throw new Error("Gemini API Key is missing. Please set VITE_GEMINI_API_KEY or save it in local storage.");
  }

  return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
};
