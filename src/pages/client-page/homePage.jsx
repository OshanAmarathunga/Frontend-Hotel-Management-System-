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
  const [roomavailable,setRoomAvailable]=useState(false);
  

  const navigate = useNavigate();

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
          if(receivedRooms.length==0){
            handleClose();
            setRoomAvailable(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Sorry , Not having any room !",
              footer: ''
            });
          }else{
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

    console.log("config", config);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/booking/", data, config)
      .then((rsp) => {
        getAllBookings();
        clearText();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
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

  function handleDelete(bookingID){
    Swal.fire({
      title: "Are you sure?",
      showDenyButton: false,
      showCancelButton: true,
      denyButtonText: `Don't save`
    }).then((result) => {
      
      if (result.isConfirmed) {
        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/booking/"+bookingID).then((rsp)=>{
          console.log(rsp);
          
          Swal.fire("Deleted !", "", "success");
          getAllBookings();
        }).catch((e)=>{
          console.log("e",e);
          
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
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
              {roomavailable &&
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
              }
              {roomavailable &&
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
              }
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
                        <button onClick={()=>{handleDelete(row.bookingId)}} className="bg-red-500 font-bold rounded-sm text-white p-1 shadow-xl hover:bg-red-600">Cancel</button>
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
