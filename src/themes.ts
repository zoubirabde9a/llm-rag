import { createTheme, ThemeOptions } from "@mui/material/styles";
import { grey, deepOrange, purple } from '@mui/material/colors'; // Only keep used colors

// Define the possible theme names
export type ThemeName =
  | "classicLight"
  | "minimalist"
  | "darkMode"
  | "corporateBlue"
  | "vibrantFlatUi"
  | "oceanic"
  | "sunriseSunset"
  | "gradientGlow";

// --- Theme Options Definitions ---

// 1. Classic Light: Refined traditional light theme (using previous good version)
const classicLight: ThemeOptions = {
  palette: {
    mode: "light",
    primary: { main: "#3f51b5" }, // Indigo
    secondary: { main: "#f50057" }, // Pink A400
    background: { default: "#fafafa", paper: "#ffffff" },
    text: { primary: "#212121", secondary: "#5f6368" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
};

// 2. Minimalist: Clean, subtle, focus on typography and space (using previous good version)
const minimalist: ThemeOptions = {
  palette: {
    mode: "light",
    primary: { main: "#424242" }, // Dark Grey
    secondary: { main: "#bdbdbd" }, // Light Grey
    background: { default: "#ffffff", paper: "#f7f7f7" },
    text: { primary: "#1a1a1a", secondary: "#757575" },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  components: {
    MuiAppBar: {
        styleOverrides: { root: { boxShadow: 'none', borderBottom: '1px solid #eee' } }
    },
    MuiPaper: { styleOverrides: { root: { boxShadow: "none", border: '1px solid #eee' } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 8 } } }
  },
};

// 3. Dark Mode: *** REVISED FOR BETTER CONTRAST & COHESION ***
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


// 4. Corporate Blue: Professional, clean, trustworthy (using previous good version)
const corporateBlue: ThemeOptions = {
  palette: {
    mode: "light",
    primary: { main: "#0d47a1" }, // Deep Blue
    secondary: { main: "#4fc3f7" }, // Light Blue
    background: { default: "#f4f6f8", paper: "#ffffff" },
    text: { primary: "#263238", secondary: "#546e7a" },
  },
  typography: {
    fontFamily: '"Lato", "Roboto Slab", "Arial", sans-serif',
    fontWeightBold: 700,
  },
    components: {
        MuiButton: { styleOverrides: { root: { borderRadius: 4 } } }
    }
};

// 5. Vibrant Flat UI: Bright, energetic, modern flat aesthetic (using previous good version)
const vibrantFlatUi: ThemeOptions = {
  palette: {
    mode: "light",
    primary: { main: "#2980b9" }, // Peter River Blue
    secondary: { main: "#27ae60" }, // Emerald Green
    background: { default: "#ecf0f1", paper: "#ffffff" }, // Clouds White
    text: { primary: "#2c3e50", secondary: "#34495e" }, // Wet Asphalt / Midnight Blue
    error: { main: "#e74c3c" }, // Alizarin Red
    warning: { main: "#f1c40f" }, // Sun Flower Yellow
    info: { main: "#3498db" }, // Belize Hole Blue
    success: { main: "#2ecc71" }, // Emerald Green
  },
  typography: {
    fontFamily: '"Montserrat", "Arial", sans-serif',
    fontWeightBold: 700,
  },
  components: {
      MuiButton: {
          styleOverrides: {
              root: {
                  boxShadow: 'none',
                  textTransform: 'none',
                  fontWeight: 600,
              },
              containedPrimary: {
                  '&:hover': {
                    backgroundColor: '#3498db',
                    boxShadow: 'none',
                  }
              },
              containedSecondary: {
                 '&:hover': {
                    backgroundColor: '#2ecc71',
                    boxShadow: 'none',
                  }
              }
          }
      },
       MuiPaper: { styleOverrides: { root: { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } } },
  }
};

// 6. Oceanic: Inspired by ocean colors and depth
const oceanic: ThemeOptions = {
  palette: {
    mode: "light",
    primary: { main: "#0277bd" }, // Deep Ocean Blue
    secondary: { main: "#00acc1" }, // Teal/Aqua
    background: { default: "#e1f5fe", paper: "#ffffff" },
    text: { primary: "#01579b", secondary: "#0288d1" },
    error: { main: "#d32f2f" },
    warning: { main: "#ffa000" },
    info: { main: "#0091ea" },
    success: { main: "#00897b" }, // Teal Green
  },
  typography: {
    fontFamily: '"Quicksand", "Roboto", "Arial", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  components: {
    MuiPaper: { 
      styleOverrides: { 
        root: { 
          boxShadow: "0 4px 6px rgba(0,0,0,0.08)",
          borderRadius: 8 
        } 
      } 
    },
    MuiButton: { 
      styleOverrides: { 
        root: { 
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500 
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #0277bd 0%, #00acc1 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #01579b 0%, #0288d1 100%)',
          }
        }
      } 
    },
    MuiAppBar: {
      styleOverrides: { 
        root: { 
          background: 'linear-gradient(90deg, #01579b 0%, #0288d1 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
        } 
      }
    }
  }
};

// 7. Sunrise/Sunset: Warm gradient colors inspired by dawn and dusk
const sunriseSunset: ThemeOptions = {
  palette: {
    mode: "light",
    primary: { main: deepOrange[600] }, // Sunset Orange
    secondary: { main: purple[300] }, // Twilight Purple
    background: { default: "#fff8e1", paper: "#ffffff" },
    text: { primary: "#3e2723", secondary: "#5d4037" },
    error: { main: "#c62828" },
    warning: { main: "#ff8f00" },
    info: { main: "#0288d1" },
    success: { main: "#2e7d32" },
  },
  typography: {
    fontFamily: '"Raleway", "Roboto", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
  },
  components: {
    MuiPaper: { 
      styleOverrides: { 
        root: { 
          boxShadow: "0 2px 8px rgba(0,0,0,0.09)",
          borderRadius: 6 
        } 
      } 
    },
    MuiButton: { 
      styleOverrides: { 
        root: { 
          textTransform: 'none',
          borderRadius: 20,
          fontWeight: 500 
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #ff7043 0%, #ffab40 100%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #e64a19 0%, #ff9100 100%)',
          }
        }
      } 
    },
    MuiAppBar: {
      styleOverrides: { 
        root: { 
          background: 'linear-gradient(90deg, #ff7043 0%, #ffab40 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.12)' 
        } 
      }
    }
  }
};

