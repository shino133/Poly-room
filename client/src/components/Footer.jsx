import React from "react";

function Footer() {
    return (
        <>
            <footer className="bg-gray-900 text-gray-300 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="col-span-1">
                            <div className="mb-6">
                                <h6 className="text-white font-semibold mb-4">About Agency</h6>
                                <p className="text-gray-400">The world has become so fast paced that people don’t want to stand by reading a page of information, they would much rather look at a presentation and understand the message. It has come to a point</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="mb-6">
                                <h6 className="text-white font-semibold mb-4">Navigation Links</h6>
                                <div className="flex">
                                    <ul className="mr-4">
                                        <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white">Feature</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white">Portfolio</a></li>
                                    </ul>
                                    <ul>
                                        <li><a href="#" className="text-gray-400 hover:text-white">Team</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="mb-6">
                                <h6 className="text-white font-semibold mb-4">Newsletter</h6>
                                <p className="text-gray-400">For business professionals caught between high OEM price and mediocre print and graphic output,</p>
                                <div>
                                    <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get" className="relative">
                                        <div className="flex">
                                            <input name="EMAIL" placeholder="Email Address" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Email Address'} required type="email" className="w-full px-4 py-2 rounded-l-md bg-gray-800 text-gray-300 focus:outline-none"/>
                                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md"><span className="lnr lnr-location"></span></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="mb-6">
                                <h6 className="text-white font-semibold mb-4">InstaFeed</h6>
                                <ul className="flex flex-wrap">
                                    <li className="w-1/4 p-1"><img src="../assets/image/instagram/Image-01.jpg" alt="" className="w-full h-full object-cover"/></li>
                                    <li className="w-1/4 p-1"><img src="../assets/image/instagram/Image-02.jpg" alt="" className="w-full h-full object-cover"/></li>
                                    <li className="w-1/4 p-1"><img src="../assets/image/instagram/Image-03.jpg" alt="" className="w-full h-full object-cover"/></li>
                                    <li className="w-1/4 p-1"><img src="../assets/image/instagram/Image-04.jpg" alt="" className="w-full h-full object-cover"/></li>
                                    <li className="w-1/4 p-1"><img src="../assets/image/instagram/Image-05.jpg" alt="" className="w-full h-full object-cover"/></li>
                                    <li className="w-1/4 p-1"><img src="../assets/image/instagram/Image-06.jpg" alt="" className="w-full h-full object-cover"/></li>
                                    <li className="w-1/4 p-1"><img src="../assets/image/instagram/Image-07.jpg" alt="" className="w-full h-full object-cover"/></li>
                                    <li className="w-1/4 p-1"><img src="../assets/image/instagram/Image-08.jpg" alt="" className="w-full h-full object-cover"/></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8"></div>
                    <div className="flex flex-col lg:flex-row justify-between items-center mt-8">
                        <p className="text-gray-400 mb-4 lg:mb-0">Copyright &copy;{new Date().getFullYear()} All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600">Colorlib</a></p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fa fa-facebook"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fa fa-twitter"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fa fa-dribbble"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fa fa-behance"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
