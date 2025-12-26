import React, { useState, useMemo } from "react";
import { Edit, Trash2, MapPin, Star } from "lucide-react";
import ReusableDataTable from "../../../components/ReusableDataTable";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableFilter from "../../../components/ReusableFilter";
import { PlusIcon } from "../../../assets/icons/icons";
import AddHotel from "./features/AddHotel";
import { useGetAdminHotelsQuery, useDeleteHotelMutation } from "../../../services/Api";
import { toast } from "react-toastify";

const ManageHotels = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  
  const { data, isLoading, error, refetch } = useGetAdminHotelsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
    status: filters.status || undefined,
  });
  const [deleteHotel] = useDeleteHotelMutation();

  // Transform API data to match component format
  const hotelsData = useMemo(() => {
    if (!data?.data?.hotels) return [];
    return data.data.hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      image: hotel.cover_image || hotel.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      location: { city: hotel.city || "Unknown", state: hotel.state || "" },
      rating: hotel.rating || 0,
      price: hotel.min_price || hotel.price_per_night || 0,
      availability: { count: hotel.available_rooms || 0, status: hotel.available_rooms > 10 ? "safe" : hotel.available_rooms > 5 ? "warning" : "danger" },
      status: hotel.status === 'active' ? "Active" : "Inactive",
    }));
  }, [data]);

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
      <div className="flex items-center justify-center">
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
          ? "bg-green-150 text-green-600"
          : "bg-red-50 text-red-600"
          }`}
      >
        {row.status}
      </span>
    ),
    actions: (row) => (
      <div className="flex items-center gap-2">
        <button 
          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
          onClick={() => {
            // TODO: Implement edit functionality
            console.log('Edit hotel:', row.id);
          }}
        >
          <Edit size={18} />
        </button>
        <button 
          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
          onClick={async () => {
            if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
              try {
                await deleteHotel(row.id).unwrap();
                toast.success('Hotel deleted successfully');
                refetch();
              } catch (error) {
                toast.error(error?.data?.message || 'Failed to delete hotel');
              }
            }
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  };

  // Columns Configuration
  const columns = [
    { key: "hotel", label: "Hotel", width: "250px" },
    { key: "location", label: "Location", width: "150px", center: true },
    { key: "category", label: "Category", width: "140px", center: true },
    { key: "price", label: "Price", width: "140px", center: true },
    { key: "availability", label: "Availability", width: "180px", center: true },
    { key: "status", label: "Status", width: "140px", center: true },
    { key: "actions", label: "Actions", width: "140px", center: true },
  ];




  // Filtering Logic (API handles pagination and search)
  const filteredData = hotelsData.filter(hotel => {
    const matchesCategory = !filters.category || hotel.rating.toString() === filters.category;
    const matchesStatus = !filters.status || hotel.status.toLowerCase() === filters.status.toLowerCase();
    return matchesCategory && matchesStatus;
  });

  const totalPages = data?.data?.pagination?.totalPages || Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData;

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
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="w-full md:w-auto">
          <ReusableFilter
            searchPlaceholder="Search hotels..."
            filters={filterOptions}
            onSearchChange={setSearchTerm}
            onFilterChange={(key, value) =>
              setFilters((prev) => ({ ...prev, [key]: value }))
            }
            className="shadow-none !p-0 bg-transparent"

          />
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors font-medium text-sm font-['Inter'] shadow-sm whitespace-nowrap w-full md:w-auto justify-center"
        >
          <PlusIcon className="w-4 h-4" />
          Add New Hotel
        </button>
      </div>



      {/* Table Section */}
      <div className="bg-white rounded-[24px] overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading hotels...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-500">Error loading hotels. Please try again.</p>
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

export default ManageHotels;

