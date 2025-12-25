import React, { useState } from "react";
import {
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Filter
} from "lucide-react";
import ReusableDataTable from "../../../components/ReusableDataTable";
import ReusablePagination from "../../../components/ReusablePagination";

const PaymentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [itemsPerPage] = useState(10);

  // Mock Payment Data
  const paymentsData = [
    {
      id: "PAY-001",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      amount: "245.00",
      method: "Credit Card",
      date: "Mar 24, 2024",
      status: "Completed",
      type: "Booking",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      id: "PAY-002",
      customer: "Michael Chen",
      email: "m.chen@email.com",
      amount: "1,200.00",
      method: "Bank Transfer",
      date: "Mar 23, 2024",
      status: "Pending",
      type: "Refund",
      avatar: "https://i.pravatar.cc/150?u=michael"
    },
    {
      id: "PAY-003",
      customer: "Emma Davis",
      email: "emma.d@email.com",
      amount: "85.50",
      method: "PayPal",
      date: "Mar 22, 2024",
      status: "Completed",
      type: "Taxi Fee",
      avatar: "https://i.pravatar.cc/150?u=emma"
    },
    {
      id: "PAY-004",
      customer: "James Wilson",
      email: "j.wilson@email.com",
      amount: "450.00",
      method: "Credit Card",
      date: "Mar 21, 2024",
      status: "Failed",
      type: "Hotel Surcharge",
      avatar: "https://i.pravatar.cc/150?u=james"
    },
    {
      id: "PAY-005",
      customer: "Lisa Anderson",
      email: "lisa.a@email.com",
      amount: "320.00",
      method: "Credit Card",
      date: "Mar 20, 2024",
      status: "Completed",
      type: "Booking",
      avatar: "https://i.pravatar.cc/150?u=lisa"
    },
    {
      id: "PAY-006",
      customer: "Robert Brown",
      email: "robert.b@email.com",
      amount: "150.00",
      method: "Apple Pay",
      date: "Mar 19, 2024",
      status: "Completed",
      type: "Taxi Fee",
      avatar: "https://i.pravatar.cc/150?u=robert"
    }
  ];

  // Custom Cell Renderers
  const customCellRenderers = {
    customer: (row) => (
      <div className="flex items-center gap-3 py-2">
        <img
          src={row.avatar}
          alt={row.customer}
          className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
        />
        <div className="flex flex-col">
          <span className="text-slate-900 font-bold text-[14px] font-['Inter']">
            {row.customer}
          </span>
          <span className="text-slate-400 text-[12px] font-medium font-['Inter']">{row.email}</span>
        </div>
      </div>
    ),
    amount: (row) => (
      <div className="flex items-center gap-2">
        <span className={`p-1 rounded-md ${row.type === 'Refund' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}`}>
          {row.type === 'Refund' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
        </span>
        <span className="text-slate-900 font-bold text-[15px] font-['Inter']">
          ${row.amount}
        </span>
      </div>
    ),
    method: (row) => (
      <div className="flex items-center gap-2 text-slate-600">
        <CreditCard size={16} className="text-slate-400" />
        <span className="text-[14px] font-medium font-['Inter']">
          {row.method}
        </span>
      </div>
    ),
    status: (row) => (
      <span
        className={`px-3 py-1 rounded-full text-[12px] font-bold font-['Inter'] ${row.status === "Completed"
          ? "bg-green-50 text-green-500"
          : row.status === "Pending"
            ? "bg-amber-50 text-amber-500"
            : "bg-red-50 text-red-500"
          }`}
      >
        {row.status}
      </span>
    ),
    actions: (row) => (
      <button className="text-blue-500 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-xl flex items-center gap-2 font-bold text-xs">
        <Eye size={16} />
        Details
      </button>
    ),
  };

  // Columns Configuration
  const columns = [
    { key: "id", label: "Transaction ID", width: "120px" },
    { key: "customer", label: "Customer", width: "220px" },
    { key: "amount", label: "Amount", width: "120px" },
    { key: "date", label: "Date", width: "120px" },
    { key: "method", label: "Method", width: "180px" },
    { key: "type", label: "Type", width: "100px" },
    { key: "status", label: "Status", width: "130px", center: true },
    { key: "actions", label: "Actions", width: "130px", center: true },
  ];


  // Filtering and Pagination Logic
  const filteredData = paymentsData.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full p-8 min-h-screen space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold font-['Inter']">
            Payments & Transactions
          </h1>
          <p className="text-slate-500 text-sm font-medium font-['Inter'] mt-1">
            Monitor and manage all financial transactions across the platform.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#1781FE] hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-all font-bold text-sm shadow-lg shadow-blue-200 active:scale-95">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Revenue", value: "$45,280.00", trend: "+12.5%", color: "blue" },
          { label: "Pending Payments", value: "$1,200.00", trend: "3 Orders", color: "amber" },
          { label: "Refunds Processed", value: "$3,450.00", trend: "15 Txns", color: "orange" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-extrabold text-slate-800">{stat.value}</span>
              <span className={`text-${stat.color}-500 text-xs font-bold bg-${stat.color}-50 px-2 py-1 rounded-lg`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4">
        <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by ID or Customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[46px] pl-11 pr-5 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none font-medium text-sm"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-[46px] pl-10 pr-10 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer min-w-[140px]"
            >
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white overflow-hidden">
        <ReusableDataTable
          columns={columns}
          data={currentData}
          customCellRenderers={customCellRenderers}
        />
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <span className="text-slate-500 text-sm font-medium font-['Inter'] text-center sm:text-left">
          Showing {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} transactions
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

export default PaymentPage;
