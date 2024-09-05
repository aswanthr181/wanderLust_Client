const Footer = () => {
    return (
        <>

            <footer className="bg-gray-800 text-white py-8 mb-0 mt-20 ">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-lg font-bold mb-4">YourApp</h4>
                            <p>YourApp is the all-in-one solution for productivity and team collaboration.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-gray-300">Features</a></li>
                                <li><a href="#" className="hover:text-gray-300">Pricing</a></li>
                                <li><a href="#" className="hover:text-gray-300">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-gray-300">aswanthr181@gmail.com</a></li>
                                <li><a href="#" className="hover:text-gray-300">+91 7356791418</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="hover:text-blue-400"><i className="fab fa-facebook fa-lg"></i></a>
                                <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter fa-lg"></i></a>
                                <a href="#" className="hover:text-pink-500"><i className="fab fa-instagram fa-lg"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <p>© {(new Date().getFullYear())} Aswanth R. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer