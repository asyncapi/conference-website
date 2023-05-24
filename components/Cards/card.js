import React from 'react'

function Card({img, alt, title, summary, optional, children, className}) {
  return (
    <div className=' '>
      <div
        className={`bg-red-300 bg-opacity-20 pt-7 px-5 text-white rounded-lg border bg-transparent w-full  h-auto ${className}`}
      >
        {!children && (
          <div>
            <div className="h-[70%] rounded-md">
              {img ? (
                <img src={img} alt={alt} className="w-full h-full rounded-md" />
              ) : (
                <div className="h-full w-full bg-dark-500 rounded-md"></div>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
      <div className="mt-[16px]">
        <p className=' text-base font-semibold text-blue-300'>Date</p>
        <h2 className=" text-3xl font-semibold text-slate-200 text-[24px]">{title}</h2>
        <p className=" text-base text-slate-300">{summary}</p>
        {optional}
      </div>
    </div>
  );
}

export default Card