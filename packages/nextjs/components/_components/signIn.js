import Connect2 from './connect2';
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useState,useEffect, useContext } from 'react'
import { DataContext } from "@/constants/dataContext";

function SignInButton({
  onSuccess,
  onError,
}) {

  const [state, setState] = useState({
    loading: false,
    nonce: ""
  })
  
  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch('/api/v1/auth/nonce')
      const nonce = await nonceRes.text()
      setState((x) => ({ ...x, nonce }))
    } catch (error) {
      setState((x) => ({ ...x, error: error }))
    }
  }

  useEffect(() => {
    fetchNonce()
  }, [])

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()
  const { setIsNft , setIsSigned , setLoading , setPopup } = useContext(DataContext)

  const signIn = async () => {
    try {
      const chainId = chain?.id
      if (!address || !chainId) return
      
      const contractAddress = "0x41e405438df59d438d62385e762b7e4b54ae2517"
      setState((x) => ({ ...x, loading: true }))
      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: state.nonce,
      })

        const signature = await signMessageAsync({
            message: message.prepareMessage(),
        });
      
      // Verify signature
      const verifyRes = await fetch('/api/v1/auth/verify-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')

      setState((x) => ({ ...x, loading: false }))
      onSuccess({ address })
      setIsSigned(address)

      setLoading(true)
      const verifyNft = await fetch('/api/v1/nftApis/verify-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contractAddress }),
      })
      const nftList = await verifyNft.json()
      const isNft = nftList.isNft
      setIsNft(isNft)
      setLoading(false)
      setPopup(true)
      // if(!isNft) throw new Error("NFT not found")
    } catch (error) {
      setState((x) => ({ ...x, loading: false, nonce: undefined }))
      onError({ error: error })
      fetchNonce()
      console.log(error)
    }
    
  }

  return (
    <button disabled={!state.nonce || state.loading} onClick={signIn} className="inline-flex items-center justify-center px-2 py-1 md:px-4 md:py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-900 border border-blue-900 rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      Sign-In
    </button>
  )
}

export function Profile() {
    
  const { isConnected } = useAccount()
  const { setIsNft , setIsSigned , setLoading , setPopup } = useContext(DataContext)

  const contractAddress = "0x41e405438df59d438d62385e762b7e4b54ae2517"

  const [state, setState] = useState({
    address: "",
    error: "" ,
    loading: false
  })

  // Fetch user when:
  useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/v1/auth/user')
        const json = await res.json()
        setState((x) => ({ ...x, address: json.address }))
        setIsSigned(json.address)
        console.log(json.address)

        if(state.address){
          setLoading(true)
          const verifyNft = await fetch('/api/v1/nftApis/verify-nft', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contractAddress }),
          })
          const nftList = await verifyNft.json()
          const isNft = nftList.isNft
          setIsNft(isNft)
          setLoading(false)
          setPopup(true)
        }

      } catch (error) {
        console.log(error)
      }
    }
    // 1. page loads
    handler()

    // 2. window is focused (in case user logs out of another window)
    // window.addEventListener('focus', handler)
    // return () => window.removeEventListener('focus', handler)
  }, [state.address])

  const shortenAddress = (address) => `${address.slice(0,5)}...${address.slice(address.length - 4)}`

  if (isConnected) {
    return (
      <div>
        {state.address ? (
          <div className="flex">
            <div className="items-center justify-center px-3 py-2 mr-2 font-semibold text-center text-gray-200 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-600 border-solid rounded-full cursor-pointer select-none hover:text-white hover:border-white focus:shadow-xs focus:no-underline">{shortenAddress(state.address)}</div>
            <button
              onClick={async () => {
                await fetch('/api/v1/auth/logout')
                setState({})
                setIsSigned(null)
              }}
              className="inline-flex items-center justify-center px-2 py-1 md:px-4 md:py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-900 border border-red-900 rounded-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <SignInButton
            onSuccess={({ address }) => setState((x) => ({ ...x, address }))}
            onError={({ error }) => setState((x) => ({ ...x, error }))}
          />
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center lg:order-2">
        <Connect2/>
    </div>
  )
    
}
