import React from 'react'


const NotFound = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="card bg-base-200 shadow-2xl">
          <div className="card-body items-center text-center space-y-6">
            {/* 404 Number */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary relative">
                404
              </h1>
            </div>

            {/* Title */}
            <div className="relative">
              <div className="absolute inset-8cd    blur-3xl rounded-full bg-gradient-to-r from-primary to-secondary"></div>
              <h2 className="text-9xl font-bold  text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary relative">Not Found</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound