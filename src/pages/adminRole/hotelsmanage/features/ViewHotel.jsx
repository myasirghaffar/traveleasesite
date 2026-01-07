import React from "react";
import {
    HotelBuildingIcon,
    PricingDollarIcon,
    MediaImageIcon,
    AmenitiesStarIcon,
    XIcon
} from "../../../../assets/icons/icons";
import {
    MapPin,
    Star,
    BedDouble,
    Users,
    Maximize2,
    Calendar,
    Globe,
    Eye
} from "lucide-react";
import { useGetAdminHotelByIdQuery } from "../../../../services/Api";
import { getImageUrl } from "../../../../services/ApiEndpoints";

const ViewHotel = ({ hotelId, onClose, onEdit }) => {
    const { data, isLoading, error } = useGetAdminHotelByIdQuery(hotelId, {
        skip: !hotelId
    });

    if (isLoading) {
        return (
            <div className="w-full min-h-screen p-8 flex items-center justify-center">
                <p className="text-gray-500">Loading hotel details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen p-8 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Error loading hotel details: {error?.message || 'Unknown error'}</p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // API response structure: { success: true, message: "...", data: { hotel: {...} } }
    // RTK Query returns the full response, so:
    // - data = { success: true, message: "...", data: { hotel: {...} } }
    // - data.data = { hotel: {...} }
    // - data.data.hotel = the actual hotel object
    // In index.jsx, it passes hotelData.data to AddHotel, which is { hotel: {...} }
    // So we need to access data.data.hotel here
    const hotel = data?.data?.hotel;

    if (!hotel) {
        return (
            <div className="w-full min-h-screen p-8 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Hotel not found</p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const SectionHeader = ({ icon: Icon, title }) => (
        <div className="flex items-center gap-2.5 mb-6">
            <Icon className="w-5 h-5 text-blue-600" />
            <h2 className="text-[20px] font-bold text-slate-900 font-['Inter']">{title}</h2>
        </div>
    );

    const InfoRow = ({ label, value, icon: Icon }) => (
        <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
            {Icon && <Icon className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />}
            <div className="flex-1">
                <p className="text-slate-500 text-sm font-medium font-['Inter'] mb-1">{label}</p>
                <p className="text-slate-900 text-base font-semibold font-['Inter']">{value || "N/A"}</p>
            </div>
        </div>
    );

    const getStatusBadge = (status) => {
        const statusMap = {
            active: { bg: "bg-green-50", text: "text-green-600", label: "Active" },
            published: { bg: "bg-blue-50", text: "text-blue-600", label: "Published" },
            draft: { bg: "bg-gray-50", text: "text-gray-600", label: "Draft" },
            inactive: { bg: "bg-red-50", text: "text-red-600", label: "Inactive" },
            suspended: { bg: "bg-orange-50", text: "text-orange-600", label: "Suspended" }
        };
        const statusStyle = statusMap[status] || statusMap.draft;
        return (
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                {statusStyle.label}
            </span>
        );
    };

    return (
        <div className="w-full min-h-screen p-8 space-y-8 animate-in fade-in duration-500 bg-slate-50">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white rounded-[24px] p-6 shadow-sm border border-slate-200">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-slate-900 text-3xl font-extrabold font-['Inter']">
                            {hotel.name}
                        </h1>
                        {getStatusBadge(hotel.status)}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <MapPin size={16} />
                        <span className="text-sm font-medium font-['Inter']">
                            {hotel.city}, {hotel.country}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(hotel.id)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 text-sm"
                        >
                            <Eye size={16} />
                            Edit Hotel
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95 text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
                {/* Left Column - Main Details */}
                <div className="space-y-8">
                    {/* Cover Image */}
                    {hotel.cover_image || hotel.cover_image_url ? (
                        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 overflow-hidden">
                            <img
                                src={getImageUrl(hotel.cover_image || hotel.cover_image_url)}
                                alt={hotel.name}
                                className="w-full h-[400px] object-cover rounded-xl"
                            />
                        </div>
                    ) : null}

                    {/* Hotel Information */}
                    <section className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-200">
                        <SectionHeader icon={HotelBuildingIcon} title="Hotel Information" />
                        <div className="space-y-1">
                            <InfoRow label="Hotel Name" value={hotel.name} />
                            <InfoRow label="Description" value={hotel.description} />
                            <InfoRow label="Category" value={`${hotel.category} Star`} icon={Star} />
                            <InfoRow label="City" value={hotel.city} icon={MapPin} />
                            <InfoRow label="Country" value={hotel.country} icon={Globe} />
                            <InfoRow label="Address" value={hotel.address} icon={MapPin} />
                            {hotel.map_link && (
                                <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
                                    <Globe className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-slate-500 text-sm font-medium font-['Inter'] mb-1">Map Link</p>
                                        <a
                                            href={hotel.map_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 text-base font-semibold font-['Inter'] hover:underline break-all"
                                        >
                                            {hotel.map_link}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Pricing Information */}
                    <section className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-200">
                        <SectionHeader icon={PricingDollarIcon} title="Pricing" />
                        <div className="space-y-1">
                            <InfoRow
                                label="Base Price per Night"
                                value={`$${parseFloat(hotel.base_price_per_night || 0).toFixed(2)}`}
                            />
                            {hotel.seasonal_price_per_night && (
                                <InfoRow
                                    label="Seasonal Price per Night"
                                    value={`$${parseFloat(hotel.seasonal_price_per_night).toFixed(2)}`}
                                />
                            )}
                            <InfoRow label="Rooms Available" value={hotel.rooms_available || 0} />
                        </div>
                    </section>

                    {/* Amenities */}
                    {hotel.amenities && hotel.amenities.length > 0 && (
                        <section className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-200">
                            <SectionHeader icon={AmenitiesStarIcon} title="Amenities" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {hotel.amenities.map((amenity, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl"
                                    >
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span className="text-slate-700 text-sm font-medium font-['Inter'] capitalize">
                                            {amenity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Gallery Images */}
                    {hotel.gallery_images && hotel.gallery_images.length > 0 && (
                        <section className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-200">
                            <SectionHeader icon={MediaImageIcon} title="Gallery Images" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {hotel.gallery_images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group"
                                    >
                                        <img
                                            src={getImageUrl(img)}
                                            alt={`Gallery ${idx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Rooms */}
                    {hotel.rooms && hotel.rooms.length > 0 && (
                        <section className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-200">
                            <SectionHeader icon={BedDouble} title="Rooms" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {hotel.rooms.map((room) => (
                                    <div
                                        key={room.id || room.name}
                                        className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <h4 className="text-slate-900 text-lg font-bold font-['Inter']">
                                                {room.name || "Unnamed Room"}
                                            </h4>
                                            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                                ${parseFloat(room.price_per_night || 0).toFixed(2)}/night
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-slate-700">
                                                <div className="p-2 bg-white rounded-lg">
                                                    <BedDouble size={16} className="text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium">Bed Type</p>
                                                    <p className="text-sm font-semibold">
                                                        {room.bed_type || "Standard Bed"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-700">
                                                <div className="p-2 bg-white rounded-lg">
                                                    <Users size={16} className="text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium">Guest Capacity</p>
                                                    <p className="text-sm font-semibold">
                                                        {room.guest_capacity || room.max_occupancy || 2} Guests
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-700">
                                                <div className="p-2 bg-white rounded-lg">
                                                    <Maximize2 size={16} className="text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium">Room Size</p>
                                                    <p className="text-sm font-semibold">
                                                        {room.room_size || room.size || 25} m²
                                                    </p>
                                                </div>
                                            </div>
                                            {room.available_shift && (
                                                <div className="flex items-center gap-3 text-slate-700 pt-2 border-t border-slate-200">
                                                    <div className="p-2 bg-white rounded-lg">
                                                        <Calendar size={16} className="text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 font-medium">Available Shift</p>
                                                        <p className="text-sm font-semibold capitalize">
                                                            {room.available_shift}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column - Sidebar Info */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200">
                        <h3 className="text-slate-900 text-lg font-bold font-['Inter'] mb-4">Quick Stats</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <span className="text-slate-600 text-sm font-medium">Total Rooms</span>
                                <span className="text-slate-900 text-lg font-bold">
                                    {hotel.rooms?.length || 0}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <span className="text-slate-600 text-sm font-medium">Rooms Available</span>
                                <span className="text-slate-900 text-lg font-bold">
                                    {hotel.rooms_available || 0}
                                </span>
                            </div>
                            {hotel.rating && (
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <span className="text-slate-600 text-sm font-medium">Rating</span>
                                    <div className="flex items-center gap-1">
                                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-slate-900 text-lg font-bold">
                                            {parseFloat(hotel.rating).toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            )}
                            {hotel.total_reviews && (
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <span className="text-slate-600 text-sm font-medium">Total Reviews</span>
                                    <span className="text-slate-900 text-lg font-bold">
                                        {hotel.total_reviews}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200">
                        <h3 className="text-slate-900 text-lg font-bold font-['Inter'] mb-4">Metadata</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-slate-600">
                                <Calendar size={16} className="text-slate-400" />
                                <span className="text-sm font-medium">
                                    Created: {new Date(hotel.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <Calendar size={16} className="text-slate-400" />
                                <span className="text-sm font-medium">
                                    Updated: {new Date(hotel.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewHotel;

