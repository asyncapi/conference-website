import Link from 'next/link';
import Dropdown from '../illustration/dropdown';
import { useState, useEffect, useRef, useCallback } from 'react';
import links from '../../config/links.json';
import NavDrop from './navDrop';
import Hamburger from '../illustration/hamburger';
import { useMediaQuery } from 'react-responsive';
import Cancel from '../illustration/cancel';
import Image from 'next/image';

function Navbar() {
	const isTablet = useMediaQuery({ maxWidth: '1118px' });
	const [drop, setDrop] = useState(false);
	const [show, setShow] = useState(null);
	const [isSubMenuHovered, setIsSubMenuHovered] = useState(false);
	const menuRef = useRef(null);
	const svg = useRef(null);
	let closeTimeout = useRef(null);  

	const handleClosing = useCallback((event) => {
		if (show && !event.target.closest('.subMenu')) {
			setShow(null);
		}
	}, [show]);

	useEffect(() => {
		document.addEventListener('mousedown', handleClosing);
		return () => {
			document.removeEventListener('mousedown', handleClosing);
		};
	}, [handleClosing]);

	const handleCloseMenu = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setDrop(false);
		} if (svg.current && event.target === svg.current) {
			setDrop(true);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleCloseMenu);
		return () => {
			document.removeEventListener('click', handleCloseMenu);
		};
	}, [menuRef]);

	const handleMouseEnter = (title) => {
		clearTimeout(closeTimeout.current);
		setShow(title);
	};

	const handleMouseLeave = () => {
		closeTimeout.current = setTimeout(() => {
			if (!isSubMenuHovered) {
				setShow(null);
			}
		}, 300);
	};

	const handleSubMenuEnter = () => {
		clearTimeout(closeTimeout.current);
		setIsSubMenuHovered(true);
	};

	const handleSubMenuLeave = () => {
		setIsSubMenuHovered(false);
		setShow(null);
	};

	return (
		<div className={`flex justify-center items-center fixed w-full backdrop-blur ${ drop && 'bg-[#1B1130]/90'} top-0 z-[99] text-white`}>
			<div className='w-[1131px]'>
				<div className='p-5 flex justify-between h-[75px] w-full items-center'>
					<div className='flex items-center sm:justify-between sm:w-full' data-test="nav-Home">
						<Link href='/'>
							<div className='flex items-center cursor-pointer'>
								<Image src='/img/logo.png' alt='conference logo' width={120} height={33}  />
							</div>
						</Link>
					</div>
					{isTablet ? (
						<div data-test="nav-Hamberger">
							{drop ? (
								<button>
									<Cancel />
								</button>
							) : (
								<button>
									<Hamburger ref={svg} />
								</button>
							)}
						</div>
					) : (
						<div className='flex items-center'>
							{links.map((link) => (
								<div href={link.ref} key={link.title} >
									<div
										onMouseEnter={() => handleMouseEnter(link.title)}
										onMouseLeave={handleMouseLeave}
										className='ml-16 text-[14px] group cursor-pointer relative flex flex-col'
										data-test = {`nav-${link.title}`}
									>
										<div >
											{link.subMenu ? (
												<div className='flex items-center'>
													{link.title}{' '}
													{link.subMenu && (
														<Dropdown
															color="white"
															className={`ml-2 transition-transform duration-700 ${show === link.title ? 'rotate-180' : 'rotate-0'
																}`}
														/>
													)}
												</div>
											) : (
												<Link href={link.ref} >{link.title}</Link>
											)}
											
										</div>
										<span className="after:absolute after:-bottom-1 after:left-1/2 after:w-0 after:transition-all after:h-0.5 after:bg-white after:group-hover:w-3/6  "></span>
                                       <span className="after:absolute after:-bottom-1 after:right-1/2 after:w-0 after:transition-all after:h-0.5 after:bg-white after:group-hover:w-3/6"></span>
										{show === link.title && link.subMenu && (
											<div
												className={`subMenu absolute z-[9] mt-8 ${link.title=="Venue"?"w-[150px]":"w-[200px]"}  rounded-md left-[-15px] gradient-bg px-2 py-1 flex flex-col justify-center space-y-0`}
												onMouseEnter={handleSubMenuEnter}
												onMouseLeave={handleSubMenuLeave}>
												{link.subMenu.map((subL) => (
													<Link href={subL.ref} target={subL.target} key={subL.title} rel="noopener noreferrer">
														<div className={`flex items-center justify-between  min-h-[32px] text-[16px] hover:scale-95 hover:translate-x-1 transition-all`}
														data-test={`nav-sub-${subL.title}`}>
															<p className=' shrink-0'>{subL.title} </p> 
															{link.title=="Resources Hub" && (<div className=' h-5 w-5'>
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  															<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  															<polyline points="15 3 21 3 21 9"/>
  															<line x1="10" y1="14" x2="21" y2="3"/>
															</svg>
															</div>
													)}
														</div>
													</Link>
													
												))}
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					)}
					{isTablet && drop && <NavDrop setDrop={setDrop} ref={menuRef} />}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
