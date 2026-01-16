import React from 'react'
import { useNavigate } from 'react-router-dom'


const Error = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-error/10 via-base-100 to-warning/10 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="card bg-base-200 shadow-2xl">
          <div className="card-body items-center text-center space-y-6">
            {/* Error Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-error/20 blur-3xl rounded-full"></div>
              <svg className="w-32 h-32 text-error relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Error Title */}
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-error">Oops!</h1>
              <h2 className="text-2xl font-semibold">Something went wrong</h2>
            </div>



            <p className="text-base-content/70 max-w-md">
              Don't worry, these things happen. Try refreshing the page or going back to the homepage.
            </p>

          </div>
        </div>
      </div>
    </div>

  )
}

export default Error