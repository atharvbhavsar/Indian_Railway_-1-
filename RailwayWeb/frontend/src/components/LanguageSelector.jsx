import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSelector({ style }) {
  const { language, changeLanguage } = useLanguage();

  const cycleLanguage = () => {
    if (language === "en") {
      changeLanguage("hi");
    } else if (language === "hi") {
      changeLanguage("mr");
    } else {
      changeLanguage("en");
    }
  };

  const labelMap = {
    en: "EN",
    hi: "HI",
    mr: "MR"
  };

  return (
    <button
      id="global-language-selector"
      onClick={cycleLanguage}
      title={`Switch Language (Current: ${labelMap[language]})`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(15, 23, 42, 0.6)",
        color: "#ffffff",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "50%",
        width: "36px",
        height: "36px",
        cursor: "pointer",
        outline: "none",
        transition: "all 0.2s",
        position: "relative",
        padding: 0,
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(15, 23, 42, 0.8)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(15, 23, 42, 0.6)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
      }}
    >
      <Globe size={18} />
      <span style={{
        position: "absolute",
        bottom: "-2px",
        right: "-2px",
        background: "#3b82f6",
        color: "#ffffff",
        fontSize: "8px",
        fontWeight: "bold",
        padding: "1px 3px",
        borderRadius: "4px",
        textTransform: "uppercase"
      }}>
        {labelMap[language]}
      </span>
    </button>
  );
}

