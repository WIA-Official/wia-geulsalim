# WIA 글살림 (Geulsalim) — 글을 살리다

> **복원 · 구조화 · 변환 · 전달** — AI 기반 고문서 복원 & 전방위 접근성 플랫폼  
> **Restore · Structure · Convert · Deliver** — AI-powered document restoration & universal accessibility

[![라이브 데모](https://img.shields.io/badge/라이브-wiageulsalim.com-6c3ce1?style=for-the-badge)](https://wiageulsalim.com)
[![2026 AI 챔피언](https://img.shields.io/badge/2026-전국민%20AI%20챔피언%20대회-ff6b35?style=for-the-badge)](https://wiageulsalim.com)
[![자막](https://img.shields.io/badge/자막-83개%20언어-blue?style=for-the-badge)](srt/)
[![WIA 표준](https://img.shields.io/badge/WIA%20표준-765개%20공개-orange?style=for-the-badge)](https://github.com/WIA-Official/wia-standards-public)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 글살림이란?

**글살림(Geulsalim)**은 *"글을 살리다"*라는 뜻입니다.

인류 5,000년 지식의 95%가 아직도 손이 닿지 않는 곳에 있습니다:

- **87%** — 한국 고문서·역사 기록물, 아직 디지털화되지 않은 채 조용히 소멸 중
- **97%** — 세계 7,000개 언어 중 AI 지원이 충분한 언어는 3%뿐
- **3억 명** — 시각·청각 장애인이 아직도 텍스트에 온전히 접근하지 못함

글살림은 이 네 가지 장벽을 **동시에** 돌파하는 **4단계 통합 AI 파이프라인**입니다.

---

## 4단계 파이프라인

```
[손상된 문서]
      │
      ▼
┌───────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐
│ 1. 복원   │───▶│ 2. 구조화    │───▶│ 3. 변환      │───▶│ 4. 전달          │
│           │    │              │    │              │    │                  │
│ Diffusion │    │ WCAG 2.2 HTML│    │ 점자 7,000   │    │ WIA Talk 3D 수어 │
│ 모델 +    │    │ EPUB 3 A11y  │    │ 언어         │    │ WebXR VR         │
│ LLM 추론  │    │ AI 대체텍스트│    │ 음성 254언어 │    │ WIA Live         │
│           │    │ 80항목 감사  │    │ KS X 6201    │    │ (농인↔시각장애인 │
│           │    │ EU EAA       │    │ EU EAA       │    │ 직접 소통)       │
└───────────┘    └──────────────┘    └──────────────┘    └──────────────────┘
      │
  해시 보존
  (복원 ≠ 조작 — 위변조 불가 증명)
```

---

## 라이브 데모

| 데모 | URL | 설명 |
|------|-----|------|
| 복원 | [/demo/restore/](https://wiageulsalim.com/demo/restore/) | Diffusion + LLM 고문서 복원 |
| 구조화 | [/demo/transform/](https://wiageulsalim.com/demo/transform/) | WCAG 2.2 자동 구조화 + AI 대체텍스트 |
| 멀티모달 | [/demo/multimodal/](https://wiageulsalim.com/demo/multimodal/) | 점자 · 음성 · 3D 수어 · WebXR VR |

---

## 적용 표준

| 표준 | 내용 |
|------|------|
| **WCAG 2.2** | 웹 콘텐츠 접근성 지침 |
| **EPUB Accessibility 1.1** | 전자책 접근성 명세 |
| **KS X 6201** | 한국 접근성 표준 |
| **EU EAA** | 유럽 접근성법 |

---

## 기술 스택

```
프론트엔드  : HTML5 · CSS3 · JavaScript (Vanilla + Three.js WebXR)
백엔드      : PHP 8.2 · Python 3.11 · Node.js 22
AI/ML       : Claude API (Anthropic) · Diffusion Model · MediaPipe · Whisper STT · Piper TTS
DB          : MySQL 8.0
인프라      : AWS EC2 (3대 · 144GB) · Apache 2.4
접근성 표준 : WCAG 2.2 · EPUB A11y 1.1 · KS X 6201 · EU EAA
```

---

## 특허 출원

- `10-2025-0186631`
- `10-2025-0187878`
- `10-2025-0187887`

---

## 다국어 자막 (83개 언어)

[/srt/](srt/) 디렉토리에 데모 영상 자막 **83개 언어** 파일이 있습니다.  
GPT-4o-mini API로 번역 생성, YouTube 지원 전 언어 커버.

---

## 만든이

**연삼흠 (Yeon Sam-heum)**  
창립자 · WIA (세계인증산업협회 OÜ, 에스토니아 · 2018년 창립)  
대표 · (주)스마일스토리 (대한민국 · 2009년 창립)  
17년 · 200개 이상 웹사이트 · AI 협업 60만 페이지 제작

> *"홍익인간 (弘益人間) — 인류 모두에게, 지속 가능하게."*

---

## 연관 프로젝트

| 프로젝트 | 설명 |
|---------|------|
| [wia-standards-public](https://github.com/WIA-Official/wia-standards-public) | WIA 공개 표준 765개 (커밋 2,500+) |
| [wiasoom.com](https://wiasoom.com) | 멀티모달 AI 터미널 |
| [wiabook.com](https://wiabook.com) | AI 기반 접근성 출판 플랫폼 |
| [a11y.wiabook.com](https://a11y.wiabook.com) | EPUB 접근성 자동 감사 (80항목) |
| [wia.live](https://wia.live) | 농인 ↔ 시각장애인 직접 소통 (통역 불필요) |

---

## English Summary

**Geulsalim** (글살림) means *"bringing writing back to life."*

A 4-stage unified AI pipeline that simultaneously solves:
1. **Restore** — Diffusion model + LLM inference for damaged historical documents
2. **Structure** — WCAG 2.2 HTML, EPUB 3 Accessibility, AI alt-text, 80-item audit
3. **Convert** — Braille (7,000 languages), Voice (254 languages), KS X 6201, EU EAA
4. **Deliver** — WIA Talk 3D Sign Language, WebXR VR, WIA Live (Deaf ↔ Blind direct chat)

**Live**: [wiageulsalim.com](https://wiageulsalim.com) | **Patent**: 10-2025-0186631 · 187878 · 187887  
**Stack**: Claude API · Diffusion · MediaPipe · Whisper · Piper TTS · PHP 8.2 · AWS EC2 (144GB)

---

## 라이선스 / License

MIT License · © 2026 WIA · (주)스마일스토리 (SmileStory Inc.)
