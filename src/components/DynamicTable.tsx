"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

// --- GLOBAL CONSTANTS ---
const DEFAULT_COLUMN_WIDTH = 250;
const MIN_COLUMN_WIDTH = 80;
const MAX_COLUMN_WIDTH = 500;
const DEFAULT_TABLE_ROW_HEIGHT = 53;
const DEFAULT_RESIZE_HANDLE_WIDTH = 16; // px
const AVERAGE_CHAR_WIDTH = 10; // Heuristic: Average width of a character in pixels (adjust as needed)
const CELL_PADDING = 24; // Heuristic: Combined horizontal padding within a cell (adjust as needed)
const BORDER_COLOR = "#e0e0e0";
const RESIZE_HANDLE_BG = "rgba(0, 0, 255, 0.1)";
const RESIZE_HANDLE_BG_HOVER = "rgba(0, 0, 255, 0.3)";
const RESIZE_HANDLE_OPACITY = 0.5;
const RESIZE_HANDLE_OPACITY_HOVER = 1;
const NO_DATA_TEXT = "No data available.";
const PAGINATION_OPTIONS = [5, 8, 10, 20, 50, 100];

interface DynamicTableProps {
  data: Record<string, unknown>[];
  rowsPerPage?: number;
  tableRowHeight?: number;
  resizeHandleWidth?: number;
  minColumnWidth?: number;
  maxColumnWidth?: number;
  defaultColumnWidth?: number;
  borderColor?: string;
  resizeHandleBg?: string;
  resizeHandleBgHover?: string;
  resizeHandleOpacity?: number;
  resizeHandleOpacityHover?: number;
  noDataText?: string;
  paginationOptions?: number[];
}

/**
 * A simple utility to compare two width objects for equality.
 */
