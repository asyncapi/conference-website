import React, { useState, useRef, useEffect } from 'react';

function Dropdown({ active, items, setOptions, setOptions2 }) {
	const [show, setShow] = useState(false);
	const dropdownRef = useRef(null);

	// Handle click outside the dropdown
	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShow(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);

	return (
		<div className='relative inline-block w-full' ref={dropdownRef}>
			<div className='w-full'>
				<button
					type='button'
					className='flex justify-between text-white p-4 w-full justify-center gap-x-1.5 shadow-sm gradient-bg hover:bg-gray-50 no-border rounded-md'
					id='menu-button'
					aria-expanded='true'
					aria-haspopup='true'
					onClick={() => setShow(!show)}
				>
					<div>{active}</div>
					<svg
						className='-mr-1 h-5 w-5 text-gray-400'
						viewBox='0 0 20 20'
						fill='currentColor'
						aria-hidden='true'
					>
						<path
							fillRule='evenodd'
							d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
							clipRule='evenodd'
						/>
					</svg>
				</button>
			</div>

			{show && (
				<div
					className='w-full md:w-auto absolute right-0 z-10 mt-2 origin-top-right rounded-md backdrop-blur-sm bg-white/70 shadow-lg ring-1 ring-gray-400 ring-opacity-5 focus:outline-none transition-all duration-200 ease-in-out transform scale-95'
					role='menu'
					aria-orientation='vertical'
					aria-labelledby='menu-button'
					tabIndex='-1'
				>
					<div className='py-2' role='none'>
						{items &&
							items.map((item) => {
								return (
									<div
										key={item.city}
										onClick={() => {
											setOptions(item);
											setOptions2(item.lists);
											setShow(false);
										}}
										className={`text-gray-700 block px-4 py-3 text-md hover:text-white cursor-pointer navbg hover:bg-gradient-to-r from-purple-500 to-blue-500`}
										role='menuitem'
										tabIndex='-1'
										id='menu-item-0'
									>
										{item.city}
									</div>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
}

export default Dropdown;
