import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//import { mintNft } from "../../services/client/AppletCreationService";
// import { uploadToStorage } from "../../services/client/AppletCreationService";
import FileSelector from "./Fileselector";
// import Datepicker from "react-tailwindcss-datepicker";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";

// import Mint from "./mint";
export default function Actiontrig({
  appletName,
  setAppletName,
  appletDescription,
  setAppletDescription,
  triggerBlockchain,
  setTriggerBlockchain,
  triggerType,
  setTriggerType,
  service,
  setService,
  actionType,
  setActionType,
  ownershipContractAddress,
  setOwnershipContractAddress,
  actionValue,
  setActionValue,
}) {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //for option slection
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleTriggerBlockchain = event => {
    const options = Array.from(event.target.selectedOptions, option => option.value);
    setTriggerBlockchain(options);
    console.log(JSON.stringify(options));
  };
  // const handleMintApplet = async (event) => {
  //   setMintloading(true);
  //   console.log('mint')
  //   await uploadToStorage(pet, appletName, appletDescription)
  //   setMintloading(false);
  //   // await mintNft(selectedImage, appletName, appletDescription);
  // };
  const handleTriggerType = event => {
    const options = Array.from(event.target.selectedOptions, option => option.value);
    setTriggerType(options);
    console.log(JSON.stringify(options));
  };
  const handleServiceChange = event => {
    const options = Array.from(event.target.selectedOptions, option => option.value);
    setService(options);
    console.log(JSON.stringify(options));
  };

  const handleActionType = event => {
    const options = Array.from(event.target.selectedOptions, option => option.value);
    setActionType(options);
    console.log(JSON.stringify(options));
  };

  const [formData, setFormData] = useState({
    address: "",
    tokenid: "",
    colctname: "",
  });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const jsonData = JSON.stringify(formData);
  //   // console.log("actiontrig", jsonData); // or send jsonData to the server
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  // };

  return (
    <div className="inner-body mt-4 rounded-2xl h-fit">
      <div className="flex justify-center items-center my-20">
        <div className="">
          <form
            className="frame rounded-2xl md:p-5 p-4 lg:px-40 md:px-20 mx-6"
          // onSubmit={handleSubmit}
          >
            <div className="font-semibold flex justify-center">CREATE NEW APPLET</div>
            <label className="block text-white text-sm font-semibold mb-2 mt-5">Applet Name</label>

            <input
              className="shadow appearance-none rounded p-2 pr-20 text-white bg-transparent border w-full"
              type="text"
              value={appletName}
              onChange={e => setAppletName(e.target.value)}
            />
            <label className="block text-white text-sm font-bold my-2">Applet Description</label>
            <input
              className="shadow appearance-none rounded p-2 px-3 text-white bg-transparent border w-full"
              type="text"
              name="description"
              value={appletDescription}
              onChange={e => setAppletDescription(e.target.value)}
              placeholder="What this applet does...!?"
            />
          </form>
        </div>
      </div>

      <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
        <div className="frame flex flex-col p-6 mx-6 md:mx-auto max-w-lg text-center text-white rounded-lg shadow relative overflow-hidden backdrop-filter backdrop-blur-lg">
          <h3 className="mb-4 text-2xl font-semibold">Trigger</h3>
          <p className="font-light text-gray-100 sm:text-lg dark:text-gray-100">
            Relevant for multiple users, extended & premium support.
          </p>

          <label for="blockchain" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left mt-8">
            Blockchain
          </label>
          <select
            id="blockchain"
            class="bg-white border border-gray-300 text-black text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white
                dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 
                dark:focus:border-blue-500"
            onChange={handleTriggerBlockchain}
          >
            <option defaultValue="arbitrum">...</option>
            <option value="arbitrum">arbitrum</option>
            <option value="Polygon">Polygon</option>
            <option value="Base">Base</option>
          </select>

          <label for="trigger" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left mt-8">
            Trigger Type
          </label>
          <select
            id="trigger"
            class="bg-white border border-gray-300 text-black text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 
                dark:focus:border-blue-500"
            onChange={handleTriggerType}
          >
            <option defaultValue="NFT_ownership">....</option>
            <option value="wallet_message">Wallet message</option>
            <option value="NFT_ownership">NFT transaction</option>
            <option value="NFT_transaction">Uniswap</option>
          </select>

          <div className="flex justify-center mt-10">
            <button className="bg-[#331a3e] p-2 px-5 rounded-xl" type="button" onClick={() => setShowModal(true)}>
              Add Config
            </button>
          </div>
        </div>

        <div className="frame flex flex-col p-6 mx-6 md:mx-auto max-w-lg text-center text-white rounded-lg shadow relative overflow-hidden backdrop-filter backdrop-blur-lg">
          <h3 className="mb-4 text-2xl font-semibold">Action</h3>
          <p className="font-light text-gray-500 sm:text-lg dark:text-gray-100">
            Best for large scale uses and extended redistribution rights.
          </p>

          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left mt-8">
            Service
          </label>
          <select
            id="countries"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleServiceChange}
          >
            <option value="telegram">Telegram</option>
            <option value="whatsapp">Whatsapp</option>
            <option value="Twitter">Twitter</option>
          </select>

          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left mt-8">
            Action Type
          </label>
          <select
            id="countries"
            class="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleActionType}
          >
            <option defaultValue="message">...</option>
            <option value="message">Send message</option>
            <option value="post">Post</option>
          </select>

          <div className="flex justify-center mt-10">
            <button className="bg-[#331a3e] p-2 px-5 rounded-xl" type="button" onClick={() => setShowModal1(true)}>
              Add Config
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-8">
        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto md:my-6 mx-9 md:mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full backdrop-blur-xl outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-8 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font=semibold">Trigger Config</h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form className="rounded px-8 pt-6 pb-8 w-full">
                      <label className="block text-transparent text-md text-white font-bold mb-2">
                        NFT Contract address
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                        type="text"
                        name="address"
                        value={ownershipContractAddress}
                        onChange={e => setOwnershipContractAddress(e.target.value)}
                      />
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      {/* <button
                        className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 my-2"
                        type="submit"
                      >
                        Submit
                      </button> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {showModal1 ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 md:mx-auto mx-9 max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full   backdrop-blur-xl  outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-8 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font=semibold">Action Config</h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setShowModal1(false)}
                    >
                      <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 rounded-full">x</span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form className="rounded px-8 pt-6 pb-8 w-full">
                      <label className="block text-transparent text-md text-white font-bold mb-2">Action</label>
                      <label className="block text-transparent text-md text-white font-bold mb-2">Action Value</label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                        type="text"
                        name="address"
                        value={actionValue}
                        onChange={e => setActionValue(e.target.value)}
                      />

                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModal1(false)}
                      >
                        Close
                      </button>
                      {/* <button
                        className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 my-2"
                        type="submit"
                      >
                        Submit
                      </button> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