// 8. Gradient Glow: Modern theme with vibrant animated purple gradient accents
const gradientGlow: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: { main: "#a259f7" }, // Vibrant Purple
    secondary: { main: "#ff6ec4" }, // Pink Accent
    background: { default: "#1a1333", paper: "#231942" }, // Deep purple gradient base
    text: { primary: "#fff", secondary: grey[300] },
    error: { main: "#ff5370" },
    warning: { main: "#ffb74d" },
    info: { main: "#64b5f6" },
    success: { main: "#81c784" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          body: {
            background: 'linear-gradient(270deg, #a259f7, #6a82fb, #ff6ec4, #a259f7)',
            backgroundSize: '600% 600%',
            animation: 'bgColorCycle 10s ease infinite',
          },
          '@keyframes bgColorCycle': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        },
      },
    },
    MuiPaper: { 
      styleOverrides: { 
        root: { 
          background: 'linear-gradient(135deg, #231942 60%, #6a82fb 100%)',
          boxShadow: "0 4px 20px rgba(162,89,247,0.25)",
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
          background: 'linear-gradient(90deg, #a259f7 0%, #6a82fb 100%)',
          color: '#fff',
          boxShadow: '0 2px 8px rgba(162,89,247,0.25)',
          '&:hover': {
            background: 'linear-gradient(90deg, #6a82fb 0%, #a259f7 100%)',
            boxShadow: '0 4px 16px rgba(162,89,247,0.35)',
          }
        },
        containedSecondary: {
          background: 'linear-gradient(90deg, #ff6ec4 0%, #7878ff 100%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(90deg, #7878ff 0%, #ff6ec4 100%)',
          }
        }
      } 
    },
    MuiAppBar: {
      styleOverrides: { 
        root: { 
          background: 'linear-gradient(90deg, #a259f7 0%, #ff6ec4 100%)',
          boxShadow: '0 2px 8px rgba(162,89,247,0.25)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        } 
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#6a82fb",
          color: "#fff",
          fontWeight: 'bold',
        },
        body: {
          color: "#fff",
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
        footer: {
          color: grey[300],
          borderColor: 'rgba(255, 255, 255, 0.12)',
        }
      }
    }
  }
};

// --- Create and Export Themes ---

const themes: Record<ThemeName, ReturnType<typeof createTheme>> = {
  classicLight: createTheme(classicLight),
  minimalist: createTheme(minimalist),
  darkMode: createTheme(darkMode), // Using the revised dark mode
  corporateBlue: createTheme(corporateBlue),
  vibrantFlatUi: createTheme(vibrantFlatUi),
  oceanic: createTheme(oceanic),
  sunriseSunset: createTheme(sunriseSunset),
  gradientGlow: createTheme(gradientGlow),
};

export default themes;

export const THEME_NAMES: ThemeName[] = [
  "classicLight",
  "minimalist",
  "darkMode",
  "corporateBlue",
  "vibrantFlatUi",
  "oceanic",
  "sunriseSunset",
  "gradientGlow",
];

export const THEME_LABELS: Record<ThemeName, string> = {
  classicLight: "Classic Light",
  minimalist: "Minimalist",
  darkMode: "Dark Mode",
  corporateBlue: "Corporate Blue",
  vibrantFlatUi: "Vibrant Flat UI",
  oceanic: "Oceanic",
  sunriseSunset: "Sunrise/Sunset",
  gradientGlow: "Gradient Glow",
};