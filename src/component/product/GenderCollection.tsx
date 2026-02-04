import womenCollection from "../../assets/wonencollection.png";
import menCollection from "../../assets/mencollection.png";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  const collections = [
    {
      id: 1,
      title: "Women's Collection",
      image: womenCollection,
      link: "/products?gender=Women",
    },
    {
      id: 2,
      title: "Men's Collection",
      image: menCollection,
      link: "/products?gender=Men",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container flex flex-col md:flex-row items-center gap-8">
        {collections.map((item) => (
          <div
            key={item.id}
            className="relative flex-1 w-full group overflow-hidden"
          >
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={item.image}
              alt={item.title}
            />

            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] text-center py-5 px-3 md:py-8 bg-white/90 backdrop-blur-sm shadow-lg">
              <h2 className="font-bold text-lg md:text-xl cursor-default uppercase tracking-wide">
                {item.title}
              </h2>
              <Link
                to={item.link}
                className="inline-block mt-2 underline decoration-1 underline-offset-4 text-gray-700 hover:text-black transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenderCollectionSection;
