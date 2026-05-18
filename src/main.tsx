// 1. Ersetze den BrowserRouter durch den HashRouter im Import
import { HashRouter } from 'react-router-dom';

// ...

// 2. Tausche den Wrapper aus
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter> {/* Hier ändern! */}
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
