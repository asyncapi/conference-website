import React, {useState} from 'react';

function Dropdown({ active, items, setOptions, setOptions2 }) {
    const [show, setShow] = useState(false)
	return (
		<div class='relative inline-block w-full'>
			<div className='w-full'>
				<button
					type='button'
					className='flex justify-between text-white p-4 w-full justify-center gap-x-1.5 rounded-md shadow-sm card-bg hover:bg-gray-50 gradient-bg no-border'
					id='menu-button'
					aria-expanded='true'
					aria-haspopup='true'
					onClick={() => setShow(true)}
				>
					<div>{active}</div>
					<svg
						className='-mr-1 h-5 w-5 text-gray-400'
						viewBox='0 0 20 20'
						fill='currentColor'
						aria-hidden='true'
					>
						<path
							fill-rule='evenodd'
							d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
							clip-rule='evenodd'
						/>
					</svg>
				</button>
			</div>
			{/* 
  <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
			{show && (
				<div
					className='w-full absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
					role='menu'
					aria-orientation='vertical'
					aria-labelledby='menu-button'
					tabindex='-1'
				>
					<div className='' role='none'>
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
										className={`text-gray-700 block p-4 text-md hover:text-white cursor-pointer navbg`}
										role='menuitem'
										tabindex='-1'
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
