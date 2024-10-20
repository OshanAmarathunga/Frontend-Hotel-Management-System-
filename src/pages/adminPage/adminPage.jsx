import { Link, Route, Routes } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { RiFeedbackFill } from "react-icons/ri";
import { RiGalleryFill } from "react-icons/ri";
import AdminBookings from "../adminComponents/bookings/adminBookings";
import Categories from "../adminComponents/category/Categories";
import Users from "../adminComponents/users/Users";
import Feedback from "../adminComponents/feedbacks/Feedback";
import GalleryItems from "../adminComponents/galleryitems/GalleryItems";
import Rooms from "../adminComponents/rooms/Rooms";

export default function AdminPage() {
  return (
    <>
      <div className="w-full max-h-[100vh] overflow-hidden flex">
        <div className="w-[20%] bg-blue-900 h-[100vh] flex-col p-4 space-y-4">
          <div className="text-white text-[30px] hover:text-[40px]  ml-3 hover:text-black hover:font-bold flex items-center">
            <FaBookmark className="mr-2"/>
            <Link to={"/admin/bookings"} className="bg-blue-600 hover:bg-blue-800 text-white text-[20px] font-semibold px-6 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out">Bookings</Link>
          </div>
          <div className="text-white text-[30px] hover:text-[40px]  ml-3 hover:text-black hover:font-bold flex  items-center">
            <MdCategory className="mr-2" />
            <Link to={"/admin/categories"} className="bg-blue-600 hover:bg-blue-800 text-white text-[20px] font-semibold px-6 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out">Categories</Link>
          </div>
          <div className="text-white text-[30px] hover:text-[40px]  ml-3 hover:text-black hover:font-bold flex items-center">
            <MdBedroomParent className="mr-2"/>
            <Link to={"/admin/rooms"} className="bg-blue-600 hover:bg-blue-800 text-white text-[20px] font-semibold px-6 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out">Rooms</Link>
          </div>
          <div className="text-white text-[30px] hover:text-[40px]  ml-3 hover:text-black hover:font-bold flex  items-center">
            <FaUserAlt className="mr-2"/>
            <Link to={"/admin/users"} className="bg-blue-600 hover:bg-blue-800 text-white text-[20px] font-semibold px-6 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out">Users</Link>
          </div>
          <div className="text-white text-[30px] hover:text-[40px]  ml-3 hover:text-black hover:font-bold flex  items-center">
            <RiFeedbackFill className="mr-2"/>
            <Link to={"/admin/feedback"} className="bg-blue-600 hover:bg-blue-800 text-white text-[20px] font-semibold px-6 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out">Feedback</Link>
          </div>
          <div className="text-white text-[30px] hover:text-[40px]  ml-3 hover:text-black hover:font-bold flex  items-center">
            <RiGalleryFill className="mr-2"/>
            <Link to={"/admin/galleryItem"} className="bg-blue-600 hover:bg-blue-800 text-white text-[20px] font-semibold px-6 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out">Gallery Items</Link>
          </div>
        </div>

        <div className="w-[80%] max-h-[100vh] bg-blue-500 overflow-y-scroll">
          <Routes>
            <Route path="/bookings" element={<AdminBookings/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/rooms" element={<Rooms/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/feedback" element={<Feedback/>}/>
            <Route path="/galleryItem" element={<GalleryItems/>}/>
          </Routes>
        </div>
      </div>
    </>
  );
}
