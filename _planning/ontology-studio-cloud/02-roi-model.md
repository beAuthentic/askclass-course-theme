# 02. ROI 모델 — 고객용 계산기 산식과 가정

기준선: **온톨로지 없이 운영 중인 엔터프라이즈** (데이터 사일로, 키워드 검색, 수작업 데이터 통합·보고서 작성).
통화: KRW. 모든 기본값은 계산기에서 슬라이더로 조정 가능하며 "가정" 배지를 단다. 사용 데이터가 쌓이면 "실측" 값으로 대체한다.

> 기본값 출처 컬럼의 "추정"은 이 문서 작성 시 보수적으로 잡은 값입니다. 솔트룩스 실제 구축 사례 수치로 교체하는 것이 리뷰의 첫 과제입니다.

---

## 1. 입력 변수 (위저드 8문항)

| 키 | 설명 | 기본값 | 범위 | 출처 |
|---|---|---|---|---|
| `knowledge_workers` | 데이터를 찾고 합쳐 쓰는 지식근로자 수 | 200 | 20~5,000 | 고객 입력 |
| `fully_loaded_cost` | 1인당 연간 완전 인건비 | 80,000,000 | 40M~200M | 고객 입력 |
| `hours_per_week_data` | 1인당 주당 데이터 탐색·통합·정합성 확인 시간 | 6 | 2~15 | 추정(업계 조사 15~30% 대비 보수적) |
| `monthly_deliverables` | 월간 분석·보고 산출물 수 | 30 | 5~500 | 고객 입력 |
| `deliverable_lead_days` | 산출물 평균 리드타임(일) | 10 | 2~60 | 고객 입력 |
| `incidents_per_year` / `incident_cost` | 데이터 오류·불일치로 인한 사고 건수 / 건당 비용 | 4 / 50,000,000 | | 추정 |
| `integration_projects_per_year` / `integration_mapping_cost` | 연간 시스템 통합 프로젝트 수 / 건당 데이터 매핑 비용 | 2 / 100,000,000 | | 추정 |
| `customers` / `arpu` / `churn_rate` | 고객 수 / 고객당 연매출 / 연 이탈률 | 10,000 / 2,000,000 / 5% | | 고객 입력 |

파생 상수
- `hourly_cost = fully_loaded_cost / 2000`
- `realization_rate` (효익 실현율): 보수 0.5, 기본 0.75, 낙관 1.0. 시간 절감형 효익(직접비, 사이클 타임)에만 적용.

---

## 2. 효익 5분류 산식

### 2.1 직접비 절감 (Direct cost savings)
"같은 일을 더 적은 시간·외주로 한다."

```
time_saved_hours   = knowledge_workers × hours_per_week_data × search_reduction × 52
direct_labor       = time_saved_hours × hourly_cost × realization_rate
external_savings   = external_data_spend × external_reduction
direct_cost_saving = direct_labor + external_savings
```
| 파라미터 | 기본값 | 근거 |
|---|---|---|
| `search_reduction` | 0.30 | 통합 의미 검색·NL 질의로 탐색 시간 30% 단축(추정) |
| `external_data_spend` | 200,000,000 | 연간 데이터 통합·정제 외주비(고객 입력, 없으면 0) |
| `external_reduction` | 0.25 | 추정 |

실측 대체: `time_saved_hours_measured = nl_queries × minutes_saved_per_query / 60` (기본 `minutes_saved_per_query = 12`, 사용자 피드백 👍 비율로 보정).

### 2.2 사이클 타임 향상 (Cycle time)
"의사결정·보고·출시가 빨라진다."

```
days_saved_per_deliverable = deliverable_lead_days × lead_time_reduction
cycle_time_value = monthly_deliverables × 12 × days_saved_per_deliverable × value_per_day_delay × realization_rate
```
| 파라미터 | 기본값 | 근거 |
|---|---|---|
| `lead_time_reduction` | 0.20 | 데이터 준비 단계 단축(추정) |
| `value_per_day_delay` | 150,000 | 산출물 1건이 하루 늦어질 때의 기회비용(추정, 고객 조정) |

실측 대체: 저장된 질문(대시보드 위젯) 수 × 위젯당 대체된 수작업 보고 시간.

### 2.3 고객만족 (Customer satisfaction)
"고객 응대와 서비스 품질이 좋아져 이탈이 준다."

```
churn_avoided_customers = customers × churn_rate × churn_relative_reduction
customer_value = churn_avoided_customers × arpu
```
| 파라미터 | 기본값 | 근거 |
|---|---|---|
| `churn_relative_reduction` | 0.03 | 응답 시간·정확도 개선의 이탈률 상대 감소(매우 보수적 추정) |

B2B 내부 고객(현업 부서)만 있는 경우 `customers = 0`으로 두고 내부 만족도 지표(질의 👍 비율, 셀프서비스 비율)를 정성 표시.

### 2.4 리스크 절감 (Risk reduction)
"데이터 오류·규제 위반·감사 실패 확률이 준다."

```
incident_savings = incidents_per_year × incident_cost × incident_reduction
audit_savings    = audits_per_year × audit_prep_hours × audit_reduction × hourly_cost
risk_value       = incident_savings + audit_savings
```
| 파라미터 | 기본값 | 근거 |
|---|---|---|
| `incident_reduction` | 0.25 | 단일 정의 체계·정합성 검증(추정) |
| `audits_per_year` / `audit_prep_hours` | 4 / 200 | 규제·내부 감사 준비(고객 입력) |
| `audit_reduction` | 0.30 | 데이터 계보·문서 자동화(추정) |

실측 대체: 품질 점수(M06) 상승분을 `incident_reduction`에 반영. 예: 점수 60→85면 `incident_reduction = 0.25 × (85-60)/40` 상한 0.4.

