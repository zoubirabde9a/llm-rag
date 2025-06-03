import { createTheme, ThemeOptions } from "@mui/material/styles";
import { grey } from '@mui/material/colors'; // Only keep used colors

// Extend the theme type to include particleColor
declare module '@mui/material/styles' {
  interface Palette {
    particleColor: string;
  }
  interface PaletteOptions {
    particleColor: string;
  }
}

// Define the possible theme names
export type ThemeName =
  | "classicLight"
  | "darkMode"
  | "gradientGlow";

// --- Theme Options Definitions ---

// 1. Classic Light: Refined traditional light theme (using previous good version)
const classicLight: ThemeOptions = {
  palette: {
    mode: "light",
    primary: { main: "#3f51b5" }, // Indigo
    secondary: { main: "#f50057" }, // Pink A400
    background: {
      default: "#f5f5f0", // "blanc cassé" – a warm, slightly off-white tone
      paper: "#ffffff"    // pure white, if you still want to keep paper stark white
    },
    text: { primary: "#212121", secondary: "#5f6368" },
    particleColor: "#3f51b5", // Indigo particles for classic light theme
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
};

// 2. Dark Mode: *** REVISED FOR BETTER CONTRAST & COHESION ***
const darkMode: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: { main: "#64b5f6" }, // Lighter Blue (better contrast)
    secondary: { main: "#81c784" }, // Soft Green (pleasant accent)
    background: {
      default: "#121212", // Standard dark background
      paper: "#1e1e1e",   // Standard dark paper/surface
    },
    text: {
      primary: "#e1e1e1",   // Brighter primary text
      secondary: grey[500], // Softer grey for secondary text
      disabled: grey[700],
    },
    divider: 'rgba(255, 255, 255, 0.12)', // Explicit divider color
    particleColor: "#64b5f6", // Light blue particles for dark mode
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  components: {
    // --- Fix Table Appearance ---
    MuiPaper: { // Ensure paper surfaces use the dark paper color
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Prevent potential gradient issues
          backgroundColor: "#1e1e1e", // Explicitly set paper background
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: { // Style header cells
          backgroundColor: "#333333", // Darker distinct header background
          color: "#ffffff",          // Bright white text for header
          fontWeight: 'bold',
        },
        body: { // Style body cells
          color: "#e1e1e1",          // Primary text color for body
          borderColor: 'rgba(255, 255, 255, 0.12)', // Use divider color for borders
        },
        footer: { // Style footer cells (if any)
           color: grey[400],
           borderColor: 'rgba(255, 255, 255, 0.12)',
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)', // Subtle hover effect that maintains contrast
          }
        }
      }
    },
     MuiTablePagination: {
      styleOverrides: {
        root: { // Ensure pagination uses appropriate colors
          color: grey[500], // Secondary text color
          backgroundColor: "#1e1e1e", // Use paper color for background consistency
          borderTop: '1px solid rgba(255, 255, 255, 0.12)' // Add divider line
        },
        selectLabel: {
           color: grey[500],
        },
        displayedRows: {
            color: grey[500],
        },
        // Ensure actions (arrows) are visible
        actions: {
            '& .MuiIconButton-root': {
                color: grey[500], // Use secondary text color for icon buttons
                 '&.Mui-disabled': {
                    color: grey[700], // Use disabled text color when disabled
                 }
            }
        },
         // Ensure the Select dropdown looks correct in dark mode
         selectIcon: {
            color: grey[500],
         },
         select: {
            color: grey[400], // Slightly brighter for the selected value
         }
      }
    },
    // --- General Component Adjustments ---
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e", // Use paper color for AppBar
          backgroundImage: 'none',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)' // Add subtle border
        }
      }
    },
     MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none', // Keep button text casing as is
            },
             containedPrimary: { // Style primary contained buttons
                 color: '#000', // Dark text on light blue button
                 '&:hover': {
                     backgroundColor: '#90caf9', // Lighter blue on hover
                 }
            },
             containedSecondary: { // Style secondary contained buttons
                 color: '#000', // Dark text on light green button
                  '&:hover': {
                     backgroundColor: '#a5d6a7', // Lighter green on hover
                 }
            }
        }
     },
    MuiOutlinedInput: { // Style outlined inputs (like the Theme selector)
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)', // Lighter border
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgba(255, 255, 255, 0.5)', // Brighter border on hover
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#64b5f6', // Primary color border when focused
                },
            },
             input: {
                 color: '#e1e1e1', // Ensure input text is light
                 '&::placeholder': {
                     color: grey[600], // Placeholder text color
                     opacity: 1,
                 },
             }
        }
    },
     MuiSelect: { // Style select dropdown icon
         styleOverrides: {
             icon: {
                 color: grey[500],
             }
         }
     },
      MuiTypography: { // Ensure base typography uses correct color
          styleOverrides: {
              root: {
                  color: '#e1e1e1' // Default to primary text color
              }
          }
      }
  }
};

// 3. Gradient Glow: Modern theme with vibrant animated purple gradient accents
const gradientGlow: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: { main: "#9c27b0" }, // Material UI Purple
    secondary: { main: "#e91e63" }, // Material UI Pink
    background: { default: "#1a1a2e", paper: "#2d2d4d" }, // Deep purple-tinted dark background
    text: { primary: "#ffffff", secondary: grey[300] },
    error: { main: "#ff5370" },
    warning: { main: "#ffb74d" },
    info: { main: "#64b5f6" },
    success: { main: "#81c784" },
    particleColor: "#ffffff", // Pink particles for gradient glow theme
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  components: {
    MuiPaper: { 
      styleOverrides: { 
        root: { 
          backgroundColor: "#2d2d4d",
          boxShadow: "0 4px 20px rgba(156,39,176,0.15)",
          borderRadius: 16
        } 
      } 
    },
    MuiButton: { 
      styleOverrides: { 
        root: { 
          textTransform: 'none',
          borderRadius: 10,
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: "#9c27b0",
          color: '#fff',
          boxShadow: '0 2px 8px rgba(156,39,176,0.25)',
          '&:hover': {
            backgroundColor: "#7b1fa2",
            boxShadow: '0 4px 16px rgba(156,39,176,0.35)',
          }
        },
        containedSecondary: {
          backgroundColor: "#e91e63",
          color: '#fff',
          '&:hover': {
            backgroundColor: "#c2185b",
          }
        }
      } 
    },
    MuiAppBar: {
      styleOverrides: { 
        root: { 
          backgroundColor: "#2d2d4d",
          boxShadow: '0 2px 8px rgba(156,39,176,0.15)',
          borderBottom: '1px solid rgba(156,39,176,0.2)'
        } 
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#2d2d4d",
          color: "#fff",
          fontWeight: 'bold',
        },
        body: {
          color: "#fff",
          borderColor: 'rgba(156,39,176,0.2)',
        },
        footer: {
          color: grey[300],
          borderColor: 'rgba(156,39,176,0.2)',
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(156,39,176,0.15)', // Purple-tinted hover effect
          }
        }
      }
    }
  }
};

// --- Create and Export Themes ---

const themes: Record<ThemeName, ReturnType<typeof createTheme>> = {
  classicLight: createTheme(classicLight),
  darkMode: createTheme(darkMode),
  gradientGlow: createTheme(gradientGlow),
};

export default themes;

export const THEME_NAMES: ThemeName[] = [
  "classicLight",
  "darkMode",
  "gradientGlow",
];

export const THEME_LABELS: Record<ThemeName, string> = {
  classicLight: "Classic Light",
  darkMode: "Dark Mode",
  gradientGlow: "Gradient Glow",
};