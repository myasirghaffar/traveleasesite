import React, { useState } from "react";
import {
    CloudUploadIcon,
    CheckCircleWhiteIcon,
    ChevronDownIcon
} from "../../../../assets/icons/icons";
import { X, Check } from "lucide-react";

const AddTaxi = ({ onCancel }) => {
    const [formData, setFormData] = useState({
        vehicleName: "",
        vehicleType: "",
        registrationNumber: "",
        driverName: "",
        driverPhone: "",
        pricePerKm: "",
        fixedRate: ""
    });

    const [vehicleImage, setVehicleImage] = useState(null);

    const vehicleTypes = [
        { value: "sedan", label: "Sedan" },
        { value: "suv", label: "SUV" },
        { value: "luxury", label: "Luxury" },
        { value: "van", label: "Van" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVehicleImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const InputLabel = ({ children }) => (
        <label className="block text-[14px] font-semibold text-slate-700 mb-2 font-['Inter']">
            {children}
        </label>
    );

    const InputField = (props) => (
        <input
            {...props}
            className="w-full h-[54px] px-5 rounded-[12px] border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-slate-700 placeholder:text-slate-300 font-['Inter'] text-[15px]"
        />
    );

    return (
        <div className="w-full min-h-screen bg-[#F9FAFB] p-8 space-y-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-slate-800 text-2xl font-bold font-['Inter']">
                        Add Taxi Vehicle
                    </h1>
                    <p className="text-gray-500 text-sm font-['Inter'] mt-1">
                        Add a new vehicle to your fleet.
                    </p>
                </div>
            </div>

            <div className="mx-auto">
                <div className="bg-white rounded-[24px] p-10 shadow-sm border border-slate-100 space-y-8">

                    <div className="space-y-6"> 
                        <div className="space-y-2">
                            <InputLabel>Vehicle Name</InputLabel>
                            <InputField
                                name="vehicleName"
                                value={formData.vehicleName}
                                onChange={handleInputChange}
                                placeholder="e.g., Toyota Camry 2023"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <InputLabel>Vehicle Type</InputLabel>
                                <div className="relative">
                                    <select
                                        name="vehicleType"
                                        value={formData.vehicleType}
                                        onChange={handleInputChange}
                                        className="w-full h-[54px] px-5 pr-12 rounded-[12px] border border-slate-200 focus:border-blue-500 transition-all outline-none appearance-none text-slate-700 bg-white font-['Inter'] text-[15px]"
                                    >
                                        <option value="">Select vehicle type</option>
                                        {vehicleTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronDownIcon className="w-5 h-5 text-slate-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <InputLabel>Registration Number</InputLabel>
                                <InputField
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleInputChange}
                                    placeholder="e.g., ABC-1234"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <InputLabel>Driver Name</InputLabel>
                                <InputField
                                    name="driverName"
                                    value={formData.driverName}
                                    onChange={handleInputChange}
                                    placeholder="Full name"
                                />
                            </div>
                            <div className="space-y-2">
                                <InputLabel>Driver Phone</InputLabel>
                                <InputField
                                    name="driverPhone"
                                    value={formData.driverPhone}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>

                        {/* Pricing Boxed Section */}
                        <div className="bg-slate-50/50 rounded-2xl p-8 space-y-6 border border-slate-100">
                            <h3 className="text-slate-800 font-bold text-[17px]">Pricing Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <InputLabel>Price per Km</InputLabel>
                                    <div className="relative">
                                        <InputField
                                            name="pricePerKm"
                                            value={formData.pricePerKm}
                                            onChange={handleInputChange}
                                            placeholder="0.00"
                                            style={{ paddingLeft: '40px' }}
                                        />
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <InputLabel>Fixed Rate (Optional)</InputLabel>
                                    <div className="relative">
                                        <InputField
                                            name="fixedRate"
                                            value={formData.fixedRate}
                                            onChange={handleInputChange}
                                            placeholder="0.00"
                                            style={{ paddingLeft: '40px' }}
                                        />
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Image */}
                        <div className="space-y-3">
                            <InputLabel>Vehicle Image</InputLabel>
                            <div
                                onClick={() => document.getElementById('vehicle-image-upload').click()}
                                className="relative border-2 border-dashed border-slate-200 rounded-[20px] h-[220px] flex flex-col items-center justify-center bg-white hover:bg-slate-50/50 transition-colors cursor-pointer group overflow-hidden"
                            >
                                <input
                                    id="vehicle-image-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {vehicleImage ? (
                                    <img src={vehicleImage} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <div className="p-4 bg-blue-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                            <CloudUploadIcon className="w-8 h-8 text-blue-500" />
                                        </div>
                                        <p className="text-slate-700 font-bold text-[15px] mb-1">Click to upload or drag and drop</p>
                                        <p className="text-slate-400 text-xs">PNG, JPG or WEBP (max. 5MB)</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <button
                            onClick={onCancel}
                            className="text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <div className="flex items-center gap-4">
                            <button className="px-8 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95">
                                Save as Draft
                            </button>
                            <button className="flex items-center gap-2 bg-blue-600 text-white px-10 py-3.5 rounded-xl font-bold font-['Inter'] text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                                <Check size={18} />
                                Save Taxi Vehicle
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddTaxi;
