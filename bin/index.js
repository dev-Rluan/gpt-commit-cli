#!/usr/bin/env node
// bin/index.js

import { getGitDiff } from "../src/core/gitUtils.js";
import { generateCommitMessage } from "../src/core/openaiService.js";
import { formatCommitMessage } from "../src/core/commitFormatter.js";
import inquirer from "inquirer";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  console.log("\n🚀 GPT 커밋 메시지 생성기 시작!\n");

  // 변경사항 기준 선택
  const { diffMode } = await inquirer.prompt([
    {
      type: "list",
      name: "diffMode",
      message: "어떤 변경사항을 기반으로 커밋 메시지를 생성할까요?",
      choices: [
        { name: "워킹 디렉토리 변경사항 (git diff)", value: "working" },
        { name: "스테이징된 변경사항 (git diff --cached)", value: "cached" },
      ],
    },
  ]);

  const diff = await getGitDiff(diffMode);
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
    execSync(`git commit -m "${formatted}"`, { stdio: "inherit" });
  } else {
    console.log("커밋을 취소했습니다.");
  }
})();