### 2.5 추가비용 회피 (Cost avoidance)
"앞으로 쓸 돈을 안 쓰게 된다."

```
integration_avoided = integration_projects_per_year × integration_mapping_cost × mapping_reuse_rate
duplicate_avoided   = duplicate_storage_and_tools
headcount_avoided   = avoided_hires × fully_loaded_cost      (기본 OFF)
cost_avoidance      = integration_avoided + duplicate_avoided + headcount_avoided
```
| 파라미터 | 기본값 | 근거 |
|---|---|---|
| `mapping_reuse_rate` | 0.30 | 공통 온톨로지 재사용으로 매핑 재작업 회피(추정) |
| `duplicate_storage_and_tools` | 20,000,000 | 중복 데이터마트·툴 라이선스(고객 입력) |
| `avoided_hires` | 0 | 기본 비활성, 고객이 켜면 1 |

---

## 3. 비용 측

```
subscription = plan_base × 12
usage        = Σ (예상 초과 트리플 × 단가) + Σ (예상 초과 NL 질의 × 단가) + Σ (LLM 생성 × 단가)
adoption     = internal_fte × months × (fully_loaded_cost / 12)
change_mgmt  = training_and_change_cost
ks_integration = Knowledge Studio 연동 비용 (Enterprise 선택 시, 협의값)
year1_cost   = subscription + usage + adoption + change_mgmt + ks_integration
recurring    = subscription + usage
```
기본값: `internal_fte = 1.0`, `months = 3`, `change_mgmt = 10,000,000`, 예상 초과 사용량 `usage = 12,000,000`(월 100만 원 가정).

### 가격표 (가칭, 영업 검토 필요)

| 플랜 | 기본료 | 포함 | 초과 단가 |
|---|---|---|---|
| Trial (14일) | 0 | 샘플 도메인 + 자체 온톨로지 1개, 사용자 3명, 트리플 10만, NL 질의 300건, LLM 생성 20회 | 불가(업그레이드 유도) |
| Team | 월 2,000,000 | 사용자 10명, 온톨로지 5개, 트리플 500만, NL 질의 3,000건/월, LLM 생성 100회/월 | 트리플 100만당 월 200,000 / NL 질의 건당 100 / LLM 생성 회당 5,000 |
| Enterprise | 월 8,000,000~ (연 계약) | 무제한 사용자, SSO, 전용 인스턴스, Knowledge Studio 연동, 온프레미스 옵션 | 협의 |

LLM 원가 가드레일: NL 질의 1건의 LLM 원가는 스키마 컨텍스트 캐싱 적용 시 수십 원 수준으로 설계. 단가 100원은 원가의 3배 이상을 목표로 하며, M08 미터링의 `cost_krw`로 실제 마진을 M17에서 추적한다.

---

## 4. 산출 지표

```
total_benefit  = direct_cost_saving + cycle_time_value + customer_value + risk_value + cost_avoidance
net_benefit_y1 = total_benefit − year1_cost
roi_y1         = net_benefit_y1 / year1_cost
payback_months = year1_cost / (total_benefit / 12)
npv_3y         = Σ_{t=1..3} (total_benefit_t − cost_t) / (1 + discount)^t     (discount 기본 0.10, 효익은 t=1 60%, t=2 100%, t=3 100% 램프)
```

### 기본값 예시 (Team 플랜, 기본 시나리오 realization 0.75)

| 항목 | 금액(원) |
|---|---|
| 직접비 절감 | 561,600,000 + 50,000,000 = 611,600,000 |
| 사이클 타임 | 30×12×2×150,000×0.75 = 81,000,000 |
| 고객만족 | 10,000×0.05×0.03×2,000,000 = 30,000,000 |
| 리스크 절감 | 50,000,000 + 9,600,000 = 59,600,000 |
| 추가비용 회피 | 60,000,000 + 20,000,000 = 80,000,000 |
| **총 효익** | **862,200,000** |
| 1년차 비용 | 구독 24,000,000 + 사용량 12,000,000 + 도입 인력 20,000,000 (1.0 FTE × 3개월 × 6,666,667) + 변경관리 10,000,000 = 66,000,000 |
| 순효익 / ROI / 회수 | 796,200,000 / 1,206% / 0.9개월 |

이 숫자는 M07 단위 테스트의 기준값이다. 직접비 절감 계산: 200 × 6 × 0.30 × 52 = 18,720시간 × 40,000원 × 0.75 = 561,600,000.

> 리뷰 포인트: 숫자가 지나치게 좋게 보이면 신뢰를 잃는다. 계산기 기본 화면은 **보수 시나리오**를 먼저 보여주고, "실측으로 전환" 버튼이 있는 항목만 굵게 표시하는 것을 권장한다. 또한 `hours_per_week_data`와 `search_reduction`이 결과를 지배하므로 이 두 값에 민감도 표시(토네이도 차트)를 붙인다.

---

## 5. 대시보드 표시 규칙

- 5분류 카드 순서 고정: 직접비 → 사이클 타임 → 고객만족 → 리스크 → 회피. 각 카드에 금액, 가정/실측 배지, 지배 변수 1개, "가정 수정" 링크.
- 상단 KPI 4개: 연간 순효익, ROI, 회수 기간, 이번 달 실측 효익.
- 시나리오 토글(보수/기본/낙관)은 전 카드에 동시에 적용.
- 비용 카드는 플랜 셀렉터와 연동. 플랜을 바꾸면 한도 초과 예상분이 종량으로 자동 계산.
- 경영진 한 장 요약(PDF): 문제 정의 2줄, 효익 5분류 막대, 비용 대비 효익 폭포 차트, 가정 표, 다음 단계.
