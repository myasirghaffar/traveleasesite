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
import ReusableFilter from "../../../components/ReusableFilter";

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [itemsPerPage] = useState(10);

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

  // Filter Options for ReusableFilter
  const filterOptions = [
    {
      key: "status",
      label: "All Status",
      options: [
        { value: "", label: "All Status" },
        { value: "Active", label: "Active" },
        { value: "Blocked", label: "Blocked" },
      ],
    },
  ];

  // Filtering and Pagination Logic
  const filteredData = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Custom Cell Renderers
  const customCellRenderers = {
    name: (row) => (
      <div className="flex items-center gap-3 py-2">
        <img
          src={row.image}
          alt={row.name}
          className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
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
          ? "bg-green-150 text-green-600"
          : "bg-red-50 text-red-600"
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
    { key: "name", label: "User Name", width: "220px" },
    { key: "email", label: "Email", width: "200px" },
    { key: "phone", label: "Phone", width: "150px" },
    { key: "regDate", label: "Registration Date", width: "180px", center: true },
    { key: "bookings", label: "Total Bookings", width: "130px", center: true },
    { key: "status", label: "Status", width: "120px", center: true },
    { key: "actions", label: "Actions", width: "120px", center: true },
  ];




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
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="w-full md:w-auto">
          <ReusableFilter
            searchPlaceholder="Search users..."
            filters={filterOptions}
            onSearchChange={setSearchTerm}
            onFilterChange={(key, value) => setStatusFilter(value)}
            className="shadow-none !p-0 bg-transparent"
          />
        </div>

        <button className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-600 px-6 py-3 rounded-xl transition-all font-bold text-sm shadow-sm active:scale-95 whitespace-nowrap">
          <Download size={18} className="text-slate-400" />
          Export
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[24px] overflow-hidden">
        <ReusableDataTable
          columns={columns}
          data={currentData}
          customCellRenderers={customCellRenderers}
        />
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <span className="text-slate-500 text-sm font-medium font-['Inter'] text-center sm:text-left">
          Showing {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
        </span>
        <div className="w-auto">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={setCurrentPage}
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
