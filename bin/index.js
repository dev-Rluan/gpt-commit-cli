#!/usr/bin/env node
// bin/index.js
import { getGitDiff } from "../src/core/gitUtils.js";
import { generateCommitMessage } from "../src/core/openAIService.js"
import { formatCommitMessage } from "../src/core/commitFormatter.js";
import inquirer from "inquirer";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  console.log("\n🚀 GPT 커밋 메시지 생성기 시작!");

  const diff = await getGitDiff();
  if (!diff) {
    console.log("변경사항이 없습니다.");
    process.exit(0);
  }

  const rawMessage = await generateCommitMessage(diff);
  const formatted = formatCommitMessage(rawMessage);

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `다음 메시지로 커밋할까요?\n\n${formatted}\n`,
    },
  ]);

  if (confirm) {
    const { execSync } = await import("child_process");
    execSync(`git commit -m \"${formatted}\"`, { stdio: "inherit" });
  } else {
    console.log("커밋을 취소했습니다.");
  }
})();
