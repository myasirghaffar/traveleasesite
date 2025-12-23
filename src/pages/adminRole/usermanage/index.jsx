import React, { useState } from "react";
import {
  Ban,
  Check,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import ReusableDataTable from "../../../components/ReusableDataTable";
import ReusablePagination from "../../../components/ReusablePagination";

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Mock User Data
  const usersData = [
    {
      id: "001",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      regDate: "Mar 15, 2024",
      bookings: 12,
      status: "Active",
      image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      id: "002",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      regDate: "Mar 10, 2024",
      bookings: 8,
      status: "Active",
      image: "https://i.pravatar.cc/150?u=michael"
    },
    {
      id: "003",
      name: "Emma Davis",
      email: "emma.davis@email.com",
      phone: "+1 (555) 345-6789",
      regDate: "Mar 8, 2024",
      bookings: 15,
      status: "Blocked",
      image: "https://i.pravatar.cc/150?u=emma"
    },
    {
      id: "004",
      name: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+1 (555) 456-7890",
      regDate: "Mar 5, 2024",
      bookings: 3,
      status: "Active",
      image: "https://i.pravatar.cc/150?u=james"
    },
    {
      id: "005",
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "+1 (555) 567-8901",
      regDate: "Mar 2, 2024",
      bookings: 7,
      status: "Active",
      image: "https://i.pravatar.cc/150?u=lisa"
    }
  ];

  // Custom Cell Renderers
  const customCellRenderers = {
    name: (row) => (
      <div className="flex items-center gap-3 py-2">
        <img
          src={row.image}
          alt={row.name}
          className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm"
        />
        <div className="flex flex-col">
          <span className="text-slate-900 font-bold text-[14px] font-['Inter']">
            {row.name}
          </span>
          <span className="text-slate-400 text-[12px] font-medium font-['Inter']">ID: #{row.id}</span>
        </div>
      </div>
    ),
    email: (row) => (
      <span className="text-slate-600 text-[14px] font-medium font-['Inter']">
        {row.email}
      </span>
    ),
    phone: (row) => (
      <span className="text-slate-600 text-[14px] font-medium font-['Inter'] whitespace-nowrap">
        {row.phone}
      </span>
    ),
    regDate: (row) => (
      <span className="text-slate-600 text-[14px] font-medium font-['Inter'] whitespace-nowrap">
        {row.regDate}
      </span>
    ),
    bookings: (row) => (
      <div className="flex items-center">
        <span className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 font-bold text-[13px] rounded-full">
          {row.bookings}
        </span>
      </div>
    ),
    status: (row) => (
      <span
        className={`px-3 py-1 rounded-full text-[12px] font-bold font-['Inter'] ${row.status === "Active"
          ? "bg-green-50 text-green-500"
          : "bg-red-50 text-red-400"
          }`}
      >
        {row.status}
      </span>
    ),
    actions: (row) => (
      <div className="flex items-center gap-4">
        {row.status === "Active" ? (
          <button className="text-red-400 hover:text-red-600 transition-colors p-1 bg-red-50/0 hover:bg-red-50 rounded-lg">
            <Ban size={18} />
          </button>
        ) : (
          <button className="text-green-500 hover:text-green-600 transition-colors p-1 bg-green-50/0 hover:bg-green-50 rounded-lg">
            <Check size={18} />
          </button>
        )}
      </div>
    ),
  };

  // Columns Configuration
  const columns = [
    { key: "name", label: "User Name", width: "240px" },
    { key: "email", label: "Email", width: "250px" },
    { key: "phone", label: "Phone", width: "180px" },
    { key: "regDate", label: "Registration Date", width: "180px", center: true },
    { key: "bookings", label: "Total Bookings", width: "180px", center: true },
    { key: "status", label: "Status", width: "140px", center: true },
    { key: "actions", label: "Actions", width: "140px", center: true },
  ];


  // Custom Table Styles
  const customTableStyles = {
    headRow: {
      style: {
        backgroundColor: "#F9FAFB",
        color: "#64748B",
        borderBottom: "1px solid #F1F5F9",
        fontWeight: "700",
        fontSize: "13px",
        height: "60px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "32px",
        paddingRight: "32px",
      },
    },
    rows: {
      style: {
        borderBottom: "1px solid #F1F5F9",
        height: "72px",
        "&:hover": {
          backgroundColor: "#F8FAFC",
        },
      },
    },
    cells: {
      style: {
        paddingLeft: "32px",
        paddingRight: "32px",
      },
    },
    tableWrapper: {
      style: {
        borderRadius: "24px",
        border: "1px solid rgba(201, 201, 201, 1)",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.05)",
        overflow: "hidden",
      },
    },
  };

  return (
    <div className="w-full p-8 min-h-screen space-y-10 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold font-['Inter']">
            Users Management
          </h1>
          <p className="text-gray-500 text-sm font-['Inter'] mt-1">
            Manage registered users and customer accounts.
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
        <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[50px] pl-11 pr-5 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none font-medium text-sm"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-[50px] px-5 pr-10 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <ChevronLeft className="-rotate-90" size={16} />
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-3 rounded-xl transition-all font-bold text-sm shadow-sm active:scale-95">
          <Download size={18} className="text-slate-400" />
          Export
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[24px] overflow-hidden">
        <ReusableDataTable
          columns={columns}
          data={usersData}
          customCellRenderers={customCellRenderers}
          customStyles={customTableStyles}
        />
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2">
        <span className="text-slate-500 text-sm font-medium font-['Inter']">
          Showing users 1-5 of 47
        </span>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all">
            <ChevronLeft size={20} />
          </button>
          {[1, 2, 3, "...", 10].map((page, idx) => (
            <button
              key={idx}
              className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${page === 1
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "text-slate-500 hover:bg-slate-100"
                }`}
            >
              {page}
            </button>
          ))}
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
