# 03. Claude Code 개발 프롬프트

사용법
1. 새 리포지토리(예: `saltlux/ontology-studio-cloud`)를 만들고 Claude Code를 연다.
2. 이 폴더의 `01`, `02` 문서를 새 리포의 `docs/planning/`에 복사한다. 프롬프트는 그 경로를 참조한다.
3. **프롬프트 0**을 먼저 실행해 CLAUDE.md와 골격을 만든다.
4. 이후 프롬프트를 **한 세션에 하나씩**, 표시된 순서대로 실행한다. 각 프롬프트는 계획 모드로 시작해 계획을 보여주고 승인 후 구현하도록 지시한다.
5. 각 모듈 종료 시 커밋·PR. 다음 모듈은 새 세션에서 시작한다(컨텍스트 오염 방지).

공통 접두 문구 (모든 모듈 프롬프트 맨 앞에 붙인다)
```
CLAUDE.md와 docs/planning/01-modules-and-requirements.md의 해당 모듈 절, docs/planning/02-roi-model.md를 먼저 읽어라.
먼저 계획 모드로 들어가서 구현 계획(파일 목록, 데이터 모델, API, 테스트)을 제시하고 내 승인을 받은 뒤 구현하라.
질문은 최대 3개까지, 나머지는 합리적 가정을 세우고 ASSUMPTIONS.md에 기록하라.
완료 기준: 수용 기준 통과, 테스트 통과, lint 통과, i18n 키 누락 0, 커밋 메시지에 모듈 ID 포함.
```

---

## 프롬프트 0. 리포지토리 부트스트랩과 CLAUDE.md

```
너는 "Ontology Studio Cloud"(가칭, 코드명 osc)라는 엔터프라이즈 온톨로지 셀프서비스 SaaS의 초기 골격을 만든다.
docs/planning/README.md, 01-modules-and-requirements.md, 02-roi-model.md를 모두 읽고 시작하라.

## 만들 것
1. 모노레포 골격 (pnpm workspaces + uv)
   - apps/web: Next.js 15 App Router, TypeScript strict, Tailwind, shadcn/ui, next-intl(ko 기본, en), TanStack Query, Zustand, Cytoscape.js
   - apps/api: FastAPI, SQLAlchemy 2 async, Alembic, Pydantic v2, pyoxigraph, anthropic SDK, arq(Redis 워커), structlog
   - packages/contracts: OpenAPI → TypeScript 타입 생성 스크립트
   - packages/samples: 샘플 온톨로지·데이터 자리(비워둠, M02에서 채움)
   - infra: docker-compose(postgres, redis, api, web, fuseki[테스트용]), .env.example
2. CLAUDE.md — 아래 내용을 포함
   - 제품 한 줄 정의와 전략 축 5개(자동화, 셀프서비스, 시각화, 문서화, 영문화)
   - 아키텍처 불변 규칙: (a) 모든 트리플스토어 접근은 TripleStoreAdapter 경유 (b) 모든 LLM 호출은 LLMGateway 경유, 호출마다 미터링 이벤트 (c) 모든 API는 workspace 스코프, 테넌트 격리 테스트 필수 (d) 사용자 노출 문자열은 전부 i18n 키 (e) 산식·점수 계산은 백엔드 순수 함수 + 단위 테스트, 프론트는 표시만
   - 디자인 원칙 7개 (01 문서의 "쉽지만 가볍지 않게" 절을 그대로 옮김) + 디자인 토큰(딥 네이비 기본, 강조색 1개, 품질 의미색 3단계, Pretendard/Inter/JetBrains Mono)
   - LLM 규칙: anthropic 공식 SDK 사용, 기본 모델 claude-opus-5, 라우트별로 claude-sonnet-5 전환 가능, 적응형 사고(thinking type adaptive), 구조화 출력(output_config.format) 사용, 스키마 컨텍스트는 프롬프트 캐싱, 프리필 금지, 모델 ID에 날짜 접미사 붙이지 말 것
   - 명령어: dev 실행, 테스트, lint, 마이그레이션, OpenAPI 타입 생성
   - 커밋 규칙: `feat(M05): ...` 형식, 모듈 ID 필수
   - 완료 정의(DoD) 체크리스트
3. 공통 기반 코드
   - apps/api/osc/core: settings, db session, tenant context(요청마다 workspace_id 추출·검증), 구조화 로그, 요청 ID 미들웨어, 에러 스키마
   - apps/api/osc/adapters/triplestore: TripleStoreAdapter Protocol(query/update/load/export/stats/health) + OxigraphAdapter + SparqlHttpAdapter + KnowledgeStudioAdapter 스텁(확인 질문 목록 docstring) + 계약 테스트 한 벌(Oxigraph 통과, Fuseki는 docker 마커)
   - apps/api/osc/llm: LLMGateway Protocol(complete_structured, complete_text, embed) + AnthropicGateway 구현 + FakeGateway(테스트용) + 호출당 usage 이벤트 훅
   - apps/api/osc/metering: 이벤트 모델과 비동기 기록 함수(M08에서 확장)
   - apps/web: 앱 셸(3단 레이아웃, 좌측 내비, 상단 가치 스트립 자리, 우측 패널 슬롯), ⌘K 팔레트 골격, 다크 모드, i18n 라우팅, 디자인 토큰 CSS 변수
4. 테스트·CI: pytest, Vitest, Playwright 스모크 1개(홈 렌더), GitHub Actions(lint+test), i18n 누락 키 검사 스크립트
5. docs/adr/0001-architecture.md: 위 결정을 ADR로 기록

## 하지 말 것
- 인증, 샘플 데이터, 시각화, NL2SPARQL은 이 단계에서 구현하지 않는다(다음 프롬프트).
- 보라색 그라데이션, 기본 shadcn 색상 그대로 쓰기, 영어만 있는 문자열.

계획 모드로 시작하고, 계획 승인 후 구현하라. 끝나면 `pnpm dev`로 web과 api가 뜨고 스모크 테스트가 통과함을 보여라.
```

