import { use, useState, useEffect, useRef } from "react";
import Connect from "./connect";
import { Profile } from "./signIn";
import Link from "next/link";
import navstyles from "../styles/navbar.module.css";
import Connect2 from "./connect2";

export default function NavBar2() {

  const[event, setEvent] = useState({
    eventName: "hhb",
    eventId: "nh",
    userEmail: "nh",
    walletId: "gv",
    triggerType: "vg",
    actionType: "iu",
    triggerData: "ki",
    actionData: "ej",
    eventStatus: "cnej",
    domainName: "ec",
    eventDescription: "ce",
    startDate: new Date("2023-04-03"),
    endDate: new Date("2023-04-03")
  })

  const [isActive, setActive] = useState("false");

    const handleToggle = () => {
      setActive(!isActive);
    };

  return (
    
    <div className="relative">

      <div className='bg-ellipse-1'>
      </div>

      <div className="nav-bg relative">
      <div className='flex md:justify-around mx-7 md:mx-0 '>
        <div className='text-[#EBEBEB] md:text-3xl text-2xl font-extrabold relative md:my-8 my-3 mr-20 font-Outfit'><Link href='/'>BlockIot</Link></div>
        <div className="md:hidden">
          <button className={isActive? `${navstyles.hamburger}` : `${navstyles.open}`} onClick={handleToggle}>
              <div>
              <span className={navstyles.hamburger_top}></span>
              <span className={navstyles.hamburger_middle}></span>
              <span className={navstyles.hamburger_bottom}></span>
              </div>
          </button>
        </div>
        <div className='hidden md:flex relative space-x-11 text-xl font-Outfit'>
          <div className="hover_underline_animation my-9"><Link href='/execpage' className=''>about</Link></div>
          <div className="hover_underline_animation my-9"><Link href='/execpage' className=''>dashboard</Link></div>
          <div className="hover_underline_animation my-9"><Link href='/execpage' className=''>contact</Link></div>
          <Connect2/>
        </div>
      </div>
      </div>

      <div className="absolute nav-bg z-10 md:hidden rounded-xl right-0 mr-2" style={{display: isActive ?'none' : ''}} onClick={handleToggle}>
          <ul className='p-6 space-y-4 font-Outfit text-lg'>
              <li ><Link href="/about" className="hover_underline_animation">about</Link></li>
              <li ><Link href="/dashboard" className="hover_underline_animation">dashboard</Link></li>
              <li ><Link href="/contact" className="hover_underline_animation">contact</Link></li>
          </ul>
      </div>

    </div>
    
  );
}
