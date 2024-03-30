
import {
    useAccount,
    useConnect,
    useDisconnect,
  } from 'wagmi'

export default function Connect() {

      const { connect, connectors, isLoading, pendingConnector } =
      useConnect();
      const { address, isConnected } = useAccount()
      const { disconnect } = useDisconnect()
      
      if (isConnected) {

        return (
          <div className='flex gap-x-4'>
            <button className='bg-[#29642B] rounded-full p-2 px-5 font-bold my-3' onClick={disconnect}>Connected</button>
          </div>
        )
      }
     
      return (
        <div>
          {connectors.map((connector) => (
            
            <button
              key={connector.id}
              onClick={()=>connect({ connector })}
              className='bg-[#0075FF] rounded-full p-2 font-bold my-3 flex'
            >
              <div className=" mr-7 mt-2"><div className="absolute w-4 h-4 bg-[#010922] blur rounded-full"></div></div>
              <div className='px-1'>Connect Wallet</div>
            </button>
           
          ))}
        </div>
        
      )
}
