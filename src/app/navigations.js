const navigations = [
  {
    name: "Dashboard",
    translationKey: "navigation.dashboard",
    path: "/dashboard/default",
    icon: "dashboard"
  },
  { label: "PAGES", type: "label", translationKey: "navigation.pages" },
  {
    name: "Session/Auth",
    translationKey: "navigation.sessionAuth",
    icon: "security",
    children: [
      {
        name: "Sign in",
        translationKey: "sidebar.signIn",
        iconText: "SI",
        path: "/session/signin"
      },
      {
        name: "Sign up",
        translationKey: "sidebar.signUp",
        iconText: "SU",
        path: "/session/signup"
      },
      {
        name: "Forgot Password",
        translationKey: "sidebar.forgotPassword",
        iconText: "FP",
        path: "/session/forgot-password"
      },
      {
        name: "Error",
        translationKey: "sidebar.error",
        iconText: "404",
        path: "/session/404"
      }
    ]
  },
  { label: "Components", type: "label", translationKey: "navigation.components" },
  {
    name: "Components",
    translationKey: "navigation.components",
    icon: "favorite",
    badge: { value: "30+", color: "secondary" },
    children: [
      {
        name: "Auto Complete",
        translationKey: "sidebar.autoComplete",
        path: "/material/autocomplete",
        iconText: "A"
      },
      {
        name: "Buttons",
        translationKey: "sidebar.buttons",
        path: "/material/buttons",
        iconText: "B"
      },
      {
        name: "Checkbox",
        translationKey: "sidebar.checkbox",
        path: "/material/checkbox",
        iconText: "C"
      },
      {
        name: "Dialog",
        translationKey: "sidebar.dialog",
        path: "/material/dialog",
        iconText: "D"
      },
      {
        name: "Expansion Panel",
        translationKey: "sidebar.expansionPanel",
        path: "/material/expansion-panel",
        iconText: "E"
      },
      {
        name: "Form",
        translationKey: "sidebar.form",
        path: "/material/form",
        iconText: "F"
      },
      {
        name: "Icons",
        translationKey: "sidebar.icons",
        path: "/material/icons",
        iconText: "I"
      },
      {
        name: "Menu",
        translationKey: "sidebar.menu",
        path: "/material/menu",
        iconText: "M"
      },
      {
        name: "Progress",
        translationKey: "sidebar.progress",
        path: "/material/progress",
        iconText: "P"
      },
      {
        name: "Radio",
        translationKey: "sidebar.radio",
        path: "/material/radio",
        iconText: "R"
      },
      {
        name: "Switch",
        translationKey: "sidebar.switch",
        path: "/material/switch",
        iconText: "S"
      },
      {
        name: "Slider",
        translationKey: "sidebar.slider",
        path: "/material/slider",
        iconText: "S"
      },
      {
        name: "Snackbar",
        translationKey: "sidebar.snackbar",
        path: "/material/snackbar",
        iconText: "S"
      },
      {
        name: "Table",
        translationKey: "sidebar.table",
        path: "/material/table",
        iconText: "T"
      }
    ]
  },
  {
    name: "Charts",
    translationKey: "navigation.charts",
    icon: "trending_up",
    children: [
      {
        name: "Echarts",
        translationKey: "sidebar.echarts",
        path: "/charts/echarts",
        iconText: "E"
      }
    ]
  },
  {
    name: "Permission Management",
    translationKey: "navigation.permissionManagement",
    icon: "security",
    path: "/permissions/management"
  },
  {
    name: "Documentation",
    translationKey: "navigation.documentation",
    icon: "launch",
    type: "extLink",
    path: "http://demos.ui-lib.com/matx-react-doc/"
  }
];

export default navigations;
