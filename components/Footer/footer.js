import React from 'react'

function Footer() {
  return (
		<div className='mt-[160px] w-full flex justify-center border border-t-[#333] container py-[96px]'>
			<div className='w-[1131px]'>
				<img src='/img/logo.png' className='w-[150px]' />
				<div className='mt-[82px] flex items-center justify-between sm:flex-col sm:items-start'>
					<div className='mt-2 text-[14px] text-gray py-4 underline'>
						<a
							href='https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md'
							target='_blank'
							rel='noreferrer'
						>
							Code of Conduct
						</a>
					</div>
					<div className='flex justify-between items-center w-[284px] sm:mt-6'>
						<div className='text-[16px] text-white'>
							<span>Follow us</span>
						</div>
						<a
							href='https://github.com/asyncapi'
							target='_blank'
							rel='noreferrer'
							className='w-[52px] h-[52px] rounded-lg border border-[#556061] flex items-center justify-center'
						>
							<img src='/img/Github.png' />
						</a>
						<a
							target='_blank'
							href='https://www.linkedin.com/company/asyncapi/'
							className='w-[52px] h-[52px] rounded-lg border border-[#556061] flex items-center justify-center' rel="noreferrer"
						>
							<img src='/img/Linkedln.png' />
						</a>
						<a
							href='https://twitter.com/asyncapispec'
							target='_blank'
							className='w-[52px] h-[52px] rounded-lg border border-[#556061] flex items-center justify-center' rel="noreferrer"
						>
							<img src='/img/Twitter.png' />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer