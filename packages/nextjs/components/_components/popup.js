import React, { useState, useEffect ,useContext } from 'react';
import { DataContext } from '@/constants/dataContext';

function Popup({ duration }) {

  const [showPopup, setShowPopup] = useState(true);
  const { isNft , setPopup } = useContext(DataContext)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(false)
      setPopup(false)
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration]);

  if (!showPopup) {
    return null;
  }

  if(isNft){
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="popup-bg p-2 rounded-md">
            <div className='flex'>
                <img src='/popuptick.gif' className='w-22 h-14'/>
                <p className="text-lg text-white mt-2">NFT found successfully.</p>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popup-bg p-4 rounded-md">
        <div className='flex'>
            <img src='/popupcross.gif' className='w-22 h-14'/>
            <p className="text-lg text-white mt-2 ml-2">NFT Not found.</p>
        </div>
      </div>
    </div>
  );
}

export default Popup;
