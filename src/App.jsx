import { BrowserRouter, Routes ,Route } from "react-router-dom";
import  AdminPage  from "./pages/adminPage/adminPage";
import HomePage from "./pages/client-page/homePage";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >

          <Route path="/" element={<HomePage/>} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/*" element={<div>Sorry Not Fount 404</div>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
