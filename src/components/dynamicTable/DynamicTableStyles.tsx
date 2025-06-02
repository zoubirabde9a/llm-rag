// --- GLOBAL CONSTANTS ---
export const DEFAULT_COLUMN_WIDTH = 250;
export const MIN_COLUMN_WIDTH = 80;
export const MAX_COLUMN_WIDTH = 500;
export const DEFAULT_TABLE_ROW_HEIGHT = 53;
export const DEFAULT_RESIZE_HANDLE_WIDTH = 16; // px
export const AVERAGE_CHAR_WIDTH = 10; // Heuristic: Average width of a character in pixels
export const CELL_PADDING = 24; // Heuristic: Combined horizontal padding within a cell
export const BORDER_COLOR = "#e0e0e0";
export const RESIZE_HANDLE_BG = "rgba(0, 0, 255, 0.1)";
export const RESIZE_HANDLE_BG_HOVER = "rgba(0, 0, 255, 0.3)";
export const RESIZE_HANDLE_OPACITY = 0.5;
export const RESIZE_HANDLE_OPACITY_HOVER = 1;
export const NO_DATA_TEXT = "No data available.";
export const PAGINATION_OPTIONS = [5, 8, 10, 20, 50, 100];

// Styles for table cells
export const getTableCellStyles = (currentWidth: number, minColumnWidth: number, maxColumnWidth: number, borderColor: string, resizeHandleWidth: number) => ({
    width: currentWidth,
    minWidth: minColumnWidth,
    maxWidth: maxColumnWidth,
    boxSizing: 'border-box' as const,
    fontWeight: 'bold',
    backgroundColor: (theme: any) => theme.palette.background.paper,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: `${resizeHandleWidth}px`,
    position: 'relative' as const,
    borderRight: `1px solid ${borderColor}`,
    userSelect: 'none' as const,
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
    transition: 'opacity 0.2s ease-in-out, background-color 0.2s ease-in-out',
    zIndex: 10,
    boxSizing: 'border-box' as const,
});

// Styles for body cells
export const getBodyCellStyles = (currentWidth: number, borderColor: string, tableRowHeight: number) => ({
    maxWidth: currentWidth,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    borderRight: `1px solid ${borderColor}`,
    boxSizing: 'border-box' as const,
    height: tableRowHeight,
});

// Styles for table container
export const tableContainerStyles = {
    overflowX: 'auto' as const,
    maxHeight: '70vh',
};

// Styles for table
export const tableStyles = {
    tableLayout: 'fixed' as const,
    minWidth: '100%',
}; 