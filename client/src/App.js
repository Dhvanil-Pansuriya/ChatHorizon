import { Outlet } from "react-router-dom";
import "./App.css";

// import  { Toaster } from "react-hot-toast";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
