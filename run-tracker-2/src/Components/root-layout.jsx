import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout () {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}