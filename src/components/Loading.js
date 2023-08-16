import React from "react";
 const Loading = () => {
    return(
        <>
              <div className="flex justify-center p-6 w-fit">
              <div className="bg-white rounded shadow-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
                  <div>Loading...</div>
                </div>
              </div>
            </div>
        </>
    )
 }
 export default Loading;