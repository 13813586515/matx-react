import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Translate from "@mui/icons-material/Translate";
import useLanguage from "app/hooks/useLanguage";
import { MatxMenu } from "./index";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 150,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary }
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setAnchorEl(null);
  };

  return (
    <MatxMenu
      menuButton={
        <StyledIconButton>
          <Translate />
        </StyledIconButton>
      }
    >
      <StyledMenuItem
        selected={language === "en"}
        onClick={() => handleLanguageChange("en")}
      >
        English
      </StyledMenuItem>
      <StyledMenuItem
        selected={language === "zh"}
        onClick={() => handleLanguageChange("zh")}
      >
        中文
      </StyledMenuItem>
    </MatxMenu>
  );
}
