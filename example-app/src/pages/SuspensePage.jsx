import { Suspense } from 'react';

const fetchMessages = async () => {
	const response = await fetch('http://localhost:4000/messages');

	return await response.json();
};

const makeSuspendable = (promise) => {
	let status = 'pending';
	let result = undefined;
	let error = undefined;

	const wrappedPromise =
		promise.
		then(
			(promiseResult) => {
				result = promiseResult;
				status = 'resolved';
			},
		).
		catch(
			(promiseError) => {
				error = promiseError;
				status = 'rejected';
			},
		);

	const read = () => {
		switch (status) {
			case 'pending':
				throw wrappedPromise;
			case 'rejected':
				throw error;
			case 'resolved':
				return result;
		}
	};

	return { read };
}

const Messages = ({ messages }) => {
	return (
		<>
			{
				messages.read().map(
					(message) => <p>{ JSON.stringify(message) }</p>
				)
			}
		</>
	);
}

const SuspensePage = () => {
	const messages = makeSuspendable(fetchMessages());

	return (
		<>
			<h3>Playground</h3>
			<Suspense
				fallback={
					<p>Loading...</p>
				}
			>
				<Messages messages={ messages }/>
			</Suspense>
		</>
	);
};

export {
	SuspensePage,
};
