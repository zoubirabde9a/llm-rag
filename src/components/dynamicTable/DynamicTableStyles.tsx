import { Theme } from '@mui/material/styles';

// --- GLOBAL CONSTANTS ---
export const DEFAULT_COLUMN_WIDTH = 250;
export const MIN_COLUMN_WIDTH = 80;
export const MAX_COLUMN_WIDTH = 500;
export const DEFAULT_TABLE_ROW_HEIGHT = 53;
export const DEFAULT_RESIZE_HANDLE_WIDTH = 16; // px
export const AVERAGE_CHAR_WIDTH = 10; // Heuristic: Average width of a character in pixels
export const CELL_PADDING = 24; // Heuristic: Combined horizontal padding within a cell
export const BORDER_COLOR = "rgba(0, 255, 255, 0.3)"; // Cyan border for futuristic look
export const RESIZE_HANDLE_BG = "rgba(0, 255, 255, 0.1)";
export const RESIZE_HANDLE_BG_HOVER = "rgba(0, 255, 255, 0.4)";
export const RESIZE_HANDLE_OPACITY = 0.5;
export const RESIZE_HANDLE_OPACITY_HOVER = 1;
export const NO_DATA_TEXT = "No data available.";
export const PAGINATION_OPTIONS = [5, 8, 10, 20, 50, 100];

// Animation keyframes
const fadeIn = {
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
};

// Styles for table cells
export const getTableCellStyles = (currentWidth: number, minColumnWidth: number, maxColumnWidth: number, borderColor: string, resizeHandleWidth: number) => ({
    width: currentWidth,
    minWidth: minColumnWidth,
    maxWidth: maxColumnWidth,
    boxSizing: 'border-box' as const,
    fontWeight: 600,
    backgroundColor: 'rgba(13, 17, 23, 0.7)',
    color: '#64b5f6',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: `${resizeHandleWidth}px`,
    position: 'relative' as const,
    borderRight: `1px solid ${borderColor}`,
    borderBottom: `1px solid ${borderColor}`,
    userSelect: 'none' as const,
    backdropFilter: 'blur(10px)',
    willChange: 'width',
    '&:hover': {
      backgroundColor: 'rgba(64, 156, 255, 0.1)',
      color: '#90caf9',
      boxShadow: `0 0 10px ${borderColor}`,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '4px',
      height: '4px',
      backgroundColor: borderColor,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
      pointerEvents: 'none',
    },
});

// Styles for resize handle
export const getResizeHandleStyles = (resizeHandleWidth: number, resizeHandleBg: string, resizeHandleOpacity: number) => ({
    position: 'absolute' as const,
    top: 0,
    right: 0,
    bottom: 0,
    width: `${resizeHandleWidth}px`,
    cursor: 'col-resize' as const,
    backgroundColor: resizeHandleBg,
    opacity: resizeHandleOpacity,
    zIndex: 10,
    boxSizing: 'border-box' as const,
    willChange: 'opacity, background-color',
    '&:hover': {
      backgroundColor: 'rgba(0, 255, 255, 0.4)',
      boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
    },
});

// Styles for body cells
export const getBodyCellStyles = (currentWidth: number, borderColor: string, tableRowHeight: number) => ({
    maxWidth: currentWidth,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    borderRight: `1px solid ${borderColor}`,
    borderBottom: `1px solid ${borderColor}`,
    boxSizing: 'border-box' as const,
    height: tableRowHeight,
    color: '#e1e1e1',
    willChange: 'width',
    position: 'relative' as const,
    '&:hover': {
      backgroundColor: 'rgba(64, 156, 255, 0.1)',
      color: '#90caf9',
      transform: 'scale(1.002)',
      boxShadow: `0 0 15px ${borderColor}`,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '4px',
      height: '4px',
      backgroundColor: borderColor,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
      pointerEvents: 'none',
    },
});

// Styles for table container
export const tableContainerStyles = {
    overflowX: 'auto' as const,
    maxHeight: '70vh',
    animation: 'fadeIn 0.8s ease-out',
    ...fadeIn,
    willChange: 'transform',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(13, 17, 23, 0.7)',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 255, 255, 0.3)',
      borderRadius: '4px',
      '&:hover': {
        background: 'rgba(0, 255, 255, 0.5)',
      },
    },
};

// Styles for table
export const tableStyles = {
    tableLayout: 'fixed' as const,
    minWidth: '100%',
    background: 'rgba(13, 17, 23, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '0',
    border: `1px solid ${BORDER_COLOR}`,
    boxShadow: `0 0 20px ${BORDER_COLOR}`,
    willChange: 'transform',
    '& .MuiTableHead-root': {
      '& .MuiTableCell-root': {
        borderBottom: `2px solid ${BORDER_COLOR}`,
      },
    },
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root:last-child': {
        '& .MuiTableCell-root': {
          borderBottom: 'none',
        },
      },
    },
}; 