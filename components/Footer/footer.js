import React from 'react'

function Footer() {
  return (
		<div className='mt-[160px] w-full flex justify-center border border-t-[#333] container py-[96px]'>
			<div className='w-[1131px]'>
				<img src='img/logo.png' className='w-[150px]' />
				<div className='mt-[82px] flex items-center justify-between'>
					<div className='mt-2 text-[14px] text-gray py-4'>Code of Conduct</div>
					<div className='flex justify-between items-center w-[284px]'>
						<div className='text-[16px] text-white'>
							<span>Follow us</span>
						</div>
						<div className='w-[52px] h-[52px] rounded-lg border border-[#556061] flex items-center justify-center'>
							<img src='/img/Github.png' />
						</div>
						<div className='w-[52px] h-[52px] rounded-lg border border-[#556061] flex items-center justify-center'>
							<img src='/img/Linkedln.png' />
						</div>
						<div className='w-[52px] h-[52px] rounded-lg border border-[#556061] flex items-center justify-center'>
							<img src='/img/Twitter.png' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer