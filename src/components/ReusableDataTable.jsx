import React from "react";
import DataTable from "react-data-table-component";

const ReusableDataTable = ({
  loading = false,
  columns = [],
  data = [],
  customCellRenderers = {},
  customStyles = {},
  onRowClicked,
}) => {
  // Format columns for react-data-table-component
  const formatColumns = columns.map((column) => {
    const col = {
      ...column,
      name: column.label,
      selector: (row) => row[column.key],
      // Support common width properties at the top level
      width: column.width,
      minWidth: column.minWidth || (column.style && column.style.minWidth),
      maxWidth: column.maxWidth,
      center: column.center || column.align === "center",
      sortable: column.sortable !== false,
    };

    // Use custom cell renderer if provided
    if (customCellRenderers[column.key]) {
      col.cell = (row) => customCellRenderers[column.key](row, column);
    } else if (column.render) {
      col.cell = (row) => column.render(row);
    }
    // Note: Default library rendering is used if col.cell isn't set

    return col;
  });


  // Default styles for DataTable (matching snapshot)
  const defaultStyles = {
    table: {
      style: {
        borderSpacing: "0",
        width: "100%",
        borderCollapse: "separate",
      },
    },
    tableWrapper: {
      style: {
        borderRadius: "12px 12px 0px 0px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        border: "1px solid #D1D1D1",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#58398D", // primary-500 color
        minHeight: "60px",
        borderBottom: "none",
        fontFamily: '"Poppins", sans-serif',
      },
    },
    headCells: {
      style: {
        padding: "16px 12px",
        fontWeight: "400",
        color: "#ffffff",
        fontSize: "14px",
        fontFamily: '"Poppins", sans-serif',
        borderBottom: "none",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        "&:last-child": {
          borderRight: "none",
        },
      },
    },
    rows: {
      style: {
        fontSize: "12px",
        fontWeight: "400",
        minHeight: "60px",
        backgroundColor: "#ffffff",
        color: "#A0A0A0",
        transition: "all 0.2s ease",
        borderBottom: "2px solid #D1D1D1 !important",
        "&:hover": {
          backgroundColor: "#f9fafb",
        },
        "&:last-child": {
          borderBottom: "none !important",
        },
      },
    },
    cells: {
      style: {
        padding: "12px 12px",
        fontSize: "12px",
        fontWeight: "600",
        fontFamily: "Inter",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        cursor: "pointer",
        "&:last-child": {
          borderRight: "none",
        },
      },
    },

  };

  // Merge custom styles with default styles
  const mergedStyles = {
    ...defaultStyles,
    ...customStyles,
    headRow: {
      ...defaultStyles.headRow,
      ...customStyles.headRow,
    },
    headCells: {
      ...defaultStyles.headCells,
      ...customStyles.headCells,
    },
    rows: {
      ...defaultStyles.rows,
      ...customStyles.rows,
    },
    cells: {
      ...defaultStyles.cells,
      ...customStyles.cells,
    },
  };

  // Default conditional row styles
  const defaultConditionalRowStyles = [
    {
      when: (row, index) => true, // Apply to all rows
      style: {
        color: "#A0A0A0",
        backgroundColor: "#FFFFFF",
        borderBottom: "2px solid #D1D1D1",
      },
    },
  ];

  return (
    <div className="overflow-x-auto bg-white">
      <style>
        {`
          .rdt_TableRow {
            border-bottom: 3px solid #D1D1D1 !important;
          }
          .rdt_TableRow:last-child {
            border-bottom: none !important;
          }
        `}
      </style>
      <DataTable
        columns={formatColumns} // Format columns for react-data-table-component
        data={data}
        customStyles={mergedStyles} // Merge custom styles with default styles
        conditionalRowStyles={defaultConditionalRowStyles}
        onRowClicked={onRowClicked}
        highlightOnHover
        noHeader
        loading={loading}
        pagination={false}
        responsive
        striped
      />
    </div>
  );
};

export default ReusableDataTable;
