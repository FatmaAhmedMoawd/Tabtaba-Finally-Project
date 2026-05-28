import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini client on the server side with recommending user-agent headers
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { mood } = await req.json();

    const prompt = `
      You are Tabtaba's Zen Companion (مرافق طبطبة الروحي), a highly sensitive, poetic, and professional mental health guide.
      The user is feeling: "${mood}".
      
      Generate a customized, incredibly beautiful, short positive affirmation (1-2 sentences max) to lift their spirits, soothe their mind, and offer gentle, compassionate guidance.
      
      Requirements:
      1. Keep it short, comforting, poetic, and deeply peaceful.
      2. Provide the response in BOTH English and Arabic.
      3. Do NOT include any conversational intro/outro, only the JSON.
      
      Format your response exactly as a JSON object with this shape:
      {
        "en": "English affirmation quote...",
        "ar": "Arabic affirmation quote..."
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text?.trim() || "{}";
    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error generating affirmation:", error);
    // Graceful fallback with beautiful presets depending on approximate mood
    return NextResponse.json({
      en: "Take a deep breath. You are stronger than this moment, and peace is always within your catch.",
      ar: "خذ نفسًا عميقًا. أنت أقوى من هذه اللحظة، والسلام الداخلي دائمًا في متناول قلبك."
    });
  }
}
