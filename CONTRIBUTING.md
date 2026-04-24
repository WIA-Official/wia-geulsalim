# Contributing to WIA 글살림 · 기여 가이드

> 弘益人間 (홍익인간) — 모든 감각, 모든 언어, 모든 사람에게.
> WIA 글살림은 **누구나 참여 가능한 공공 오픈소스**입니다.

## 시작하기 전에 · Before You Start

- ✅ **Code of Conduct** 를 읽어주세요 ([CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md))
- ✅ 기존 이슈를 먼저 검색하여 중복 PR을 피해주세요
- ✅ 큰 변경(breaking change)은 이슈로 먼저 논의해주세요

---

## 기여 방법 · How to Contribute

### 1. 이슈 제보 · Reporting Issues

- 🐛 **버그 제보**: 재현 방법, 기대 결과, 실제 결과, 환경 (OS·브라우저·버전) 포함
- 💡 **기능 제안**: "왜" 필요한지(문제), "어떻게"(제안)를 명확히
- 🌐 **번역/자막 기여**: `/srt/` 디렉토리의 83개 언어 자막 개선 언제든 환영

### 2. 코드 기여 · Pull Request

```bash
# 1. Fork 후 클론
git clone https://github.com/YOUR_USERNAME/wia-geulsalim.git
cd wia-geulsalim

# 2. 브랜치 생성 (카테고리/설명 형식)
git checkout -b fix/accessibility-contrast
git checkout -b feat/braille-arabic-support
git checkout -b docs/korean-typo-fix

# 3. 변경 후 커밋 (Conventional Commits 권장)
git commit -m "feat: 아랍어 점자 변환 규칙 추가"

# 4. Push + Pull Request
git push origin feat/braille-arabic-support
```

### 3. 커밋 메시지 규칙 · Commit Convention

| Prefix | When to use |
|--------|-------------|
| `feat:` | 새 기능 추가 |
| `fix:` | 버그 수정 |
| `docs:` | 문서만 변경 |
| `style:` | 코드 포맷 (기능 영향 없음) |
| `refactor:` | 리팩토링 |
| `test:` | 테스트 추가/수정 |
| `chore:` | 빌드·툴·패키지 업데이트 |
| `a11y:` | 접근성 개선 (본 프로젝트 특화) |
| `i18n:` | 번역·다국어 관련 |
| `seo:` | SEO 개선 |

---

## 접근성 원칙 · Accessibility First

본 프로젝트는 접근성이 핵심 가치입니다. **모든 PR은 반드시:**

1. WCAG 2.2 AA 기준 유지 (자동 감사 통과)
2. `<main>` · `<nav>` · `<footer>` 랜드마크 보존
3. 색상 대비 4.5:1 이상
4. 키보드만으로 모든 기능 접근 가능
5. 이미지 `alt` 필수
6. 폼 `<label>` 필수

**자동 검증:**

```bash
# 로컬 감사 (설치 후)
npx @axe-core/cli https://localhost:port
npx lighthouse https://localhost:port --view
```

또는 프로덕션 URL로:

```bash
curl -X POST https://a11y.wiabook.com/api/analyze/url \
  -H "Content-Type: application/json" \
  -d '{"url":"https://your-preview-url"}'
```

---

## 번역 기여 · Translation Contributions

83개 언어 중 모국어 화자가 개선하고 싶으신 자막이 있다면:

1. `/srt/[언어코드].srt` 편집
2. PR 제목: `i18n(ko→xx): 자막 개선 - 이유`
3. 원본 한국어(`ko.srt`)의 의미가 정확히 전달되는지 확인

자막 수정은 **원문 한국어 타임코드를 유지**해야 합니다.

---

## 라이선스 동의 · License Acceptance

기여하는 모든 내용은 **MIT 라이선스**에 따라 공개됩니다.
Pull Request 제출 시 이에 동의하신 것으로 간주합니다.

- 모든 기여자는 릴리즈 노트의 **Contributors** 섹션에 기재됩니다
- 중대 기여자는 README의 **Core Contributors** 섹션에도 표기됩니다

---

## 문의 · Contact

- 📧 Email: `global@thekoreantoday.com`
- 🐙 GitHub: [@WIA-Official](https://github.com/WIA-Official)
- 🌐 Main: [wiageulsalim.com](https://wiageulsalim.com)

> _감사합니다. 당신의 기여가 인류 5,000년의 글을 살립니다._
