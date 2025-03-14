import React, { useState, forwardRef } from 'react';
import links from '../../config/links.json';
import Link from 'next/link';
import Dropdown from '../illustration/dropdown';


const NavDrop = forwardRef((props, ref) => {
	const { setDrop } = props;
	const [show, setShow] = useState(null);

	const handleKeyDown = (e, link) => {
		switch (e.key) {
			case 'Enter':
			case ' ':
				e.preventDefault();
				if (link.subMenu) {
					setShow(show === link.title ? null : link.title);
				} else {
					setDrop(false);
				}
				break;
			case 'Escape':
				setDrop(false);
				break;
		}
	};

	return (
		<div ref={ref} className='z-[99] absolute left-0 top-[74px] w-full h-screen bg-[#1B1130]/90 backdrop-filter backdrop-blur-md'>
			<div className='flex flex-col p-5 pb-8 w-full'>
				{links.map((link) => {
					return (
						<Link href={link.ref || '#'} key={link.title}>
							<button
								aria-expanded={show === link.title}
								aria-controls={`mobile-submenu-${link.title}`}
								className='w-full text-left focus:outline-none focus:ring-2 focus:ring-white'
								data-test={`nav-${link.title}`}
								onClick={() =>
									show === link.title ? setShow(null) : setShow(link.title)
								}
								onKeyDown={(e) => handleKeyDown(e, link)}
							>
								{link.subMenu ? (
									<div>
										<div className='flex'>
											<div className='text-white'>{link.title}</div>
											<Dropdown
												className={`transition-transform duration-700`}
											/>
										</div>
										{show && show === link.title && (
											<div className='flex flex-col py-6 w-full'>
												{link.subMenu.map((sub) => (
													<Link href={sub.ref} key={sub.ref} >
														<div data-test={`nav-sub-${sub.title}`}
															onClick={() => setDrop(false)}
															className='h-[40px] flex navbg items-center p-6 hover:text-black text-white cursor-pointer'
														>
															{sub.title}
														</div>
													</Link>
												))}
											</div>
										)}
									</div>
								) : (
									<div className='text-white' onClick={() => setDrop(false)}>
										{link.title}
									</div>
								)}
							</button>
						</Link>
					);
				})}
			</div>
		</div>
	);
})
NavDrop.displayName = 'NavDrop';

export default NavDrop;