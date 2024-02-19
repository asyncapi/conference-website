import Link from 'next/link';
import Dropdown from '../illustration/dropdown';
import { useState,useEffect,useRef} from 'react';
import links from '../../config/links.json';
import NavDrop from './navDrop';
import Hamburger from '../illustration/hamburger';
import { useMediaQuery } from 'react-responsive';
import Cancel from '../illustration/cancel';



function Navbar() {
	const isTablet = useMediaQuery({ maxWidth: '1118px' });
	const [drop, setDrop] = useState(false);
	const [show, setShow] = useState(null);
	const menuRef = useRef(null);
	const svg = useRef(null);
	function handleClosing(event) {
		if (show && !event.target.closest('.subMenu')) {
			setShow(false);
		}
	}
	useEffect(() => {
		document.addEventListener('mousedown', handleClosing);
	}, [show]);

	const handleCloseMenu = (event) => {
		if (menuRef .current && !menuRef .current.contains(event.target)) {
			setDrop(false);
		  }if(svg.current&&event.target==svg.current){
			setDrop(true);
		  }
	};
  
	useEffect(() => {
	  document.addEventListener('click', handleCloseMenu);
	  return () => {
		document.removeEventListener('click', handleCloseMenu);
	  };
	}, [menuRef]);
	return (
		<div className='flex justify-center items-center sticky top-0 z-[99] text-white'>
			<div className='w-[1131px]'>
				<div className='flex justify-between h-[75px] w-full items-center'>
					<div className='flex items-center sm:justify-between sm:w-full'>
						<Link href='/'>
							<div className='flex items-center cursor-pointer w-[120px]'>
								<img src='/img/logo.png' alt='conference logo' />
							</div>
						</Link>
					</div>
					{isTablet ? (
						<div>
							{drop ? (
								<button>
									<Cancel />
								</button>
							) : (
								<button>
									<Hamburger  ref={svg}/>
								</button>
							)}
						</div>
					) : (
						<div className='flex items-center'>
							{links.map((link) => (
								<div href={link.ref} key={link.title}>
									<div
										onClick={() =>
											show === link.title ? setShow(null) : setShow(link.title)
										}
										className='ml-16 text-[14px] group cursor-pointer relative flex flex-col'
									>
										<div>
											{link.subMenu ? (
												<div className='flex items-center '>
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
												<Link href={link.ref}>{link.title}</Link>
											)}
										</div>
										{show && show === link.title && link.subMenu && (
											<div className='subMenu absolute z-[9] mt-8 w-[140px] rounded-md left-[-15px] gradient-bg pl-2 pt-1 flex flex-col justify-center space-y-0'>
												{link.subMenu.map((subL) => (
													<Link href={subL.ref} key={subL.title}>
														<div className='h-[32px] text-[16px]'>
															{subL.title}
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
					{isTablet && drop && <NavDrop setDrop={setDrop}  ref={menuRef} />}
				</div>
			</div>
		</div>
	);
}

export default Navbar;