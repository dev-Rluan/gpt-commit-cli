// src/core/commitFormatter.js

/**
 * GPT가 응답한 커밋 메시지를 포맷팅
 * - 양쪽 공백 제거
 * - 첫 줄만 추출 (필요 시)
 * - 나중에 스타일 커스터마이징 가능
 */
export const formatCommitMessage = (message) => {
    if (!message) return "";
  
    const trimmed = message.trim();
    const firstLine = trimmed.split("\n")[0]; // 첫 줄만 사용할 수도 있음
  
    // 향후 스타일 처리 포인트
    return firstLine;
  };