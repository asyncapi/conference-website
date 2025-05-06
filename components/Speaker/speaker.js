import React from 'react';

export default function SpeakerCard({ details, className = '' }) {
  return (
    <div
      className={`relative w-80 rounded-2xl overflow-hidden group p-1 ring-2 ring-white/90 ${className}`}
      data-test="speakers-section"
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl ring-1 ring-white/30"></div>
      <div className="relative flex flex-col justify-between p-6 rounded-2xl h-full overflow-hidden">

        <div>
          <div className="flex items-center mb-5">
		  <div className="w-16 h-16 aspect-square rounded-full overflow-hidden border-4 border-white/90 mr-4 shrink-0">
  			<img
    			src={details.img || "/api/placeholder/150/150"}
    			alt={details.name}
    			className="w-full h-full object-cover"
 			/>
			</div>
            <div>
              <h4 className="text-white text-lg font-bold">{details.name}</h4>
              <p className="text-white text-xs">{details.title}</p>
            </div>
          </div>

          <div className="text-gray-100 text-sm mb-5 h-20 overflow-hidden">
          <p className="text-white text-sm font-medium mb-0">Bio</p>
            {details.bio || `${details.name} is a featured speaker. Bio coming soon.`}
          </div>

          {details.expertise && details.expertise.length > 0 && (
            <div className="mt-4">
              <p className="text-white text-sm font-medium mb-2">Expertise</p>
              <div className="flex flex-wrap gap-2">
                {details.expertise.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/10 text-white text-xs rounded-full border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-white text-sm font-medium mb-2">Connect</p>
          <div className="flex items-center gap-5 mt-2">
            {details.twitter && (
              <a href={details.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="currentColor" className="w-6 h-5">
                  <path d="M711 573l473-573h-110L662 505 305 0H0l500 720L0 1227h110l431-522 377 522h305L711 573zm-152 185l-50-69L148 82h120l329 456 50 69 389 539h-120l-357-508z" />
                </svg>
              </a>
            )}
            {details.linkedin && (
              <a href={details.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 19h-2.5v-9h2.5v9zm-1.25-10.29c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13 10.29h-2.5v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2v4.5h-2.5v-9h2.5v1.28c.69-.89 1.76-1.28 2.83-1.28 2.21 0 4 1.79 4 4v5z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
