import { use, useState, useEffect, useRef, useContext } from "react";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useAccount,
} from 'wagmi'
import { DataContext } from "@/constants/dataContext";
import BigConnect from "./bigConnect";
import Popup from "./popup";


export default function Bulb({ devicName, deviceDescription }) {


  const videoRef = useRef(null);

  const [isOn, setIsOn] = useState(false);

  function handleClick() {
    //setIsOn(true);
    // setIsOn(true);
    videoRef.current.playbackRate = 7;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  }
  function handleClick1() {
    //setIsOn(false);
    videoRef.current.currentTime = 0;
    videoRef.current.pause();
    // videoRef.current.play();
    // setTimeout(() => {
    //   videoRef.current.pause();
    // }, 1000);
  }

  const { isConnected } = useAccount()

  //const { isSigned , isNft , loading , popup } = useContext(DataContext)

  // console.log(isSigned)
  //console.log(isNft)
  console.log(isConnected)

  return (

    <div className=" md:flex md:justify-evenly md:px-11 relative">

      <div className="lg:w-1/2 md:w-2/3 md:px-10">
        <div className="md:text-6xl md:font-extrabold text-3xl font-bold font-Outfit lg:mt-36 mt-6 md:text-left text-center">{deviceDescription}</div>
        <div className="text-lg font-semibold lg:my-7 my-5 relative md:text-left text-center">Applet : {devicName}</div>
        <div className="lg:my-8 my-3 flex justify-center md:justify-start"><BigConnect /></div>
      </div>

      <div className="bg-ellipse-2"></div>

      <div className="flex justify-center">
        <div className="device-card relative flex flex-col items-center w-fit">
          {/* <div className="relative flex justify-center bg-[#010922] w-10/12 md:my-7 mt-4 rounded-3xl">
            {isOn ? <div className="md:w-full w-56 md:h-full"><img src={'/bulb2.png'} className=""/></div> : 
             <div className=" md:w-full w-56 md:h-full"><img src={'/bulb1.png'} className=""/></div> }
          </div> */}
          <div className="flex justify-between my-3 mx-4">
            {/* <div>
              <div className="font-medium text-lg lg:text-xl font-Outfit text-center">Device:</div>
              <div className="md:font-semibold text-xl lg:text-2xl font-Outfit text-center">Tuya smart Bulb</div>
            </div> */}
            {/* { isConnected &&  <div className="md:flex lg:ml-8 md:ml-3 ml-3">
            <div className={`${isOn ? 'bg-[#79FF63]' : 'bg-white'} rounded-full lg:p-1 p-1 flex md:space-x-10 space-x-6 md:my-3 lg:my-0`}>
              {isOn ? <div className="lg:p-3 p-3"></div> : <button className="off-btn lg:p-2 p-2 md:text-2xl text-xl font-extrabold " onClick={()=>{setIsOn(true)}}>OFF</button>}
              {isOn ? <button className="on-btn lg:p-2 p-2 text-xl md:text-2xl font-extrabold" onClick={()=>{setIsOn(false)}}>ON</button> : <div className="lg:p-3 p-2"></div>}
            </div>
          </div>} */}
          </div>
        </div>
      </div>

      {/* { loading && 
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="popup-bg p-8 rounded-md flex">
              <div className="flex items-center mb-2 mr-3">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
              </div>
              <p className="text-lg text-white">Checking for the required NFT.</p>
            </div>
          </div>
        } */}
      {/* 
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="popup-bg p-8 rounded-md flex">
              <div className="flex items-center mb-2 mr-3">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
              </div>
              <p className="text-lg text-white">Checking for the required NFT.</p>
            </div>
          </div>

        {popup && <div>
          <Popup duration={2000}/>
        </div>} */}

    </div>

  );
}