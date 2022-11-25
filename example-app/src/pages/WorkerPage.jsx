import { useCallback, useEffect, useState } from 'react';

const worker = new Worker(new URL('../workers/exampleWorker.js', import.meta.url));

const WorkerPage = () => {
	const [ answer, setAnswer ] = useState('No answer yet...');

	const handleStartWorkingClicked = useCallback(
		() => {
			worker.postMessage({
				question: 'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
			});
			setAnswer('thinking hard...');
		},
		[ worker ],
	);

	useEffect(
		() => {
			const handleWorkerMessage = ({ data: { answer }}) => {
				setAnswer(answer);
			};

			worker.onmessage = handleWorkerMessage;

			return () => {
				worker.onmessage = undefined;
			};
		},
		[ worker ],
	);

	return (
		<>
			<p>{ answer }</p>
			<button
				onClick={ handleStartWorkingClicked }
			>
				Start working
			</button>
		</>
	);
};

export {
	WorkerPage,
};
