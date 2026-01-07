import React, { useState, useEffect } from "react";
import {
    HotelBuildingIcon,
    PricingDollarIcon,
    MediaImageIcon,
    AmenitiesStarIcon,
    CloudUploadIcon,
    DisketteSaveIcon,
    CheckCircleWhiteIcon,
    PlusIcon,
    WifiIcon,
    ParkingIcon,
    AirConditioningIcon,
    BreakfastIcon,
    PoolIcon,
    GymIcon,
    AirportShuttleIcon,
    StarRatingIcon,
    ChevronDownIcon,
    XIcon
} from "../../../../assets/icons/icons";
import {
    BedDouble,
    Users,
    Maximize2,
    X
} from "lucide-react";
import { useCreateHotelMutation, useUpdateHotelMutation, useCreateRoomMutation } from "../../../../services/Api";
import { toast } from "react-toastify";
import { getImageUrl } from "../../../../services/ApiEndpoints";

// Move these components outside to prevent recreation on each render
const InputLabel = ({ children }) => (
    <label className="block text-[13px] sm:text-[14px] font-medium text-slate-700 mb-2 sm:mb-2.5 font-['Inter']">
        {children}
    </label>
);

const InputField = React.memo((props) => (
    <input
        {...props}
        className="w-full h-[48px] sm:h-[52px] px-4 sm:px-5 rounded-[10px] sm:rounded-[12px] border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-slate-700 placeholder:text-slate-400 font-['Inter'] text-[14px] sm:text-[15px] touch-manipulation"
    />
));
InputField.displayName = 'InputField';

// ModalInput component for AddRoomModal - moved outside to prevent recreation
const ModalInput = React.memo(({ label, name, icon: Icon, placeholder, type = "text", isPrice = false, required = false, value, onChange, onBlur, errors, touched }) => {
    const hasError = touched[name] && errors[name];
    return (
        <div className="space-y-2">
            <label className="block text-[13px] sm:text-[14px] font-semibold text-slate-800 font-['Inter']">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {Icon && !isPrice && (
                    <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Icon size={16} strokeWidth={1.5} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                )}
                {isPrice && (
                    <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm sm:text-base">$</div>
                )}
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={`w-full h-[48px] sm:h-[54px] ${(Icon || isPrice) ? 'pl-10 sm:pl-12' : 'px-4 sm:px-5'} ${isPrice ? 'pr-10 sm:pr-12' : 'pr-4 sm:pr-5'} rounded-[10px] sm:rounded-[12px] border ${hasError ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'} transition-all outline-none text-slate-700 placeholder:text-slate-300 font-['Inter'] text-[14px] sm:text-[15px] touch-manipulation`}
                />
                {isPrice && (
                    <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm sm:text-base">$</div>
                )}
            </div>
            {hasError && (
                <p className="text-red-500 text-[11px] sm:text-xs font-medium font-['Inter'] mt-1">{errors[name]}</p>
            )}
        </div>
    );
});
ModalInput.displayName = 'ModalInput';

const AddHotel = ({ onCancel, hotelData, isEdit = false, onSuccess, onRoomAdded }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        city: "",
        country: "",
        address: "",
        mapLink: "",
        basePrice: "",
        seasonalPrice: "",
        roomsAvailable: "",
        amenities: {
            wifi: false,
            breakfast: false,
            pool: false,
            parking: false,
            ac: false,
            gym: false,
            shuttle: false,
        }
    });

    const [coverImage, setCoverImage] = useState(null);
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [galleryImageFiles, setGalleryImageFiles] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [createHotel] = useCreateHotelMutation();
    const [updateHotel] = useUpdateHotelMutation();
    const [createRoom] = useCreateRoomMutation();
    const [isAddingRoom, setIsAddingRoom] = useState(false);

    // Load hotel data if editing
    useEffect(() => {
        if (isEdit && hotelData?.id) {
            setFormData({
                name: hotelData.name || "",
                description: hotelData.description || "",
                category: hotelData.category || "",
                city: hotelData.city || "",
                country: hotelData.country || "",
                address: hotelData.address || "",
                mapLink: hotelData.map_link || hotelData.mapLink || "",
                basePrice: hotelData.base_price || hotelData.base_price_per_night || "",
                seasonalPrice: hotelData.seasonal_price || "",
                roomsAvailable: hotelData.rooms_available || hotelData.total_rooms || "",
                amenities: {
                    wifi: hotelData.amenities?.wifi || hotelData.amenities?.includes?.('wifi') || false,
                    breakfast: hotelData.amenities?.breakfast || hotelData.amenities?.includes?.('breakfast') || false,
                    pool: hotelData.amenities?.pool || hotelData.amenities?.includes?.('pool') || false,
                    parking: hotelData.amenities?.parking || hotelData.amenities?.includes?.('parking') || false,
                    ac: hotelData.amenities?.ac || hotelData.amenities?.includes?.('ac') || false,
                    gym: hotelData.amenities?.gym || hotelData.amenities?.includes?.('gym') || false,
                    shuttle: hotelData.amenities?.shuttle || hotelData.amenities?.includes?.('shuttle') || false,
                }
            });
            if (hotelData.cover_image || hotelData.cover_image_url) {
                const coverImg = hotelData.cover_image || hotelData.cover_image_url;
                setCoverImage(getImageUrl(coverImg) || coverImg);
            }
            if (hotelData.gallery_images && hotelData.gallery_images.length > 0) {
                setGalleryImages(hotelData.gallery_images.map(img => getImageUrl(img) || img));
            }
        } else if (!isEdit) {
            // Reset rooms when not in edit mode
            setRooms([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, hotelData?.id]); // Only depend on hotelData.id to avoid resetting on every hotelData change

    // Separate effect to sync rooms from hotelData (runs when hotelData.rooms changes)
    useEffect(() => {
        if (isEdit && hotelData?.id) {
            if (hotelData.rooms && hotelData.rooms.length > 0) {
                const mappedRooms = hotelData.rooms.map(room => ({
                    id: room.id, // Include ID for existing rooms
                    roomName: room.name || "",
                    bedType: room.bed_type || "",
                    guestType: `${room.max_occupancy || room.guest_capacity || 2} Guests`,
                    roomSize: room.size || room.room_size || "",
                    price: room.price_per_night || ""
                }));
                // Update rooms list when hotelData.rooms changes
                setRooms(mappedRooms);
            } else {
                setRooms([]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, hotelData?.id, hotelData?.rooms]);

    const categories = [
        { value: "5", label: "5 Star" },
        { value: "4", label: "4 Star" },
        { value: "3", label: "3 Star" },
        { value: "2", label: "2 Star" },
        { value: "1", label: "1 Star" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAmenityToggle = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: {
                ...prev.amenities,
                [amenity]: !prev.amenities[amenity]
            }
        }));
    };

    const handleCoverUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryUpload = (e) => {
        const files = Array.from(e.target.files);
        if (galleryImages.length + files.length > 10) {
            toast.error("Maximum 10 images allowed in gallery");
            return;
        }

        setGalleryImageFiles(prev => [...prev, ...files]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGalleryImages(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeGalleryImage = (index) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index));
        setGalleryImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddRoom = async (roomData) => {
        // If editing an existing hotel, call API to save room immediately
        if (isEdit && hotelData?.id) {
            setIsAddingRoom(true);
            try {
                // Extract guest count from guestType (e.g., "2 Guests" -> 2)
                const guestCount = parseInt(roomData.guestType.toString().replace(/[^0-9]/g, '') || '2');
                
                // Prepare room data for API (match backend expectations)
                // Validate available_shift - default to 'Both' if not provided or invalid
                const validShifts = ['Day', 'Night', 'Both', '24 Hours'];
                const requestedShift = roomData.availableShift || 'Both';
                const finalShift = validShifts.includes(requestedShift) ? requestedShift : 'Both';
                
                const roomPayload = {
                    name: roomData.roomName,
                    bed_type: roomData.bedType,
                    guest_capacity: guestCount,
                    room_size: parseFloat(roomData.roomSize) || 0,
                    price_per_night: parseFloat(roomData.price) || 0,
                    available_shift: finalShift
                };

                // Call API to create room
                const result = await createRoom({
                    hotelId: hotelData.id,
                    data: roomPayload
                }).unwrap();

                // Add room to local state with API response data
                const newRoom = {
                    id: result.data?.id || result.id,
                    roomName: roomData.roomName,
                    bedType: roomData.bedType,
                    guestType: roomData.guestType,
                    roomSize: roomData.roomSize,
                    price: roomData.price
                };
                
                setRooms(prev => [...prev, newRoom]);
                setIsRoomModalOpen(false);
                
                // Show success message
                toast.success('Room added successfully');
                
                // Notify parent to refetch hotel data to sync rooms list
                if (onRoomAdded) {
                    onRoomAdded();
                }
            } catch (error) {
                console.error('Error adding room:', error);
                toast.error(error?.data?.message || error?.message || 'Failed to add room. Please try again.');
            } finally {
                setIsAddingRoom(false);
            }
        } else {
            // If creating a new hotel, just add to local state (will be saved with hotel)
            console.log('Adding room to new hotel:', roomData);
            setRooms(prev => {
                const updated = [...prev, roomData];
                console.log('Updated rooms state:', updated);
                return updated;
            });
            setIsRoomModalOpen(false);
        }
    };

    const handleSave = async (publish = false) => {
        // Validation
        if (!formData.name || !formData.city || !formData.country || !formData.basePrice) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);
        try {
            const formDataToSend = new FormData();
            
            // Basic hotel information
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description || '');
            formDataToSend.append('category', formData.category);
            formDataToSend.append('city', formData.city);
            formDataToSend.append('country', formData.country);
            formDataToSend.append('address', formData.address || '');
            if (formData.mapLink) {
                formDataToSend.append('map_link', formData.mapLink);
            }
            formDataToSend.append('base_price_per_night', formData.basePrice);
            if (formData.seasonalPrice) {
                formDataToSend.append('seasonal_price_per_night', formData.seasonalPrice);
            }
            formDataToSend.append('rooms_available', formData.roomsAvailable || 0);
            formDataToSend.append('status', publish ? 'published' : 'draft');

            // Cover image
            if (coverImageFile) {
                formDataToSend.append('cover_image', coverImageFile);
            }

            // Gallery images
            galleryImageFiles.forEach((file) => {
                formDataToSend.append('gallery_images', file);
            });

            // Amenities
            const amenitiesArray = Object.entries(formData.amenities)
                .filter(([, value]) => value)
                .map(([key]) => key);
            formDataToSend.append('amenities', JSON.stringify(amenitiesArray));

            // Rooms data - always send rooms array (even if empty) so backend can process it
            console.log('=== ROOMS DEBUG ===');
            console.log('Rooms state:', rooms);
            console.log('Rooms length:', rooms.length);
            console.log('Rooms type:', typeof rooms, Array.isArray(rooms));
            
            const validRooms = rooms.filter(room => {
                console.log('Checking room:', room);
                const roomName = (room.roomName || room.name || '').trim();
                const price = room.price || room.price_per_night || 0;
                const priceNum = parseFloat(price);
                
                console.log('Room name:', roomName, 'Length:', roomName.length);
                console.log('Room price:', price, 'Parsed:', priceNum);
                console.log('Full room object:', JSON.stringify(room));
                
                // Validation - room name must be at least 2 characters (backend requirement)
                // But if user entered something, let's be more lenient and allow 1 char for now
                // Validation - room name must be at least 2 characters (backend requirement)
                const isValid = roomName.length >= 2 && priceNum > 0;
                if (!isValid) {
                    console.log('❌ Invalid room filtered out:', { roomName, price, roomNameLength: roomName.length, priceNum });
                } else {
                    console.log('✅ Valid room:', { roomName, price: priceNum });
                }
                return isValid;
            });
            
            console.log('Valid rooms count:', validRooms.length);
            console.log('Valid rooms:', validRooms);
            
            // Always send rooms array (even if empty) so backend knows to process/delete rooms
            formDataToSend.append('rooms', JSON.stringify(validRooms));
            console.log('Rooms JSON stringified:', JSON.stringify(validRooms));
            console.log('=== END ROOMS DEBUG ===');

            if (isEdit && hotelData?.id) {
                // Update hotel
                await updateHotel({ id: hotelData.id, data: formDataToSend }).unwrap();
                toast.success('Hotel updated successfully');
            } else {
                // Create hotel
                await createHotel({ data: formDataToSend }).unwrap();
                toast.success('Hotel created successfully');
            }

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error saving hotel:', error);
            toast.error(error?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} hotel`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const SectionHeader = ({ icon: Icon, title }) => {
        const IconComponent = Icon;
        return (
            <div className="flex items-center gap-2 sm:gap-2.5 mb-6 sm:mb-8">
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <h2 className="text-[18px] sm:text-[20px] font-bold text-slate-900 font-['Inter']">{title}</h2>
            </div>
        );
    };

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 lg:space-y-10 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                <div className="space-y-1">
                    <h1 className="text-slate-900 text-2xl sm:text-3xl font-extrabold font-['Inter']">
                        Manage Hotels
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">
                        View, edit, and add new hotels to the platform.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <button
                        onClick={onCancel}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95 text-sm touch-manipulation"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => handleSave(true)}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 sm:px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 text-sm disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    >
                        <CheckCircleWhiteIcon className="w-4 h-4" />
                        {isSubmitting ? 'Saving...' : 'Save & Publish'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 sm:gap-8 lg:gap-10">
                {/* Left Column - Main Form */}
                <div className="space-y-6 sm:space-y-8">

                    {/* Hotel Information Section */}
                    <section className="bg-white rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] p-4 sm:p-6 lg:p-10 shadow-sm border border-slate-200">
                        <SectionHeader icon={HotelBuildingIcon} title="Hotel Information" />

                        <div className="space-y-6 sm:space-y-8">
                            <div className="space-y-2">
                                <InputLabel>Hotel Name</InputLabel>
                                <InputField
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter hotel name"
                                />
                            </div>

                                <div className="space-y-2">
                                <InputLabel>Description</InputLabel>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe your hotel..."
                                    className="w-full h-[120px] sm:h-[140px] lg:h-[160px] p-4 sm:p-5 rounded-[10px] sm:rounded-[12px] border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none resize-none text-slate-700 placeholder:text-slate-400 font-['Inter'] text-[14px] sm:text-[15px] touch-manipulation"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                                <div className="space-y-2">
                                    <InputLabel>Category</InputLabel>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full h-[48px] sm:h-[52px] px-4 sm:px-5 pr-10 sm:pr-12 rounded-[10px] sm:rounded-[12px] border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none appearance-none text-slate-700 bg-white font-['Inter'] text-[14px] sm:text-[15px] touch-manipulation"
                                        >
                                            <option value="" disabled>Select category</option>
                                            {categories.map(cat => (
                                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <InputLabel>City</InputLabel>
                                    <InputField
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="Enter city"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                                <div className="space-y-2">
                                    <InputLabel>Country</InputLabel>
                                    <InputField
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        placeholder="Enter country"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <InputLabel>Address</InputLabel>
                                    <InputField
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter full address"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <InputLabel>Map Link (Optional)</InputLabel>
                                <InputField
                                    name="mapLink"
                                    value={formData.mapLink}
                                    onChange={handleInputChange}
                                    placeholder="https://maps.google.com/..."
                                />
                            </div>
                        </div>
                    </section>

                    {/* Pricing & Availability Section */}
                    <section className="bg-white rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] p-4 sm:p-6 lg:p-10 shadow-sm border border-slate-200">
                        <SectionHeader icon={PricingDollarIcon} title="Pricing & Availability" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            <div className="space-y-2">
                                <InputLabel>Base Price / Night</InputLabel>
                                <div className="relative">
                                    <InputField
                                        name="basePrice"
                                        type="number"
                                        value={formData.basePrice}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        className="pl-10 sm:pl-[40px]"
                                    />
                                    <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm sm:text-base">$</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <InputLabel>Seasonal Price (Optional)</InputLabel>
                                <div className="relative">
                                    <InputField
                                        name="seasonalPrice"
                                        type="number"
                                        value={formData.seasonalPrice}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        className="pl-10 sm:pl-[40px]"
                                    />
                                    <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm sm:text-base">$</span>
                                </div>
                            </div>
                            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                                <InputLabel>Rooms Available</InputLabel>
                                <InputField
                                    name="roomsAvailable"
                                    type="number"
                                    value={formData.roomsAvailable}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Images Section */}
                    <section className="bg-white rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] p-4 sm:p-6 lg:p-10 shadow-sm border border-slate-200">
                        <SectionHeader icon={MediaImageIcon} title="Images" />

                        <div className="space-y-6 sm:space-y-8">
                            <div className="space-y-3">
                                <InputLabel>Cover Image</InputLabel>
                                <div
                                    onClick={() => document.getElementById('cover-upload').click()}
                                    className="relative border-2 border-dashed border-slate-200 rounded-[16px] sm:rounded-[20px] h-[180px] sm:h-[200px] lg:h-[240px] flex flex-col items-center justify-center bg-slate-50/30 hover:bg-slate-50 active:bg-slate-50 transition-colors cursor-pointer group overflow-hidden touch-manipulation"
                                >
                                    <input
                                        id="cover-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleCoverUpload}
                                    />
                                    {coverImage ? (
                                        <>
                                            <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-white font-bold text-sm sm:text-base px-4 text-center">Change Cover Image</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm mb-3 sm:mb-5 group-hover:scale-110 group-active:scale-110 transition-transform border border-slate-200">
                                                <CloudUploadIcon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                                            </div>
                                            <p className="text-slate-900 font-bold text-base sm:text-lg mb-1 px-2 text-center">Upload Hotel Image</p>
                                            <p className="text-slate-400 text-xs sm:text-sm text-center px-4 sm:px-6">Drag and drop your cover image here or click to browse</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <InputLabel>Gallery Images (Up to 10)</InputLabel>
                                <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-5 mt-2">
                                    {galleryImages.map((img, idx) => (
                                        <div key={idx} className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 group">
                                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeGalleryImage(idx);
                                                }}
                                                className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 sm:p-1.5 bg-white/90 rounded-full shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-white touch-manipulation"
                                                aria-label="Remove image"
                                            >
                                                <XIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
                                            </button>
                                        </div>
                                    ))}
                                    {galleryImages.length < 10 && (
                                        <div
                                            onClick={() => document.getElementById('gallery-upload').click()}
                                            className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-xl sm:rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50/20 hover:bg-slate-50 active:bg-slate-50 transition-all cursor-pointer group touch-manipulation"
                                        >
                                            <input
                                                id="gallery-upload"
                                                type="file"
                                                className="hidden"
                                                multiple
                                                accept="image/*"
                                                onChange={handleGalleryUpload}
                                            />
                                            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-blue-500 group-active:text-blue-500 transition-colors" />
                                            <span className="text-[10px] sm:text-xs text-slate-400 mt-1.5 sm:mt-2 font-bold group-hover:text-blue-500 group-active:text-blue-500 transition-colors">Add Image</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* Rooms Section */}
                    <section className="bg-white rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] p-4 sm:p-6 lg:p-10 shadow-sm border border-slate-200 space-y-6 sm:space-y-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-2 sm:gap-2.5">
                                <StarRatingIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                <h2 className="text-[18px] sm:text-[20px] font-bold text-slate-900 font-['Inter']">Rooms</h2>
                            </div>
                            <button
                                onClick={() => setIsRoomModalOpen(true)}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 text-sm touch-manipulation"
                            >
                                Add Rooms
                            </button>
                        </div>

                        {rooms.length > 0 && (
                            <div className="p-4 sm:p-6 lg:p-8 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] border border-slate-200 bg-slate-50/20">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    {rooms.map((room, idx) => (
                                        <div key={idx} className="p-4 sm:p-6 rounded-[12px] sm:rounded-[16px] bg-white border border-slate-200 shadow-sm relative group">
                                            <button
                                                onClick={() => setRooms(prev => prev.filter((_, i) => i !== idx))}
                                                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-red-500 active:text-red-500 transition-colors touch-manipulation p-1"
                                                aria-label="Remove room"
                                            >
                                                <X size={16} strokeWidth={1.5} className="sm:w-[18px] sm:h-[18px]" />
                                            </button>

                                            <div className="space-y-3 sm:space-y-4 pr-8">
                                                <h4 className="text-[15px] sm:text-[17px] font-bold text-[#1E293B] font-['Inter'] leading-tight">
                                                    {room.roomName}
                                                </h4>

                                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-[12px] sm:text-[13px] text-slate-500 font-medium font-['Inter']">
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                        <BedDouble size={14} strokeWidth={1.5} className="text-slate-400 sm:w-4 sm:h-4" />
                                                        <span className="break-words">{room.bedType}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                        <Users size={14} strokeWidth={1.5} className="text-slate-400 sm:w-4 sm:h-4" />
                                                        <span>{room.guestType}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                        <Maximize2 size={14} strokeWidth={1.5} className="text-slate-400 sm:w-4 sm:h-4" />
                                                        <span>{room.roomSize} m²</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-baseline gap-1.5">
                                                    <span className="text-[18px] sm:text-[20px] font-bold text-slate-900 font-['Inter']">${room.price}</span>
                                                    <span className="text-[12px] sm:text-[13px] text-slate-400 font-medium font-['Inter']">/ night</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Amenities Section */}
                    <section className="bg-white rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] p-4 sm:p-6 lg:p-10 shadow-sm border border-slate-200">
                        <SectionHeader icon={AmenitiesStarIcon} title="Amenities" />

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                            {[
                                { key: 'wifi', icon: WifiIcon, label: 'WiFi' },
                                { key: 'breakfast', icon: BreakfastIcon, label: 'Breakfast' },
                                { key: 'pool', icon: PoolIcon, label: 'Pool' },
                                { key: 'parking', icon: ParkingIcon, label: 'Parking' },
                                { key: 'ac', icon: AirConditioningIcon, label: 'A/C' },
                                { key: 'gym', icon: GymIcon, label: 'Gym' },
                                { key: 'shuttle', icon: AirportShuttleIcon, label: 'Shuttle' },
                            ].map((amenity) => (
                                <button
                                    key={amenity.key}
                                    onClick={() => handleAmenityToggle(amenity.key)}
                                    className={`flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border-2 transition-all touch-manipulation min-h-[88px] sm:min-h-[100px] ${formData.amenities[amenity.key]
                                        ? 'border-blue-500 bg-blue-50/50 text-blue-700'
                                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50 active:bg-slate-50'
                                        }`}
                                >
                                    <amenity.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${formData.amenities[amenity.key] ? 'text-blue-600' : 'text-slate-400'}`} />
                                    <span className="font-bold text-[11px] sm:text-xs">{amenity.label}</span>
                                </button>
                            ))}
                        </div>
                    </section>


                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6 sm:space-y-8 h-fit xl:sticky xl:top-8">

                    {/* Card Preview */}
                    <div className="bg-white rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-200">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 border-b border-slate-50 pb-4 sm:pb-6 mb-6 sm:mb-8">Preview</h3>

                        <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/40">
                            <div className="h-40 sm:h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                                {coverImage ? (
                                    <img src={coverImage} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <MediaImageIcon className="w-12 h-12 sm:w-14 sm:h-14 text-slate-300" />
                                )}
                            </div>
                            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                                <div>
                                    <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                                        {formData.name || 'Hotel Name'}
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-1 sm:mt-1.5 flex items-center gap-1 font-medium">
                                        {formData.city || 'City'}, {formData.country || 'Country'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <StarRatingIcon key={star} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 mt-1">4.0</span>
                                </div>

                                <div className="pt-3 sm:pt-4 border-t border-slate-50 flex items-end justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price Starts From</p>
                                        <p className="text-blue-600 font-black text-xl sm:text-2xl">
                                            ${formData.basePrice || '0'} <span className="text-[9px] sm:text-[10px] text-slate-400 font-normal uppercase">/ night</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions in Sidebar */}
                        <div className="mt-6 sm:mt-8 lg:mt-10 space-y-3 sm:space-y-4">
                            <h3 className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 sm:mb-4">Quick Actions</h3>
                            <button 
                                onClick={() => handleSave(false)}
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation text-sm sm:text-base"
                            >
                                <DisketteSaveIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                                {isSubmitting ? 'Saving...' : 'Save Draft'}
                            </button>
                            <button 
                                onClick={() => handleSave(true)}
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation text-sm sm:text-base"
                            >
                                <CheckCircleWhiteIcon className="w-4 h-4" />
                                {isSubmitting ? 'Publishing...' : 'Save & Publish'}
                            </button>
                        </div>
                    </div>

                    {/* Publishing Tips */}
                    <div className="bg-blue-600 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden shadow-xl shadow-blue-200">
                        <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10">
                            <HotelBuildingIcon className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32" />
                        </div>
                        <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 relative z-10">Publishing Tips</h4>
                        <ul className="space-y-3 sm:space-y-4 relative z-10">
                            {[
                                { title: 'Imagery', desc: 'Use high-resolution photos' },
                                { title: 'Details', desc: 'Fill all required attributes' },
                                { title: 'Pricing', desc: 'Set competitive market rates' }
                            ].map((tip, idx) => (
                                <li key={idx} className="flex gap-2 sm:gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-2 shrink-0" />
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-xs sm:text-sm leading-none">{tip.title}</p>
                                        <p className="text-blue-100 text-[10px] sm:text-[11px] font-medium leading-tight">{tip.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Room Modal */}
            {isRoomModalOpen && (
                <AddRoomModal
                    onClose={() => setIsRoomModalOpen(false)}
                    onAdd={handleAddRoom}
                    isSubmitting={isAddingRoom}
                />
            )}
        </div>
    );
};

const AddRoomModal = ({ onClose, onAdd, isSubmitting = false }) => {
    const [roomData, setRoomData] = useState({
        roomName: "",
        bedType: "",
        guestType: "",
        roomSize: "",
        price: "",
        availableShift: "Both" // Default to "Both" as per backend default
    });
    
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    
    const handleBlur = (name) => {
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, roomData[name]);
    };
    
    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'roomName': {
                const roomName = (value || '').trim();
                if (!roomName) {
                    error = 'Room name is required';
                } else if (roomName.length < 2) {
                    error = 'Room name must be at least 2 characters';
                } else if (roomName.length > 255) {
                    error = 'Room name must be less than 255 characters';
                }
                break;
            }
            case 'bedType':
                if (!value || !value.trim()) {
                    error = 'Bed type is required';
                }
                break;
            case 'guestType': {
                if (!value || !value.trim()) {
                    error = 'Guest type is required';
                } else {
                    const guestCount = parseInt(value.toString().replace(/[^0-9]/g, ''));
                    if (!guestCount || guestCount < 1 || guestCount > 20) {
                        error = 'Please enter a valid guest count (1-20)';
                    }
                }
                break;
            }
            case 'roomSize': {
                if (!value || !value.trim()) {
                    error = 'Room size is required';
                } else {
                    const size = parseFloat(value);
                    if (isNaN(size) || size <= 0 || size > 1000) {
                        error = 'Please enter a valid room size (1-1000 m²)';
                    }
                }
                break;
            }
            case 'price':
                if (!value) {
                    error = 'Price is required';
                } else {
                    const price = parseFloat(value);
                    if (isNaN(price) || price <= 0) {
                        error = 'Price must be greater than 0';
                    }
                }
                break;
        }
        
        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
        
        return !error;
    };
    
    const validateForm = () => {
        const fields = ['roomName', 'bedType', 'guestType', 'roomSize', 'price'];
        let isValid = true;
        
        fields.forEach(field => {
            if (!validateField(field, roomData[field])) {
                isValid = false;
            }
            setTouched(prev => ({ ...prev, [field]: true }));
        });
        
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Format guestType to extract number
        const guestCount = parseInt(roomData.guestType.toString().replace(/[^0-9]/g, '') || '2');
        const formattedRoomData = {
            ...roomData,
            guestType: `${guestCount} Guests`
        };
        
        await onAdd(formattedRoomData);
        
        // Reset form after adding (only if not submitting - API will handle closing)
        if (!isSubmitting) {
            setRoomData({
                roomName: "",
                bedType: "",
                guestType: "",
                roomSize: "",
                price: "",
                availableShift: "Both" // Reset to default
            });
            setErrors({});
            setTouched({});
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-[600px] max-h-[90vh] sm:max-h-[85vh] rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 m-4">
                <div className="px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10 pb-4 sm:pb-6 flex items-center justify-between shrink-0 border-b border-slate-50">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 font-['Inter']">Add room</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 active:bg-slate-100 rounded-full transition-colors touch-manipulation"
                        aria-label="Close modal"
                    >
                        <X size={24} className="text-slate-900 sm:w-7 sm:h-7" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6 custom-scrollbar">
                    <form id="add-room-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <ModalInput
                            label="Room Name"
                            name="roomName"
                            placeholder="Deluxe King Room"
                            required={true}
                            value={roomData.roomName}
                            onChange={handleChange}
                            onBlur={() => handleBlur('roomName')}
                            errors={errors}
                            touched={touched}
                        />
                        <ModalInput
                            label="Bed Type"
                            name="bedType"
                            icon={BedDouble}
                            placeholder="King Bed"
                            required={true}
                            value={roomData.bedType}
                            onChange={handleChange}
                            onBlur={() => handleBlur('bedType')}
                            errors={errors}
                            touched={touched}
                        />
                        <ModalInput
                            label="Guest Type"
                            name="guestType"
                            icon={Users}
                            placeholder="2 Guests"
                            required={true}
                            value={roomData.guestType}
                            onChange={handleChange}
                            onBlur={() => handleBlur('guestType')}
                            errors={errors}
                            touched={touched}
                        />
                        <ModalInput
                            label="Room Size (m²)"
                            name="roomSize"
                            icon={Maximize2}
                            placeholder="35"
                            type="number"
                            required={true}
                            value={roomData.roomSize}
                            onChange={handleChange}
                            onBlur={() => handleBlur('roomSize')}
                            errors={errors}
                            touched={touched}
                        />
                        <ModalInput
                            label="Price per Night"
                            name="price"
                            type="number"
                            isPrice={true}
                            placeholder="120"
                            required={true}
                            value={roomData.price}
                            onChange={handleChange}
                            onBlur={() => handleBlur('price')}
                            errors={errors}
                            touched={touched}
                        />
                        <div className="space-y-2">
                            <label className="block text-[13px] sm:text-[14px] font-semibold text-slate-800 font-['Inter']">
                                Available Shift
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Users size={16} strokeWidth={1.5} className="sm:w-[18px] sm:h-[18px]" />
                                </div>
                                <select
                                    name="availableShift"
                                    value={roomData.availableShift}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('availableShift')}
                                    className="w-full h-[48px] sm:h-[54px] pl-10 sm:pl-12 pr-10 sm:pr-12 rounded-[10px] sm:rounded-[12px] border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-slate-700 font-['Inter'] text-[14px] sm:text-[15px] appearance-none bg-white touch-manipulation"
                                >
                                    <option value="">Select shift</option>
                                    <option value="Day">Day (6 AM - 6 PM)</option>
                                    <option value="Night">Night (6 PM - 6 AM)</option>
                                    <option value="Both">Both</option>
                                    <option value="24 Hours">24 Hours</option>
                                </select>
                                <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                                </div>
                            </div>
                            {touched.availableShift && errors.availableShift && (
                                <p className="text-red-500 text-[11px] sm:text-xs font-medium font-['Inter'] mt-1">{errors.availableShift}</p>
                            )}
                        </div>
                    </form>
                </div>

                <div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 border-t border-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 shrink-0 bg-white">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-3.5 rounded-xl border border-slate-200 text-slate-400 font-bold hover:bg-slate-50 active:bg-slate-50 transition-all text-sm sm:text-base touch-manipulation"
                    >
                        Cancel
                    </button>
                    <button
                        form="add-room-form"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    >
                        {isSubmitting ? 'Adding...' : 'Add Room'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddHotel;
