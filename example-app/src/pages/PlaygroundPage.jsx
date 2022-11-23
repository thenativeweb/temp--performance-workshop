import React, { useCallback, useEffect, useMemo, useState } from 'react';

const NestedComponent = () => {
	console.log('NestedComponent');

	return <p>Hi!</p>;
};

//const MemoizedNestedComponent = React.memo(NestedComponent);

const CounterDisplay = ({ url, counterValue }) => {
	console.log('CounterDisplay');

	useEffect(
		() => {
			fetch(url)

			// ...
		},
		[ counterValue ],
	)

	return (
		<>
			<p
				style={{
					fontWeight: isBold ? 600 : 400,
				}}
			>{ JSON.stringify(counterValue) }</p>
			<NestedComponent />
		</>
	);
};

const MemoizedCounterDisplay = React.memo(CounterDisplay);

const config = {
	api: {
		baseUrl: "myAwesomeServer.eu",
		useTls: true,
	},
	ui: {
		counterDisplay: {
			requestPath: '/update-counter',
			displayBold: false,
		}
	}
};

const PlaygroundPage = () => {
	console.log('PlaygroundPage');

	const [ value, setValue ] = useState(0);
	const handleButtonClicked = useCallback(
		() => {
			setValue(value + 1);
		},
		[ value, setValue ]
	);


	const url = useMemo(
		() => `http://${config.api.baseUrl}${config.ui.counterDisplay.requestPath}`,
		[ config.api.baseUrl, config.ui.counterDisplay.requestPath ],
	);

	return (
		<>
			<h3>Playground</h3>
			<button type="button" onClick={ handleButtonClicked }>
				Increase
			</button>
			<MemoizedCounterDisplay
				url={ url }
				counterValue={ value }
			/>
			{ // first rendering
				[1,2,3].map(
					num => <p key={ num }>{ num }</p>
				)
			}
			{ // first rendering
				[1,4,3].map(
					num => <p key={ num }>{ num }</p>
				)
			}
		</>
	)
};

export {
	PlaygroundPage,
};
