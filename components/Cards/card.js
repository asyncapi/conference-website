import React from 'react'

function Card({img, alt, title, summary, optional, height}) {
  return (
    <div
      className="card-bg p-[22px] text-white rounded-lg border bg-transparent w-full h-[520px]"
    >
      <div className="">
        <img src={img} alt={alt} />
      </div>
      <div className="mt-[16px]">
        <h2 className="font-bold text-[24px]">{title}</h2>
        <p className="mt-[8px] text-[18px]">{summary}</p>
        {optional}
      </div>
    </div>
  );
}

export default Card