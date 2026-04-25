import { useContext } from "react";
import GlobalSearchContext from "app/contexts/GlobalSearchContext";

export default function useGlobalSearch() {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error("useGlobalSearch must be used within a GlobalSearchProvider");
  }
  return context;
}
