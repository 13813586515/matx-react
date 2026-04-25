import { createTheme } from '@mui/material';
import { forEach, merge, cloneDeep } from 'lodash';
import { themeColors, themeShadows } from './themeColors';
import themeOptions from './themeOptions';

export const borderRadiusOptions = {
  none: 0,
  small: 4,
  medium: 8,
  large: 16,
  rounded: 24,
};

export const shadowLevelOptions = {
  none: 0,
  light: 4,
  medium: 8,
  heavy: 16,
};

export function createCustomTheme(baseTheme, customizations = {}) {
  const { primaryColor, secondaryColor, borderRadius, shadowLevel } = customizations;
  
  let theme = cloneDeep(baseTheme);
  
  if (primaryColor) {
    theme.palette.primary = {
      main: primaryColor,
      contrastText: getContrastText(primaryColor),
    };
  }
  
  if (secondaryColor) {
    theme.palette.secondary = {
      main: secondaryColor,
      contrastText: getContrastText(secondaryColor),
    };
  }
  
  if (borderRadius !== undefined) {
    const borderRadiusValue = borderRadiusOptions[borderRadius] ?? borderRadius;
    theme.shape = {
      ...theme.shape,
      borderRadius: borderRadiusValue,
    };
    
    if (theme.components?.MuiCard?.styleOverrides?.root) {
      theme.components.MuiCard.styleOverrides.root.borderRadius = `${borderRadiusValue}px`;
    }
  }
  
  if (shadowLevel !== undefined) {
    const shadowIndex = shadowLevelOptions[shadowLevel] ?? shadowLevel;
    if (theme.components?.MuiButton?.styleOverrides?.contained) {
      theme.components.MuiButton.styleOverrides.contained.boxShadow = themeShadows[shadowIndex] || themeShadows[8];
    }
    if (theme.components?.MuiCard?.styleOverrides?.root) {
      theme.components.MuiCard.styleOverrides.root.boxShadow = themeShadows[shadowIndex] || themeShadows[8];
    }
  }
  
  return createTheme(theme);
}

function getContrastText(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? 'rgba(52, 49, 76, 1)' : '#ffffff';
}

function createMatxThemes() {
  let themes = {};

  forEach(themeColors, (value, key) => {
    themes[key] = createTheme(merge({}, themeOptions, value));
  });

  return themes;
}

export const themes = createMatxThemes();
