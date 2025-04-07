import React,{useState,forwardRef} from 'react';
import links from '../../config/links.json';
import Link from 'next/link';
import Dropdown from '../illustration/dropdown';


const NavDrop = forwardRef((props, ref)=> {
	const {setDrop}=props;
    const [show, setShow] = useState(null);
  return (
		<div  ref ={ref} className='z-[99] absolute left-0 top-[74px] w-full h-screen bg-[#1B1130]/90 backdrop-filter backdrop-blur-md'>
			<div className='flex flex-col p-5 pb-8 w-full'>
				{links.map((link) => {
					return (
						<Link href={link.ref || '#'} key={link.title}>
							<div
								className='min-h-[50px] cursor-pointer'
								data-test={`nav-${link.title}`}
								onClick={(e) =>
									show === link.title ? setShow(null) : setShow(link.title)
								}
							>
								{link.subMenu ? (
									<div>
										<div className='flex items-center' onClick={(e) => e.preventDefault()}>
											<div className='text-white'>{link.title}</div>
											<Dropdown
												color="white"
												className={`ml-2 transition-transform duration-500 ${show === link.title ? "rotate-180" : "rotate-0"
													}`}
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
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
})
NavDrop.displayName = 'NavDrop';

export default NavDrop;