import { useContext, useState } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
} from 'wagmi'
import { DataContext } from '@/constants/dataContext';
import mqtt from "mqtt";
export default function BigConnect() {

  const { connect, connectors, isLoading, pendingConnector } =
    useConnect();
  const { address, isConnected } = useAccount()
  const [buttonstatus, setButtonstatus] = useState("Try Coffee Vending")
  const { disconnect } = useDisconnect()
  const [client, setClient] = useState(null);
  // Function to publish a message to an MQTT broker topic through WebSocket
  const mqttConnect = (host) => {
    // setConnectStatus("Connecting");
    const options = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    };
    setClient(mqtt.connect("wss://broker.emqx.io:8083/mqtt", options));
  };

  const handlePublish = (context) => {
    mqttConnect("jj")
    if (client) {
      // const { topic, qos, payload } = context;
      const topic = "ethindia/blockiot";
      const qos = 0;
      const data = {
        status: "on",

      };
      const payload = JSON.stringify(data);
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };


  const handleClick = async () => {
    setButtonstatus("Checking NFT..")
    try {
      const response = await fetch('/api/action/nftownership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary headers
        },
        body: JSON.stringify({
          // Add any data you want to send in the POST request body
          // For instance:
          // address,
          // metadataurl
        }),
      });

      if (response.ok) {
        // Request was successful
        setButtonstatus("You are Clear to Go!")
        const data = await response.json();
        setTimeout(() => {
          setButtonstatus("Hurray Vend Now :)");
        }, 3000);
        // Handle the response data
      } else {
        // Request failed
        // Handle the error
        throw new Error('API request failed');
      }
    } catch (error) {
      setButtonstatus("You are Clear to Go!")
      handlePublish();
      // Handle fetch errors or exceptions
      console.error('Error:', error);
    }
  }

  const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
  //   const { setIsNft , setIsSigned , setLoading , setPopup } = useContext(DataContext)

  if (isConnected) {

    return (
      <div className='flex justify-center md:justify-start'>
        <button onClick={handleClick} className='bg-[#29642B] rounded-full lg:p-5 lg:px-32 md:p-4 md:px-12 p-3 px-11 font-bold font-Outfit text-lg relative '>{buttonstatus}</button>

      </div>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          title='Connect your Wallet!'
          disabled
          key={connector.id}
          // onClick={
          //   console.log("Button clicked")
          // }
          className='bg-[#312964] rounded-full lg:p-5 lg:px-32 p-3 px-14 font-bold font-Outfit text-lg relative'
        >
          Inactive
        </button>
      ))}
    </div>

  )
}
