import { useContext } from "react";
import PermissionContext from "app/contexts/PermissionContext";

export default function usePermission() {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermission must be used within a PermissionProvider");
  }
  return context;
}
