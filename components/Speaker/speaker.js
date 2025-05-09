import React, { useState } from 'react';

export default function SpeakerCard({ details, className = '' }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className={`relative w-80 rounded-2xl overflow-hidden group p-1 ring-2 ring-white/90 ${className}`}
      data-test="speakers-section"
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl ring-1 ring-white/30"></div>

      <div className="relative flex flex-col justify-between p-6 rounded-2xl h-full overflow-hidden">
        <div className="flex flex-col items-center mb-5 text-center">
          <div
            className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/90 mb-3 cursor-pointer relative"
            onClick={() => setShowDetails(true)}
          >
            <img
              src={details.img || "/api/placeholder/150/150"}
              alt={details.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-3xl font-bold">+</span>
            </div>
          </div>

          <h4 className="text-white text-xl font-bold">{details.name}</h4>
          <p className="text-white text-m">{details.title}</p>
        </div>
      </div>

      {/* Modal for displaying bio and more details */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/20 p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex items-center mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/90 mr-4 shrink-0">
                <img
                  src={details.img || "/api/placeholder/150/150"}
                  alt={details.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">{details.name}</h3>
                <p className="text-white text-sm">{details.title}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-white font-medium mb-2">Bio</h4>
              <p className="text-gray-200 text-sm">
                {details.bio || `${details.name} is a featured speaker. Bio coming soon.`}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">Connect</h4>
              <div className="flex items-center gap-5 mt-2">
                {details.linkedin && (
                  <a
                    href={details.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-300 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 19h-2.5v-9h2.5v9zm-1.25-10.29c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13 10.29h-2.5v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2v4.5h-2.5v-9h2.5v1.28c.69-.89 1.76-1.28 2.83-1.28 2.21 0 4 1.79 4 4v5z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
