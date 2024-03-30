import { useRouter } from "next/router";
import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Detwindow from "./detwindow";
import Configwindow from "./configwindow";
import Pricingwindow from "./pricingwindow";


export default function Details(){

    const [activeComponent, setActiveComponent] = useState("");

  const handleClick = (component) => {
    setActiveComponent(component);
  };

    // const [showComponent, setShowComponent] = useState(false);

    // const handleClick = () => {
    //   setShowComponent(true);
    // };

    return(
        <section className="bg-white dark:bg-gray-900 ml-48">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        
            <div className="flex grid-cols-3 gap-48 justify-center bg-grey-800 mt-10">
            <button className="px-4 py-2 mx-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={() => handleClick("componentOne")}>Details</button>
            <button className="px-4 py-2 mx-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"onClick={() => handleClick("componentTwo")}>Configure</button>
            <button className="px-4 py-2 mx-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50" onClick={() => handleClick("componentThree")}>Pricing</button>
            </div>

            {activeComponent === "componentOne" && <Detwindow />}
            {activeComponent === "componentTwo" && <Configwindow />}
            {activeComponent === "componentThree" && <Pricingwindow />}        
        

        </div>
       
      </section>
      

    );
}