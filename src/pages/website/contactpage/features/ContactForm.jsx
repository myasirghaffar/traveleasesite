import React from 'react';
import ReusableInput from '../../../../components/ReusableInput';

const ContactForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
    };

    return (
        <section className="w-full max-w-[1240px] mx-auto px-4 py-16">
            <div className="bg-white rounded-[45px] shadow-xl p-8 md:p-16 border border-gray-100">
                <div className="w-full mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-stone-950 text-4xl font-extrabold font-['Poppins'] mb-4">
                            Send us a Message
                        </h2>
                        <p className="text-neutral-600 text-lg font-medium font-['Roboto']">
                            Have a specific inquiry or just want to say hi? Fill out the form below and we'll get back to you within 24 hours.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ReusableInput
                                label="Your Name"
                                placeholder="Enter your full name"
                                className="bg-gray-50 border border-gray-200 rounded-2xl h-14 w-full px-6"
                                labelClassName="text-stone-950 font-bold mb-2 ml-1"
                                containerClasses="w-full"
                            />
                            <ReusableInput
                                label="Email Address"
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-50 border border-gray-200 rounded-2xl h-14 w-full px-6"
                                labelClassName="text-stone-950 font-bold mb-2 ml-1"
                                containerClasses="w-full"
                            />
                        </div>

                        <ReusableInput
                            label="Subject"
                            placeholder="What is this regarding?"
                            className="bg-gray-50 border border-gray-200 rounded-2xl h-14 w-full px-6"
                            labelClassName="text-stone-950 font-bold mb-2 ml-1"
                            containerClasses="w-full"
                        />

                        <div className="flex flex-col">
                            <label className="text-stone-950 font-bold mb-2 ml-1 font-poppins">Message</label>
                            <textarea
                                rows="5"
                                placeholder="Tell us more about your request..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-6 focus:ring-2 focus:ring-blue-500 outline-none font-roboto text-stone-950"
                            ></textarea>
                        </div>

                        <div className="flex justify-center pt-8">
                            <button
                                type="submit"
                                className="px-12 h-14 bg-blue-500 text-white text-lg font-bold font-['Poppins'] rounded-2xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
