/*
  main.tsx – Entry Point der Anwendung
  ----------------------------------------
  Warum diese Reihenfolge der Provider:
  1. HashRouter muss ganz außen stehen, da useNavigate/useLocation
     nur innerhalb eines Routers funktionieren.
  2. AuthProvider kommt vor UserProvider, weil UserContext in Zukunft
     auf Auth-Daten angewiesen sein könnte (Erweiterbarkeit).
  3. App enthält alle Routes – jede Route kann auf Auth + User zugreifen.
*/
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import App from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
