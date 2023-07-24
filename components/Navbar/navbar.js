import Link from 'next/link';
import Dropdown from '../illustration/dropdown';
import { useState } from 'react';

const links = [
  {
    title: 'About',
    ref: '/about'
  },
  {
    title: 'Venue',
    ref: '/#',
    subMenu: [
      {
        title: 'Bengaluru, India',
        ref: '/india'
      },
      {
        title: 'Madrid, Spain',
        ref: '/spain'
      },
      {
        title: 'Paris, France',
        ref: '/france'
      },
      {
        title: 'London, England',
        ref: '/london'
      }
    ]
  },
  {
    title: 'Speakers',
    ref: '/speakers'
  },
  {
    title: 'Sponsors',
    ref: '/sponsors'
  },
]


function Navbar() {
  const [show, setShow] = useState(null)
  return (
		<div className='flex justify-between h-[61px] w-full container items-center'>
			<div className='flex items-center sm:justify-between text-white sm:w-full'>
				<Link href='/'>
					<div className='flex items-center cursor-pointer w-[120px]'>
						<img src='/img/logo.png' alt='conference logo' />
					</div>
				</Link>
			</div>
			<div className='flex items-center'>
				{links.map((link) => (
					<Link href={link.ref} key={link.title}>
						<div
							onClick={() =>
								show === link.title ? setShow(null) : setShow(link.title)
							}
							className='text-[#F0F4F5] ml-16 text-[15px] cursor-pointer relative flex flex-col'
						>
							<div className='flex items-center'>
								{link.title}{' '}
								{link.subMenu && (
									<Dropdown
										className={`ml-2 transition-transform duration-700 ${
											show === link.title ? 'rotate-180' : 'rotate-0'
										}`}
									/>
								)}
							</div>
							{show && show === link.title && link.subMenu && (
								<div className='absolute z-[9] mt-8 w-[140px] rounded-md left-[-15px] h-[132px] gradient-bg pl-2 pt-1 flex flex-col'>
									{link.subMenu.map((subL) => (
										<Link href={subL.ref} key={subL.title}>
											<div className='h-[32px] text-[14px]'>{subL.title}</div>
										</Link>
									))}
								</div>
							)}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Navbar