import { createContext, useState, useEffect, useCallback } from "react";
import { authRoles } from "app/auth/authRoles";

const PERMISSIONS_KEY = "userPermissions";

const defaultPermissions = {
  menus: [
    "/dashboard/default",
    "/session/signin",
    "/session/signup",
    "/session/forgot-password",
    "/session/404",
    "/material/autocomplete",
    "/material/buttons",
    "/material/checkbox",
    "/material/dialog",
    "/material/expansion-panel",
    "/material/form",
    "/material/icons",
    "/material/menu",
    "/material/progress",
    "/material/radio",
    "/material/switch",
    "/material/slider",
    "/material/snackbar",
    "/material/table",
    "/charts/echarts"
  ],
  buttons: []
};

const rolePermissions = {
  SA: {
    menus: [
      "/dashboard/default",
      "/session/signin",
      "/session/signup",
      "/session/forgot-password",
      "/session/404",
      "/material/autocomplete",
      "/material/buttons",
      "/material/checkbox",
      "/material/dialog",
      "/material/expansion-panel",
      "/material/form",
      "/material/icons",
      "/material/menu",
      "/material/progress",
      "/material/radio",
      "/material/switch",
      "/material/slider",
      "/material/snackbar",
      "/material/table",
      "/charts/echarts",
      "/permissions/management"
    ],
    buttons: ["btn_add", "btn_edit", "btn_delete", "btn_export", "btn_import"]
  },
  ADMIN: {
    menus: [
      "/dashboard/default",
      "/session/signin",
      "/session/signup",
      "/session/forgot-password",
      "/session/404",
      "/material/autocomplete",
      "/material/buttons",
      "/material/checkbox",
      "/material/dialog",
      "/material/expansion-panel",
      "/material/form",
      "/material/icons",
      "/material/menu",
      "/material/progress",
      "/material/radio",
      "/material/switch",
      "/material/slider",
      "/material/snackbar",
      "/material/table",
      "/charts/echarts"
    ],
    buttons: ["btn_add", "btn_edit", "btn_export"]
  },
  EDITOR: {
    menus: [
      "/dashboard/default",
      "/session/signin",
      "/session/signup",
      "/session/forgot-password",
      "/session/404",
      "/material/autocomplete",
      "/material/buttons",
      "/material/checkbox",
      "/material/dialog",
      "/material/expansion-panel",
      "/material/form",
      "/material/icons",
      "/material/menu",
      "/material/progress",
      "/material/radio",
      "/material/switch",
      "/material/slider",
      "/material/snackbar",
      "/material/table",
      "/charts/echarts"
    ],
    buttons: ["btn_add", "btn_edit"]
  },
  GUEST: {
    menus: [
      "/dashboard/default",
      "/session/signin",
      "/session/signup",
      "/session/forgot-password",
      "/session/404",
      "/material/autocomplete",
      "/material/buttons",
      "/material/checkbox",
      "/material/dialog",
      "/material/expansion-panel",
      "/material/form",
      "/material/icons",
      "/material/menu",
      "/material/progress",
      "/material/radio",
      "/material/switch",
      "/material/slider",
      "/material/snackbar",
      "/material/table",
      "/charts/echarts"
    ],
    buttons: []
  }
};

const allMenuItems = [
  { path: "/dashboard/default", name: "Dashboard", translationKey: "navigation.dashboard" },
  { path: "/session/signin", name: "Sign In", translationKey: "sidebar.signIn" },
  { path: "/session/signup", name: "Sign Up", translationKey: "sidebar.signUp" },
  { path: "/session/forgot-password", name: "Forgot Password", translationKey: "sidebar.forgotPassword" },
  { path: "/session/404", name: "Error 404", translationKey: "sidebar.error" },
  { path: "/material/autocomplete", name: "Auto Complete", translationKey: "sidebar.autoComplete" },
  { path: "/material/buttons", name: "Buttons", translationKey: "sidebar.buttons" },
  { path: "/material/checkbox", name: "Checkbox", translationKey: "sidebar.checkbox" },
  { path: "/material/dialog", name: "Dialog", translationKey: "sidebar.dialog" },
  { path: "/material/expansion-panel", name: "Expansion Panel", translationKey: "sidebar.expansionPanel" },
  { path: "/material/form", name: "Form", translationKey: "sidebar.form" },
  { path: "/material/icons", name: "Icons", translationKey: "sidebar.icons" },
  { path: "/material/menu", name: "Menu", translationKey: "sidebar.menu" },
  { path: "/material/progress", name: "Progress", translationKey: "sidebar.progress" },
  { path: "/material/radio", name: "Radio", translationKey: "sidebar.radio" },
  { path: "/material/switch", name: "Switch", translationKey: "sidebar.switch" },
  { path: "/material/slider", name: "Slider", translationKey: "sidebar.slider" },
  { path: "/material/snackbar", name: "Snackbar", translationKey: "sidebar.snackbar" },
  { path: "/material/table", name: "Table", translationKey: "sidebar.table" },
  { path: "/charts/echarts", name: "Echarts", translationKey: "sidebar.echarts" },
  { path: "/permissions/management", name: "Permission Management", translationKey: "navigation.permissionManagement" }
];

const allButtonItems = [
  { id: "btn_add", name: "Add Button", translationKey: "common.add" },
  { id: "btn_edit", name: "Edit Button", translationKey: "common.edit" },
  { id: "btn_delete", name: "Delete Button", translationKey: "common.delete" },
  { id: "btn_export", name: "Export Button", translationKey: "common.export" },
  { id: "btn_import", name: "Import Button", translationKey: "common.import" }
];

const PermissionContext = createContext({
  permissions: defaultPermissions,
  allMenuItems: [],
  allButtonItems: [],
  rolePermissions: {},
  hasMenuPermission: () => true,
  hasButtonPermission: () => true,
  updateRolePermissions: () => {},
  getPermissionsForRole: () => defaultPermissions
});

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(() => {
    const saved = localStorage.getItem(PERMISSIONS_KEY);
    return saved ? JSON.parse(saved) : { ...rolePermissions };
  });

  useEffect(() => {
    localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));
  }, [permissions]);

  const hasMenuPermission = useCallback((path, userRole) => {
    if (!userRole) return false;
    const rolePerms = permissions[userRole] || rolePermissions[userRole] || defaultPermissions;
    return rolePerms.menus.includes(path);
  }, [permissions]);

  const hasButtonPermission = useCallback((buttonId, userRole) => {
    if (!userRole) return false;
    const rolePerms = permissions[userRole] || rolePermissions[userRole] || defaultPermissions;
    return rolePerms.buttons.includes(buttonId);
  }, [permissions]);

  const updateRolePermissions = useCallback((role, newPermissions) => {
    setPermissions(prev => ({
      ...prev,
      [role]: newPermissions
    }));
  }, []);

  const getPermissionsForRole = useCallback((role) => {
    return permissions[role] || rolePermissions[role] || defaultPermissions;
  }, [permissions]);

  const value = {
    permissions,
    allMenuItems,
    allButtonItems,
    rolePermissions,
    hasMenuPermission,
    hasButtonPermission,
    updateRolePermissions,
    getPermissionsForRole
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionContext;
