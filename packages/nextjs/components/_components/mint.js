import React, { useState } from "react";
import axios from "axios";
import { useContractWrite } from "wagmi";
import applet_abi from "../../contracts/abi.js";







const Mint = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonName, setButtonName] = useState("Mint applets");

  const handleButtonClick = async () => {
    setButtonName("Loading...");
    setIsButtonDisabled(true);
    if (props.onButtonClick) {
      await props.onButtonClick();
    }
    setIsClicked(true);
  };

  const handleTransactionSuccess = () => {
    setTransactionCompleted(true);
  };
  const handleTransactionFailure = () => {
    setTransactionCompleted(false);
    setIsButtonDisabled(false);
  };

  return (
    <div>
      <button
        className="btn md:p-3 p-2 md:px-5 px-3 text-lg font-semibold text-white hover:bg-[#0DAAAA] hover:shadow-xl transition duration-200 ease-in-out"
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
      >
        {" "}
        {buttonName}
      </button>
      {isClicked && !transactionCompleted && (
        <ContractWriter
          address={process.env.NEXT_PUBLIC_arbitrum_STYLUS_CONTRACT}
          abi={applet_abi}
          functionName="mintNFT"
          args={["0x490Df34FeddC0b1813eC4a761e96376e55A0b681", "test_url"]}
          onSuccess={handleTransactionSuccess}
          onError={handleTransactionFailure}
          setTransactionCompleted={setTransactionCompleted}
          setIsButtonDisabled={setIsButtonDisabled}
          setButtonName={setButtonName}
          setIsClicked={setIsClicked}
        />
      )}

    </div>
  );
};

const ContractWriter = ({
  address,
  abi,
  functionName,
  args,
  onSuccess,
  onError,
  setTransactionCompleted,
  setIsButtonDisabled,
  setButtonName,
  setIsClicked,
}) => {
  setIsClicked(false);
  console.log("arguments", args);
  const { write } = useContractWrite({
    address,
    abi,
    functionName,
    args,
    onSuccess(data) {
      const { hash } = data;
      toast.success(`Transaction Hash:-${hash}`);

      checkTransactionStatus(
        hash,
        setTransactionCompleted,
        setIsButtonDisabled,
        setButtonName,
      );
    },
    onError(data) {
      console.log("error contract write", data);
      setButtonName("Mint applets");
      setIsButtonDisabled(false);
    },
  });

  // Call the write function when this component is rendered
  React.useEffect(() => {
    write();
  }, [write]);

  return null; // Return null as this component doesn't render anything
};

export default Mint;
