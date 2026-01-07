import React, { useEffect } from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";

const ConfirmModal = ({
    open,
    onClose,
    onConfirm,
    loading,
    title,
    message,
    icon = "warning",
    confirmText = "Yes, delete it!",
    cancelText = "Cancel",
    confirmColor = "bg-red-600",
    cancelColor = "bg-gray-200",
    confirmTextColor = "text-white",
    cancelTextColor = "text-gray-700",
}) => {
    // Handle escape key press
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape' && open && !loading) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [open, loading, onClose]);

    if (!open) return null;

    const getIcon = () => {
        switch (icon) {
            case "warning":
                return <AlertTriangle className="w-16 h-16 text-amber-500" strokeWidth={1.5} />;
            case "error":
                return <X className="w-16 h-16 text-red-500" strokeWidth={1.5} />;
            case "delete":
                return <Trash2 className="w-16 h-16 text-red-500" strokeWidth={1.5} />;
            default:
                return <AlertTriangle className="w-16 h-16 text-amber-500" strokeWidth={1.5} />;
        }
    };

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={(e) => {
                if (e.target === e.currentTarget && !loading) {
                    onClose();
                }
            }}
        >
            <div className="bg-white rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 overflow-hidden">
                {/* Header with icon */}
                <div className="px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10 pb-6 flex flex-col items-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-50 flex items-center justify-center mb-4 sm:mb-6">
                        {getIcon()}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Inter'] mb-3 text-center">
                        {title}
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base font-medium font-['Inter'] text-center leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 border-t border-slate-100 bg-slate-50/50">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl border border-slate-200 ${cancelTextColor} font-bold hover:bg-slate-50 active:bg-slate-50 transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation`}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 ${confirmColor} ${confirmTextColor} rounded-xl font-bold shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 transition-all active:scale-95 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center gap-2`}
                    >
                        {loading && (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? "Deleting..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;