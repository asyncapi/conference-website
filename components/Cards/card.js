import React from 'react'

function Card({img, alt, title, summary, optional, children}) {
  return (
    <div className="card-bg p-[22px] text-white rounded-lg border bg-transparent w-full min-h-[520px] h-auto">
      {!children && (
        <div>
          <div
          className='h-[70%] border rounded-md'
          >
            {img ? (
              <img src={img} alt={alt} className="w-full h-full rounded-md" />
            ) : (
              <div className="h-full w-full bg-dark-500 rounded-md"></div>
            )}
          </div>
          <div className="mt-[16px]">
            <h2 className="font-[600] text-[24px]">{title}</h2>
            <p className="mt-[8px] text-[18px] font-[400]">{summary}</p>
            {optional}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export default Card