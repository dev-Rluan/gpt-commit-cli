// src/config/env.js
import dotenv from "dotenv";
dotenv.config();

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || null;

if (!OPENAI_API_KEY) {
  console.warn("⚠️  OPENAI_API_KEY가 설정되지 않았습니다. 테스트 모드로 실행됩니다.");
}