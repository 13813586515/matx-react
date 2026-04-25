import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import Dashboard from "@mui/icons-material/Dashboard";
import Pages from "@mui/icons-material/Description";
import Security from "@mui/icons-material/Security";
import BarChart from "@mui/icons-material/BarChart";
import Widgets from "@mui/icons-material/Widgets";

import useLanguage from "app/hooks/useLanguage";
import useGlobalSearch from "app/hooks/useGlobalSearch";
import navigations from "app/navigations";

const flattenNavigations = (items, parentLabel = null) => {
  const result = [];
  items.forEach((item) => {
    if (item.path && item.type !== "extLink") {
      result.push({
        type: "menu",
        name: item.name,
        translationKey: item.translationKey,
        path: item.path,
        icon: item.icon,
        category: parentLabel || "Menus"
      });
    }
    if (item.children) {
      result.push(...flattenNavigations(item.children, item.name));
    }
  });
  return result;
};

const staticMenuItems = flattenNavigations(navigations);

const getIconComponent = (iconName) => {
  const iconMap = {
    dashboard: Dashboard,
    security: Security,
    trending_up: BarChart,
    favorite: Widgets,
    launch: Pages
  };
  return iconMap[iconName] || Dashboard;
};

export default function GlobalSearchModal() {
  const { t } = useLanguage();
  const { isOpen, closeSearch } = useGlobalSearch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const searchTimerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState({ menus: [], pages: [] });

  const getTranslatedText = useCallback(
    (item) => {
      if (item.translationKey) {
        const translated = t(item.translationKey);
        return translated === item.translationKey ? item.name : translated;
      }
      return item.name;
    },
    [t]
  );

  const performSearch = useCallback(
    (query) => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }

      if (!query.trim()) {
        setSearchResults({ menus: [], pages: [] });
        setSelectedIndex(0);
        return;
      }

      setSearching(true);

      searchTimerRef.current = setTimeout(() => {
        const lowerQuery = query.toLowerCase();

        const filteredMenus = staticMenuItems.filter((item) =>
          getTranslatedText(item).toLowerCase().includes(lowerQuery) ||
          item.path.toLowerCase().includes(lowerQuery)
        );

        const filteredPages = [];
        if ("dashboard".includes(lowerQuery) || query.toLowerCase().includes("dash")) {
          filteredPages.push({
            type: "page",
            name: "Analytics Dashboard",
            translationKey: "dashboard.analytics",
            path: "/dashboard/default",
            icon: "dashboard"
          });
        }

        setSearchResults({
          menus: filteredMenus,
          pages: filteredPages
        });
        setSelectedIndex(0);
        setSearching(false);
      }, 200);
    },
    [getTranslatedText]
  );

  useEffect(() => {
    performSearch(searchQuery);
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, [searchQuery, performSearch]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setSearchQuery("");
      setSelectedIndex(0);
      setSearchResults({ menus: [], pages: [] });
      setSearching(false);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    const totalResults =
      searchResults.menus.length + searchResults.pages.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, totalResults));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + Math.max(1, totalResults)) % Math.max(1, totalResults));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelectItem(selectedIndex);
    }
  };

  const handleSelectItem = (index) => {
    let currentIndex = 0;

    if (currentIndex + searchResults.pages.length > index) {
      const item = searchResults.pages[index - currentIndex];
      navigate(item.path);
      closeSearch();
      return;
    }
    currentIndex += searchResults.pages.length;

    if (currentIndex + searchResults.menus.length > index) {
      const item = searchResults.menus[index - currentIndex];
      navigate(item.path);
      closeSearch();
      return;
    }
  };

  const handleItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
    closeSearch();
  };

  const renderSearchResults = () => {
    if (!searchQuery.trim()) {
      return (
        <Box sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
          <Typography variant="body1">
            {t("search.placeholder")}
          </Typography>
        </Box>
      );
    }

    if (searching) {
      return (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <CircularProgress size={24} />
          <Typography variant="body1" sx={{ mt: 1 }}>
            {t("search.searching")}
          </Typography>
        </Box>
      );
    }

    const totalResults = searchResults.pages.length + searchResults.menus.length;

    if (totalResults === 0) {
      return (
        <Box sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
          <Typography variant="body1">
            {t("search.noResults")}
          </Typography>
        </Box>
      );
    }

    return (
      <List sx={{ maxHeight: 400, overflow: "auto", p: 0 }}>
        {searchResults.pages.length > 0 && (
          <>
            <ListItem sx={{ py: 1, px: 2, bgcolor: "background.default" }}>
              <Chip size="small" label={t("search.categories.pages")} color="primary" />
            </ListItem>
            {searchResults.pages.map((item, idx) => {
              const IconComponent = getIconComponent(item.icon);
              return (
                <ListItemButton
                  key={`page-${idx}`}
                  onClick={() => handleItemClick(item)}
                  selected={
                    searchResults.pages
                      .map((_, i) => i)
                      .includes(selectedIndex - 0)
                  }
                  sx={{ py: 1.5 }}
                >
                  <ListItemIcon>
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText
                    primary={getTranslatedText(item)}
                    secondary={item.path}
                  />
                </ListItemButton>
              );
            })}
          </>
        )}

        {searchResults.menus.length > 0 && (
          <>
            {searchResults.pages.length > 0 && <Divider />}
            <ListItem sx={{ py: 1, px: 2, bgcolor: "background.default" }}>
              <Chip size="small" label={t("search.categories.menus")} color="secondary" />
            </ListItem>
            {searchResults.menus.map((item, idx) => {
              const IconComponent = getIconComponent(item.icon);
              const listIndex = searchResults.pages.length + idx;
              return (
                <ListItemButton
                  key={`menu-${idx}`}
                  onClick={() => handleItemClick(item)}
                  selected={listIndex === selectedIndex}
                  sx={{ py: 1.5 }}
                >
                  <ListItemIcon>
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText
                    primary={getTranslatedText(item)}
                    secondary={item.path}
                  />
                </ListItemButton>
              );
            })}
          </>
        )}
      </List>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeSearch}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 24,
          overflow: "hidden"
        }
      }}
      onKeyDown={handleKeyDown}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
          borderBottom: 1,
          borderColor: "divider"
        }}
      >
        <Search sx={{ mr: 1, color: "text.secondary" }} />
        <InputBase
          inputRef={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("search.placeholder")}
          sx={{ flex: 1, fontSize: 16 }}
          autoFocus
        />
        {searchQuery && (
          <IconButton size="small" onClick={() => setSearchQuery("")}>
            <Close fontSize="small" />
          </IconButton>
        )}
      </Box>
      <DialogContent sx={{ p: 0, maxHeight: 450, overflow: "hidden" }}>
        {renderSearchResults()}
      </DialogContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.default"
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            ↑↓ Navigate
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ↵ Select
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Esc Close
        </Typography>
      </Box>
    </Dialog>
  );
}
