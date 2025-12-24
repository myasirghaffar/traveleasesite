import React from 'react';
import HeroSection from './features/HeroSection';
import ContactDetails from './features/ContactDetails';
import ContactForm from './features/ContactForm';
import NewsletterBanner from './features/NewsletterBanner';

const ContactPage = () => {
    return (
        <div className="flex flex-col items-center bg-gray-50/30">
            {/* Hero Section Container */}
            <div className="w-full max-w-8xl px-4 pt-2">
                <HeroSection />
            </div>

            {/* Contact Details Section */}
            <div className="w-full -mt-20 relative z-20">
                <ContactDetails />
            </div>

            {/* Contact Form Section */}
            <ContactForm />

            {/* Newsletter Section */}
            <NewsletterBanner />
        </div>
    );
};

export default ContactPage;
