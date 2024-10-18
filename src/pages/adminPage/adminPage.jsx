import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage() {
  return (
    <>
      <div>
        <h1>Admin</h1>
        <div>
            <Link to={"/admin/room"}>click room</Link>
        </div>
        <Routes path="/*">
            <Route path="/room" element={<div><h1>Room</h1></div>}/>
            <Route path="/booking" element={<div>booking</div>}/>
        </Routes>
      </div>
    </>
  );
}