---

## 프롬프트 1. M03 트리플스토어 어댑터 완성 (부트스트랩에서 골격을 만들었다면 보강)

```
[공통 접두 문구]
모듈: M03 트리플스토어 어댑터. 01 문서 M03 절의 요구사항과 수용 기준을 모두 만족시켜라.

추가 지시
- OxigraphAdapter: 워크스페이스별 named graph(IRI 규칙: urn:osc:ws:{workspace_id}:{ontology_id}), 디스크 영속 경로 설정, 쿼리 타임아웃 15초, 결과 행 5,000 제한, 읽기 전용 모드.
- SparqlHttpAdapter: SPARQL 1.1 Protocol(GET/POST query, POST update), Basic/Bearer 인증, 재시도 3회 지수 백오프, Fuseki docker로 계약 테스트.
- KnowledgeStudioAdapter: SparqlHttpAdapter를 상속한 스텁. docstring에 확인 질문 목록(엔드포인트 형식, Update 지원, 인증, named graph 정책, 벌크 로드, 버전 API, 속도 제한)과 각 질문의 답에 따른 분기 계획.
- stats()는 클래스 수, 속성 수, 인스턴스 수, 트리플 수를 반환하고 M08 일일 스냅샷이 재사용한다.
- docs/adapters/knowledge-studio-checklist.md 생성: 솔트룩스 Knowledge Studio 팀에 보낼 질문지.
```

## 프롬프트 2. M01 테넌트·계정·온보딩

```
[공통 접두 문구]
모듈: M01. 01 문서 M01 절을 구현하라.

추가 지시
- 인증: 이메일 매직 링크(자체 구현, 서명 토큰 15분 만료, 1회 사용). 세션은 httpOnly 쿠키 + 서버 세션 테이블. 소셜 로그인 없음.
- 무료 이메일 도메인 차단 목록은 packages/config/free-email-domains.txt(공개 목록 + gmail, naver, daum, hanmail, kakao, nate, outlook, hotmail, yahoo, icloud, proton) + DB의 관리자 추가 목록. 차단 시 이벤트 signup_blocked_free_domain 기록.
- 모델: Organization(도메인 기준), Workspace, Membership(role: owner/editor/viewer), Invitation, Session, OnboardingState.
- 같은 도메인 가입자에게 기존 조직 참여 요청 UI. Owner 승인 전까지는 개인 워크스페이스.
- 온보딩 3단계 화면과 단계별 이벤트(onboarding_step_completed). 3단계 "첫 질의 실행"은 M05 전까지 골든 SPARQL 실행으로 대체.
- 트라이얼 14일 계산, 상단 배너, 만료 시 읽기 전용 미들웨어.
- 테스트: 테넌트 격리(교차 접근 404), 무료 도메인 차단, 매직 링크 재사용 거부, Playwright로 가입 90초·클릭 5회 이하 측정.
```

## 프롬프트 3. M02 샘플 도메인 워크스페이스 (온톨로지 전문가와 협업)

```
[공통 접두 문구]
모듈: M02 제조 BOM 샘플 도메인. 01 문서 M02 절을 구현하라.

추가 지시
- packages/samples/manufacturing/ontology.ttl: 클래스 25~40, 객체 속성 ~20, 데이터 속성 ~30. 모든 클래스·속성에 rdfs:label@ko, @en, rdfs:comment@ko, @en. 네임스페이스 https://osc.saltlux.ai/samples/mfg#(가칭).
- packages/samples/manufacturing/generate_data.py: 결정적 시드(seed=42)로 설비 50, 부품 2,000, BOM 관계, 공급업체 30, 고장 이력 1,000(최근 24개월 분포), 정비 작업 800, 문서 200을 Turtle로 생성. 이름은 실제처럼(예: "CNC 머시닝센터 #7", "Spindle bearing 6205").
- 의도적 결함 파일 defects.yaml: 최소 6개(레이블 누락 2, 고아 클래스 1, 도메인/레인지 누락 2, 중복 개념 1, 영문 레이블 누락 3). 각 결함에 기대 검출 규칙 ID 기록(M06 테스트용).
- questions.yaml: 샘플 질문 12개(ko/en 병기) + 골든 SPARQL + 기대 결과 행 수. 최소 4개는 3-hop 이상.
- 시드 커맨드 `osc samples load manufacturing --workspace <id>`와 API 엔드포인트. 20초 이내.
- 온톨로지 전문가가 검토할 체크리스트를 docs/samples/manufacturing-review.md로 작성(도메인 타당성, 레이블 자연스러움, 결함이 현실적인지).
- 테스트: 골든 SPARQL 12개 전부 기대 행 수 일치, 로드 시간 측정.
```

## 프롬프트 4. M04 온톨로지 탐색·시각화

```
[공통 접두 문구]
모듈: M04. 01 문서 M04 절을 구현하라.

추가 지시
- API: GET /ws/{id}/ontologies/{oid}/schema-graph(클래스·속성 노드/엣지, 인스턴스 수 포함), GET .../neighbors?iri=&hops=, GET .../path?from=&to=, GET .../search?q=, GET .../entity?iri=(레이블 ko/en, 정의, 속성, 인스턴스 샘플 10, 품질 이슈 자리, 질의 사용 횟수 자리).
- 프론트: 좌측 클래스 트리(가상 스크롤), 중앙 Cytoscape 캔버스(fcose 레이아웃, 스키마/이웃/경로 모드, 클러스터링 500노드 초과 시), 우측 상세 패널. 세 영역 선택 상태를 하나의 스토어로 동기화.
- 전문가 서랍: 선택 요소 Turtle 스니펫(읽기 전용, 복사). 서랍은 모든 화면에서 같은 컴포넌트를 쓴다.
- ⌘K 팔레트에 개념 검색 통합. 키보드만으로 검색→선택→이웃 확장 가능.
- 내보내기 PNG/SVG/Turtle.
- 성능 테스트: 샘플 도메인 첫 렌더 3초 이내, 클래스 500·엣지 2,000 합성 그래프에서 인터랙션 프레임 측정 스크립트.
- 디자인: 캔버스가 화면의 주인공. 노드 스타일은 클래스/속성/인스턴스를 형태로 구분(색만으로 구분 금지), 다크 모드에서도 대비 확보.
```

