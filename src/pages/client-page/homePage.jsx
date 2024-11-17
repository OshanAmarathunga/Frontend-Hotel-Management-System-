import { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import "./style.css";
import GalleryCards from "./GalleryCards";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Select from "react-select";

export default function HomePage() {
  const aboutUsRef = useRef(null);
  const galleryRef = useRef(null);
  const [galleyItemList, setGalleryItemList] = useState([]);
  const [categoryOptions, setCategoryOptionsList] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [category, setCategory] = useState("");
  const [availbleRoomList, setAvailableRoomList] = useState([]);

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
    loadCategoryList();
  }, []);

  const loadCategoryList = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
      .then((rsp) => {
        setCategoryOptionsList(rsp.data.categories);
      })
      .catch((e) => {
        alert("error");
      });
  };

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
      },
    ],
    autoplay: true, // Enables auto-scroll
    autoplaySpeed: 3000, // Time in ms between each scroll (e.g., 3000ms = 3 seconds)
    pauseOnHover: true,
  };

  function handleFindRooms() {
    
    const data = {
      start: checkInDate,
      end: checkOutDate,
      category: category,
    };

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/booking/getAvailbleRooms",
        data
      )
      .then((rsp) => {
        
        const receivedRooms=rsp.data.rst;
        const options = receivedRooms.map((each,index) => ({
          value: each.name,
          label: (
            <div key={each.id || index} className="flex items-center">
              <img
                src={each.photo[0]}
                alt="Room"
                className="w-20 h-20 rounded-lg mr-2"
              />
              <span>
                Room Name: {each.name}, Max Guests: {each.maximumGuests}
              </span>
            </div>
          ),
        }));
        setAvailableRoomList(options)

      })
      .catch((e) => {
        console.log(e);
      });
  }

  

  return (
    <>
      <div className="Client-pic-bg w-full h-screen">
        <Header
          scrollToAboutUs={scrollToAboutUs}
          scrollToGallery={scrollToGallery}
        />
        <div className="w-full h-full bg-gradient-to-r flex items-center justify-center">
          <div className="w-[350px] md:w-[600px]  backdrop-blur-lg shadow-lg rounded-2xl p-8">
            <h1 className="text-[45px] font-bold text-center drop-shadow-xl text-white mb-6">
              Book Your Stay
            </h1>
            <div className="flex flex-col space-y-4">
              {/* Check-in Date */}
              <div>
                <label className="block text-sm font-medium text-white">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Check-out Date */}
              <div>
                <label className="block text-sm font-medium text-white">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-sm font-medium text-white">
                  Room Type
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select category
                  </option>

                  {categoryOptions &&
                    categoryOptions.map((each) => <option>{each.name}</option>)}
                </select>
              </div>

              {/* Book Now Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    handleFindRooms();
                  }}
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Find Room
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Available Rooms
                </label>
                
                <Select
                  options={availbleRoomList}
                  className="mt-1 block w-full sm:text-sm"
                  placeholder="Select a room"
                />
              </div>
              <div className="flex justify-center">
                <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <section ref={galleryRef} className="w-full bg-gray-100 py-16 px-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
            Find your best vacation plan !
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
        <div className="flex flex-col md:flex-row">
          <div className="about-us-bg w-full md:w-1/2 rounded-lg m-5"></div>
          <section ref={aboutUsRef} className="w-full md:w-1/ py-16 px-8">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
              About Us
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed text-justify">
              Welcome to Ella River Side, a serene retreat nestled in nature.
              Our mission is to provide a relaxing, unforgettable experience for
              each guest. With luxurious amenities, breathtaking views, and
              exceptional hospitality, we strive to create a memorable stay for
              every visitor. Discover the beauty, comfort, and unique charm of
              Ella River Side, where your comfort is our priority.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
