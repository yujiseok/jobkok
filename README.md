
[![Netlify Status](https://api.netlify.com/api/v1/badges/f14f6822-855c-4a25-b7d7-5c8aacecfb93/deploy-status)](https://app.netlify.com/sites/kdt-final/deploys)

# JOBKOK
- 팀: [Github](https://github.com/kdt-final-3/jobkok-fe)
- 노션: [Notion](https://www.notion.so/3-e6ecfb1d3143440f9afa58481929ab5a)

## < KDT3 Front-End : Final Project Team3 - SSAK3 >

<img width="1021" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-04-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5 00 07" src="https://user-images.githubusercontent.com/83855636/232267130-727049c5-eb9b-4ae0-9f58-faf61f86e3bf.png">


# 1. **프로젝트 소개**

지원자들에게는 투명하고 공정한 안내를 절차별로 도와주고, 사업주에게는 더 쉬운 자동화 채용 절차를 도와주는 서비스입니다.

- 인재관리 페이지에서 인재 추천 기능을 통해 지원자의 정보를 효율적으로 확인할 수 있습니다.
- 폼 링크 관리를 통해 각 채용 플랫폼에 흩어져 있던 인재들을 한곳에 모아 고스팅을 낮출 수 있습니다.
- 인재 보관함에서 합격 인재와 탈락 인재 관리를 통해 갑작스러운 결원 보충도 쉽게 가능합니다.
- 서비스 내에서 지원자와 관련된 알림을 쉽게 보내고 관리할 수 있습니다.

### 개발 기간

2023.03.03 ~ 2023.04.10

# 2. 구현 기능

## 구현 기능

### 프로젝트 설정

- eslint, prettier를 통해 코드를 통일화하였습니다.
- husky와 lint-staged를 이용한 pre-commit을 통해 린트를 자동화하였습니다.

### 메인페이지 (인재 관리)

<p align="center">
  <img src="https://user-images.githubusercontent.com/83855636/232765729-73614dcc-e900-4182-9098-5a6a0c64953a.gif" alt="인재 관리 - 인재폼 등록 안한 경우"/>
  인재폼 등록 안한 경우
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/83855636/232767881-faa54d1d-6c14-4532-9514-4b9b59b0a93d.gif" alt="인재 관리 - 인재폼 등록 지원자 없는 경우"/>
  인재폼 등록 지원자 없는 경우
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/83855636/232768124-b2d30c2d-9406-47de-8daf-de1af46ea536.gif" alt="인재 관리 - 슬라이드"/>
  슬라이드
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/83855636/232768382-2020dde6-a8dd-4339-9d71-016df8abcebd.gif" alt="인재 관리 - 칸반보드"/>
  칸반보드
</p>

- 채용폼 목록 조회
    - react-query의 useQuery를 커스텀 훅으로 만든 useFormListQuery를 활용해 폼 데이터 조회 기능을 구현하였습니다.
    - 받아온 데이터를 통해 각 채용폼 별 당일 인재, 총 인재, 채용 일정을 화면에 렌더링 하였습니다.
- 인재 목록 조회
    - swiper와 배열의 slice 메서드를 사용하여 최대 9명까지 인재의 목록을 슬라이더로 조회할 수 있도록 구현하였습니다.
- 인재 찜
    - react-query의 useMutation를 커스텀 훅으로 만든 useLikeMutate를 활용해 인재 찜 기능을 구현하였습니다.
- 칸반 보드를 활용한 채용 단계(서류제출, 면접, 최종조율) 수정
    - react-beautiful-dnd 라이브러리를 활용하여 dnd를 구현하였습니다.
    - 이때 백엔드의 데이터를 정제하기 위해 talentToProcedure 유틸 함수를 생성하였습니다.

### 인재 현황

<p align="center">
  <img src="https://user-images.githubusercontent.com/83855636/232768598-3da3359f-deb4-497c-8f9e-7a7f6ab71b13.gif" alt="인재 현황 - 칸반보드"/>
  칸반보드
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/83855636/232768591-33fa5eca-c1bb-4f2e-8531-6d2a5626c81b.gif" alt="인재 현황 - 단계별 인재 조회"/>
  단계별 인재 조회
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/83855636/232768604-0f5807ff-e23f-43cb-9b80-fc3442b600ef.gif" alt="인재 현황 - 페이지네이션"/>
  페이지네이션
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/83855636/232768582-e73405ec-b6c8-4745-97ff-1e41782090e7.gif" alt="인재 현황 - 인재 채용 단계 수정"/>
  인재 채용 단계 수정
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/83855636/232768597-857ab819-5d16-4d23-bf99-aceaacf10836.gif" alt="인재 현황 - 인재 찜"/>
  인재 찜
</p>


- 칸반 보드를 활용한 채용 단계(서류제출, 면접, 최종조율) 수정
- 각 단계별 인재 조회 (전체, 서류제출, 면접, 최종조율)
    - react-query의 useQuery를 커스텀 훅으로 만든 useTalentByProcedureQuery를 활용하여 단계별 인재를 조회할 수 있도록 구현하였습니다.
    - react-router-dom의 useSearchParams 훅을 활용하여 새로고침 시에도 필터링이 유지되는 UX 친화적인 개발을 진행하였습니다.
- 페이지네이션
    - 10명의 인재가 테이블에 보이도록 페이지네이션을 구현하였습니다.
    - react-router-dom의 useSearchParams 훅을 활용하여 새로고침 시에도 페이지가 유지되는 UX 친화적인 개발을 진행하였습니다.
- 인재 채용 단계 수정
    - 최대 4명의 인재의 채용 단계를 수정할 수 있는 기능을 구현하였습니다.
- 인재 탈락
    - react-query의 useMutation 훅을 사용하여 인재를 탈락 시키는 기능을 구현하였습니다.
- 인재 찜
    - react-query의 useMutation를 커스텀 훅으로 만든 useLikeMutate를 활용해 인재 찜 기능을 구현하였습니다.
### 탈락 인재 보관함

<p align="center">
  <img src="https://user-images.githubusercontent.com/83855636/232769928-f38bbf3b-d7fe-45b8-ac3f-ebdabb544e82.gif" alt="인재 현황 - 탈락 인재 없을 시"/>
  탈락 인재 없을 시
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/83855636/232769923-30349bf8-61e2-45c2-9f8f-1627f4fc9ec9.gif" alt="인재 현황 - 탈락 인재 조회"/>
  탈락 인재 조회
</p>

- 탈락된 인재 조회
    - react-query의 useQuery를 커스텀 훅으로 만든 useFailedTalentQuery를 활용하여 탈락된 인재 조회 기능을 구현하였습니다.
    - 탈락 인재 조회 시 필터링을 통해 전체 탈락 인재와 찜이 된 탈락 인재를 조회할 수 있도록 구현하였습니다.
        - QueryFunctionContext 타입을 활용해 필터링을 구현하였습니다.
    - react-router-dom의 useSearchParams 훅을 활용하여 새로고침 시에도 필터링이 유지되는 UX 친화적인 개발을 진행하였습니다.
- 인재 찜
    - react-query의 useMutation를 커스텀 훅으로 만든 useLikeMutate를 활용해 인재 찜 기능을 구현하였습니다.

### Redux-toolkit • Redux-persist를 활용한 유저 상태 관리

- 로그인 시 signIn 액션을 통해 유저 정보를 저장하도록 하였습니다.
    - Redux-persist를 활용해 로컬 스토리지에 저장하도록 구현하였습니다.
- 로그아웃 시 signOut 액션을 통해 유저 정보를 초기화하도록 구현하였습니다.

### 토큰 여부에 따른 리다이렉트 처리

- 토큰 여부에 따라 useEffect를 활용하여 리다이렉트 처리를 구현하였습니다.

### **axios interceptors를 활용한 인증 로직 구현**

- 토큰이 필요한 주소일 경우  request interceptors를 활용해,  Authorization에 토큰을 주입하도록 하였습니다.
- 토큰이 만료되었을 경우 response interceptors를 활용해, 로그인 시 저장된 유저정보의 refreshToken을 통해 새로운 accessToken을 발급하는 로직을 구현하였습니다.
    - 이때 http 상태 코드가 200일시 Authorization에 새로 발급받은 accessToken을 주입하도록 하였습니다.


# 3. **기술 스택**

- vite, react, typescript, redux-toolkit, tailwindcss, axios, react-hook-form, zod, react-router-dom, react-query

# 4. **협업 방식**

- 공통 소통 툴: 슬랙, 노션, 게더타운
- FE & UXUI: 피그마, 제플린
- FE & BE: 깃허브, 포스트맨

# 5. **회고**

### 유지석

좋았던 점

- 소프트 스킬에 필요한 다양한 툴을 사용할 수 있어 좋았다.
- 게더타운을 활용해 팀원들과 의견을 공유하는 것과 피그마를 통해 실시간으로 디자인과 기획을 확인할 수 있었던 점이 좋았다.
- 다른 파트의 팀원들과의 소통을 통해 개발에만 국한되지 않고, 시야를 좀 더 넓힐 수 있었던 것 같다.
- 개발 쪽으로는 타입스크립트, 리액트 쿼리에 좀 더 익숙해질 수 있었다.
- 커스텀 훅을 사용하는 것도 익숙해졌다.

아쉬운 점

- 기획의 방향성을 잡는 데 시간이 많이 든 점.
- 실제로 개발하는 시간이 압도적으로 부족했던 점.
- 우선순위와 일정을 확실히 관리하지 못한 점.


# 6. **팀원 소개 & 역할 분담**

<table border>
  <tbody>
    <tr>
       <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/83855636?v=4"  alt="유지석님"/><br />
        <br/>
        <a href="https://github.com/yujiseok">
          <img src="https://img.shields.io/badge/팀장 : 유지석-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src='https://avatars.githubusercontent.com/u/90189513?v=4'  alt="이은영님"/><br />
        <br/>
        <a href="https://github.com/eun0leee">
          <img src="https://img.shields.io/badge/이은영-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/113823957?v=4"  alt="이혜란님"/><br />
       <br/>
        <a href="https://github.com/hyerani">
          <img src="https://img.shields.io/badge/이혜란-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
   <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/103406196?v=4"  alt="조효림님"/><br/>
       <br/>
        <a href="https://github.com/hyorimcho">
          <img src="https://img.shields.io/badge/조효림-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
     </tr>
  </tbody>
</table>
