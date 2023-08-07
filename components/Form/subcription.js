import React from 'react';

function Subcription() {
	return (
		<div className='mt-[106px] subscription container flex justify-center'>
			<div className='w-[1024px] min-h-[253px] lg:py-10 lg:w-full flex flex-col items-center mt-[106px]'>
				<h3 className='text-[32px] text-white lg:text-center'>
					Subscribe for AACoT’23 updates!
				</h3>
				<a href='https://www.asyncapi.com/newsletter' target='_blank' rel="noreferrer">
					<button
						type='submit'
						className='w-[299px] lg:w-full bg-[#875AE2] h-[84px] mt-[40px] text-[24px] text-white rounded-lg lg:mt-6'
					>
						Subscribe
					</button>
				</a>
			</div>
		</div>
	);
}

export default Subcription;
