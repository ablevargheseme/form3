export default function Configwindow(){
    return(
     
        <div className="flex items-center justify-center h-screen">
        <div className="p-4 bg-gray-800 rounded-lg shadow-md w-1/2 h-96">

        <div className="flex items-center  mb-4">
        <label className="mr-12 font-medium text-gray-100" for="name">Event Name:</label>
        <input className="shadow appearance-none border rounded  px-4 py-2 text-black  placeholder-gray-800 placeholder-opacity-75" type="text" name="appletname"  placeholder="Myapplet1"/>
        </div>
        
        <div className="flex items-center  mb-4">
        <label className="mr-12 font-medium text-gray-100" for="name">Event Type:</label>
        <input className="shadow appearance-none border rounded  px-4 py-2 text-black  placeholder-gray-800 placeholder-opacity-75" type="text" name="appletname"  placeholder="Myapplet1"/>
        </div>
        
        {/* <div className="flex items-center  mb-4">
        <label className="mr-12 font-medium text-gray-100" for="name">Event Type:</label>
        <div className="px-32 py-2 text-gray-100  border rounded-lg focus:outline-none focus:shadow-outline">Test Event</div>
        </div> */}

         </div>
        </div>  


    );

}