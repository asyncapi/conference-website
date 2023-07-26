import React from 'react'

function Hamburger({className}) {
    return (
			<svg
				width='30px'
				height='30px'
				viewBox='0 0 24 24'
            fill='none'
            className={className}
			>
				<g id='SVGRepo_bgCarrier' stroke-width='0' />

				<g
					id='SVGRepo_tracerCarrier'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>

				<g id='SVGRepo_iconCarrier'>
					{' '}
					<path
						d='M4 7L7 7M20 7L11 7'
						stroke='#ffffff'
						stroke-width='1.5'
						stroke-linecap='round'
					/>{' '}
					<path
						d='M20 17H17M4 17L13 17'
						stroke='#ffffff'
						stroke-width='1.5'
						stroke-linecap='round'
					/>{' '}
					<path
						d='M4 12H7L20 12'
						stroke='#ffffff'
						stroke-width='1.5'
						stroke-linecap='round'
					/>{' '}
				</g>
			</svg>
		);
}

export default Hamburger