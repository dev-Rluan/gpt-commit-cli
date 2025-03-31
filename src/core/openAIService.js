// src/core/openaiService.js
import fetch from "node-fetch";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const generateCommitMessage = async (diff) => {
    if (!OPENAI_API_KEY) {
        // 테스트 모드: GPT 호출 없이 더미 메시지 리턴
        return "chore: update files based on recent changes (테스트 모드)";
    }
    
  const prompt = `
다음 Git 변경사항을 기반으로 알맞은 커밋 메시지를 생성해줘.
형식: <type>: <description>
type 예시: feat, fix, refactor, docs, chore 등

변경사항:
${diff}
`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || "커밋 메시지 생성 실패";
  } catch (error) {
    console.error("❌ OpenAI API 호출 실패:", error.message);
    return "커밋 메시지 생성 실패";
  }
};