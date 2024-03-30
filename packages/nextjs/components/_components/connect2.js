import { useContext, useEffect } from 'react';
import {
    useAccount,
    useConnect,
    useDisconnect,
  } from 'wagmi'
import { DataContext } from '@/constants/dataContext';

export default function Connect2() {

      const { connect, connectors, isLoading, pendingConnector } =
      useConnect();
      const { address, isConnected } = useAccount()
      const { disconnect } = useDisconnect()

      const shortenAddress = (address) => `${address.slice(0,5)}...${address.slice(address.length - 4)}`
      // const { setIsNft , setIsSigned , setLoading , setPopup } = useContext(DataContext)

      const contractAddress = "0x41e405438df59d438d62385e762b7e4b54ae2517"

      const nftValidation = async () => {
        try {
          setLoading(true)
          const verifyNft = await fetch('/api/v1/nftApis/verify-nft', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contractAddress,address }),
          })
          const nftList = await verifyNft.json()
          const isNft = nftList.isNft
          console.log(nftList)
          setIsNft(isNft)
          setLoading(false)
          setPopup(true)
        } catch (error) {
          console.log(error)
        }
      }
      
      useEffect(() => {
        if(address){
          nftValidation()
        }
        if(isConnected){
          nftValidation()
        }
      }, [address])
      

      if (isConnected) {

        return (
          <div className='flex gap-x-4'>
            <button className='bg-[#29642B] rounded-full p-2 font-bold my-8' onClick={disconnect}>Connected</button>
          </div>
        )
      }
     
      return (
        <div>
          {connectors.map((connector) => (
            
            <button
              key={connector.id}
              onClick={()=>connect({ connector })}
              className='bg-[#312964] rounded-full p-2 font-bold my-8 flex'
            >
              <div className=" mr-7 mt-2"><div className="absolute w-4 h-4 bg-[#010922] blur rounded-full"></div></div>
              <div className='px-1'>Connect Wallet</div>
            </button>
           
          ))}
        </div>
        
      )
}
