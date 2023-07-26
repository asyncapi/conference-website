/* eslint-disable @next/next/no-img-element */
import React from 'react'

function Sponsors() {
  return (
		<div className='sponsor-bg container text-center'>
			<div className='py-[80px] flex flex-col items-center'>
				<h1 className='text-[64px] font-bold text-white leading-[64px]'>
					Event and Host Sponsor
				</h1>
				<div className='w-[718px]'>
					<p className='text-[20px] text-gray mt-[40px]'>
						A special thank you to our Event Host and Sponsor. Your kindness in
						hosting us and sponsoring our event is truly exceptional. We
						appreciate you!
					</p>
				</div>
				<div className='flex justify-between mt-[40px] w-[650px] lg:w-full'>
					<img src='/img/sngular.png' alt='sngular' />
					<img src='/img/IBM.png' alt='sngular' />
				</div>
			</div>
		</div>
	);
}

export default Sponsors


