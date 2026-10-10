# gpt-commit-cli

Git 변경사항에서 커밋 메시지를 만들고, 사용자 확인 후 커밋하는 AI CLI 프로토타입입니다.

## 구현된 흐름

1. 작업 디렉터리 변경(`git diff`) 또는 스테이징 변경(`git diff --cached`)을 선택합니다.
2. API 키가 있으면 메시지 생성을 요청하고, 키가 없으면 고정 테스트 메시지를 사용합니다.
3. 제안된 메시지를 확인하고 승인하면 `git commit`을 실행합니다.

커밋에 포함할 변경사항은 먼저 `git add`로 스테이징해야 합니다. 작업 디렉터리 diff 선택은 메시지 입력을 바꾸며 스테이징을 대신하지 않습니다.

## 설치와 사용

```sh
git clone https://github.com/dev-Rluan/gpt-commit-cli.git
cd gpt-commit-cli
npm install
npm link
```

대상 Git 저장소에서 변경사항을 준비한 뒤 실행합니다.

```sh
git add <대상 파일>
gpt-commit
```

도구 폴더에서 직접 실행할 때는 `node bin/index.js`를 사용할 수 있습니다. 현재 API 키는 실행 프로세스의 환경 변수로 전달해야 합니다.

```sh
export OPENAI_API_KEY=your_openai_key
gpt-commit
```

현재 소스는 API 모듈을 불러온 뒤 `.env`를 읽기 때문에 `.env`에만 설정한 키는 반영되지 않습니다.

키가 없을 때 사용하는 예시 메시지:

```text
chore: update files based on recent changes (테스트 모드)
```

## 현재 실행 제약

- `bin/index.js`의 import는 `openaiService.js`를 가리키지만 실제 파일 이름은 `openAIService.js`입니다. 대소문자를 구분하는 환경에서는 실행 전에 이 차이를 정리해야 합니다.
- `npm test`는 아직 실제 테스트 명령이 아닌 placeholder입니다.
- API 호출 소스는 모델 이름을 고정해 사용합니다. 현재 계정에서 해당 모델에 접근 가능한지 확인해야 합니다.

## 코드 안내

| 경로 | 역할 |
|---|---|
| [bin/index.js](bin/index.js) | diff 선택, 메시지 확인과 커밋 |
| [src/core/gitUtils.js](src/core/gitUtils.js) | Git diff 수집 |
| [src/core/openAIService.js](src/core/openAIService.js) | API 호출 또는 테스트 메시지 반환 |
| [src/core/commitFormatter.js](src/core/commitFormatter.js) | 메시지 형식 정리 |

## 향후 기능

커밋 스타일 선택(Conventional, Gitmoji 등), 다국어 메시지와 프리셋 템플릿은 향후 항목입니다. diff 선택은 현재 CLI에 구현되어 있어 예정 기능에서 제외했습니다.

## 라이선스

[LICENSE](LICENSE)는 MIT License이며 © 2025 Rluan입니다. `package.json`의 ISC 표기와는 차이가 남아 있습니다.
