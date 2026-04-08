# JavaScript 파일 구조화 가이드

> GentleLion 프로젝트를 기준으로 작성된 **초보자용 가이드**입니다.
> "JS 파일을 어떻게 나눠야 할지 모르겠다"는 고민을 해결하기 위해 만들었습니다.

---

## 목차

1. [왜 파일을 나눠야 할까?](#1-왜-파일을-나눠야-할까)
2. [폴더 구조의 기본 원칙](#2-폴더-구조의-기본-원칙)
3. [우리 프로젝트의 현재 구조](#3-우리-프로젝트의-현재-구조)
4. [JS 파일을 나누는 5가지 기준](#4-js-파일을-나누는-5가지-기준)
5. [실전 예제: 우리 코드로 배우기](#5-실전-예제-우리-코드로-배우기)
6. [파일 이름 짓는 규칙](#6-파일-이름-짓는-규칙)
7. [import/export 사용법](#7-importexport-사용법)
8. [흔한 실수와 해결법](#8-흔한-실수와-해결법)
9. [체크리스트: 새 파일을 만들기 전에](#9-체크리스트-새-파일을-만들기-전에)

---

## 1. 왜 파일을 나눠야 할까?

### 하나의 파일에 모든 코드를 넣으면?

```
app.js (1500줄)
├── API 호출 코드
├── DOM 조작 코드
├── 이벤트 리스너
├── 유틸리티 함수
└── 데이터 정의
```

이렇게 되면 다음과 같은 문제가 생깁니다:

| 문제 | 설명 |
|------|------|
| 찾기 어렵다 | "주문 목록 렌더링 코드가 몇 번째 줄이지?" |
| 고치기 무섭다 | "이거 고치면 다른 데가 깨지지 않을까?" |
| 같이 작업이 안 된다 | 팀원 A와 B가 같은 파일을 수정하면 충돌이 난다 |
| 재사용이 안 된다 | 비슷한 코드를 다른 페이지에서 또 작성하게 된다 |

### 파일을 잘 나누면?

```
components/order/
├── index.js          ← "여기서 시작하면 되는구나"
├── renderRows.js     ← "테이블 행 그리는 코드는 여기구나"
├── search.js         ← "검색 기능은 여기구나"
└── paginationButton.js ← "페이지 버튼은 여기구나"
```

**파일 이름만 봐도 어디에 뭐가 있는지 바로 알 수 있습니다.**

---

## 2. 폴더 구조의 기본 원칙

### 원칙 1: "기능(Feature)" 단위로 묶어라

```
# 나쁜 예 - 파일 종류별로 묶기
js/
├── api/
│   ├── orderApi.js
│   ├── userApi.js
│   └── productApi.js
├── components/
│   ├── orderTable.js
│   ├── userTable.js
│   └── productCard.js
└── events/
    ├── orderEvents.js
    ├── userEvents.js
    └── productEvents.js
```

왜 나쁠까요? "주문 기능을 수정하려면" → 3개 폴더를 왔다갔다해야 합니다.

```
# 좋은 예 - 기능별로 묶기
components/
├── order/           ← 주문 관련은 전부 여기!
│   ├── index.js
│   ├── orderApi.js
│   ├── renderRows.js
│   └── search.js
├── user/            ← 사용자 관련은 전부 여기!
│   ├── index.js
│   ├── userApi.js
│   └── renderRows.js
└── product/         ← 상품 관련은 전부 여기!
    ├── index.js
    └── productCard.js
```

**"주문 기능 수정" → `order/` 폴더만 보면 끝!**

> 우리 프로젝트의 `admin/pages/components/order/` 폴더가 이 원칙을 잘 따르고 있습니다.

### 원칙 2: 한 파일은 한 가지 역할만

| 역할 | 파일 예시 | 하는 일 |
|------|-----------|---------|
| API 호출 | `orderApi.js` | 서버에서 데이터 가져오기 |
| 화면 그리기 | `renderRows.js` | DOM에 HTML 요소 만들어 넣기 |
| 이벤트 처리 | `search.js` | 사용자 입력에 반응하기 |
| 데이터 정의 | `collection.js` | 사용할 데이터를 정의하기 |
| 조율(오케스트라) | `index.js` | 위의 파일들을 불러와서 연결하기 |

### 원칙 3: 깊이는 3단계까지만

```
# 좋은 깊이
src/components/order/renderRows.js     (3단계)

# 너무 깊은 깊이 - 피하세요!
src/components/order/table/body/rows/render/index.js  (6단계)
```

폴더가 너무 깊으면 오히려 파일 찾기가 어려워집니다. **3단계면 충분합니다.**

---

## 3. 우리 프로젝트의 현재 구조

```
gentlelion/
├── src/                          ← 고객이 보는 화면 (쇼핑몰)
│   ├── components/               ← UI 조각들
│   │   ├── header/               ← 상단 메뉴바
│   │   ├── footer/               ← 하단 푸터
│   │   ├── item/                 ← 상품 카드
│   │   ├── slide/                ← 이미지 슬라이더
│   │   ├── navigation/           ← 컬렉션 네비게이션
│   │   ├── login/                ← 로그인/회원가입
│   │   ├── profile/              ← 마이페이지
│   │   └── ...
│   ├── data/                     ← 정적 데이터
│   │   ├── collection.js
│   │   └── sunglasses.js
│   ├── pages/                    ← 페이지 HTML
│   └── main.js                   ← 진입점 (여기서 시작!)
│
├── admin/                        ← 관리자 화면
│   ├── pages/
│   │   ├── API/                  ← 서버 통신 코드
│   │   │   ├── order/
│   │   │   └── user/
│   │   └── components/           ← 관리자 UI 조각들
│   │       ├── order/
│   │       ├── orderDetails/
│   │       └── user/
│   └── index.html
│
├── docs/                         ← 문서
└── index.html                    ← 메인 HTML
```

### 잘하고 있는 점

- `admin/pages/components/order/` 폴더가 기능별로 잘 나뉘어 있다
- API 파일이 별도 폴더(`API/`)에 분리되어 있다
- `index.js`가 조율자 역할을 한다
- `export/import`를 사용하여 모듈화하고 있다

### 개선할 수 있는 점

아래에서 하나씩 설명합니다.

---

## 4. JS 파일을 나누는 5가지 기준

### 기준 1: API 호출은 따로 분리한다

**왜?** API 주소가 바뀌거나, 인증 방식이 바뀔 때 한 곳만 수정하면 됩니다.

```javascript
// admin/pages/API/order/orderListApi.js (현재 코드 - 잘 되어 있음!)
export async function orderAPI(page) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `https://api.fullstackfamily.com/api/gentlelion/v1/admin/orders?page=${page}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return await res.json();
}
```

**더 좋게 만드는 팁: API 기본 주소를 상수로 빼기**

```javascript
// 현재: 각 API 파일마다 전체 URL을 반복 작성
`https://api.fullstackfamily.com/api/gentlelion/v1/admin/orders?page=${page}`
`https://api.fullstackfamily.com/api/gentlelion/v1/admin/users?page=${page}`

// 개선: 공통 상수를 만들어서 재사용
// admin/pages/API/config.js
export const API_BASE = "https://api.fullstackfamily.com/api/gentlelion/v1";

// admin/pages/API/order/orderListApi.js
import { API_BASE } from "../config.js";

export async function orderAPI(page) {
  const res = await fetch(`${API_BASE}/admin/orders?page=${page}`, { ... });
  return await res.json();
}
```

**장점:** API 주소가 바뀌면 `config.js` 한 곳만 수정하면 됩니다.

---

### 기준 2: 화면을 그리는 코드(렌더링)는 따로 분리한다

**왜?** 화면 디자인이 바뀔 때 렌더링 파일만 수정하면 됩니다.

```javascript
// admin/pages/components/order/renderRows.js (현재 코드 - 잘 되어 있음!)
export function renderRows(tbody, orders) {
  tbody.innerHTML = "";
  orders.forEach((item) => {
    const tr = document.createElement("tr");
    // ... 행 만들기 ...
    tbody.appendChild(tr);
  });
}
```

우리 프로젝트에서 `renderRows.js`가 바로 이 역할을 합니다.
"테이블 행을 어떻게 그릴까"만 이 파일이 책임집니다.

---

### 기준 3: 이벤트 처리는 따로 분리한다

**왜?** "클릭하면 뭐가 일어나는지"와 "화면에 뭘 그리는지"는 다른 관심사입니다.

```javascript
// admin/pages/components/order/search.js (현재 코드 - 잘 되어 있음!)
export function search(orders, input, onSearch) {
  input.addEventListener("input", () => {
    const keyword = input.value.trim().toLowerCase();
    const filtered = orders.filter((item) => {
      return item.shippingAddress.recipientName.toLowerCase().includes(keyword);
    });
    onSearch(filtered);  // 콜백으로 결과를 전달
  });
}
```

이 파일은 **"검색 입력에 반응하기"**라는 한 가지 일만 합니다.
검색 결과를 어떻게 화면에 그릴지는 `onSearch` 콜백을 통해 외부에서 결정합니다.

---

### 기준 4: 데이터 정의는 따로 분리한다

**왜?** 데이터가 바뀔 때(상품 추가 등) 데이터 파일만 수정하면 됩니다.

```javascript
// src/data/collection.js (현재 코드 - 잘 되어 있음!)
export const collections = [
  {
    id: 1,
    name: "서킷",
    slug: "circuit-collection",
    products: [ /* ... */ ],
  },
  // ...
];
```

---

### 기준 5: 조율자(index.js)가 전체를 연결한다

**왜?** 각 파일이 자기 역할만 하면, 누군가는 이것들을 엮어야 합니다.

```javascript
// admin/pages/components/order/index.js (현재 코드 - 잘 되어 있음!)
import { orderAPI } from "../../API/order/orderListApi.js";     // API 불러오기
import { paginationButton } from "./paginationButton.js";       // 페이지 버튼
import { calcListNum } from "./calcListNum.js";                 // 목록 번호 계산
import { search } from "./search.js";                           // 검색
import { renderRows } from "./renderRows.js";                   // 행 그리기

async function renderOrderList(page = 1) {
  const data = await orderAPI(page);          // 1. 데이터 가져오기
  renderRows(tbody, orders);                  // 2. 화면 그리기
  paginationButton(..., renderOrderList);     // 3. 페이지 버튼 설정
  search(orders, input, (filtered) => {       // 4. 검색 연결
    renderRows(tbody, filtered);
  });
}
```

`index.js`는 **지휘자** 역할입니다:
- 직접 DOM을 만들지 않는다
- 직접 API를 호출하지 않는다
- 각 파일의 함수를 **올바른 순서로 호출**할 뿐이다

---

## 5. 실전 예제: 우리 코드로 배우기

### 예제 1: 중복 코드 발견하기

현재 `main.js`와 `headerEvent.js`에 **똑같은 코드**가 있습니다:

```javascript
// src/main.js (4~14줄)
const header = document.querySelector(".utility-bar");
if (header) {
  const handleScroll = () => {
    if (window.scrollY > 785.33) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll);
}

// src/components/header/headerEvent.js (1~12줄)
const header = document.querySelector(".utility-bar");
const handleScroll = () => {
  if (window.scrollY > 785.33) {      // 같은 숫자가 두 곳에!
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
};
window.addEventListener("scroll", handleScroll);
```

**문제점:**
- 같은 코드가 2곳에 있다
- 스크롤 기준값 `785.33`이 하드코딩되어 2곳에서 반복된다
- 나중에 수정할 때 한 곳만 고치고 다른 곳을 빼먹을 수 있다

**해결 방법:**

```javascript
// src/components/header/headerEvent.js (하나만 남기기)
const SCROLL_THRESHOLD = 785.33;  // 상수로 빼서 의미 부여

export function initScrollEvent() {
  const header = document.querySelector(".utility-bar");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  });
}

// src/main.js (import해서 사용)
import { initScrollEvent } from "./components/header/headerEvent.js";
initScrollEvent();
```

---

### 예제 2: 인라인 스타일 vs Tailwind 통일하기

현재 `item.js`에서 Tailwind와 인라인 스타일이 섞여 있습니다:

```javascript
// src/components/item/item.js
imageWrap.className = "w-full overflow-hidden bg-gray-100";  // Tailwind 사용
name.style.fontSize = "10px";    // 인라인 스타일 사용
name.style.lineHeight = "15px";  // 인라인 스타일 사용
name.style.color = "#111111";    // 인라인 스타일 사용
```

**문제점:** 두 가지 방식이 섞이면 "스타일은 어디서 수정해야 하지?"가 헷갈립니다.

**해결 방법: Tailwind로 통일하기**

```javascript
// 개선된 코드 (Tailwind로 통일)
name.className = "text-[10px] leading-[15px] text-[#111111]";
price.className = "text-[10px] leading-[15px] text-[#111111]";
```

**팁:** 프로젝트에서 스타일링 방식은 하나로 통일하세요.
우리 프로젝트는 Tailwind를 쓰고 있으므로, **Tailwind로 통일**하는 것이 좋습니다.

---

### 예제 3: 재사용 가능한 코드 만들기

현재 `order/index.js`와 `user/index.js`의 구조가 거의 같습니다:

```javascript
// order/index.js                          // user/index.js
async function renderOrderList(page) {     async function user(page) {
  const data = await orderAPI(page);         const data = await userApi(page, 20);
  const tbody = document.querySelector(      const tbody = document.querySelector(
    "tbody");                                  "tbody");
  renderRows(tbody, orders);                 renderRows(tbody, users, user);
  paginationButton(...);                     paginationButton(...);
  search(orders, input, callback);           search(users, input, callback);
}                                          }
```

**현재도 충분히 괜찮습니다!** 하지만 비슷한 목록 페이지가 3개, 4개로 늘어난다면,
공통 부분을 뽑아내는 것을 고려할 수 있습니다:

```javascript
// admin/pages/components/shared/createListPage.js
export function createListPage({ fetchData, renderRows, searchFields }) {
  return async function loadPage(page = 1) {
    const data = await fetchData(page);
    const tbody = document.querySelector("tbody");
    renderRows(tbody, data.items);
    // ... 페이지네이션, 검색 설정
  };
}

// order/index.js (사용하는 쪽)
import { createListPage } from "../shared/createListPage.js";
const renderOrderList = createListPage({
  fetchData: orderAPI,
  renderRows: orderRenderRows,
  searchFields: ["recipientName", "orderNumber"],
});
renderOrderList(1);
```

> **주의:** 지금 당장 이렇게 바꿀 필요는 없습니다!
> 비슷한 코드가 **3번 이상** 반복될 때 추출을 고려하세요.
> 2번까지는 그냥 복사해도 괜찮습니다. 이것을 **"Rule of Three"**라고 합니다.

---

## 6. 파일 이름 짓는 규칙

### 기본 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 일반 JS 파일 | camelCase | `renderRows.js`, `orderListApi.js` |
| HTML 파일 | kebab-case | `order-details.html`, `admin-login.html` |
| 폴더 이름 | kebab-case 또는 camelCase | `order/`, `orderDetails/` |
| 상수 | UPPER_SNAKE_CASE | `API_BASE`, `SCROLL_THRESHOLD` |

### 의미 있는 이름 짓기

```
# 나쁜 이름
utils.js        ← 뭘 하는 유틸인지 모른다
helpers.js      ← 뭘 돕는 건지 모른다
functions.js    ← 당연히 함수인데...

# 좋은 이름
renderRows.js       ← "행을 렌더링하는구나"
paginationButton.js ← "페이지 버튼을 만드는구나"
orderListApi.js     ← "주문 목록 API를 호출하는구나"
search.js           ← "검색 기능이구나"
```

### index.js의 역할

`index.js`는 특별한 파일입니다. 폴더의 **진입점(Entry Point)** 역할을 합니다.

```javascript
// "이 폴더를 쓰려면 index.js부터 보세요"라는 의미
import { orderAPI } from "../../API/order/orderListApi.js";
import { renderRows } from "./renderRows.js";
// ...
```

**규칙:** 한 폴더에 `index.js`는 하나만 있어야 합니다.

---

## 7. import/export 사용법

### 기본 문법

```javascript
// ============ export (내보내기) ============

// 방법 1: 이름 붙여서 내보내기 (Named Export)
export function renderRows(tbody, orders) { /* ... */ }
export const API_BASE = "https://...";

// 방법 2: 기본 내보내기 (Default Export)
export default function renderRows(tbody, orders) { /* ... */ }


// ============ import (가져오기) ============

// Named Export 가져오기 - 중괄호 {} 필요
import { renderRows } from "./renderRows.js";
import { API_BASE } from "../config.js";

// Default Export 가져오기 - 중괄호 없이
import renderRows from "./renderRows.js";

// 여러 개 한번에 가져오기
import { renderRows, search, paginationButton } from "./index.js";
```

### 우리 프로젝트에서의 권장 방식

**Named Export를 사용하세요.** 이유:

```javascript
// Named Export (권장)
export function orderAPI(page) { /* ... */ }  // 함수 이름이 명확
import { orderAPI } from "./orderListApi.js"; // 가져올 때도 같은 이름

// Default Export (비권장)
export default function(page) { /* ... */ }   // 이름 없이 내보낼 수 있음
import anything from "./orderListApi.js";     // 아무 이름으로 가져올 수 있음 (혼란)
```

Named Export는 **자동완성**이 잘 되고, **이름이 일관**됩니다.

### import 경로 읽는 법

```javascript
import { orderAPI } from "../../API/order/orderListApi.js";
//                         ↑↑  ↑↑
//                         상위  상위
//    현재 위치에서 → 2단계 위로 → API/order/ 폴더 안의 → orderListApi.js
```

| 기호 | 의미 | 예시 |
|------|------|------|
| `./` | 같은 폴더 | `./renderRows.js` |
| `../` | 한 단계 위 폴더 | `../config.js` |
| `../../` | 두 단계 위 폴더 | `../../API/order/orderListApi.js` |

---

## 8. 흔한 실수와 해결법

### 실수 1: 하나의 파일에 너무 많은 기능

```javascript
// 나쁜 예: slide.js에 모든 것이 다 있다
let currentIdx = 0;
let positions = [];
let startX = 0;

function initializeData() { /* ... */ }
function goToSlide(index) { /* ... */ }
// + 마우스 이벤트 처리
// + 썸네일 클릭 이벤트
// + 리사이즈 이벤트
// → 전부 하나의 파일에!
```

**기준: 파일이 100줄을 넘으면 나눌 수 있는지 고려하세요.**

```
slide/
├── index.js           ← 초기화 + 이벤트 연결
├── slideState.js      ← 상태 변수 (currentIdx, positions)
├── slideMove.js       ← 슬라이드 이동 로직 (goToSlide)
└── slideDrag.js       ← 드래그 이벤트 처리
```

> **단, 현재 `mainSlide.js`는 94줄이라 무리하게 나눌 필요는 없습니다.**
> 기능이 추가되어 150줄, 200줄이 되면 그때 나누세요.

---

### 실수 2: 매직 넘버 (의미 없는 숫자)

```javascript
// 나쁜 예
if (window.scrollY > 785.33) { /* ... */ }  // 785.33이 뭐지?
if (Math.abs(moveX) > 70) { /* ... */ }     // 70이 뭐지?

// 좋은 예
const SCROLL_THRESHOLD = 785.33;  // 헤더가 변하는 스크롤 위치
const DRAG_THRESHOLD = 70;        // 슬라이드 넘김 판정 거리 (px)

if (window.scrollY > SCROLL_THRESHOLD) { /* ... */ }
if (Math.abs(moveX) > DRAG_THRESHOLD) { /* ... */ }
```

**숫자에 이름을 붙이면:**
- 코드를 읽는 사람이 의미를 바로 이해한다
- 나중에 값을 바꿀 때 한 곳만 수정하면 된다

---

### 실수 3: console.log를 남겨두기

```javascript
// user/index.js 10번째 줄
const data = await userApi(page, 20);
console.log(data);  // ← 개발 중에 확인하려고 넣은 것, 커밋 전에 제거하세요!
```

**팁:** 디버깅용 `console.log`는 커밋하기 전에 꼭 제거하세요.
정말 필요한 로그는 `console.error`(에러)만 남기세요.

---

### 실수 4: 이벤트 리스너 누적

```javascript
// 나쁜 예: 호출할 때마다 이벤트가 추가된다
export function search(orders, input, onSearch) {
  input.addEventListener("input", () => {  // 매번 새로운 리스너 추가!
    // ...
  });
}
```

`search()` 함수를 2번 호출하면 이벤트 리스너가 2개 붙습니다.
페이지를 바꿀 때마다 호출되면 계속 쌓입니다.

```javascript
// 좋은 예: 기존 리스너를 제거하거나, 한 번만 등록
let searchHandler = null;

export function search(orders, input, onSearch) {
  // 기존 리스너 제거
  if (searchHandler) {
    input.removeEventListener("input", searchHandler);
  }

  // 새 리스너 등록
  searchHandler = () => {
    const keyword = input.value.trim().toLowerCase();
    const filtered = orders.filter(/* ... */);
    onSearch(keyword ? filtered : orders);
  };

  input.addEventListener("input", searchHandler);
}
```

---

## 9. 체크리스트: 새 파일을 만들기 전에

새로운 JS 파일을 만들 때 아래 질문에 답해보세요:

### 파일을 나눌까 말까?

- [ ] 이 코드는 **다른 파일의 코드와 역할이 다른가?** → 다르면 나누기
- [ ] 현재 파일이 **100줄을 넘는가?** → 넘으면 나눌 수 있는지 검토
- [ ] 이 코드가 **다른 곳에서도 쓰일 수 있는가?** → 재사용 가능하면 나누기
- [ ] **팀원이 같은 파일을 동시에 수정**할 가능성이 있는가? → 있으면 나누기

### 어디에 넣을까?

- [ ] 이 기능과 관련된 **폴더가 이미 있는가?** → 있으면 거기에 넣기
- [ ] 없다면, **어떤 기능에 속하는가?** → 해당 기능 폴더를 만들기
- [ ] 여러 기능에서 **공통으로 쓰이는가?** → `shared/` 또는 `utils/` 폴더에 넣기

### 이름은 뭘로 할까?

- [ ] 파일 이름만 보고 **무슨 일을 하는지** 알 수 있는가?
- [ ] 같은 폴더의 다른 파일과 **이름 규칙이 통일**되어 있는가?
- [ ] 폴더의 진입점이면 `index.js`로 이름 짓기

---

## 마무리: 핵심 요약

| 번호 | 원칙 | 한 줄 설명 |
|------|------|------------|
| 1 | 기능별로 폴더를 나눈다 | 주문은 `order/`, 사용자는 `user/` |
| 2 | 한 파일은 한 역할만 한다 | API, 렌더링, 이벤트를 각각 분리 |
| 3 | index.js가 조율한다 | 나눈 파일들을 import해서 연결 |
| 4 | 의미 있는 이름을 짓는다 | `utils.js` 대신 `renderRows.js` |
| 5 | 반복이 3번이면 추출한다 | 2번까지는 복사 OK (Rule of Three) |
| 6 | 매직 넘버에 이름을 붙인다 | `785.33` 대신 `SCROLL_THRESHOLD` |

**가장 중요한 것:** 완벽한 구조를 처음부터 만들 필요는 없습니다.
코드를 쓰다가 파일이 커지면 그때 나누면 됩니다.
지금 우리 프로젝트도 이미 좋은 구조를 가지고 있으니, 이 가이드의 원칙을 하나씩 적용해보세요!
