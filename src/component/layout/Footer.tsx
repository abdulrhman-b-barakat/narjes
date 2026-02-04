import { Link } from "react-router-dom";
// استيراد الأيقونات من مكتبة Lu
import { LuFacebook, LuInstagram, LuTwitter, LuPhone } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 py-12 bg-white">
      <div className="container  grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0 text-gray-900">

        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">Newsletter</h3>
          <p className="text-sm mb-4 leading-relaxed text-gray-600">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="text-sm mb-6 text-gray-600">
            Sign up and get 10% off your first order.
          </p>

          <form className="flex w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all font-medium uppercase tracking-wider"
            >
              Subscribe
            </button>
          </form>
        </div>


        <div className="md:pl-10">
          <h3 className="text-lg font-semibold mb-4 text-black">Shop</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            {[
              "Men's Top Wear",
              "Women's Top Wear",
              "Men's Bottom Wear",
              "Women's Bottom Wear",
            ].map((link) => (
              <li key={link}>
                <Link to="/shop" className="hover:text-black transition-colors">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>


        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">Support</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            {["Contact Us", "About Us", "FAQs", "Features"].map((link) => (
              <li key={link}>
                <Link
                  to="/support"
                  className="hover:text-black transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">Follow Us</h3>

          <div className="flex items-center gap-5 text-gray-700 text-xl mb-8">
            <a href="#" className="hover:text-black transition-colors">
              <LuFacebook />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <LuInstagram />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <LuTwitter />
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Call Us
            </p>
            <div className="flex items-center gap-3 text-black">
              <LuPhone className="text-xl" />
              <a
                href="tel:0123456789"
                className="text-xl font-bold tracking-tighter hover:text-gray-700 transition-colors"
              >
                0123-456-789
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
