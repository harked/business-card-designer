
import { GoogleGenAI } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this example, we assume the key is always present.
  console.warn("API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const suggestTagline = async (company: string, title: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key is missing. Please configure it to use AI features.";
  }

  try {
    const prompt = `Generate a single, short, professional, and catchy tagline for a business. The tagline must be under 10 words. The company name is "${company}" and my role is "${title}". Do not include quotation marks or any other formatting in your response. Just return the tagline text.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        // Disable thinking for faster, lower-latency response
        thinkingConfig: { thinkingBudget: 0 },
        temperature: 0.8,
        maxOutputTokens: 20, // Limit output to a short phrase
      }
    });

    const text = response.text.trim().replace(/["']/g, ''); // Clean up any stray quotes
    return text;
  } catch (error) {
    console.error("Error generating tagline:", error);
    return "Error generating suggestion.";
  }
};
