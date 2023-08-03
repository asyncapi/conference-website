import React from 'react';

function Subcription() {
	return (
		<div className='mt-[106px] subscription container flex justify-center'>
			<div className='w-[1024px] min-h-[253px] lg:py-10 lg:w-full flex flex-col items-center mt-[106px]'>
				<h3 className='text-[32px] text-white lg:text-center'>
					Subscribe for AACoT’23 updates!
				</h3>

				<form
					action='asyncapi-website.netlify.app'
					method='POST'
					className='mt-[32px] flex items-center lg:flex-col lg:w-full'
				>
					<input type='hidden' name='form-name' value='form 1' />
					<input type='text' name='name' placeholder='Name' />
					<input
						className='w-[728px] lg:w-full h-[84px] py-[8px] px-[16px] rounded-l-lg lg:rounded'
						placeholder='Email Address'
						type='email'
						name='email'
					/>

					<button
						type='submit'
						className='w-[299px] lg:w-full bg-[#875AE2] h-[84px] text-[24px] text-white rounded-r-lg lg:rounded lg:mt-6'
					>
						Subscribe
					</button>
				</form>
			</div>
		</div>
	);
}

export default Subcription;
