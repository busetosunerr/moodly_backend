import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("GOOGLE_API_KEY missing in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
export async function generateMotivationWithActivity(mood: string) {
  const prompt = `
  Sen profesyonel bir motivasyon koçu ve yaşam koçusun.
  Kullanıcı şu anda "${mood}" hissediyor.

  Görev:
  1) Kısa, pozitif ve samimi bir motivasyon cümlesi üret (1–2 cümle).
  2) Bunun ardından kullanıcıya yapabileceği basit bir aktivite öner (örneğin: nefes egzersizi, meditasyon, kısa yürüyüş, su içme, esneme, günlüğe bir şey yazma).

  Format:
  MOTIVASYON: <motivasyon cümlesi>
  AKTIVITE: <aktivite önerisi>

  Emoji kullanabilirsin ama aşırıya kaçma.
  Türkçe yaz.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  return text;
}
