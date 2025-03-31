# GPT Commit Message Generator (CLI)

🤖 GPT를 이용해 자동으로 깔끔한 커밋 메시지를 생성하는 CLI 툴입니다.

## 🚀 설치 방법
``` bash
git clone https://github.com/your-username/gpt-commit-cli.git
cd gpt-commit-cli
npm install
```

## ⚙️ 사용 방법
1.	변경사항을 git add로 스테이징합니다.
2.	아래 명령어로 실행합니다.

``` bash
node bin/index.js
```

또는 npm link 후 전영 명령어로:
``` bash
node gpt-commit
```
## 🧪 예시 실행 흐름
``` bash
🚀 GPT 커밋 메시지 생성기 시작!
? 다음 메시지로 커밋할까요?

chore: update files based on recent changes (테스트 모드)
```

## 📦 환경 변수 (.env)
``` bash
OPENAI_API_KEY=your_openai_key
```
.env가 없을 경우 테스트 메시지를 생성합니다.

## 🛠️ 추후 기능 예정
- git diff / --cached 선택 옵션
- 커밋 스타일 선택 (Conventional, Gitmoji 등)
- 다국어 커밋 메시지 지원

