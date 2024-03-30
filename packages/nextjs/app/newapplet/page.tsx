"use client"
import { useState } from "react";
import Link from "next/link";
import Actiontrig from "../../components/_components/trigactn";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const [appletName, setAppletName] = useState("myapplet");
  const [appletDescription, setAppletDescription] = useState("description..");
  const [ownershipContractAddress, setOwnershipContractAddress] = useState("");
  const [actionValue, setActionValue] = useState("");
  const address = connectedAddress;
  const [triggerBlockchain, setTriggerBlockchain] = useState([]);
  const [triggerType, setTriggerType] = useState([]);
  const [service, setService] = useState([]);
  const [actionType, setActionType] = useState([]);

  const handleCreateClick = async () => {
    // Check if any value is empty
    if (
      !appletName ||
      !appletDescription ||
      !ownershipContractAddress ||
      !actionValue ||
      !triggerBlockchain.length ||
      !triggerType.length ||
      !service.length ||
      !actionType.length
    ) {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      address,
      appletName,
      appletDescription,
      ownershipContractAddress,
      actionValue,
      triggerBlockchain,
      triggerType,
      service,
      actionType,
    };
    console.log("create applet data", data);
    try {
      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers needed for authentication, etc.
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("responsedata", responseData);

      if (responseData.success == true) {
        alert('Event created')
        window.open('/appletpage', '_blank'); // Change the URL as needed
      }
    } catch (error) {
      // Handle error, show an error alert
      alert("Error creating data");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div>
          <div className="main-body h-fit flex justify-center">
            <Actiontrig
              appletName={appletName}
              setAppletName={setAppletName}
              appletDescription={appletDescription}
              setAppletDescription={setAppletDescription}
              triggerBlockchain={triggerBlockchain}
              setTriggerBlockchain={setTriggerBlockchain}
              triggerType={triggerType}
              setTriggerType={setTriggerType}
              service={service}
              setService={setService}
              actionType={actionType}
              setActionType={setActionType}
              ownershipContractAddress={ownershipContractAddress}
              setOwnershipContractAddress={setOwnershipContractAddress}
              actionValue={actionValue}
              setActionValue={setActionValue}
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreateClick}
          >
            Create
          </button>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
