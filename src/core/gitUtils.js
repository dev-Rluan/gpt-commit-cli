// src/core/gitUtils.js
import { execSync } from "child_process";

/**
 * Git 변경사항(diff)을 추출하는 함수
 * @param {"working" | "cached"} mode - 추출 모드
 * @returns {string|null}
 */
export const getGitDiff = (mode = "working") => {
  const command = mode === "cached" ? "git diff --cached" : "git diff";
  try {
    const diff = execSync(command, { encoding: "utf-8" });
    return diff.trim();
  } catch (err) {
    console.error("❌ git diff 실패:", err.message);
    return null;
  }
};
