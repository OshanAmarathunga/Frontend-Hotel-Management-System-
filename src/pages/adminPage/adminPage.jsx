import { Link, Route, Routes, useNavigate } from "react-router-dom";
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
import AddCategory from "../adminComponents/category/addCategory";
import UpdateCategory from "../adminComponents/category/UpdateCategory";
import AddGalleryItem from "../adminComponents/galleryitems/AddGalleryItem";
import UpdateGalleryItem from "../adminComponents/galleryitems/UpdateGalleryItem";

export default function AdminPage() {
  const navigate=useNavigate();
  return (
    <>
      <div className="w-full max-h-[100vh] overflow-hidden flex">
        
        <div className="w-[20%] bg-blue-950 h-[100vh] flex-col p-4 space-y-4 pt-10 rounded-2xl relative">
          <div className="text-white text-[30px] hover:text-[40px]  ml-3 hover:text-white hover:font-bold flex items-center">
            <FaBookmark className="mr-2"/>
            <Link to={"/admin/bookings"} className="w-[200px]  bg-blue-600 hover:bg-blue-800 text-white text-[20px] font-semibold px-6 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out">Bookings</Link>
          </div>
          <div className="text-white text-[30px] hover:text-[40px]  ml-3 hover:text-white hover:font-bold flex  items-center">
            <MdCategory className="mr-2" />
            <Link to={"/admin/categories"} className="bg-blue-600 w-[200px] hover:bg-blue-800 text-white text-[20px] font-semibold px-6 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out">Categories</Link>
          </div>
          <div className="text-white text-[30px] hover:text-[40px]  ml-3 hover:text-white hover:font-bold flex items-center">
            <MdBedroomParent className="mr-2"/>
            <Link to={"/admin/rooms"} className="bg-blue-600 w-[200px] hover:bg-blue-800 text-white text-[20px] font-semibold px-6 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out">Rooms</Link>
          </div>
          <div className="text-white text-[30px] hover:text-[40px]  ml-3 hover:text-white hover:font-bold flex  items-center">
            <FaUserAlt className="mr-2"/>
            <Link to={"/admin/users"} className="bg-blue-600 w-[200px] hover:bg-blue-800 text-white text-[20px] font-semibold px-6 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out">Users</Link>
          </div>
          <div className="text-white text-[30px] hover:text-[40px]  ml-3 hover:text-white hover:font-bold flex  items-center">
            <RiFeedbackFill className="mr-2"/>
            <Link to={"/admin/feedback"} className="bg-blue-600 w-[200px] hover:bg-blue-800 text-white text-[20px] font-semibold px-6 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out">Feedback</Link>
          </div>
          <div className="text-white text-[30px] hover:text-[40px]  ml-3 hover:text-white hover:font-bold flex  items-center">
            <RiGalleryFill className="mr-2"/>
            <Link to={"/admin/galleryItem"} className="bg-blue-600 w-[200px] hover:bg-blue-800 text-white text-[20px] font-semibold px-6 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out">Gallery Items</Link>
          </div>
          <div className="justify-center w-full  flex absolute bottom-4">
            <button onClick={()=>{navigate("/"); localStorage.removeItem("token")}} className="text-black font-bold bg-yellow-400 hover:bg-yellow-500  shadow-lg px-11 py-1 rounded-md">
              LogOut
            </button>
          </div>
        </div>

        <div className="w-[80%] max-h-[100vh] bg-blue-100 rounded-2xl overflow-y-scroll">
          <Routes>
            <Route path="/bookings" element={<AdminBookings/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/addNewCategory" element={<AddCategory/>}/>
            <Route path="/updateCategory" element={<UpdateCategory/>} />
            <Route path="/rooms" element={<Rooms/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/feedback" element={<Feedback/>}/>
            <Route path="/galleryItem" element={<GalleryItems/>}/>
            <Route path="/addNewGalleryItem" element={<AddGalleryItem/>}/>
            <Route path="/updateGalleryItem" element={<UpdateGalleryItem/>}/>
            
          </Routes>
        </div>
      </div>
    </>
  );
}
