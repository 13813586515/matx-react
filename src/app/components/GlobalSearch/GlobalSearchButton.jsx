import { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import Search from "@mui/icons-material/Search";

import useGlobalSearch from "app/hooks/useGlobalSearch";
import useLanguage from "app/hooks/useLanguage";
import { topBarHeight } from "app/utils/constant";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const SearchContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 9,
  width: "100%",
  display: "flex",
  alignItems: "center",
  height: topBarHeight,
  background: theme.palette.primary.main,
  color: theme.palette.text.primary
}));

const SearchTrigger = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "4px 12px",
  borderRadius: "4px",
  transition: "all 0.2s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.08)"
  }
}));

const Kbd = styled("kbd")(({ theme }) => ({
  padding: "2px 6px",
  fontSize: "11px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  background: "rgba(255, 255, 255, 0.15)",
  borderRadius: "3px",
  marginLeft: "8px",
  fontFamily: "monospace"
}));

export default function GlobalSearchButton() {
  const { openSearch } = useGlobalSearch();
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const modifierKey = isMac ? "⌘" : "Ctrl";

  return (
    <Fragment>
      <SearchTrigger
        onClick={openSearch}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Search sx={{ color: "text.primary", fontSize: 20 }} />
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            ml: 1
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "text.primary", opacity: hovered ? 1 : 0.8 }}
          >
            {t("common.search")}
          </Typography>
          <Kbd>{modifierKey}+K</Kbd>
        </Box>
      </SearchTrigger>
    </Fragment>
  );
}
