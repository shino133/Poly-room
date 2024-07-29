function Content() {
    return ( 
        <>
            <section className="relative bg-cover bg-center" style={{ backgroundImage: 'url(image/your-image.jpg)' }}>
    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center">
        <div className="container mx-auto px-4 py-16">
            <div className="text-center text-white">
                <h6 className="text-sm uppercase font-semibold mb-2">Away from monotonous life</h6>
                <h2 className="text-4xl font-bold mb-4">Relax Your Mind</h2>
                <p className="text-lg mb-6">
                    If you are looking at blank cassettes on the web, you may be very confused at the<br />
                    difference in price. You may see some for as low as $.17 each.
                </p>
                <a href="#" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">Get Started</a>
            </div>
        </div>
    </div>
    <div className="relative z-10 py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="flex">
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold">Book<br /> Your Room</h2>
                </div>
                <div className="w-full md:w-2/3">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Arrival Date</label>
                                    <input type="text" className="w-full border rounded-lg p-2" placeholder="Arrival Date" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Departure Date</label>
                                    <input type="text" className="w-full border rounded-lg p-2" placeholder="Departure Date" />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Adult</label>
                                    <select className="w-full border rounded-lg p-2">
                                        <option data-display="Adult">Adult</option>
                                        <option value="1">Old</option>
                                        <option value="2">Younger</option>
                                        <option value="3">Potato</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Child</label>
                                    <select className="w-full border rounded-lg p-2">
                                        <option data-display="Child">Child</option>
                                        <option value="1">Child</option>
                                        <option value="2">Baby</option>
                                        <option value="3">Child</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Number of Rooms</label>
                                    <select className="w-full border rounded-lg p-2">
                                        <option data-display="Number of Rooms">Number of Rooms</option>
                                        <option value="1">Room 01</option>
                                        <option value="2">Room 02</option>
                                        <option value="3">Room 03</option>
                                    </select>
                                </div>
                                <a href="#" className="block bg-blue-500 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-600">Book Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

        </>
     );
}

export default Content;