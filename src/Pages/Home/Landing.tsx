// src/pages/LandingPage.tsx
import React from 'react';

const LandingPage = () => {
    return (
        <div>

            {/* Hero Section */}
            <section
                className="bg-cover bg-center text-white text-center py-24"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1729188430325-eb540fcdd941?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', // Unsplash image link
                }}>
                <div className="container mx-auto">
                    <h1 className="text-5xl font-extrabold mb-6 p-5">Empower Your Voice, Build a Safer Community</h1>
                    <p className="text-xl mb-8">
                        Report corruption, eve-teasing, fraud, and misconduct. Help authorities take action. Your complaint matters.
                    </p>
                    <button className="bg-orange-500 text-white py-3 px-8 rounded-full text-lg">
                        Submit a Complaint
                    </button>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto text-center px-4 sm:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                        What is Civic-Tech?
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 mb-10">
                        Civic-Tech is technology designed to enhance the relationship between the government and the citizens. It promotes transparency, accountability, and citizen participation in the governance process.
                    </p>

                    {/* Responsive Grid for Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">A Transparent System</h3>
                            <p className="text-gray-600">
                                Enable citizens to report issues and track actions taken in real-time.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Government Accountability</h3>
                            <p className="text-gray-600">
                                Authorities are held accountable by ensuring they respond to citizen complaints and requests.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Community Engagement</h3>
                            <p className="text-gray-600">
                                Citizens can actively participate in the betterment of their community through technology.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Core Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <img src="https://media.istockphoto.com/id/823610438/photo/finling-online-complaint.webp?a=1&b=1&s=612x612&w=0&k=20&c=BXvXpd4IwimvcIXbnceyyfZ6Ghz3808SFo8gqgn161c=" alt="Complaint Submission" className="w-full h-48 object-cover rounded-md mb-4" />
                            <h3 className="text-2xl font-semibold mb-4">Easy Complaint Submission</h3>
                            <p>Submit complaints with title, description, category, and district details. Upload images, PDFs, or videos as evidence.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <img src="https://media.istockphoto.com/id/2244836362/photo/contact-us-businessman-manage-and-analysis-of-growth-graph-data-on-customer-support-services.webp?a=1&b=1&s=612x612&w=0&k=20&c=sGTko0QhFpncD4qZwXrYMVj4K7JTC-py6ejxKyFQYpA=" alt="Complaint Tracking" className="w-full h-48 object-cover rounded-md mb-4" />
                            <h3 className="text-2xl font-semibold mb-4">Track Your Complaint</h3>
                            <p>Track the status of your complaints from submission to resolution. Stay informed with timely notifications.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <img src="https://images.unsplash.com/photo-1567010181037-8f482ca00531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFjdGlvbnxlbnwwfHwwfHx8MA%3D%3D" alt="Government Action" className="w-full h-48 object-cover rounded-md mb-4" />
                            <h3 className="text-2xl font-semibold mb-4">Government Action</h3>
                            <p>Government authorities review complaints and take necessary action, ensuring accountability and transparency.</p>
                        </div>
                    </div>
                </div>
            </section>

          
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto text-center px-4 sm:px-8">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-6">
                        How It Works
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 mb-10">
                        Our platform connects citizens with authorities to ensure your voice is heard and justice is served. Here's how it works:
                    </p>

                    {/* Grid Layout for Steps */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                                    1
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Submit Your Complaint</h3>
                            <p className="text-gray-600">
                                Fill out a simple form to submit your complaint with evidence.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                                    2
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Government Review</h3>
                            <p className="text-gray-600">
                                Authorities will review your complaint and initiate an investigation.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                                    3
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Action Taken</h3>
                            <p className="text-gray-600">
                                Authorities will take appropriate action based on the investigation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Get Involved Section */}
            <section className="bg-yellow-900 text-white text-center py-24">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold mb-6">Get Involved</h2>
                    <p className="text-xl mb-8">
                        Join us in building a safer, more accountable community. Your participation can make a difference!
                    </p>
                    <button className="bg-orange-500 text-white py-3 px-8 rounded-full text-lg">
                        Submit a Complaint
                    </button>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;