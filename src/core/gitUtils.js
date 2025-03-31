// src/core/gitUtils.js
import { execSync } from "child_process";

/**
 * 현재 Git 워킹 디렉토리의 변경사항(diff)을 추출
 * @returns {string|null} git diff 결과 (없으면 null)
 */
export const getGitDiff = () => {
  try {
    const diff = execSync("git diff --cached", { encoding: "utf-8" });
    return diff.trim();
  } catch (err) {
    console.error("❌ git diff 실패:", err.message);
    return null;
  }
};