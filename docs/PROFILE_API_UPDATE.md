# GentleLion 프로필 수정 API 변경 안내

## 변경 내용

**프로필 수정 시 모든 필드가 optional이 되었습니다.**

이전에는 `firstName`, `lastName`이 필수여서 주소만 바꾸려 해도 에러가 났지만,
이제는 **바꾸고 싶은 필드만 보내면** 됩니다. 보내지 않은 필드는 기존 값이 유지됩니다.

---

## PUT /api/gentlelion/v1/user/profile

### 요청 (Request)

모든 필드 optional — **바꾸고 싶은 것만 보내세요!**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| firstName | string | 선택 | 이름 (빈 문자열 불가) |
| lastName | string | 선택 | 성 (빈 문자열 불가) |
| phone | string | 선택 | 전화번호 |
| address | string | 선택 | 주소 |
| addressDetail | string | 선택 | 상세주소 |

### 예시: 주소만 수정

```js
const token = localStorage.getItem("gl-token");

const response = await fetch(
  "https://api.fullstackfamily.com/api/gentlelion/v1/user/profile",
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      address: "서울시 강남구 테헤란로 123",
      addressDetail: "5층",
    }),
    // firstName, lastName은 안 보내도 됩니다!
    // 기존 값이 그대로 유지됩니다.
  }
);

const result = await response.json();
console.log(result);
```

### 응답 예시 (200)

```json
{
  "success": true,
  "data": {
    "userId": 37,
    "email": "user@example.com",
    "firstName": "홍",
    "lastName": "길동",
    "phone": "01099998888",
    "address": "서울시 강남구 테헤란로 123",
    "addressDetail": "5층",
    "points": 100000,
    "role": "USER",
    "createdAt": "2026-04-13T16:43:48.834846"
  }
}
```

### 에러 응답

| 상황 | 코드 | 메시지 |
|------|------|--------|
| firstName에 빈 문자열 `""` | 400 | First name cannot be blank. |
| lastName에 빈 문자열 `""` | 400 | Last name cannot be blank. |
| 인증 없음 | 401 | 인증이 필요합니다 |

---

## 예시: 이름만 수정

```js
const response = await fetch(
  "https://api.fullstackfamily.com/api/gentlelion/v1/user/profile",
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      firstName: "새이름",
    }),
  }
);
```

## 예시: 전체 수정

```js
const response = await fetch(
  "https://api.fullstackfamily.com/api/gentlelion/v1/user/profile",
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      firstName: "길동",
      lastName: "홍",
      phone: "010-9999-8888",
      address: "서울시 서초구 반포대로 45",
      addressDetail: "2층",
    }),
  }
);
```

---

## API 문서 페이지

https://www.fullstackfamily.com/gentlelion/api-docs

위 페이지에서 직접 API를 호출하고 응답을 확인할 수 있습니다.