## 프롬프트 5. M05 NL2SPARQL 질의 콘솔

```
[공통 접두 문구]
모듈: M05. 01 문서 M05 절을 구현하라. 데모 수준이지만 파이프라인 구조는 제품 수준으로.

추가 지시
- 파이프라인(apps/api/osc/nl2sparql/): 
  1) SchemaContextBuilder: 온톨로지에서 클래스·속성 요약(IRI, 레이블 ko/en, 정의, 도메인/레인지, 인스턴스 수)을 만들고, 질문과의 관련도(임베딩 또는 BM25)로 상위 N개만 선택. 전체 요약은 프롬프트 캐싱 블록으로 고정.
  2) Generator: LLMGateway.complete_structured로 {sparql, explanation_ko, explanation_en, confidence(0~1), used_terms[]} 생성. 시스템 프롬프트에 SPARQL 작성 규칙(PREFIX 필수, LIMIT 기본 100, 존재하는 IRI만 사용, 집계 시 GROUP BY 명시).
  3) Validator: rdflib로 파싱, used_terms와 실제 IRI가 온톨로지에 존재하는지 검사, 금지 연산(DROP/CLEAR/DELETE) 차단.
  4) Executor: TripleStoreAdapter.query, 타임아웃·행 제한.
  5) Repair loop: 파싱/실행 오류를 피드백해 최대 2회 재생성.
  6) Fallback: 실패 시 questions.yaml에서 유사 질문 3개 제안.
- 모든 단계의 지연·토큰·비용을 nl_query 미터링 이벤트로 기록.
- API: POST /ws/{id}/queries (SSE로 단계별 진행 스트리밍), GET 이력, POST 즐겨찾기, POST 피드백(👍👎).
- UI: 질문 입력, 진행 단계 표시, SPARQL 미리보기(편집·재실행, 전문가 서랍), 결과 표, 결과 인스턴스를 M04 캔버스에 하이라이트, 신뢰도 배지, 피드백.
- 평가 스크립트 scripts/eval_nl2sparql.py: questions.yaml 12문항을 실행해 결과 집합 일치율·평균 지연·평균 비용을 출력. 목표 9/12 이상.
- LLM: 기본 claude-opus-5, 설정으로 claude-sonnet-5 전환 가능. 두 모델로 평가 스크립트를 돌려 결과를 docs/eval/nl2sparql-baseline.md에 기록.
```

## 프롬프트 6. M06 온톨로지 품질 리포트

```
[공통 접두 문구]
모듈: M06. 01 문서 M06 절을 구현하라.

추가 지시
- 규칙 엔진(apps/api/osc/quality/): 각 규칙은 Rule 클래스(id, category, severity, sparql 또는 python 검사, 메시지 ko/en, 수정 가이드). 01 문서의 지표 전부 구현. 규칙은 개별 테스트.
- 점수: 구조 40 / 문서화 30 / 영문화 15 / 명명 15, 가중치는 워크스페이스 설정. 등급 A~E. 실행 이력 저장, 이전 대비 변화.
- LLM 요약(옵션): 상위 이슈 5개 설명 + Turtle 패치 초안을 구조화 출력으로. 적용 버튼은 비활성(M12에서 활성화)하고 "복사"만 제공. llm_generation 이벤트.
- 이슈 클릭 → M04 캔버스 해당 요소로 이동(딥링크).
- 리포트 내보내기 Markdown/PDF ko/en.
- ROI 연결: 점수 변화를 M07이 읽을 수 있도록 quality_score_history 테이블과 API.
- 테스트: samples/manufacturing/defects.yaml의 결함이 전부 검출되고 오탐이 0인지. 클래스 1,000개 합성 온톨로지 10초 이내.
```

## 프롬프트 7. M07 ROI 계산기·가치 대시보드 (마케팅 필수)

