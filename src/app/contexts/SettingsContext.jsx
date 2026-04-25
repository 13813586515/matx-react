import { createContext, useState, useMemo } from "react";
import merge from "lodash/merge";
import { MatxLayoutSettings } from "app/components/MatxLayout/settings";
import { createCustomTheme, themes } from "app/components/MatxTheme/initThemes";

export const SettingsContext = createContext({
  settings: MatxLayoutSettings,
  updateSettings: () => {},
  updateThemeCustomizations: () => {},
  themeCustomizations: {},
});

export default function SettingsProvider({ settings, children }) {
  const [currentSettings, setCurrentSettings] = useState(settings || MatxLayoutSettings);
  const [themeCustomizations, setThemeCustomizations] = useState({
    primaryColor: null,
    secondaryColor: null,
    borderRadius: null,
    shadowLevel: null,
  });

  const handleUpdateSettings = (update = {}) => {
    const merged = merge({}, currentSettings, update);
    setCurrentSettings(merged);
  };

  const handleUpdateThemeCustomizations = (customizations) => {
    setThemeCustomizations((prev) => ({ ...prev, ...customizations }));
  };

  const customizedThemes = useMemo(() => {
    const result = { ...currentSettings.themes };
    Object.keys(result).forEach((key) => {
      const hasCustomizations = Object.values(themeCustomizations).some((v) => v !== null);
      if (hasCustomizations) {
        result[key] = createCustomTheme(result[key], themeCustomizations);
      }
    });
    return result;
  }, [currentSettings.themes, themeCustomizations]);

  const settingsWithCustomThemes = useMemo(() => ({
    ...currentSettings,
    themes: customizedThemes,
  }), [currentSettings, customizedThemes]);

  return (
    <SettingsContext.Provider
      value={{
        settings: settingsWithCustomThemes,
        updateSettings: handleUpdateSettings,
        updateThemeCustomizations: handleUpdateThemeCustomizations,
        themeCustomizations,
      }}>
      {children}
    </SettingsContext.Provider>
  );
}
