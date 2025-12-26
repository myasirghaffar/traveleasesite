import React, { useState, useMemo } from "react";
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
import { useGetUsersQuery, useDeleteUserMutation } from "../../../services/Api";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [itemsPerPage] = useState(10);
  
  const { data, isLoading, error, refetch } = useGetUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
    status: statusFilter || undefined,
  });
  const [deleteUser] = useDeleteUserMutation();

  // Transform API data to match component format
  const usersData = useMemo(() => {
    if (!data?.data?.users) return [];
    return data.data.users.map(user => ({
      id: user.id.toString(),
      name: user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email,
      email: user.email,
      phone: user.phone || "N/A",
      regDate: new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      bookings: 0, // TODO: Get from API if available
      status: user.status === 'active' ? "Active" : "Blocked",
      image: user.profile_picture || user.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`
    }));
  }, [data]);

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

  // Filtering Logic (API handles pagination and search)
  const filteredData = usersData.filter(user => {
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesStatus;
  });

  const totalPages = data?.data?.pagination?.totalPages || Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData;

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
          <button 
            className="text-red-400 hover:text-red-600 transition-colors p-1 bg-red-50/0 hover:bg-red-50 rounded-lg"
            onClick={async () => {
              if (window.confirm(`Are you sure you want to delete user ${row.name}?`)) {
                try {
                  await deleteUser(row.id).unwrap();
                  toast.success('User deleted successfully');
                  refetch();
                } catch (error) {
                  toast.error(error?.data?.message || 'Failed to delete user');
                }
              }
            }}
          >
            <Ban size={18} />
          </button>
        ) : (
          <button 
            className="text-green-500 hover:text-green-600 transition-colors p-1 bg-green-50/0 hover:bg-green-50 rounded-lg"
            onClick={() => {
              // TODO: Implement unblock/activate user
              toast.info('Activate user functionality coming soon');
            }}
          >
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
        {isLoading ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading users...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-500">Error loading users. Please try again.</p>
          </div>
        ) : (
          <ReusableDataTable
            columns={columns}
            data={currentData}
            customCellRenderers={customCellRenderers}
          />
        )}
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