```
[공통 접두 문구]
모듈: M07. 01 문서 M07 절과 02 문서 전체를 구현하라. 02의 산식과 기본값 예시 표는 단위 테스트의 기준값이다.

추가 지시
- apps/api/osc/roi/model.py: 입력 dataclass, 5분류 산식 순수 함수, 비용 산식, 산출 지표(순효익, ROI, 회수 개월, 3년 NPV), 시나리오(보수/기본/낙관). 02의 예시 표 숫자가 테스트에서 정확히 재현되어야 한다.
- 가정값 레지스트리: 키, 기본값, 범위, 출처, 툴팁 ko/en을 YAML로 두고 프론트 위저드와 백엔드가 공유.
- 실측 연동: metering에서 nl_queries, quality_score_history, doc_generation 수를 읽어 해당 항목을 "실측" 배지로 대체. 실측이 없으면 가정 유지.
- 프론트: 8문항 위저드(기본값으로 즉시 건너뛰기 가능), 결과 화면(KPI 4개, 5분류 카드 고정 순서, 시나리오 토글, 비용 카드에 플랜 셀렉터, 민감도 토네이도 차트 상위 5개 변수), 가정 편집 드로어.
- 상단 가치 스트립: 이번 달 실측 효익, 질의 수, 절감 시간을 앱 전체 헤더에 표시.
- 공유: 읽기 전용 링크(토큰), 경영진 한 장 PDF ko/en(문제 2줄, 5분류 막대, 폭포 차트, 가정 표, 다음 단계).
- 차트는 접근성 대비와 다크 모드를 만족하는 팔레트, 색만으로 의미 구분 금지.
- 테스트: 산식 단위 테스트(예시 표 일치), 시나리오 전환, PDF 한글 깨짐 없음(폰트 임베드).
```

## 프롬프트 8. M08 미터링·플랜·한도

```
[공통 접두 문구]
모듈: M08. 01 문서 M08 절과 02 문서 가격표를 구현하라.

추가 지시
- 이벤트 테이블·인덱스(workspace_id, event_type, created_at). 기록은 arq 워커 비동기, 실패해도 요청은 성공.
- plans.yaml: Trial/Team/Enterprise 한도·단가(02 가격표와 동일). 플랜 변경은 Owner만.
- 일일 triple_snapshot 잡: 어댑터 stats()로 트리플·클래스·인스턴스 수 기록.
- 한도 체크 미들웨어: Trial 하드 블록(HTTP 402 + 업그레이드 CTA 페이로드), Team 소프트 블록(경고 헤더).
- 사용량 화면: 이번 달 사용량, 예상 청구액(기본료 + 초과), 플랜 대비 비율, 일별 추이. 이 값이 M07의 비용 실측치.
- LLM 원가 vs 단가 마진을 이벤트 단위로 계산해 저장(M17에서 조회).
- 테스트: 한도 초과 시 동작, 스냅샷 잡, 비동기 실패 격리.
```

## 프롬프트 9. M09 i18n 완성

```
[공통 접두 문구]
모듈: M09. 01 문서 M09 절을 구현하라.

추가 지시
- UI 문자열 전수 점검: 하드코딩 문자열 검출 스크립트를 CI에 추가하고 0건으로 만들어라.
- 온톨로지 레이블 언어 우선순위 설정(사용자 > 워크스페이스 > 기본 ko), 누락 언어 시 폴백 표시와 "번역 제안" 버튼.
- 영문 레이블 일괄 제안: 누락 항목을 모아 LLMGateway 구조화 출력으로 번역 제안(워크스페이스 용어집 컨텍스트 주입), 검토 표에서 승인/수정/거부, 승인분만 rdfs:label@en으로 반영(어댑터 update). llm_generation 이벤트.
- 리포트·PDF·이메일 템플릿 ko/en.
```

## 프롬프트 10. M10 문서 자동 생성 (여유 시)

```
[공통 접두 문구]
모듈: M10. 01 문서 M10 절을 구현하라.

추가 지시
- 생성기(apps/api/osc/docs/): 온톨로지 → 개요, 클래스별 페이지(정의, 계층, 속성, 예시 인스턴스 5, SVG 다이어그램), 속성 색인, 용어집. ko/en 각각 생성. 템플릿은 Jinja2.
- LLM 옵션: 정의 누락 개념 정의 초안, 관계 설명 문단. llm_generation 이벤트.
- 출력: 정적 HTML ZIP, 단일 PDF, Markdown. 버전 태그·생성 시각 표기.
- UI: "문서 생성" 버튼 → 워커 잡 → 진행률 → 다운로드. 생성 이력.
```

