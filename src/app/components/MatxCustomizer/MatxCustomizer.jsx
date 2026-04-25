import { Fragment, useState } from "react";
import Scrollbar from "react-perfect-scrollbar";
import Close from "@mui/icons-material/Close";
import Settings from "@mui/icons-material/Settings";
import Palette from "@mui/icons-material/Palette";
import RoundedCorner from "@mui/icons-material/RoundedCorner";
import BlurOn from "@mui/icons-material/BlurOn";
import ResetIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Drawer from "@mui/material/Drawer";
import styled from "@mui/material/styles/styled";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import useSettings from "app/hooks/useSettings";
import { H5, Span } from "../Typography";
import { StyledBadge } from "./styles";
import { themeShadows } from "../MatxTheme/themeColors";
import { borderRadiusOptions, shadowLevelOptions } from "../MatxTheme/initThemes";

const Label = styled(Span)(({ theme }) => ({
  position: "fixed",
  right: 0,
  top: "50%",
  transform: "translateY(-50%) rotate(90deg)",
  transformOrigin: "center center",
  zIndex: 9999,
  fontWeight: 700,
  fontSize: "1rem",
  cursor: "pointer",
  borderRadius: "4px 4px 0 0",
  letterSpacing: "1.5px",
  padding: ".5rem 2rem",
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.primary.dark,
  "&:hover, &.open": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

const MaxCustomaizer = styled("div")(({ theme }) => ({
  top: 0,
  right: 0,
  zIndex: 50,
  width: 360,
  display: "flex",
  height: "100vh",
  position: "fixed",
  paddingBottom: "32px",
  flexDirection: "column",
  boxShadow: themeShadows[12],
  background: theme.palette.background.default,
  "& .helpText": { margin: "0px .5rem 1rem" }
}));

const LayoutBox = styled(StyledBadge)(() => ({
  width: "100%",
  height: "152px !important",
  cursor: "pointer",
  marginTop: "12px",
  marginBottom: "12px",
  "& .layout-name": { display: "none" },
  "&:hover .layout-name": {
    zIndex: 12,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    background: "rgba(0,0,0,0.3)"
  }
}));

const Controller = styled("div")(() => ({
  minHeight: 58,
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
  padding: "14px 20px",
  boxShadow: themeShadows[6],
  justifyContent: "space-between"
}));

const IMG = styled("img")(() => ({ width: "100%" }));

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "16px",
  paddingRight: "16px"
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.text.secondary,
  marginBottom: "12px",
  marginTop: "20px",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
}));

const ColorOption = styled("div")(({ theme, selected, color }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: color,
  cursor: "pointer",
  border: selected ? `3px solid ${theme.palette.secondary.main}` : "2px solid transparent",
  boxShadow: selected ? `0 0 0 2px ${theme.palette.secondary.main}` : "none",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "scale(1.1)"
  }
}));

