import type { Router as RemixRouter } from "@remix-run/router/dist/router";
import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/Layout/Layout";
import Spinner from "@components/Talent/Spinner";
import ApplicantAuth from "@pages/ApplicantAuth";
import ApplicantDetail from "@pages/ApplicantDetail";
import Application from "@pages/Application";
import ChangeUserInfo from "@pages/ChangeUserInfo";
import ClosedForm from "@pages/ClosedForm";
import Completion from "@pages/Completion";
import ConfirmPassword from "@pages/ConfirmPassword";
import EditForm from "@pages/EditForm";
import FindUserInfo from "@pages/FindUserInfo";
import Home from "@pages/Home";
import LinkForm from "@pages/LinkForm";
import NewForm from "@pages/NewForm";
import NotFound from "@pages/NotFound";
import Notification from "@pages/Notification";
import SearchForm from "@pages/SearchForm";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import TalentFail from "@pages/TalentFail";
import TalentManagement from "@pages/TalentManagement";
import TalentStatus from "@pages/TalentStatus";

// type RouterBase = RouteObject & {
//   label?: string;
//   children?: RouteObject &
//     {
//       label?: string;
//     }[];
// };

// type CompanyRouter = RouterBase & {
//   isCompany?: boolean;
// };

// type ApplicantRouter = RouterBase & {
//   isCompany: false;
// };

// type RouterElement = CompanyRouter | ApplicantRouter;

// const routerData: RouterElement[] = [
//   {
//     path: "/sign-up",
//     label: "회원가입",
//     isCompany: false,
//   },
//   {
//     path: "/sign-in",
//     label: "로그인",
//     isCompany: false,
//   },
//   {
//     path: "/find-user-info",
//     label: "비밀번호 찾기",
//     isCompany: false,
//   },
//   {
//     path: "/confirm-password",
//     label: "비밀번호 재확인",
//     isCompany: true,
//   },
//   {
//     path: "/change-user-info",
//     label: "기업정보변경",
//     isCompany: true,
//   },
//   {
//     path: "/form",
//     isCompany: true,
//     children: [
//       {
//         path: "/",
//         label: "폼 링크관리",
//       },
//       {
//         path: "new",
//         label: "기업 폼 작성",
//       },
//       {
//         path: "edit/:id",
//         label: "기업 폼 조회",
//       },
//       {
//         path: "search?q=",
//         label: "폼 검색",
//       },
//       {
//         path: "close/:id",
//         label: "마감된 폼",
//       },
//     ],
//   },
//   {
//     path: "/applicant-detail/:id",
//     label: "지원자 상세 페이지",
//     isCompany: true,
//   },
//   {
//     path: "/notification",
//     label: "단체 알림센터",
//     isCompany: true,
//   },
//   {
//     path: "/talent",
//     label: "인재풀",
//     isCompany: true,
//     children: [
//       {
//         path: "management",
//         label: "인재 관리",
//       },
//       {
//         path: "status",
//         label: "채용 진행 현황 관리",
//       },
//       {
//         path: "fail",
//         label: "탈락 인재 보관함",
//       },
//     ],
//   },
//   {
//     path: "/applicant",
//     isCompany: false,
//     children: [
//       {
//         path: "auth",
//         label: "지원자 인증",
//       },
//       {
//         path: "application",
//         label: "지원서 작성",
//       },
//       {
//         path: "completion",
//         label: "작성 완료",
//       },
//     ],
//   },
// ];

const router: RemixRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/find-user-info",
        element: <FindUserInfo />,
      },
      {
        path: "/confirm-password",
        element: <ConfirmPassword />,
      },
      {
        path: "/change-user-info",
        element: <ChangeUserInfo />,
      },
      {
        path: "/form",
        children: [
          {
            index: true,
            element: <LinkForm />,
          },
          {
            path: "new",
            element: <NewForm />,
          },
          {
            path: "edit/:id",
            element: <EditForm />,
          },
          {
            path: "search",
            element: <SearchForm />,
          },
          {
            path: "close/:id",
            element: <ClosedForm />,
          },
        ],
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "/talent",
        children: [
          {
            path: "management",
            element: <TalentManagement />,
          },
          {
            path: "status",
            element: <TalentStatus />,
          },
          {
            path: "detail/:id",
            element: <ApplicantDetail />,
          },
          {
            path: "fail",
            element: (
              <Suspense fallback={<Spinner />}>
                <TalentFail />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/applicant",
    children: [
      {
        path: "auth",
        element: <ApplicantAuth />,
      },
      {
        path: "application",
        element: <Application />,
      },
      {
        path: "completion",
        element: <Completion />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
