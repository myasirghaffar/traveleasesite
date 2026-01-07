import React, { useState, useMemo } from "react";
import { Edit, Trash2, MapPin, Star, Eye } from "lucide-react";
import ReusableDataTable from "../../../components/ReusableDataTable";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableFilter from "../../../components/ReusableFilter";
import { PlusIcon } from "../../../assets/icons/icons";
import AddHotel from "./features/AddHotel";
import ViewHotel from "./features/ViewHotel";
import ConfirmModal from "../../../components/ConfirmModal";
import {
  useGetAdminHotelsQuery,
  useDeleteHotelMutation,
  useGetAdminHotelByIdQuery
} from "../../../services/Api";
import { toast } from "react-toastify";
import { getImageUrl } from "../../../services/ApiEndpoints";

const ManageHotels = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingHotelId, setEditingHotelId] = useState(null);
  const [viewingHotelId, setViewingHotelId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);
  
  // Build API query parameters
  const queryParams = useMemo(() => {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      sortBy: 'created_at',
      sortOrder: 'desc'
    };
    
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    if (filters.status && filters.status !== 'all') {
      params.status = filters.status;
    }
    
    if (filters.category && filters.category !== 'all') {
      params.category = filters.category;
    }
    
    return params;
  }, [currentPage, itemsPerPage, searchTerm, filters]);
  
  const { data, isLoading, error, refetch } = useGetAdminHotelsQuery(queryParams);
  const [deleteHotel, { isLoading: isDeleting }] = useDeleteHotelMutation();
  
  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters.status, filters.category]);

  // Transform API data to match component format
  const hotelsData = useMemo(() => {
    if (!data?.data?.hotels) return [];
    return data.data.hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      image: getImageUrl(hotel.cover_image) || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      location: { city: hotel.city || "Unknown", country: hotel.country || "" },
      category: hotel.category || "Standard",
      rating: parseFloat(hotel.category?.replace(/[^0-9]/g, '') || 0) || 0,
      price: hotel.base_price || 0,
      availability: { 
        count: hotel.rooms_available || hotel.total_rooms || 0, 
        status: (hotel.rooms_available || hotel.total_rooms || 0) > 10 ? "safe" : (hotel.rooms_available || hotel.total_rooms || 0) > 5 ? "warning" : "danger" 
      },
      status: hotel.status === 'active' || hotel.status === 'published' ? "Active" : "Inactive",
      total_rooms: hotel.total_rooms || 0,
      total_bookings: hotel.total_bookings || 0,
    }));
  }, [data]);

  // Filter Options
  const filterOptions = [
    {
      key: "category",
      label: "All Categories",
      options: [
        { value: "all", label: "All Categories" },
        { value: "Luxury", label: "Luxury" },
        { value: "Business", label: "Business" },
        { value: "Budget", label: "Budget" },
        { value: "Resort", label: "Resort" },
        { value: "Boutique", label: "Boutique" },
      ],
    },
    {
      key: "status",
      label: "All Status",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "published", label: "Published" },
        { value: "inactive", label: "Inactive" },
        { value: "draft", label: "Draft" },
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
          {row.location.city}{row.location.country ? `, ${row.location.country}` : ''}
        </span>
      </div>
    ),
    category: (row) => (
      <div className="flex flex-col items-center justify-center">
        <span className="text-gray-900 text-sm font-medium font-['Inter'] mb-1">
          {row.category}
        </span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
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
          className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
          onClick={() => {
            setViewingHotelId(row.id);
          }}
          title="View Hotel"
        >
          <Eye size={18} />
        </button>
        <button 
          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
          onClick={() => {
            setEditingHotelId(row.id);
          }}
          title="Edit Hotel"
        >
          <Edit size={18} />
        </button>
        <button 
          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
          onClick={() => {
            setHotelToDelete(row);
            setDeleteModalOpen(true);
          }}
          title="Delete Hotel"
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




  // Use API pagination data directly (API handles all filtering)
  const totalPages = data?.data?.pagination?.total_pages || data?.data?.pagination?.totalPages || 1;
  const totalItems = data?.data?.pagination?.total_items || data?.data?.pagination?.totalItems || 0;
  const currentData = hotelsData;

  // Handle edit mode - fetch hotel data and show edit form
  const { data: hotelData, refetch: refetchHotelData } = useGetAdminHotelByIdQuery(editingHotelId, {
    skip: !editingHotelId
  });

  if (isAdding) {
    return <AddHotel onCancel={() => setIsAdding(false)} onSuccess={() => {
      setIsAdding(false);
      refetch();
    }} />;
  }

  if (viewingHotelId) {
    return (
      <ViewHotel
        hotelId={viewingHotelId}
        onClose={() => setViewingHotelId(null)}
        onEdit={(id) => {
          setViewingHotelId(null);
          setEditingHotelId(id);
        }}
      />
    );
  }

  if (editingHotelId && hotelData?.data) {
    return <AddHotel 
      hotelData={hotelData.data.hotel || hotelData.data} 
      isEdit={true}
      onCancel={() => setEditingHotelId(null)} 
      onSuccess={() => {
        setEditingHotelId(null);
        refetch();
      }}
      onRoomAdded={() => {
        // Refetch hotel data after room is added to update the rooms list
        if (refetchHotelData) {
          refetchHotelData();
        }
      }}
    />;
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
            onSearchChange={(value) => {
              setSearchTerm(value);
              setCurrentPage(1); // Reset to first page on search
            }}
            onFilterChange={(key, value) => {
              setFilters((prev) => ({ ...prev, [key]: value }));
              setCurrentPage(1); // Reset to first page on filter change
            }}
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
          Showing {currentData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => {
          if (!isDeleting) {
            setDeleteModalOpen(false);
            setHotelToDelete(null);
          }
        }}
        onConfirm={async () => {
          if (hotelToDelete) {
            try {
              await deleteHotel(hotelToDelete.id).unwrap();
              toast.success('Hotel deleted successfully');
              refetch();
              setDeleteModalOpen(false);
              setHotelToDelete(null);
            } catch (error) {
              toast.error(error?.data?.message || 'Failed to delete hotel');
            }
          }
        }}
        loading={isDeleting}
        title="Delete Hotel?"
        message={`Are you sure you want to delete ${hotelToDelete?.name}? This action cannot be undone and all associated data will be permanently removed.`}
        icon="delete"
        confirmText="Yes, delete it"
        cancelText="Cancel"
        confirmColor="bg-red-600"
      />
    </div>
  );
};

export default ManageHotels;

