import React from 'react';

function Subcription() {
	return (
		<div className='mt-[106px] subscription container flex justify-center'>
			<div className='w-[1024px] h-[253px] lg:w-full flex flex-col items-center mt-[106px]'>
				<h3 className='text-[32px] text-white'>
					Subscribe for AACoT’23 updates!
				</h3>
				<form className='mt-[32px] flex items-center'>
					<input
						className='w-[728px] h-[84px] py-[8px] px-[16px] rounded-l-lg'
						placeholder='Email Address'
						type='email'
					/>
					
					<button className='w-[299px] bg-[#875AE2] h-[84px] text-[24px] text-white rounded-r-lg'>
						Subscribe
					</button>
				</form>
			</div>
		</div>
	);
}

export default Subcription;
