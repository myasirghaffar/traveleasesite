import React, { useState } from "react";
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

const AddHotel = ({ onCancel }) => {
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
    const [galleryImages, setGalleryImages] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

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
            alert("Maximum 10 images allowed in gallery");
            return;
        }

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
    };

    const handleAddRoom = (roomData) => {
        setRooms(prev => [...prev, roomData]);
        setIsRoomModalOpen(false);
    };

    const SectionHeader = ({ icon: Icon, title }) => (
        <div className="flex items-center gap-2.5 mb-8">
            <Icon className="w-5 h-5 text-blue-600" />
            <h2 className="text-[20px] font-bold text-slate-900 font-['Inter']">{title}</h2>
        </div>
    );

    const InputLabel = ({ children }) => (
        <label className="block text-[14px] font-medium text-slate-700 mb-2.5 font-['Inter']">
            {children}
        </label>
    );

    const InputField = (props) => (
        <input
            {...props}
            className="w-full h-[52px] px-5 rounded-[12px] border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-slate-700 placeholder:text-slate-400 font-['Inter'] text-[15px]"
        />
    );

    return (
        <div className="w-full min-h-screen p-8 space-y-10 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-slate-900 text-3xl font-extrabold font-['Inter']">
                        Manage Hotels
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        View, edit, and add new hotels to the platform.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95 text-sm"
                    >
                        Cancel
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 text-sm">
                        <CheckCircleWhiteIcon className="w-4 h-4" />
                        Save & Publish
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-10">
                {/* Left Column - Main Form */}
                <div className="space-y-8">

                    {/* Hotel Information Section */}
                    <section className="bg-white rounded-[24px] p-10 shadow-sm border border-slate-200">
                        <SectionHeader icon={HotelBuildingIcon} title="Hotel Information" />

                        <div className="space-y-8">
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
                                    className="w-full h-[160px] p-5 rounded-[12px] border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none resize-none text-slate-700 placeholder:text-slate-400 font-['Inter'] text-[15px]"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <InputLabel>Category</InputLabel>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full h-[52px] px-5 pr-12 rounded-[12px] border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none appearance-none text-slate-700 bg-white font-['Inter'] text-[15px]"
                                        >
                                            <option value="" disabled>Select category</option>
                                            {categories.map(cat => (
                                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <ChevronDownIcon className="w-5 h-5 text-slate-900" />
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    <section className="bg-white rounded-[24px] p-10 shadow-sm border border-slate-200">
                        <SectionHeader icon={PricingDollarIcon} title="Pricing & Availability" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <InputLabel>Base Price / Night</InputLabel>
                                <div className="relative">
                                    <InputField
                                        name="basePrice"
                                        type="number"
                                        value={formData.basePrice}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        style={{ paddingLeft: '40px' }}
                                    />
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">$</span>
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
                                        style={{ paddingLeft: '40px' }}
                                    />
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                </div>
                            </div>
                            <div className="space-y-2">
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
                    <section className="bg-white rounded-[24px] p-10 shadow-sm border border-slate-200">
                        <SectionHeader icon={MediaImageIcon} title="Images" />

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <InputLabel>Cover Image</InputLabel>
                                <div
                                    onClick={() => document.getElementById('cover-upload').click()}
                                    className="relative border-2 border-dashed border-slate-200 rounded-[20px] h-[240px] flex flex-col items-center justify-center bg-slate-50/30 hover:bg-slate-50 transition-colors cursor-pointer group overflow-hidden"
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
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-white font-bold">Change Cover Image</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-5 bg-white rounded-2xl shadow-sm mb-5 group-hover:scale-110 transition-transform border border-slate-200">
                                                <CloudUploadIcon className="w-10 h-10 text-blue-500" />
                                            </div>
                                            <p className="text-slate-900 font-bold text-lg mb-1">Upload Hotel Image</p>
                                            <p className="text-slate-400 text-sm text-center px-6">Drag and drop your cover image here or click to browse</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <InputLabel>Gallery Images (Up to 10)</InputLabel>
                                <div className="flex flex-wrap gap-5 mt-2">
                                    {galleryImages.map((img, idx) => (
                                        <div key={idx} className="relative w-36 h-36 rounded-2xl overflow-hidden border border-slate-200 group">
                                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeGalleryImage(idx);
                                                }}
                                                className="absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                            >
                                                <XIcon className="w-3.5 h-3.5 text-red-500" />
                                            </button>
                                        </div>
                                    ))}
                                    {galleryImages.length < 10 && (
                                        <div
                                            onClick={() => document.getElementById('gallery-upload').click()}
                                            className="w-36 h-36 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50/20 hover:bg-slate-50 transition-all cursor-pointer group"
                                        >
                                            <input
                                                id="gallery-upload"
                                                type="file"
                                                className="hidden"
                                                multiple
                                                accept="image/*"
                                                onChange={handleGalleryUpload}
                                            />
                                            <PlusIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            <span className="text-xs text-slate-400 mt-2 font-bold group-hover:text-blue-500 transition-colors">Add Image</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* Rooms Section */}
                    <section className="bg-white rounded-[24px] p-10 shadow-sm border border-slate-200 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <StarRatingIcon className="w-5 h-5 text-blue-600" />
                                <h2 className="text-[20px] font-bold text-slate-900 font-['Inter']">Rooms</h2>
                            </div>
                            <button
                                onClick={() => setIsRoomModalOpen(true)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 text-sm"
                            >
                                Add Rooms
                            </button>
                        </div>

                        {rooms.length > 0 && (
                            <div className="p-8 rounded-[24px] border border-slate-200 bg-slate-50/20">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {rooms.map((room, idx) => (
                                        <div key={idx} className="p-6 rounded-[16px] bg-white border border-slate-200 shadow-sm relative group">
                                            <button
                                                onClick={() => setRooms(prev => prev.filter((_, i) => i !== idx))}
                                                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <X size={18} strokeWidth={1.5} />
                                            </button>

                                            <div className="space-y-4">
                                                <h4 className="text-[17px] font-bold text-[#1E293B] font-['Inter']">
                                                    {room.roomName}
                                                </h4>

                                                <div className="flex items-center gap-6 text-[13px] text-slate-500 font-medium font-['Inter']">
                                                    <div className="flex items-center gap-2">
                                                        <BedDouble size={16} className="text-slate-400" strokeWidth={1.5} />
                                                        {room.bedType}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users size={16} className="text-slate-400" strokeWidth={1.5} />
                                                        {room.guestType}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Maximize2 size={16} className="text-slate-400" strokeWidth={1.5} />
                                                        {room.roomSize} m²
                                                    </div>
                                                </div>

                                                <div className="flex items-baseline gap-1.5">
                                                    <span className="text-[20px] font-bold text-slate-900 font-['Inter']">${room.price}</span>
                                                    <span className="text-[13px] text-slate-400 font-medium font-['Inter']">/ night</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Amenities Section */}
                    <section className="bg-white rounded-[24px] p-10 shadow-sm border border-slate-200">
                        <SectionHeader icon={AmenitiesStarIcon} title="Amenities" />

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
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
                                    className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${formData.amenities[amenity.key]
                                        ? 'border-blue-500 bg-blue-50/50 text-blue-700'
                                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                                        }`}
                                >
                                    <amenity.icon className={`w-6 h-6 ${formData.amenities[amenity.key] ? 'text-blue-600' : 'text-slate-400'}`} />
                                    <span className="font-bold text-xs">{amenity.label}</span>
                                </button>
                            ))}
                        </div>
                    </section>


                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-8 h-fit sticky top-8">

                    {/* Card Preview */}
                    <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-6 mb-8">Preview</h3>

                        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/40">
                            <div className="h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                                {coverImage ? (
                                    <img src={coverImage} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <MediaImageIcon className="w-14 h-14 text-slate-300" />
                                )}
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 leading-tight">
                                        {formData.name || 'Hotel Name'}
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1 font-medium">
                                        {formData.city || 'City'}, {formData.country || 'Country'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <StarRatingIcon key={star} className="w-4 h-4 text-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 mt-1">4.0</span>
                                </div>

                                <div className="pt-4 border-t border-slate-50 flex items-end justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price Starts From</p>
                                        <p className="text-blue-600 font-black text-2xl">
                                            ${formData.basePrice || '0'} <span className="text-[10px] text-slate-400 font-normal uppercase">/ night</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions in Sidebar */}
                        <div className="mt-10 space-y-4">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-4">Quick Actions</h3>
                            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all active:scale-95 group">
                                <DisketteSaveIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                                Save Draft
                            </button>
                            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                                <CheckCircleWhiteIcon className="w-4 h-4" />
                                Save & Publish
                            </button>
                        </div>
                    </div>

                    {/* Publishing Tips */}
                    <div className="bg-blue-600 rounded-[24px] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-200">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <HotelBuildingIcon className="w-32 h-32" />
                        </div>
                        <h4 className="text-lg font-bold mb-4 relative z-10">Publishing Tips</h4>
                        <ul className="space-y-4 relative z-10">
                            {[
                                { title: 'Imagery', desc: 'Use high-resolution photos' },
                                { title: 'Details', desc: 'Fill all required attributes' },
                                { title: 'Pricing', desc: 'Set competitive market rates' }
                            ].map((tip, idx) => (
                                <li key={idx} className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-2 shrink-0" />
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-sm leading-none">{tip.title}</p>
                                        <p className="text-blue-100 text-[11px] font-medium leading-tight">{tip.desc}</p>
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
                />
            )}
        </div>
    );
};

const AddRoomModal = ({ onClose, onAdd }) => {
    const [roomData, setRoomData] = useState({
        roomName: "",
        bedType: "",
        guestType: "",
        roomSize: "",
        price: "",
        availableShift: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!roomData.roomName || !roomData.price) return;
        onAdd(roomData);
    };

    const ModalInput = ({ label, name, icon: Icon, placeholder, type = "text", isPrice = false }) => (
        <div className="space-y-2">
            <label className="block text-[14px] font-semibold text-slate-800 font-['Inter']">
                {label}
            </label>
            <div className="relative">
                {Icon && !isPrice && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Icon size={18} strokeWidth={1.5} />
                    </div>
                )}
                {isPrice && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</div>
                )}
                <input
                    name={name}
                    type={type}
                    value={roomData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`w-full h-[54px] ${(Icon || isPrice) ? 'pl-12' : 'px-5'} ${isPrice ? 'pr-12' : 'pr-5'} rounded-[12px] border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-slate-700 placeholder:text-slate-300 font-['Inter'] text-[15px]`}
                />
                {isPrice && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</div>
                )}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-[600px] max-h-[85vh] rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="px-10 pt-10 pb-6 flex items-center justify-between shrink-0 border-b border-slate-50">
                    <h2 className="text-3xl font-bold text-slate-900 font-['Inter']">Add room</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={28} className="text-slate-900" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-10 py-6 custom-scrollbar">
                    <form id="add-room-form" onSubmit={handleSubmit} className="space-y-6">
                        <ModalInput
                            label="Room Name"
                            name="roomName"
                            placeholder="Deluxe King Room"
                        />
                        <ModalInput
                            label="Bed Type"
                            name="bedType"
                            icon={BedDouble}
                            placeholder="King Bed"
                        />
                        <ModalInput
                            label="Guest Type"
                            name="guestType"
                            icon={Users}
                            placeholder="2 Guests"
                        />
                        <ModalInput
                            label="Room Size"
                            name="roomSize"
                            icon={Maximize2}
                            placeholder="35 m²"
                        />
                        <ModalInput
                            label="Price"
                            name="price"
                            type="number"
                            isPrice={true}
                            placeholder="120"
                        />
                        <ModalInput
                            label="Available Shift"
                            name="availableShift"
                            icon={Users}
                            placeholder="Night"
                        />
                    </form>
                </div>

                <div className="px-10 py-8 border-t border-slate-50 flex items-center justify-end gap-4 shrink-0 bg-white">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-10 py-3.5 rounded-xl border border-slate-200 text-slate-400 font-bold hover:bg-slate-50 transition-all text-base"
                    >
                        Cancel
                    </button>
                    <button
                        form="add-room-form"
                        type="submit"
                        className="px-12 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 text-base"
                    >
                        Add Room
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddHotel;
