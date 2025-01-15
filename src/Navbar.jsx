import React from "react";
import './App.css';
import { GoPerson } from "react-icons/go";


function Navbar () {

    return (
        <>
          <div className="w-full h-full text-blue-700 flex  items-center justify-center bg-red-600 cursor-[url('public/player1.jpeg'), auto]" >
            <ul className="flex flex-row items-center justify-center ">
              <li><GoPerson fontSize={40}/></li>
              <li><GoPerson fontSize={40}/></li>
              <li> <GoPerson fontSize={40}/></li>
              <li><GoPerson fontSize={40}/></li>
            </ul>
          </div>
        </>
      );
}
export default Navbar;