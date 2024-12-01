import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import "./style.css";
import GalleryCards from "./GalleryCards";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Select from "react-select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import Feedback from "./Feedback";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "@fontsource/roboto"; // Defaults to 400 weight
import "@fontsource/roboto/700.css";
import FeedbackCard from "./FeedbackCard";
import { FaFacebookF } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa6";
import { RiYoutubeLine } from "react-icons/ri";
import { CiLinkedin } from "react-icons/ci";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

export default function HomePage() {
  const aboutUsRef = useRef(null);
  const galleryRef = useRef(null);
  const [galleyItemList, setGalleryItemList] = useState([]);
  const [categoryOptions, setCategoryOptionsList] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [category, setCategory] = useState("");
  const [availbleRoomList, setAvailableRoomList] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [bookingList, setBookingList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [roomavailable, setRoomAvailable] = useState(false);
  const [approvedFeedbackList, setApprovedFeedbackList] = useState([]);
  const [rate, setRate] = useState("");
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  if (localStorage.getItem("token") == null) {
    navigate("/");
    return;
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const scrollToAboutUs = () => {
    aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToGallery = () => {
    galleryRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
      return;
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
        .then((rsp) => {
          setGalleryItemList(rsp.data.list);
        })
        .catch((e) => {
          alert("error");
        });
      loadCategoryList();
      getAllBookings();
      loadAllFeedbacks();
    }
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

  const settingsForFeedback = {
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
          slidesToShow: 3,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 3000, // Tablet screens or small desktops
        settings: {
          slidesToShow: 3,
          slidesToScroll: 4,
        },
      },
    ],
    autoplay: true, // Enables auto-scroll
    autoplaySpeed: 6000, // Time in ms between each scroll (e.g., 3000ms = 3 seconds)
    pauseOnHover: true,
  };

  function handleFindRooms() {
    if ((checkInDate == "") | (checkOutDate == "") | (category == "")) {
      Swal.fire({
        title: "Enter data!",
        text: "Please select required dates and category !",
        icon: "question",
      });
    } else {
      handleOpen();
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
          const receivedRooms = rsp.data.rst;
          if (receivedRooms.length == 0) {
            handleClose();
            setRoomAvailable(false);
            setCategory("");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Sorry , Not having any room !",
              footer: "",
            });
          } else {
            setRoomAvailable(true);
            const options = receivedRooms.map((each, index) => ({
              value: each.roomId,
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

            handleClose();

            setAvailableRoomList(options);
            handleClose();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  function handleBookNow() {
    const data = {
      start: checkInDate,
      end: checkOutDate,
      roomId: selectedRoomId,
    };

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/booking/", data, config)
      .then((rsp) => {
        getAllBookings();
        clearText();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have Booked this Room !",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((e) => {
        console.log("error");
      });
  }

  function getAllBookings() {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        import.meta.env.VITE_BACKEND_URL + "/api/booking/getBookings",
        config
      )
      .then((rsp) => {
        setBookingList(rsp.data.bookings);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function clearText() {
    setCheckInDate("");
    setCheckOutDate("");
    setCategory("");
    setAvailableRoomList([]);
    setRoomAvailable(false);
  }

  function handleDelete(bookingID) {
    Swal.fire({
      title: "Are you sure?",
      showDenyButton: false,
      showCancelButton: true,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            import.meta.env.VITE_BACKEND_URL + "/api/booking/" + bookingID
          )
          .then((rsp) => {
            console.log(rsp);

            Swal.fire("Deleted !", "", "success");
            getAllBookings();
          })
          .catch((e) => {
            console.log("e", e);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  function loadAllFeedbacks() {
    axios
      .get(
        import.meta.env.VITE_BACKEND_URL + "/api/feedback/getApprovedFeedbacks"
      )
      .then((rsp) => {
        setApprovedFeedbackList(rsp.data.ApprovedFeedbacks);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <div className="Client-pic-bg w-full h-screen">
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Header
          scrollToAboutUs={scrollToAboutUs}
          scrollToGallery={scrollToGallery}
        />
        <div className="w-full h-[500px] bg-gradient-to-r flex items-center justify-center mt-10 mb-32">
          <div className="w-[350px] md:w-[600px]  backdrop-blur-lg shadow-lg rounded-2xl p-5">
            <h1 className="text-[30px] font-bold text-center drop-shadow-xl text-white mb-2">
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
                    categoryOptions.map((each) => (
                      <option key={each.name}>{each.name}</option>
                    ))}
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
              {roomavailable && (
                <div>
                  <label className="block text-sm font-medium text-white">
                    Available Rooms
                  </label>

                  <Select
                    options={availbleRoomList}
                    className="mt-1 block w-full sm:text-sm"
                    placeholder="Select a room"
                    onChange={(selectedOption) => {
                      setSelectedRoomId(selectedOption.value); // Store the RoomId
                    }}
                  />
                </div>
              )}
              {roomavailable && (
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      handleBookNow();
                    }}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-3 md:px-32 mb-6">
          <TableContainer component={Paper} className="shadow-lg rounded-lg">
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="booking details table"
            >
              <TableHead>
                <TableRow sx={{ textAlign: "center", background: "#e7e707" }}>
                  <TableCell sx={{ textAlign: "center" }}>
                    <strong>Booking ID</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Check-In Date</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Check-Out Date</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Room ID</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ background: "#f8f8a9" }}>
                {bookingList && bookingList.length > 0 ? (
                  bookingList.map((row) => (
                    <TableRow
                      key={row.bookingId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.bookingId}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">
                        {new Date(row.start).toLocaleDateString("en-US", {
                          weekday: "long", // e.g., Monday
                          year: "numeric", // e.g., 2024
                          month: "long", // e.g., November
                          day: "numeric", // e.g., 23
                        })}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(row.end).toLocaleDateString("en-US", {
                          weekday: "long", // e.g., Monday
                          year: "numeric", // e.g., 2024
                          month: "long", // e.g., November
                          day: "numeric", // e.g., 23
                        })}
                      </TableCell>
                      <TableCell align="center">{row.roomId}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        <button
                          onClick={() => {
                            handleDelete(row.bookingId);
                          }}
                          className="bg-red-500 font-thin rounded-sm text-white p-1 shadow-xl hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <em>No bookings available</em>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="flex justify-center p-10 bg-gray-50">
          <Feedback />
        </div>

        <section ref={galleryRef} className="w-full bg-gray-100 py-16 px-8">
          <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-10 tracking-wide font-roboto">
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
            <h2 className="text-4xl font-extrabold font-roboto text-center text-blue-800 mb-10 tracking-wide">
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
        <section className="bg-gray-100 p-10">
          <h2 className="text-4xl font-roboto font-extrabold text-center text-blue-800 mb-10 tracking-wide">
            <span className="block mb-2 text-gray-600 text-lg font-medium">
              Testimonials
            </span>
            Our Customer Ratings
          </h2>
          <Slider {...settingsForFeedback}>
            {approvedFeedbackList &&
              approvedFeedbackList.map((each) => (
                <FeedbackCard
                  key={each._id}
                  rating={each.rate}
                  feedback={each.feedback}
                  name={each.name}
                  date={each.date}
                />
              ))}
          </Slider>
        </section>
        <div className="bg-[#1F2937] p-4 flex flex-col md:flex-row md:justify-between rounded-md">
          {/* Hotel Details Section */}
          <div className="text-white w-full md:w-[30%] mb-5 md:mb-0">
            <div className="text-[20px] sm:text-[25px] md:text-[40px] font-semibold">
              Hotel Ocean Breez
            </div>
            <div className="mt-5">
              <p className="text-justify">
                Leonine Villa offers the ultimate beachside escape. Our villa is
                a sanctuary of relaxation and luxury, with every detail crafted
                to provide an unforgettable experience.
              </p>
            </div>
            <div className="flex mt-5 gap-4 md:gap-10">
              <FaFacebookF className="text-[20px] hover:text-[22px]" />
              <SlSocialTwitter className="text-[20px] hover:text-[22px]" />
              <FaInstagram className="text-[20px] hover:text-[22px]" />
              <RiYoutubeLine className="text-[20px] hover:text-[22px]" />
              <CiLinkedin className="text-[20px] hover:text-[22px]" />
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-white flex flex-col w-full md:w-[30%] mb-5 md:mb-0">
            <div className="text-[20px] md:text-[30px]">Contact Us</div>
            <div className="flex mt-5 items-center">
              <FaPhoneVolume className="mr-2 text-[18px] md:text-[24px]" />
              <p className="text-[16px] md:text-[20px]">0774872919</p>
            </div>
            <div className="flex mt-5 items-center">
              <MdOutlineMail className="mr-2 text-[18px] md:text-[24px]" />
              <p className="text-[16px] md:text-[20px]">oceanbrezz@gmail.com</p>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full md:w-[30%]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126820.27862684363!2d79.87462171678655!3d6.630310653975526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae237c93422aa35%3A0x31cc07423bbaebf!2sWadduwa!5e0!3m2!1sen!2slk!4v1733036170614!5m2!1sen!2slk"
              className="w-full h-[250px] md:h-[350px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
