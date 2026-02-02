import { lazy, Suspense } from "react";

import { FullPageLoader } from "@/components/FullPageLoader/FullPageLoader";
import { PublicRoute } from "@/features/auth/guards/PublicRoute";
import { paths } from "@/shared/config/paths";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NotFoundError } from "@/components/Errors/NotFoundError";
import { ProtectedRoute } from "@/features/auth/guards/ProtectedRoute";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";

const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"));
const UnauthorizedPage = lazy(() => import("@/shared/pages/UnauthorizedPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const DashboardPage = lazy(
  () => import("@/features/dashboard/pages/DashboardPage"),
);
const SettingsPage = lazy(
  () => import("@/features/settings/pages/SettingsPage"),
);
const EmployeesPage = lazy(
  () => import("@/features/employees/pages/EmployeesPage"),
);
const AbsencesPage = lazy(
  () => import("@/features/absences/pages/AbsencesPage"),
);
const ReportsPage = lazy(() => import("@/features/reports/pages/ReportsPage"));
const AIInsightsPage = lazy(
  () => import("@/features/ai-insights/pages/AIInsightsPage"),
);

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={paths.ROOT}
          element={<Navigate to={paths.app.root} replace />}
        />

        {/* Authentication */}
        <Route
          path={paths.auth.root}
          element={
            <Suspense fallback={<FullPageLoader />}>
              <PublicRoute />
            </Suspense>
          }
        >
          <Route path={paths.auth.login} element={<LoginPage />} />
        </Route>

        {/* App Dashboard */}
        <Route
          path={paths.app.root}
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to={paths.app.dashboard} replace />}
          />

          {/** Dashboard */}
          <Route path={paths.app.dashboard} element={<DashboardPage />} />

          {/** Employees */}
          <Route path={paths.employees.root} element={<EmployeesPage />} />

          {/** Absences */}
          <Route path={paths.absences.root} element={<AbsencesPage />} />

          {/** Reports */}
          <Route path={paths.reports.root} element={<ReportsPage />} />

          {/** AI-Insights */}
          <Route path={paths.aiInsights.root} element={<AIInsightsPage />} />

          {/** Settings */}
          <Route path={paths.settings.root} element={<SettingsPage />} />

          <Route
            path="*"
            element={<NotFoundError returnToText="<- Regresar al dashboard" />}
          />
        </Route>

        <Route path={paths.unauthorized.root} element={<UnauthorizedPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
