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
        backgroundColor: "#ffffff",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#F9FAFB", // primary-500 color
        minHeight: "50px",
        borderBottom: "1px solid #E5E7EB !important",
        fontFamily: '"Poppins", sans-serif',
      },
    },
    headCells: {
      style: {
        padding: "16px 12px",
        fontWeight: "600",
        color: "#6B7280",
        fontSize: "12px",
        fontFamily: '"Poppins", sans-serif',
        borderBottom: "none",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:last-child": {
          borderRight: "none",
        },
      },
    },
    rows: {
      style: {
        fontSize: "12px",
        fontWeight: "400",
        minHeight: "50px",
        backgroundColor: "#ffffff",
        color: "#A0A0A0",
        transition: "all 0.2s ease",
        borderBottom: "1px solid #E5E7EB !important",
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
        fontFamily: '"Inter", sans-serif',
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
        borderBottom: "1px solid #E5E7EB",
      },
    },
  ];

  return (
    <div className="overflow-x-auto bg-white border border-[#E5E7EB] rounded-[24px] shadow-sm overflow-hidden">
      <style>
        {`
          .rdt_TableRow {
            border-bottom: 1px solid #E5E7EB !important;
          }
          .rdt_TableRow:last-child {
            border-bottom: none !important;
          }
           .rdt_Table {
            background-color: transparent !important;
          }
          .rdt_TableHeadRow {
             background-color: #F9FAFB !important;
              border-bottom: 1px solid #E5E7EB !important;
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