const areWidthsEqual = (
    obj1: { [key: string]: number },
    obj2: { [key: string]: number }
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

const getTableStorageKey = (columns: string[]) => `dynamicTable_${columns.join("_")}`;

const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  rowsPerPage = 10,
  tableRowHeight = DEFAULT_TABLE_ROW_HEIGHT,
  resizeHandleWidth = DEFAULT_RESIZE_HANDLE_WIDTH,
  minColumnWidth = MIN_COLUMN_WIDTH,
  maxColumnWidth = MAX_COLUMN_WIDTH,
  defaultColumnWidth = DEFAULT_COLUMN_WIDTH,
  borderColor = BORDER_COLOR,
  resizeHandleBg = RESIZE_HANDLE_BG,
  resizeHandleBgHover = RESIZE_HANDLE_BG_HOVER,
  resizeHandleOpacity = RESIZE_HANDLE_OPACITY,
  resizeHandleOpacityHover = RESIZE_HANDLE_OPACITY_HOVER,
  noDataText = NO_DATA_TEXT,
  paginationOptions = PAGINATION_OPTIONS,
}) => {
  const columns = React.useMemo(() => {
    return data && data.length > 0 ? Object.keys(data[0]) : [];
  }, [data]);

  // --- localStorage keys ---
  const storageKey = React.useMemo(() => getTableStorageKey(columns), [columns]);

  // --- State with localStorage initialization ---
  const [perPage, setPerPage] = React.useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(storageKey + '_perPage');
        if (saved) return parseInt(saved, 10);
      } catch {}
    }
    return rowsPerPage;
  });
  const [page, setPage] = React.useState(0);
  const [columnWidths, setColumnWidths] = React.useState<{ [key: string]: number }>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(storageKey + '_widths');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  // --- DEBUG: Log state changes ---
  React.useEffect(() => {
    console.log("Column Widths State Updated:", columnWidths);
  }, [columnWidths]);
  // --- END DEBUG ---

  const paginatedData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    const startIndex = page * perPage;
    return data.slice(startIndex, startIndex + perPage);
  }, [data, page, perPage]);

  // Effect to initialize/update column widths based on content
  React.useEffect(() => {
    console.log("Effect to calculate initial widths triggered."); // DEBUG
    if (columns.length > 0 && data.length > 0) {
        const newCalculatedWidths: { [key: string]: number } = {};

        columns.forEach(col => {
            // 1. Find max character length (header vs data)
            let maxLength = col.length; // Start with header length
            data.forEach(row => {
                const cellContent = String(row[col] ?? "");
                maxLength = Math.max(maxLength, cellContent.length);
            });

            // 2. Estimate pixel width based on max length
            const estimatedPixelWidth = maxLength * AVERAGE_CHAR_WIDTH + CELL_PADDING;

            // 3. Clamp width between min and max
            const clampedWidth = Math.max(
                minColumnWidth,
                Math.min(maxColumnWidth, estimatedPixelWidth)
            );

            // 4. Apply user rule: Min(defaultColumnWidth, calculated width)
            const initialWidth = Math.min(defaultColumnWidth, clampedWidth);

            newCalculatedWidths[col] = initialWidth;
            console.log(`Calculated initial width for "${col}": ${initialWidth} (maxLength: ${maxLength}, estimated: ${estimatedPixelWidth}, clamped: ${clampedWidth})`); // DEBUG
        });

        // Use functional update to compare with previous state and avoid unnecessary re-renders
        setColumnWidths(prevWidths => {
            // Only update if the calculated widths are different from the current ones
            if (!areWidthsEqual(prevWidths, newCalculatedWidths)) {
                 console.log("Setting new calculated initial widths:", newCalculatedWidths); // DEBUG
                 return { ...newCalculatedWidths, ...prevWidths };
            } else {
                 console.log("Calculated widths match existing state, no update."); // DEBUG
                 return prevWidths; // Return previous state reference
            }
        });

    } else {
        // If no columns or data, clear widths if they exist
        setColumnWidths(prevWidths => {
             if (Object.keys(prevWidths).length > 0) {
                 console.log("Clearing column widths due to no columns/data."); // DEBUG
                 return {};
             }
             return prevWidths; // No change needed
        });
    }
    // This effect should run when the columns structure changes OR the data changes (as content length affects calculation)
  }, [columns, data, minColumnWidth, maxColumnWidth, defaultColumnWidth]);

  // Persist columnWidths to localStorage when they change
  React.useEffect(() => {
    if (typeof window !== 'undefined' && columns.length > 0) {
      try {
        window.localStorage.setItem(storageKey + '_widths', JSON.stringify(columnWidths));
      } catch {}
    }
  }, [columnWidths, storageKey, columns.length]);

  // Persist perPage to localStorage when it changes
  React.useEffect(() => {
    if (typeof window !== 'undefined' && columns.length > 0) {
      try {
        window.localStorage.setItem(storageKey + '_perPage', String(perPage));
      } catch {}
    }
  }, [perPage, storageKey, columns.length]);

  if (!data || data.length === 0 || columns.length === 0) {
    return <div className="text-center py-8 text-gray-500">{noDataText}</div>;
  }

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMouseDown = (col: string, e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    // Read the current width directly from state *at the time of the mousedown*
    // Fallback to calculated initial (or default if somehow missing)
    const startWidth = columnWidths[col] ?? Math.min(defaultColumnWidth, Math.max(minColumnWidth, (col.length * AVERAGE_CHAR_WIDTH + CELL_PADDING)));

    console.log(`Resize Start: col=${col}, startX=${startX}, startWidth=${startWidth}`); // DEBUG

    const onMouseMove = (moveEvent: MouseEvent) => {
      const currentX = moveEvent.clientX;
      const deltaX = currentX - startX;
      const newWidth = Math.max(
        minColumnWidth,
        Math.min(maxColumnWidth, startWidth + deltaX)
      );

      // Update width using functional update to ensure we base on the latest state
      setColumnWidths((prev) => {
        // Only update if the width for this specific column actually changed
        if (prev[col] !== newWidth) {
           console.log(`Resize Move: col=${col}, newWidth=${newWidth}`); // DEBUG
           return { ...prev, [col]: newWidth };
        }
        return prev; // No change, return previous state object reference
      });
    };

    const onMouseUp = () => {
      console.log(`Resize End: col=${col}`); // DEBUG
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <Paper elevation={2} className="rounded-lg overflow-hidden">
      <TableContainer sx={{ overflowX: 'auto', maxHeight: '70vh' }}>
        {/* Ensure tableLayout: 'fixed' is applied */}
        <Table stickyHeader sx={{ tableLayout: 'fixed', minWidth: '100%' }}>
          <TableHead>
            <TableRow>
              {columns.map((col, colIndex) => {
                 // Get the current width from state for rendering. Fallback needed just in case state isn't ready yet.
                 const currentWidth = columnWidths[col] ?? defaultColumnWidth;
                 return (
                    <TableCell
                    key={col}
                    sx={{
                        width: currentWidth,
                        minWidth: minColumnWidth,
                        maxWidth: maxColumnWidth,
                        boxSizing: 'border-box',
                        fontWeight: 'bold',
                        backgroundColor: (theme) => theme.palette.background.paper,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        paddingRight: `${resizeHandleWidth}px`,
                        position: 'relative',
                        borderRight: colIndex < columns.length - 1 ? `1px solid ${borderColor}` : undefined,
                        userSelect: 'none',
                    }}
                    >
                    {/* Column Title */}
                    <div title={col} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {col}
                    </div>

                    {/* Resize Handle (Only for columns before the last one) */}
                    {colIndex < columns.length - 1 && (
                        <span
                        onMouseDown={(e) => handleMouseDown(col, e)}
                        title={`Resize ${col}`}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: `${resizeHandleWidth}px`,
                            cursor: 'col-resize',
                            backgroundColor: resizeHandleBg,
                            opacity: resizeHandleOpacity,
                            transition: 'opacity 0.2s ease-in-out, background-color 0.2s ease-in-out',
                            zIndex: 10,
                            boxSizing: 'border-box',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = String(resizeHandleOpacityHover);
                            e.currentTarget.style.backgroundColor = resizeHandleBgHover;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = String(resizeHandleOpacity);
                            e.currentTarget.style.backgroundColor = resizeHandleBg;
                        }}
                        />
                    )}
                    </TableCell>
                 )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow
                key={`row-${rowIndex}`}
                className="hover:bg-gray-50 transition-colors"
                style={{ height: tableRowHeight }}
              >
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={`${col}-${rowIndex}`}
                    sx={{
                        maxWidth: columnWidths[col] ?? defaultColumnWidth,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        borderRight: colIndex < columns.length - 1 ? `1px solid ${borderColor}` : undefined,
                        boxSizing: 'border-box',
                        height: tableRowHeight,
                    }}
                    title={String(row[col] ?? "")}
                  >
                    {String(row[col] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {/* Empty rows */}
            {paginatedData.length < perPage &&
             Array.from({ length: perPage - paginatedData.length }).map((_, emptyRowIndex) => (
                <TableRow key={`empty-${emptyRowIndex}`} style={{ height: tableRowHeight }}>
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={`empty-${col}-${emptyRowIndex}`}
                      sx={{
                        borderRight: colIndex < columns.length - 1 ? `1px solid ${borderColor}` : undefined,
                        boxSizing: 'border-box',
                        height: tableRowHeight,
                       }}
                    >
                      {'\u00A0'} {/* Non-breaking space */}
                    </TableCell>
                  ))}
                </TableRow>
             ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={perPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={paginationOptions}
      />
    </Paper>
  );
};

export default DynamicTable;