const presetColors = {
  primary: [
    { name: "Blue", value: "#1976d2" },
    { name: "Purple", value: "#7467ef" },
    { name: "Red", value: "#e53935" },
    { name: "Green", value: "#2e7d32" },
    { name: "Orange", value: "#ed6c02" },
    { name: "Pink", value: "#ec407a" },
    { name: "Teal", value: "#008080" },
    { name: "Indigo", value: "#3f51b5" },
  ],
  secondary: [
    { name: "Orange", value: "#ff9e43" },
    { name: "Blue", value: "#1976d2" },
    { name: "Green", value: "#4caf50" },
    { name: "Red", value: "#ff4f30" },
    { name: "Pink", value: "#ff6b9d" },
    { name: "Amber", value: "#ffc107" },
    { name: "Cyan", value: "#00bcd4" },
    { name: "Deep Purple", value: "#673ab7" },
  ]
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`customizer-tabpanel-${index}`}
      aria-labelledby={`customizer-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

export default function MatxCustomizer() {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { settings, updateSettings, updateThemeCustomizations, themeCustomizations } = useSettings();

  const tooglePanel = () => setOpen(!open);

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const handlePrimaryColorChange = (color) => {
    updateThemeCustomizations({ primaryColor: color });
  };

  const handleSecondaryColorChange = (color) => {
    updateThemeCustomizations({ secondaryColor: color });
  };

  const handleBorderRadiusChange = (value) => {
    updateThemeCustomizations({ borderRadius: value });
  };

  const handleShadowLevelChange = (value) => {
    updateThemeCustomizations({ shadowLevel: value });
  };

  const handleResetTheme = () => {
    updateThemeCustomizations({
      primaryColor: null,
      secondaryColor: null,
      borderRadius: null,
      shadowLevel: null,
    });
  };

  let activeTheme = { ...settings.themes[settings.activeTheme] };

  return (
    <Fragment>
      <Tooltip title="Theme Settings" placement="left">
        <Label className="open" onClick={tooglePanel}>
          DEMOS
        </Label>
      </Tooltip>

      <ThemeProvider theme={activeTheme}>
        <Drawer
          open={open}
          anchor="right"
          variant="temporary"
          onClose={tooglePanel}
          ModalProps={{ keepMounted: true }}>
          <MaxCustomaizer>
            <Controller>
              <Box display="flex" alignItems="center">
                <Settings className="icon" color="primary" />
                <H5 ml={1} fontSize={16}>
                  Theme Customizer
                </H5>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <Tooltip title="Reset to Default">
                  <IconButton onClick={handleResetTheme} size="small">
                    <ResetIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <IconButton onClick={tooglePanel}>
                  <Close className="icon" />
                </IconButton>
              </Box>
            </Controller>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
              <Tabs 
                value={tabIndex} 
                onChange={handleTabChange} 
                variant="fullWidth"
                sx={{ minHeight: 48 }}>
                <Tab icon={<Palette />} label="Themes" iconPosition="start" sx={{ minHeight: 48 }} />
                <Tab icon={<RoundedCorner />} label="Style" iconPosition="start" sx={{ minHeight: 48 }} />
                <Tab icon={<BlurOn />} label="Layouts" iconPosition="start" sx={{ minHeight: 48 }} />
              </Tabs>
            </Box>

            <StyledScrollBar options={{ suppressScrollX: true }}>
              <TabPanel value={tabIndex} index={0}>
                <Box mx={3}>
                  <SectionTitle>Primary Color</SectionTitle>
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    {presetColors.primary.map((color) => (
                      <Tooltip key={color.value} title={color.name} placement="top">
                        <ColorOption
                          color={color.value}
                          selected={themeCustomizations.primaryColor === color.value}
                          onClick={() => handlePrimaryColorChange(color.value)}
                        />
                      </Tooltip>
                    ))}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <SectionTitle>Secondary Color</SectionTitle>
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    {presetColors.secondary.map((color) => (
                      <Tooltip key={color.value} title={color.name} placement="top">
                        <ColorOption
                          color={color.value}
                          selected={themeCustomizations.secondaryColor === color.value}
                          onClick={() => handleSecondaryColorChange(color.value)}
                        />
                      </Tooltip>
                    ))}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <SectionTitle>Current Settings</SectionTitle>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    <Chip 
                      label={`Primary: ${themeCustomizations.primaryColor || 'Default'}`} 
                      size="small" 
                      color={themeCustomizations.primaryColor ? "primary" : "default"}
                    />
                    <Chip 
                      label={`Secondary: ${themeCustomizations.secondaryColor || 'Default'}`} 
                      size="small" 
                      color={themeCustomizations.secondaryColor ? "secondary" : "default"}
                    />
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel value={tabIndex} index={1}>
                <Box mx={3}>
                  <SectionTitle>Border Radius</SectionTitle>
                  <ButtonGroup 
                    fullWidth 
                    variant="outlined" 
                    size="small"
                    sx={{ mb: 2 }}>
                    {Object.entries(borderRadiusOptions).map(([key, value]) => (
                      <Button
                        key={key}
                        onClick={() => handleBorderRadiusChange(key)}
                        variant={themeCustomizations.borderRadius === key ? "contained" : "outlined"}
                        color={themeCustomizations.borderRadius === key ? "primary" : "inherit"}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        <Typography component="span" sx={{ ml: 0.5, fontSize: '0.7rem', opacity: 0.7 }}>
                          ({value}px)
                        </Typography>
                      </Button>
                    ))}
                  </ButtonGroup>

                  <Divider sx={{ my: 2 }} />

                  <SectionTitle>Shadow Level</SectionTitle>
                  <ButtonGroup 
                    fullWidth 
                    variant="outlined" 
                    size="small"
                    sx={{ mb: 2 }}>
                    {Object.entries(shadowLevelOptions).map(([key, value]) => (
                      <Button
                        key={key}
                        onClick={() => handleShadowLevelChange(key)}
                        variant={themeCustomizations.shadowLevel === key ? "contained" : "outlined"}
                        color={themeCustomizations.shadowLevel === key ? "secondary" : "inherit"}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Button>
                    ))}
                  </ButtonGroup>

                  <Divider sx={{ my: 2 }} />

                  <SectionTitle>Style Preview</SectionTitle>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Card sx={{ p: 2, width: 100, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="body2">Card</Typography>
                    </Card>
                    <Button variant="contained">Button</Button>
                    <Button variant="outlined">Outline</Button>
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel value={tabIndex} index={2}>
                <Box mb={4} mx={3}>
                  <Box color="text.secondary" mb={1}>Layout Presets</Box>

                  <Box display="flex" flexDirection="column">
                    {demoLayouts.map((layout) => (
                      <LayoutBox
                        key={layout.name}
                        color="secondary"
                        badgeContent={"Pro"}
                        invisible={!layout.isPro}>
                        <Card
                          elevation={4}
                          sx={{ position: "relative" }}
                          onClick={() => updateSettings(layout.options)}>
                          <Box overflow="hidden" className="layout-name">
                            <Button variant="contained" color="secondary">
                              {layout.name}
                            </Button>
                          </Box>

                          <IMG src={layout.thumbnail} alt={layout.name} />
                        </Card>
                      </LayoutBox>
                    ))}
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <div className="helpText">
                    We used React context API to control layout. Check out the{" "}
                    <Link href="http://demos.ui-lib.com/matx-react-doc/layout.html" target="_blank">
                      Documentation
                    </Link>
                  </div>
                </Box>
              </TabPanel>
            </StyledScrollBar>
          </MaxCustomaizer>
        </Drawer>
      </ThemeProvider>
    </Fragment>
  );
}

const demoLayouts = [
  {
    isPro: false,
    name: "Light Sidebar",
    thumbnail: "/assets/images/screenshots/layout1-customizer.png",
    options: {
      activeTheme: "blue",
      activeLayout: "layout1",
      layout1Settings: {
        topbar: { theme: "blueDark", fixed: true },
        leftSidebar: { mode: "full", theme: "whiteBlue", bgOpacity: 0.98 }
      },
      footer: { theme: "slateDark1" }
    }
  },
  {
    isPro: false,
    name: "Compact Sidebar",
    thumbnail: "/assets/images/screenshots/layout5-customizer.png",
    options: {
      activeTheme: "blue",
      activeLayout: "layout1",
      layout1Settings: {
        topbar: { theme: "whiteBlue", fixed: true },
        leftSidebar: { mode: "compact", theme: "slateDark1", bgOpacity: 0.92 }
      }
    }
  },
  {
    isPro: false,
    name: "Dark Sidebar",
    thumbnail: "/assets/images/screenshots/layout1-blue-customizer.png",
    options: {
      activeTheme: "blue",
      activeLayout: "layout1",
      layout1Settings: {
        topbar: { theme: "blueDark", fixed: true },
        leftSidebar: { mode: "full", theme: "slateDark1", bgOpacity: 0.92 }
      }
    }
  }
];