## 프롬프트 11. 베타 마감: 온보딩 마무리, E2E, 배포

```
[공통 접두 문구]
목표: 공개 베타 출시 준비.
- Playwright E2E: 가입(회사 이메일) → 온보딩 3단계 → 샘플 워크스페이스 → 그래프 탐색 → NL 질의 1건 → 품질 리포트 → ROI 결과 화면 → PDF 다운로드. 이 흐름이 통과해야 배포.
- 랜딩(apps/web/(marketing)): 헤드라인은 "온톨로지, 이제 직접 만들고 바로 ROI를 확인하세요"류의 가치 중심 카피(ko/en). 히어로에 실제 앱 화면 캡처(자동 스크린샷 스크립트). CTA는 회사 이메일 입력 1개.
- 배포: Dockerfile 멀티스테이지, docker-compose.prod, 환경변수 문서, 헬스체크, 백업 스크립트(Postgres + Oxigraph 디렉터리).
- 관측: 구조화 로그, 에러 트래킹 훅, 퍼널 이벤트 대시보드용 SQL 뷰(가입→샘플→첫 질의→ROI→업그레이드 클릭).
- 보안 점검: 테넌트 격리 테스트 재실행, 의존성 취약점 스캔, 레이트 리밋(가입·질의), CSP 헤더.
- docs/runbook.md와 docs/beta-known-limits.md(Knowledge Studio 연동 미지원, 결제 미지원 등) 작성.
```

---

## P1 프롬프트 요약 (베타 이후, 각각 별 세션)

- **M12 변경관리·승인**: "모든 편집을 Proposal로 모델링하고 Turtle diff·시각 diff·승인·배포·롤백·변경 로그(M10 연동)를 구현하라. 전문가 서랍의 읽기 전용 Turtle을 편집 가능으로 바꾸되 저장은 항상 Proposal 생성이다. M06 LLM 패치 초안의 '적용' 버튼을 활성화해 Proposal로 연결하라."
- **M11 온톨로지 초안 생성**: "PDF/DOCX/XLSX/DDL 업로드 → 용어 추출 → 클래스·속성 후보(근거 문장 링크) → 검토 UI → Turtle → M06 자동 실행. 후보 생성은 구조화 출력, 문서는 청크 단위로 처리하고 프롬프트 캐싱. 결과는 M12 Proposal로 들어간다."
- **M13 데이터 커넥터·매핑**: "CSV/Excel/PostgreSQL/MySQL 연결, 컬럼-속성 매핑 제안(LLM), RML 생성·실행, 스케줄 적재, 적재량은 triple_snapshot에 반영."
- **M14 결제**: "PaymentProvider 인터페이스 + Stripe 구현(토스페이먼츠는 스텁). 월 청구 = 기본료 + M08 종량. 인보이스 PDF."
- **M15 API·SDK·웹훅**: "워크스페이스 API 키, REST(NL 질의·SPARQL·엔티티), TS/Python SDK 생성, 온톨로지 변경 웹훅, api_call 이벤트."
- **M16 금융 샘플 도메인**: M02 프롬프트를 금융(상품·규제 조항·리스크·세그먼트)으로 반복.
- **M17 관리자 콘솔**: "내부 전용 라우트. 테넌트·퍼널·사용량 상위·LLM 마진 대시보드."

---

## 리뷰 체크리스트 (개발 착수 전)

- [ ] 제품명·네임스페이스·도메인 확정 (가칭 치환)
- [ ] 02 가격표와 기본 가정값 영업·재무 검토 완료
- [ ] 샘플 도메인(제조 BOM) 범위와 결함 목록 온톨로지 전문가 승인
- [ ] Knowledge Studio 질문지(프롬프트 1 산출물) 담당자 전달 일정
- [ ] LLM 예산 상한과 비용 알림 기준 설정
- [ ] 개인정보·데이터 처리 방침(트라이얼 데이터 보관 기간) 초안
- [ ] 3주차 컷라인 결정권자 지정
