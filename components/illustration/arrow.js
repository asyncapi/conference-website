import React from 'react'

function Arrow({className, fill}) {
    return (
			<svg
				className={className}
				viewBox='0 0 24 25'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g
					style={{
						mixBlendMode: 'luminosity',
					}}
				>
					<path
						d='M12 0.674805L24 12.6748L12 24.6748L9.8625 22.5748L18.2625 14.1748H0V11.1748H18.2625L9.8625 2.7748L12 0.674805Z'
						fill={fill || 'white'}
					/>
				</g>
			</svg>
		);
}

export default Arrow