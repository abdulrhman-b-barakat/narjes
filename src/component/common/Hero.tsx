import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpeg";

const Hero = () => {
  return (
    <section className=" relative overflow-hidden ">
      <img
        src={banner}
        alt="store banner"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] blur-[2px] "
      />
      <div className=" absolute top-1/2 left-1/2  text-center transform -translate-y-1/2 -translate-x-1/2  ">
        <h2 className="mb-8 text-white text-6xl md:text-8xl font-bold">
          VACTION <br /> READY
        </h2>
        <p className="text-white">
          Explore our vacation-ready outfits with fast worldwide shopping.
        </p>
        <button className="bg-white hover:bg-white/90 py-2 px-10 font-medium mt-5">
          <Link to="/products"> Shop Now</Link>
        </button>
      </div>
    </section>
  );
};

export default Hero;
