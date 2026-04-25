import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import usePermission from "app/hooks/usePermission";
import useLanguage from "app/hooks/useLanguage";

const roles = [
  { value: "SA", label: "permissions.superAdmin" },
  { value: "ADMIN", label: "permissions.admin" },
  { value: "EDITOR", label: "permissions.editor" },
  { value: "GUEST", label: "permissions.guest" }
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`permission-tabpanel-${index}`}
      aria-labelledby={`permission-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function PermissionManagement() {
  const { t } = useLanguage();
  const { enqueueSnackbar } = useSnackbar();
  const { allMenuItems, allButtonItems, getPermissionsForRole, updateRolePermissions } =
    usePermission();

  const [selectedRole, setSelectedRole] = useState("SA");
  const [tabValue, setTabValue] = useState(0);
  const [currentPermissions, setCurrentPermissions] = useState({ menus: [], buttons: [] });

  useEffect(() => {
    const perms = getPermissionsForRole(selectedRole);
    setCurrentPermissions({
      menus: [...perms.menus],
      buttons: [...perms.buttons]
    });
  }, [selectedRole, getPermissionsForRole]);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuToggle = (path) => {
    setCurrentPermissions((prev) => {
      const menus = prev.menus.includes(path)
        ? prev.menus.filter((p) => p !== path)
        : [...prev.menus, path];
      return { ...prev, menus };
    });
  };

  const handleButtonToggle = (buttonId) => {
    setCurrentPermissions((prev) => {
      const buttons = prev.buttons.includes(buttonId)
        ? prev.buttons.filter((id) => id !== buttonId)
        : [...prev.buttons, buttonId];
      return { ...prev, buttons };
    });
  };

  const handleSelectAllMenus = () => {
    setCurrentPermissions((prev) => ({
      ...prev,
      menus: allMenuItems.map((item) => item.path)
    }));
  };

  const handleDeselectAllMenus = () => {
    setCurrentPermissions((prev) => ({
      ...prev,
      menus: []
    }));
  };

  const handleSelectAllButtons = () => {
    setCurrentPermissions((prev) => ({
      ...prev,
      buttons: allButtonItems.map((item) => item.id)
    }));
  };

  const handleDeselectAllButtons = () => {
    setCurrentPermissions((prev) => ({
      ...prev,
      buttons: []
    }));
  };

  const handleSave = () => {
    updateRolePermissions(selectedRole, currentPermissions);
    enqueueSnackbar(t("permissions.permissionsSaved"), { variant: "success" });
  };

  const getTranslatedMenuName = (item) => {
    if (item.translationKey) {
      const translated = t(item.translationKey);
      return translated === item.translationKey ? item.name : translated;
    }
    return item.name;
  };

  const getTranslatedButtonName = (item) => {
    if (item.translationKey) {
      const translated = t(item.translationKey);
      return translated === item.translationKey ? item.name : translated;
    }
    return item.name;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {t("permissions.title")}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {t("permissions.selectRole")}
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">{t("permissions.role")}</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={selectedRole}
                  label={t("permissions.role")}
                  onChange={handleRoleChange}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {t(role.label)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {t("permissions.description")}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  <Chip
                    label={`${currentPermissions.menus.length} ${t("permissions.menuPermissions")}`}
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={`${currentPermissions.buttons.length} ${t("permissions.buttonPermissions")}`}
                    color="secondary"
                    size="small"
                  />
                </Box>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleSave}
              >
                {t("permissions.savePermissions")}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={9}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="permission tabs"
              >
                <Tab label={t("permissions.menuPermissions")} />
                <Tab label={t("permissions.buttonPermissions")} />
              </Tabs>
            </Box>

            <CardContent>
              <TabPanel value={tabValue} index={0}>
                <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
                  <Button size="small" onClick={handleSelectAllMenus}>
                    {t("permissions.selectAll")}
                  </Button>
                  <Button size="small" onClick={handleDeselectAllMenus}>
                    {t("permissions.deselectAll")}
                  </Button>
                </Box>
                <Paper elevation={0} sx={{ maxHeight: 500, overflow: "auto" }}>
                  <List>
                    {allMenuItems.map((item, index) => (
                      <ListItem key={item.path} disablePadding>
                        <ListItemButton onClick={() => handleMenuToggle(item.path)} dense>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={currentPermissions.menus.includes(item.path)}
                              tabIndex={-1}
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText primary={getTranslatedMenuName(item)} />
                          {currentPermissions.menus.includes(item.path) && (
                            <Chip label="✓" size="small" color="primary" />
                          )}
                        </ListItemButton>
                        {index < allMenuItems.length - 1 && <Divider />}
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
                  <Button size="small" onClick={handleSelectAllButtons}>
                    {t("permissions.selectAll")}
                  </Button>
                  <Button size="small" onClick={handleDeselectAllButtons}>
                    {t("permissions.deselectAll")}
                  </Button>
                </Box>
                <Paper elevation={0} sx={{ maxHeight: 500, overflow: "auto" }}>
                  <List>
                    {allButtonItems.map((item, index) => (
                      <ListItem key={item.id} disablePadding>
                        <ListItemButton onClick={() => handleButtonToggle(item.id)} dense>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={currentPermissions.buttons.includes(item.id)}
                              tabIndex={-1}
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText primary={getTranslatedButtonName(item)} />
                          {currentPermissions.buttons.includes(item.id) && (
                            <Chip label="✓" size="small" color="secondary" />
                          )}
                        </ListItemButton>
                        {index < allButtonItems.length - 1 && <Divider />}
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
