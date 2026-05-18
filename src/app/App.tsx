/*
  App.tsx – Haupt-Router der Anwendung
  -------------------------------------------------------
  Warum BrowserRouter + verschachtelte Routes:
  React Router v6 ermöglicht es, Layout-Komponenten als Wrapper
  zu verwenden (Layout-Routes), ohne den Header/Footer in jeder
  Seite zu wiederholen. Die zwei Layouts (PublicLayout / AppLayout)
  entsprechen den zwei Zustandswelten: angemeldet vs. nicht angemeldet.

  ProtectedRoute prüft isLoggedIn aus dem AuthContext. Nicht
  eingeloggte Nutzer werden auf /login umgeleitet, mit dem
  ursprünglichen Ziel als "redirect"-Parameter für UX-Kontinuität.
*/
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// ── Layout-Komponenten ────────────────────────────────────────────────
import { PublicHeader } from '../components/layout/PublicHeader';
import { AppHeader } from '../components/layout/AppHeader';
import { MobileNav } from '../components/layout/MobileNav';
import { Footer } from '../components/layout/Footer';

// ── Öffentliche Seiten ────────────────────────────────────────────────
import { HomePage } from '../pages/public/HomePage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { TrainingInfoPage } from '../pages/public/TrainingInfoPage';
import { MealsInfoPage } from '../pages/public/MealsInfoPage';
import { LearningInfoPage } from '../pages/public/LearningInfoPage';

// ── Auth-Seiten (kein Header/Footer, eigenständiges Layout) ───────────
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { OnboardingPage } from '../pages/OnboardingPage';

// ── Private Seiten (nur eingeloggt) ───────────────────────────────────
import { DashboardPage } from '../pages/DashboardPage';
import { TrainingPage } from '../pages/TrainingPage';
import { NutritionPage } from '../pages/NutritionPage';
import { RecipeDetailPage } from '../pages/RecipeDetailPage';
import { LearningPage } from '../pages/LearningPage';
import { ProgressPage } from '../pages/ProgressPage';
import { ProfilePage } from '../pages/ProfilePage';

// ── 404-Seite ─────────────────────────────────────────────────────────
import { NotFoundPage } from '../pages/NotFoundPage';

import '../styles/variables.css';
import '../styles/global.css';

// ─────────────────────────────────────────────────────────────────────
// Layout-Wrapper: Öffentliche Seiten (PublicHeader + Footer)
// ─────────────────────────────────────────────────────────────────────
function PublicLayout() {
  return (
    <>
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Layout-Wrapper: Eingeloggte App-Seiten (AppHeader + MobileNav)
// ─────────────────────────────────────────────────────────────────────
function AppLayout() {
  return (
    <>
      <AppHeader />
      <main style={{ paddingBottom: '80px' /* Platz für MobileNav */ }}>
        <Outlet />
      </main>
      <MobileNav />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ProtectedRoute: Leitet nicht-eingeloggte Nutzer auf /login um.
// Speichert die aktuelle URL als "from", damit nach dem Login
// der Nutzer automatisch dahin zurückkommt.
// ─────────────────────────────────────────────────────────────────────
function ProtectedRoute() {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  // Lade-Zustand: AuthContext prüft localStorage asynchron
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-lime)',
        fontFamily: 'var(--font-headline)',
        fontSize: '1.5rem',
      }}>
        LiftED…
      </div>
    );
  }

  if (!isLoggedIn) {
    // state.from merken → nach Login zurücknavigieren
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <AppLayout />;
}

// ─────────────────────────────────────────────────────────────────────
// Haupt-App: alle Routes werden hier deklariert.
// Warum flat statt nested: Bessere Übersicht, da wir nur zwei
// Layout-Ebenen haben (public / app).
// ─────────────────────────────────────────────────────────────────────
export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* ── Öffentliche Seiten ─────────────────────────────────── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/so-funktionierts" element={<HowItWorksPage />} />

        {/* Modul-Infoseiten (Standard-Infoseiten laut Architektur) */}
        <Route path="/trainingspläne"  element={<TrainingInfoPage />} />
        <Route path="/ernährung-info" element={<MealsInfoPage />} />
        <Route path="/lernen-info"     element={<LearningInfoPage />} />
      </Route>

      {/* ── Auth-Seiten (eigenständiges Layout) ───────────────── */}
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isLoggedIn ? <Navigate to="/onboarding" replace /> : <RegisterPage />}
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/onboarding"
        element={<OnboardingPage />}
      />

      {/* ── Private Seiten (ProtectedRoute als Layout-Guard) ───── */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard"   element={<DashboardPage />} />
        <Route path="/training"    element={<TrainingPage />} />
        <Route path="/ernährung"  element={<NutritionPage />} />
        <Route path="/ernährung/rezept/:id" element={<RecipeDetailPage />} />
        <Route path="/lernen"      element={<LearningPage />} />
        <Route path="/fortschritt" element={<ProgressPage />} />
        <Route path="/profil"      element={<ProfilePage />} />
      </Route>

      {/* ── 404 Catch-All ─────────────────────────────────────── */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

