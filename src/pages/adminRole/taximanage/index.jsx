import React, { useState } from "react";
import {
  Car,
  Clock,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Route
} from "lucide-react";
import ReusableDataTable from "../../../components/ReusableDataTable";
import ReusablePagination from "../../../components/ReusablePagination";
import { PlusIcon } from "../../../assets/icons/icons";
import AddTaxi from "./features/AddTaxi";


const ManageTaxi = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("");

  // Mock Taxi Data
  const taxiData = [
    {
      id: "TX001",
      userName: "Sarah Johnson",
      userImage: "https://i.pravatar.cc/150?u=sarah",
      pickup: "Downtown Mall",
      dropoff: "Airport Terminal",
      distance: "12.5 km",
      time: "25 min",
      vehicleType: "Sedan",
      dateTime: "Dec 9, 2024",
      hour: "2:30 PM",
      status: "Pending",
      driver: null
    },
    {
      id: "TX002",
      userName: "Mike Chen",
      userImage: "https://i.pravatar.cc/150?u=mike",
      pickup: "Central Station",
      dropoff: "Business District",
      distance: "8.2 km",
      time: "18 min",
      vehicleType: "SUV",
      dateTime: "Dec 9, 2024",
      hour: "3:15 PM",
      status: "Confirmed",
      driver: { name: "Alex Driver", image: "https://i.pravatar.cc/150?u=alex" }
    },
    {
      id: "TX003",
      userName: "Emma Wilson",
      userImage: "https://i.pravatar.cc/150?u=emma",
      pickup: "Hotel Plaza",
      dropoff: "Shopping Center",
      distance: "5.8 km",
      time: "12 min",
      vehicleType: "Premium",
      dateTime: "Dec 9, 2024",
      hour: "1:45 PM",
      status: "Completed",
      driver: { name: "John Driver", image: "https://i.pravatar.cc/150?u=john" }
    }
  ];

  // Custom Cell Renderers
  const customCellRenderers = {
    id: (row) => (
      <span className="text-slate-900 font-bold text-[14px]">#{row.id}</span>
    ),
    userName: (row) => (
      <div className="flex items-center gap-3 py-2">
        <img src={row.userImage} alt={row.userName} className="w-10 h-10 rounded-full border border-slate-100 shadow-sm" />
        <span className="text-slate-700 font-bold text-[14px]">{row.userName}</span>
      </div>
    ),
    route: (row) => (
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-slate-700 font-semibold text-[13px]">
          <span>{row.pickup}</span>
          <ArrowRight size={12} className="text-slate-400" />
          <span>{row.dropoff}</span>
        </div>
        <div className="text-slate-400 text-[11px] font-medium mt-0.5">
          {row.distance} • {row.time}
        </div>
      </div>
    ),
    vehicleType: (row) => (
      <span className={`px-4 py-1 rounded-full text-[11px] font-bold ${row.vehicleType === 'Sedan' ? 'bg-blue-50 text-blue-500' :
        row.vehicleType === 'SUV' ? 'bg-green-50 text-green-500' : 'bg-purple-50 text-purple-500'
        }`}>
        {row.vehicleType}
      </span>
    ),
    dateTime: (row) => (
      <div className="flex flex-col text-[13px] text-slate-500 font-medium">
        <span className="text-slate-700 font-bold">{row.dateTime}</span>
        <span>{row.hour}</span>
      </div>
    ),
    status: (row) => (
      <span className={`px-4 py-1 rounded-full text-[11px] font-bold ${row.status === 'Pending' ? 'bg-orange-50 text-orange-400' :
        row.status === 'Confirmed' ? 'bg-green-50 text-green-500' : 'bg-slate-100 text-slate-500'
        }`}>
        {row.status}
      </span>
    ),
    driver: (row) => (
      row.driver ? (
        <div className="flex items-center gap-2">
          <img src={row.driver.image} alt={row.driver.name} className="w-8 h-8 rounded-full border border-slate-100" />
          <span className="text-slate-600 text-[13px] font-semibold">{row.driver.name}</span>
        </div>
      ) : (
        <span className="text-slate-400 text-[13px] font-medium italic">Not Assigned</span>
      )
    ),
    actions: () => (
      <button className="text-slate-500 hover:text-blue-600 font-bold text-[13px] transition-colors">Edit</button>
    )
  };

  const columns = [
    { key: "id", label: "Ride ID", width: "120px" },
    { key: "userName", label: "User Name", width: "220px" },
    { key: "route", label: "Pickup → Drop-off", width: "280px" },
    { key: "vehicleType", label: "Vehicle Type", width: "140px", center: true },
    { key: "dateTime", label: "Date & Time", width: "160px" },
    { key: "status", label: "Status", width: "150px", center: true },
    { key: "driver", label: "Driver Assigned", width: "200px" },
    { key: "actions", label: "Actions", width: "120px", center: true },
  ];

  const customTableStyles = {
    headRow: {
      style: {
        backgroundColor: "#F9FAFB",
        color: "#64748B",
        borderBottom: "1px solid #F1F5F9",
        fontWeight: "700",
        fontSize: "12px",
        height: "60px",
      },
    },
    headCells: { style: { paddingLeft: "24px", paddingRight: "24px" } },
    rows: {
      style: {
        borderBottom: "1px solid #F1F5F9",
        height: "72px",
        "&:hover": { backgroundColor: "#F8FAFC" },
      },
    },
    cells: { style: { paddingLeft: "24px", paddingRight: "24px" } },
    tableWrapper: {
      style: {
        borderRadius: "0px",
        border: "none",
        boxShadow: "none",
      },
    },
  };

  if (isAdding) {
    return <AddTaxi onCancel={() => setIsAdding(false)} />;
  }

  return (
    <div className="w-full p-8 min-h-screen space-y-10 animate-in fade-in duration-500 bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold font-['Inter']">
            Manage Taxi Bookings
          </h1>
          <p className="text-gray-500 text-sm font-['Inter'] mt-1">
            Manage and track all taxi bookings.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl transition-all font-bold text-sm shadow-xl shadow-blue-200 active:scale-95"
        >
          <PlusIcon className="w-5 h-5 text-white" />
          Add New Taxi
        </button>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm relative">
        <button onClick={() => { }} className="absolute top-8 right-8 text-blue-600 font-bold text-sm">Reset Filters</button>
        <h2 className="text-slate-900 font-bold text-lg mb-6">Filter Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-500">Status</label>
            <select className="w-full h-[50px] px-5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm focus:border-blue-500 outline-none">
              <option>All Status</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-500">Vehicle Type</label>
            <select className="w-full h-[50px] px-5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm focus:border-blue-500 outline-none">
              <option>All Types</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Premium</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-500">Date From</label>
            <input type="date" className="w-full h-[50px] px-5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm outline-none" placeholder="mm/dd/yyyy" />
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-500">Date To</label>
            <input type="date" className="w-full h-[50px] px-5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm outline-none" placeholder="mm/dd/yyyy" />
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-500">Search</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" className="w-full h-[50px] pl-11 pr-5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm outline-none" placeholder="Search by ID, user..." />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Bookings", value: "1,247", icon: Car, iconColor: "text-blue-500", bgColor: "bg-blue-50" },
          { label: "Pending", value: "23", icon: Clock, iconColor: "text-orange-500", bgColor: "bg-orange-50", valueColor: "text-orange-600" },
          { label: "Active Rides", value: "67", icon: Route, iconColor: "text-green-500", bgColor: "bg-green-50", valueColor: "text-green-600" },
          { label: "Completed Today", value: "89", icon: CheckCircle, iconColor: "text-blue-500", bgColor: "bg-blue-50", valueColor: "text-blue-600" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-slate-400 text-sm font-bold">{stat.label}</p>
              <h3 className={`text-3xl font-black ${stat.valueColor || 'text-slate-900'}`}>{stat.value}</h3>
            </div>
            <div className={`p-4 ${stat.bgColor} rounded-2xl`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white text-slate-900 font-bold text-lg">
          <div className="flex items-center gap-4">
            <span>Taxi Requests</span>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <span>Showing 1-10 of 247 results</span>
              <RefreshCw size={14} className="cursor-pointer hover:text-blue-500 transition-colors" />
            </div>
          </div>
        </div>

        <ReusableDataTable
          columns={columns}
          data={taxiData.slice((currentPage - 1) * 10, currentPage * 10)}
          customCellRenderers={customCellRenderers}
          customStyles={customTableStyles}
        />

        <div className="p-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-500 text-sm font-medium font-['Inter'] text-center sm:text-left">
            Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, taxiData.length)} of {taxiData.length} results
          </span>
          <div className="w-auto">
            <ReusablePagination
              currentPage={currentPage}
              totalPages={Math.ceil(taxiData.length / 10)}
              onPageChange={setCurrentPage}
              theme="light"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTaxi;
