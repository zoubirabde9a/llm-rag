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
import {
  DEFAULT_COLUMN_WIDTH,
  MIN_COLUMN_WIDTH,
  MAX_COLUMN_WIDTH,
  DEFAULT_TABLE_ROW_HEIGHT,
  DEFAULT_RESIZE_HANDLE_WIDTH,
  BORDER_COLOR,
  RESIZE_HANDLE_BG,
  RESIZE_HANDLE_BG_HOVER,
  RESIZE_HANDLE_OPACITY,
  RESIZE_HANDLE_OPACITY_HOVER,
  NO_DATA_TEXT,
  PAGINATION_OPTIONS,
  getTableCellStyles,
  getResizeHandleStyles,
  getBodyCellStyles,
  tableContainerStyles,
  tableStyles,
} from "./DynamicTableStyles";
import {
  ColumnWidths,
  getTableStorageKey,
  calculateInitialColumnWidths,
  loadSavedState,
  saveState,
  calculateNewColumnWidth,
  getInitialColumnWidth,
} from "./DynamicTableLogic";

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

  const storageKey = React.useMemo(() => getTableStorageKey(columns), [columns]);

  // Initialize state with default values
  const [perPage, setPerPage] = React.useState(rowsPerPage);
  const [page, setPage] = React.useState(0);
  const [columnWidths, setColumnWidths] = React.useState<ColumnWidths>({});
  const [isMounted, setIsMounted] = React.useState(false);

  // Load saved state from localStorage after mount
  React.useEffect(() => {
    setIsMounted(true);
    const { perPage: savedPerPage, columnWidths: savedWidths } = loadSavedState(storageKey);
    
    if (savedPerPage) {
      setPerPage(savedPerPage);
    }
    if (savedWidths) {
      setColumnWidths(savedWidths);
    }
  }, [storageKey]);

  const paginatedData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    const startIndex = page * perPage;
    return data.slice(startIndex, startIndex + perPage);
  }, [data, page, perPage]);

  // Calculate initial column widths
  React.useEffect(() => {
    if (columns.length > 0 && data.length > 0) {
      const newCalculatedWidths = calculateInitialColumnWidths(
        columns,
        data,
        minColumnWidth,
        maxColumnWidth,
        defaultColumnWidth
      );

      setColumnWidths(prevWidths => {
        if (Object.keys(prevWidths).length === 0) {
          return newCalculatedWidths;
        }
        return prevWidths;
      });
    } else {
      setColumnWidths({});
    }
  }, [columns, data, minColumnWidth, maxColumnWidth, defaultColumnWidth]);

  // Save state to localStorage
  React.useEffect(() => {
    if (isMounted && columns.length > 0) {
      saveState(storageKey, perPage, columnWidths, columns);
    }
  }, [columnWidths, perPage, storageKey, columns.length, isMounted]);

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
    const startWidth = getInitialColumnWidth(col, columnWidths, defaultColumnWidth, minColumnWidth);

    const onMouseMove = (moveEvent: MouseEvent) => {
      const currentX = moveEvent.clientX;
      const deltaX = currentX - startX;
      const newWidth = calculateNewColumnWidth(startWidth, deltaX, minColumnWidth, maxColumnWidth);

      setColumnWidths((prev) => {
        if (prev[col] !== newWidth) {
          return { ...prev, [col]: newWidth };
        }
        return prev;
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <Paper elevation={2} className="rounded-lg overflow-hidden">
      <TableContainer sx={tableContainerStyles}>
        <Table stickyHeader sx={tableStyles}>
          <TableHead>
            <TableRow>
              {columns.map((col, colIndex) => {
                const currentWidth = columnWidths[col] ?? defaultColumnWidth;
                return (
                  <TableCell
                    key={col}
                    sx={getTableCellStyles(currentWidth, minColumnWidth, maxColumnWidth, borderColor, resizeHandleWidth)}
                  >
                    <div title={col} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {col}
                    </div>

                    {colIndex < columns.length - 1 && (
                      <span
                        onMouseDown={(e) => handleMouseDown(col, e)}
                        title={`Resize ${col}`}
                        style={getResizeHandleStyles(resizeHandleWidth, resizeHandleBg, resizeHandleOpacity)}
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
                );
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
                    sx={getBodyCellStyles(columnWidths[col] ?? defaultColumnWidth, borderColor, tableRowHeight)}
                    title={String(row[col] ?? "")}
                  >
                    {String(row[col] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {paginatedData.length < perPage &&
              Array.from({ length: perPage - paginatedData.length }).map((_, emptyRowIndex) => (
                <TableRow key={`empty-${emptyRowIndex}`} style={{ height: tableRowHeight }}>
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={`empty-${col}-${emptyRowIndex}`}
                      sx={getBodyCellStyles(columnWidths[col] ?? defaultColumnWidth, borderColor, tableRowHeight)}
                    >
                      {'\u00A0'}
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