import type { Router as RemixRouter } from "@remix-run/router/dist/router";
import { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Spinner from "@components/Common/Spinner";
import Layout from "@components/Layout/Layout";
import OtherLayout from "@components/Layout/OtherLayout";
import ApplicantAuth from "@pages/ApplicantAuth";
import Application from "@pages/Application";
import ChangeUserInfo from "@pages/ChangeUserInfo";
import ClosedForm from "@pages/ClosedForm";
import Completion from "@pages/Completion";
import ConfirmPassword from "@pages/ConfirmPassword";
import EditForm from "@pages/EditForm";
import FindUserInfo from "@pages/FindUserInfo";
import LinkForm from "@pages/LinkForm";
import NewForm from "@pages/NewForm";
import NotFound from "@pages/NotFound";
import Notification from "@pages/Notification";
import SearchForm from "@pages/SearchForm";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import TalentDetail from "@pages/TalentDetail";
import TalentFail from "@pages/TalentFail";
import TalentManagement from "@pages/TalentManagement";
import TalentStatus from "@pages/TalentStatus";

const router: RemixRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/sign-in" />,
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
        element: (
          <Suspense fallback={<Spinner />}>
            <Notification />,
          </Suspense>
        ),
      },
      {
        path: "/talent",
        children: [
          {
            path: "management",
            element: (
              <Suspense fallback={<Spinner />}>
                <TalentManagement />
              </Suspense>
            ),
          },
          {
            path: "status",
            element: (
              <Suspense fallback={<Spinner />}>
                <TalentStatus />
              </Suspense>
            ),
          },
          {
            path: "detail/:id",
            element: (
              <Suspense fallback={<Spinner />}>
                <TalentDetail />,
              </Suspense>
            ),
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
    element: <OtherLayout />,
    children: [
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
        path: "/applicant",
        children: [
          {
            path: "auth/:id",
            element: <ApplicantAuth />,
          },
          {
            path: "completion",
            element: <Completion />,
          },
        ],
      },
    ],
  },
  {
    path: "/applicant/application/:id",
    element: <Application />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
