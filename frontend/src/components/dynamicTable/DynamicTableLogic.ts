import {
  AVERAGE_CHAR_WIDTH,
  CELL_PADDING,
} from "./DynamicTableStyles";

export interface ColumnWidths {
  [key: string]: number;
}

export interface SavedState {
  perPage: number | null;
  columnWidths: ColumnWidths | null;
}

/**
 * A simple utility to compare two width objects for equality.
 */
export const areWidthsEqual = (
  obj1: ColumnWidths,
  obj2: ColumnWidths
): boolean => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

export const getTableStorageKey = (columns: string[]) => `dynamicTable_${columns.join("_")}`;

export const calculateInitialColumnWidths = (
  columns: string[],
  data: Record<string, unknown>[],
  minColumnWidth: number,
  maxColumnWidth: number,
  defaultColumnWidth: number
): ColumnWidths => {
  const newCalculatedWidths: ColumnWidths = {};

  columns.forEach(col => {
    let maxLength = col.length;
    data.forEach(row => {
      const cellContent = String(row[col] ?? "");
      maxLength = Math.max(maxLength, cellContent.length);
    });

    const estimatedPixelWidth = maxLength * AVERAGE_CHAR_WIDTH + CELL_PADDING;
    const clampedWidth = Math.max(
      minColumnWidth,
      Math.min(maxColumnWidth, estimatedPixelWidth)
    );
    const initialWidth = Math.min(defaultColumnWidth, clampedWidth);

    newCalculatedWidths[col] = initialWidth;
  });

  return newCalculatedWidths;
};

// Safe localStorage access
const getLocalStorage = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

const setLocalStorage = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

export const loadSavedState = (storageKey: string): SavedState => {
  const savedPerPage = getLocalStorage(storageKey + '_perPage');
  const savedWidths = getLocalStorage(storageKey + '_widths');
  
  return {
    perPage: savedPerPage ? parseInt(savedPerPage, 10) : null,
    columnWidths: savedWidths ? JSON.parse(savedWidths) : null,
  };
};

export const saveState = (
  storageKey: string,
  perPage: number,
  columnWidths: ColumnWidths,
  columns: string[]
): void => {
  if (columns.length === 0) return;

  setLocalStorage(storageKey + '_widths', JSON.stringify(columnWidths));
  setLocalStorage(storageKey + '_perPage', String(perPage));
};

export const calculateNewColumnWidth = (
  startWidth: number,
  deltaX: number,
  minColumnWidth: number,
  maxColumnWidth: number
): number => {
  return Math.max(
    minColumnWidth,
    Math.min(maxColumnWidth, startWidth + deltaX)
  );
};

export const getInitialColumnWidth = (
  col: string,
  columnWidths: ColumnWidths,
  defaultColumnWidth: number,
  minColumnWidth: number
): number => {
  return columnWidths[col] ?? Math.min(
    defaultColumnWidth,
    Math.max(minColumnWidth, (col.length * AVERAGE_CHAR_WIDTH + CELL_PADDING))
  );
}; 