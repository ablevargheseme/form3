"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export default function Applet() {
  const [appletData, setAppletData] = useState([]);
  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    // Fetch data from the backend when the component mounts

    async function fetchData() {
      try {
        console.log("userj address", address);

        const response = await fetch(`/api/event?address=${address}`); // Replace '/api/applets' with your API endpoint
        const data = await response.json();

        setAppletData(data); // Set the fetched data to state
        console.log("applets", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors if needed
      }
    }

    fetchData(); // Call the fetchData function
  }, [address]);

  const [isChecked, setIsChecked] = useState(false);
  // const [isChecked1, setIsChecked1] = useState(false);
  // const [isToggled, setIsToggled] = useState(false);

  // const handleClick = () => {
  //   setIsToggled(!isToggled);
  // };
  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) return <div>Please Connect your wallet</div>;
  return (
    <div className="mt-4 md:flex md:flex-row flex flex-col items-center w-full space-x-4 md:mx-10">
      <div className="flex justify-center items-center my-2 inner-body rounded-2xl md:w-2/5">
        <div className="frame md:p-24 px-5 p-12 rounded-2xl">
          <Link href="/newapplet">
            <button className="bg-[#0075FF] md:p-3 p-2 md:px-7 px-5 font-semibold text-lg rounded-xl">
              CREATE NEW APPLET
            </button>
          </Link>
        </div>
      </div>

      <div className="inner-body md:grid md:grid-cols-2 md:gap-8 space-y-2 overflow-auto md:w-3/5 my-2 rounded-2xl px-8 py-4">
        {appletData.map(dataItem => (
          // eslint-disable-next-line react/jsx-key
          <div className="applet-bg flex flex-col p-2 h-fit px-3 text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white relative overflow-hidden ">
            <h3 className="mb-4 text-2xl font-semibold">{dataItem.appletName}</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{dataItem.appletDescription}</p>

            <ul role="list" className="mt-10 mb-4 space-y-2 text-center">
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>ID :</span>
                <span>{dataItem._id}</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Status:</span>
                {/* {isChecked ? (
                  <span className="ml-3 text-sm font-medium text-blue-600">Enabled</span>
                ) : (
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-500">Disabled</span>
                )} */}
              </li>
            </ul>

            <div className="flex justify-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={e => setIsChecked(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        ))}








      </div>
    </div>
  );
}
