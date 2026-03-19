import { GoogleGenAI } from "@google/genai";
import { PURIFIER_DATA, calculateTCO } from "../data";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_PROMPT = `你是一个家用净水器专家，专门为中国市场提供选购建议。
你面前有以下主流RO反渗透净水器的数据（均为无加热功能，不产生矿物质水）：
${PURIFIER_DATA.map(p => `- ${p.brand} ${p.model}: 流量${p.flux}G, 废水比${p.wastewaterRatio}, 购机价${p.purchasePrice}元, 3年预估总成本${calculateTCO(p, 3)}元, 特点: ${p.features.join(', ')}`).join('\n')}

请根据用户的需求（如家庭人数、预算、对品牌的偏好等）进行客观对比和推荐。
- 600G适合1-2人，800G适合3-4人，1000G及以上适合5人以上或对接水速度有高要求的家庭。
- 如果用户关注长期成本，请重点对比3年总持有成本（TCO）。
- 回答要专业、客观、简洁，使用Markdown格式。`;

export async function getPurifierAdvice(userMessage: string) {
  if (!apiKey) {
    return "API Key 未配置，请在设置中添加 GEMINI_API_KEY。";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    return response.text || "抱歉，我无法生成回答。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，连接 AI 助手时出现错误。";
  }
}
