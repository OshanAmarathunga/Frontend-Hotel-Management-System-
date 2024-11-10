import { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import "./style.css";
import GalleryCards from "./GalleryCards";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
  const aboutUsRef = useRef(null);
  const galleryRef = useRef(null);
  const [galleyItemList, setGalleryItemList] = useState([]);

  const scrollToAboutUs = () => {
    aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToGallery = () => {
    galleryRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
      .then((rsp) => {
        setGalleryItemList(rsp.data.list);
      })
      .catch((e) => {
        alert("error");
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768, // Screen width at which the configuration changes
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Tablet screens or small desktops
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 3000, // Tablet screens or small desktops
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      }
    ]
    

  };

  return (
    <>
      <div className="Client-pic-bg w-full h-screen">
        <Header
          scrollToAboutUs={scrollToAboutUs}
          scrollToGallery={scrollToGallery}
        />
        <div className="w-full h-screen  bg-gradient-to-r flex items-center justify-center">
          <div className="w-[350px] md:w-[600px] h-auto bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
              Book Your Stay
            </h1>
            <div className="flex flex-col space-y-4">
              {/* Check-in Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check-in Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Check-out Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check-out Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room Type
                </label>
                <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>Luxury</option>
                  <option>Normal</option>
                  <option>Simple</option>
                </select>
              </div>

              {/* Book Now Button */}
              <div className="flex justify-center">
                <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <section ref={galleryRef} className="w-full bg-gray-400 py-16 px-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
            Gallery
          </h2>

          <Slider {...settings}>
          
          
            {galleyItemList.map((each, index) => (
              <GalleryCards
                key={index}
                name={each.name}
                description={each.description}
                image={each.image}
              />
            ))}
          
          </Slider>

        </section>
        <section ref={aboutUsRef} className="w-full bg-gray-100 py-16 px-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
            About Us
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed text-justify">
            Welcome to Ella River Side, a serene retreat nestled in nature. Our
            mission is to provide a relaxing, unforgettable experience for each
            guest. With luxurious amenities, breathtaking views, and exceptional
            hospitality, we strive to create a memorable stay for every visitor.
            Discover the beauty, comfort, and unique charm of Ella River Side,
            where your comfort is our priority.
          </p>
        </section>
      </div>
    </>
  );
}
