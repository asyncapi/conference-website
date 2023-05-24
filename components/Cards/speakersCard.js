import React from 'react'

const Scard = ({img, alt, title, summary, optional, children, className}) => {
    return (
        <div className=' bg-white bg-opacity-10'>
          <div
            className={`card-bg p-[22px] text-white rounded-lg border bg-transparent w-[20rem]  h-[27rem] ${className}`}
          >
            {!children && (
              <div>
                <div className="h-[70%] border rounded-full">
                  {img ? (
                    <img src={img} alt={alt} className="w-full h-full rounded-full" />
                  ) : (
                    <div className="h-full w-full bg-dark-500 rounded-md"></div>
                  )}
                </div>
              </div>
            )}
            {children}
            <div className="mt-[16px] p-3">
                <p className=' text-2xl'>Aishat Muibudeen</p>
                <h2 className=" text-base text-slate-300">UI/UX Designer, AsyncAPI</h2>
                <p className=" text-base text-slate-300">Berlin, Germany</p>
                {optional}
            </div>
          </div>
        </div>
    );
}

export default Scard