// Persistent Theme Context for StudyMate Dynamic Light/Dark modes
import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeModeContext = createContext();

export const useThemeMode = () => useContext(ThemeModeContext);

export const ThemeModeProvider = ({ children }) => {
  // Read saved theme from localStorage, default to 'dark' for sleek premium feel
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("studyMateTheme");
    return saved ? saved : "dark";
  });

  const toggleThemeMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("studyMateTheme", mode);
    // Set theme attribute on document root for index.css variables
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  // Shared typography and shape parameters
  const sharedSettings = {
    typography: {
      fontFamily: '"Inter", "Outfit", "Roboto", "Helvetica", sans-serif',
      h1: { fontFamily: "Outfit", fontWeight: 700 },
      h2: { fontFamily: "Outfit", fontWeight: 700 },
      h3: { fontFamily: "Outfit", fontWeight: 600 },
      h4: { fontFamily: "Outfit", fontWeight: 600 },
      h5: { fontFamily: "Outfit", fontWeight: 500 },
      h6: { fontFamily: "Outfit", fontWeight: 500 },
    },
    shape: {
      borderRadius: 16,
    },
  };

  // Create active MUI theme based on state
  const theme = createTheme({
    ...sharedSettings,
    palette: {
      mode: mode,
      primary: {
        main: mode === "dark" ? "#6366f1" : "#4f46e5", // Indigo
        light: "#818cf8",
        dark: "#3730a3",
        contrastText: "#ffffff",
      },
      secondary: {
        main: mode === "dark" ? "#ec4899" : "#db2777", // Coral Pink
        light: "#f472b6",
        dark: "#9d174d",
        contrastText: "#ffffff",
      },
      background: {
        default: mode === "dark" ? "#0f172a" : "#f8fafc",
        paper: mode === "dark" ? "rgba(30, 41, 59, 0.7)" : "rgba(255, 255, 255, 0.7)",
      },
      text: {
        primary: mode === "dark" ? "#f8fafc" : "#0f172a",
        secondary: mode === "dark" ? "#94a3b8" : "#475569",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 12,
            padding: "10px 20px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: mode === "dark" ? "0 4px 12px rgba(99, 102, 241, 0.2)" : "0 4px 12px rgba(79, 70, 229, 0.15)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: mode === "dark" ? "rgba(30, 41, 59, 0.7)" : "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(16px)",
            border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(99, 102, 241, 0.08)",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
            color: mode === "dark" ? "#f8fafc" : "#0f172a",
            backgroundColor: mode === "dark" ? "rgba(15, 23, 42, 0.5)" : "rgba(241, 245, 249, 0.8)",
          },
          root: {
            borderBottom: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(99, 102, 241, 0.08)",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "rgba(15, 23, 42, 0.3)" : "rgba(255, 255, 255, 0.5)",
          },
        },
      },
    },
  });

  return (
    <ThemeModeContext.Provider value={{ mode, toggleThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
