import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
// ROOT THEME PROVIDER
import { MatxTheme } from "./components";
import { GlobalSearchModal } from "./components/GlobalSearch";
// ALL CONTEXTS
import SettingsProvider from "./contexts/SettingsContext";
import { AuthProvider } from "./contexts/FirebaseAuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { PermissionProvider } from "./contexts/PermissionContext";
import { GlobalSearchProvider } from "./contexts/GlobalSearchContext";
// ROUTES
import routes from "./routes";
// FAKE SERVER
import "../__api__";

function AppContent() {
  const content = useRoutes(routes);
  return (
    <>
      {content}
      <GlobalSearchModal />
    </>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <PermissionProvider>
          <GlobalSearchProvider>
            <AuthProvider>
              <SnackbarProvider maxSnack={3}>
                <MatxTheme>
                  <CssBaseline />
                  <AppContent />
                </MatxTheme>
              </SnackbarProvider>
            </AuthProvider>
          </GlobalSearchProvider>
        </PermissionProvider>
      </LanguageProvider>
    </SettingsProvider>
  );
}
