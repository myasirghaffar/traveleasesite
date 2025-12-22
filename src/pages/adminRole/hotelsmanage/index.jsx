import React, { useState } from "react";
import { Edit, Trash2, MapPin, Star } from "lucide-react";
import ReusableDataTable from "../../../components/ReusableDataTable";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableFilter from "../../../components/ReusableFilter";
import { PlusIcon } from "../../../assets/icons/icons";
import AddHotel from "./features/AddHotel";

const ManageHotels = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Mock Data
  const hotelsData = [
    {
      id: "HTL001",
      name: "Grand Plaza Hotel",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      location: { city: "New York", state: "NY" },
      rating: 5,
      price: 299,
      availability: { count: 45, status: "safe" },
      status: "Active",
    },
    {
      id: "HTL002",
      name: "Seaside Resort",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      location: { city: "Miami", state: "FL" },
      rating: 4,
      price: 189,
      availability: { count: 12, status: "warning" },
      status: "Active",
    },
    {
      id: "HTL003",
      name: "City Center Inn",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      location: { city: "Chicago", state: "IL" },
      rating: 3,
      price: 99,
      availability: { count: 2, status: "danger" },
      status: "Inactive",
    },
    {
      id: "HTL004",
      name: "Mountain View Lodge",
      image: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      location: { city: "Denver", state: "CO" },
      rating: 4,
      price: 149,
      availability: { count: 8, status: "warning" },
      status: "Active",
    },
    {
      id: "HTL005",
      name: "Urban Boutique Hotel",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      location: { city: "San Francisco", state: "CA" },
      rating: 5,
      price: 350,
      availability: { count: 20, status: "safe" },
      status: "Active",
    },
  ];

  // Mock Filter Options
  const filterOptions = [
    {
      key: "category",
      label: "All Categories",
      options: [
        { value: "", label: "All Categories" },
        { value: "5", label: "5 Star" },
        { value: "4", label: "4 Star" },
        { value: "3", label: "3 Star" },
      ],
    },
    {
      key: "status",
      label: "All Status",
      options: [
        { value: "", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];

  // Custom Cell Renderers
  const customCellRenderers = {
    hotel: (row) => (
      <div className="flex items-center gap-3 py-2">
        <img
          src={row.image}
          alt={row.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <span className="text-gray-900 font-semibold text-sm font-['Inter']">
            {row.name}
          </span>
          <span className="text-gray-400 text-xs font-['Inter']">ID: #{row.id}</span>
        </div>
      </div>
    ),
    location: (row) => (
      <div className="flex items-center gap-2 text-gray-600">
        <MapPin size={16} className="text-gray-400" />
        <span className="text-sm font-['Inter']">
          {row.location.city}, {row.location.state}
        </span>
      </div>
    ),
    category: (row) => (
      <div className="flex items-center gap-1">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${i < row.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                }`}
            />
          ))}
        </div>
        <span className="text-gray-500 text-xs ml-1 font-['Inter']">
          {row.rating}-Star
        </span>
      </div>
    ),
    price: (row) => (
      <div className="flex flex-col">
        <span className="text-gray-500 text-xs font-['Inter']">from</span>
        <span className="text-gray-900 font-bold text-sm font-['Inter']">
          ${row.price}
        </span>
      </div>
    ),
    availability: (row) => {
      let colorClass = "text-green-600";
      if (row.availability.status === "warning") colorClass = "text-orange-500";
      if (row.availability.status === "danger") colorClass = "text-red-500";

      return (
        <span className={`${colorClass} font-medium text-sm font-['Inter']`}>
          {row.availability.count} rooms left
        </span>
      );
    },
    status: (row) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium font-['Inter'] ${row.status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
          }`}
      >
        {row.status}
      </span>
    ),
    actions: (row) => (
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
          <Edit size={18} />
        </button>
        <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
          <Trash2 size={18} />
        </button>
      </div>
    ),
  };

  // Columns Configuration
  const columns = [
    { key: "hotel", label: "Hotel", style: { minWidth: "250px" } },
    { key: "location", label: "Location", style: { minWidth: "150px" } },
    { key: "category", label: "Category", style: { minWidth: "140px" } },
    { key: "price", label: "Price", style: { minWidth: "100px" } },
    { key: "availability", label: "Availability", style: { minWidth: "140px" } },
    { key: "status", label: "Status", style: { minWidth: "100px" } },
    { key: "actions", label: "Actions", style: { minWidth: "100px" } },
  ];

  // Custom Table Styles to match design (Light theme)
  const customTableStyles = {
    headRow: {
      style: {
        backgroundColor: "#F9FAFB", // Very light gray header
        color: "#6B7280", // Gray text
        borderBottom: "1px solid #E5E7EB",
        fontWeight: "600",
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
    },
    headCells: {
      style: {
        paddingLeft: "24px",
        paddingRight: "24px",
        color: "#6B7280",
        fontWeight: "600",
      },
    },
    rows: {
      style: {
        borderBottom: "1px solid #F3F4F6",
        fontSize: "14px",
        fontWeight: "500",
        "&:hover": {
          backgroundColor: "#F9FAFB",
        },
      },
    },
    cells: {
      style: {
        paddingLeft: "24px",
        paddingRight: "24px",
      },
    },
    tableWrapper: {
      style: {
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        boxShadow: "none",
      },
    },
  };

  if (isAdding) {
    return <AddHotel onCancel={() => setIsAdding(false)} />;
  }

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold font-['Inter']">
            Manage Hotels
          </h1>
          <p className="text-gray-500 text-sm font-['Inter'] mt-1">
            View, edit, and add new hotels to the platform.
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full md:w-auto">
          <ReusableFilter
            searchPlaceholder="Search hotels..."
            filters={filterOptions}
            onSearchChange={setSearchTerm}
            onFilterChange={(key, value) =>
              setFilters((prev) => ({ ...prev, [key]: value }))
            }
            className="shadow-none border border-gray-100 !p-0 bg-transparent"
          />
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors font-medium text-sm font-['Inter'] shadow-sm whitespace-nowrap"
        >
          <PlusIcon className="w-4 h-4" />
          Add New Hotel
        </button>
      </div>

      {/* Table Section */}
      <ReusableDataTable
        columns={columns}
        data={hotelsData} // In real app, filter this data
        customCellRenderers={customCellRenderers}
        customStyles={customTableStyles}
      />

      {/* Pagination Section */}
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm font-['Inter']">
          Showing users 1-5 of 47
        </span>
        <div className="w-auto">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageHotels;

