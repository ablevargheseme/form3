import Image from "next/image"
import VideoOnScroll from "./vid"
import { useEffect, useState, useContext } from "react"

export default function NftDetails({ nftName, nftUrl }) {

  const [nftDetails, setNftDetails] = useState({})
  const [tokenAddress, setTokenAddress] = useState('')
  const [image, setImage] = useState('')

  const contractAddress = "0x41e405438df59d438d62385e762b7e4b54ae2517"
  const tokenId = 16


  // const getNftDetails = async () => {
  //   try {
  //     const nftDetails = await fetch('/api/v1/nftApis/nftData', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ contractAddress,tokenId }),
  //     })
  //     const nftMetadata = await nftDetails.json()
  //     const NftDetails = JSON.parse(nftMetadata.value.nftDetails.metadata)
  //     console.log(NftDetails)
  //     setNftDetails(NftDetails)
  //     setTokenAddress(nftMetadata.value.nftDetails.token_address)
  //     const nftImage = NftDetails.image
  //     const ipfsCID = nftImage.split(':/').pop();
  //     const imageURL = `https://ipfs.io/ipfs${ipfsCID}`
  //     setImage(imageURL)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   // getNftDetails()
  // }, [])

  return (
    <div>
      <div className="md:flex md:flex-row md:justify-evenly flex flex-col-reverse md:px-10">
        <div className="mt-5 flex justify-center"><img src={nftUrl} alt="text" /></div>

        <div className="lg:my-32 md:my-16 md:mx-6">
          <div className="font-Roboto text-xl font-normal text-[#EBEBEB] tracking-widest text-center md:text-left">NFT you must hold</div>
          <div className="md:text-6xl text-4xl font-bold md:my-8 my-5 font-Outfit text-center md:text-left">{nftName}</div>
          {/* <div className="font-Roboto md:text-xl md:font-normal text-base">The Trizbulb NFT is a collection of 100 unique NFTs for smart bulb control!</div> */}
          <div className="font-Roboto md:text-xl font-normal text-base">Nft Contract Address:0x490Df34FeddC0b1813eC4a761e96376e55A0b681</div>
        </div>
      </div>
      <div className="flex justify-center"><button className="bg-[#8F8FDB] p-4 px-12 my-16 rounded-full text-[#010922] font-normal font-Roboto">Click for more Event info</button></div>
    </div>
  )
}
