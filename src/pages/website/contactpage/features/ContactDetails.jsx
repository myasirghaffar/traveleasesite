import { MapPin, Phone, Mail } from 'lucide-react';

const ContactDetails = () => {
    const details = [
        {
            icon: <MapPin className="text-blue-500 w-8 h-8" />,
            title: "Our Location",
            content: "123 Travel Avenue, Suite 456, Adventure City, AC 78910",
        },
        {
            icon: <Phone className="text-blue-500 w-8 h-8" />,
            title: "Phone Number",
            content: "+91 345 533 865",
        },
        {
            icon: <Mail className="text-blue-500 w-8 h-8" />,
            title: "Email Address",
            content: "support@travelease.com",
        }
    ];

    return (
        <section className="w-full max-w-[1240px] mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {details.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                    >
                        <div className="bg-blue-50 p-4 rounded-2xl mb-6">
                            {item.icon}
                        </div>
                        <h3 className="text-stone-950 text-xl font-bold font-['Poppins'] mb-3">
                            {item.title}
                        </h3>
                        <p className="text-neutral-600 text-base font-medium font-['Roboto'] leading-relaxed">
                            {item.content}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ContactDetails;
