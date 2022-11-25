import { useEffect, useMemo, useState } from 'react';

const useAsync = (asyncFunction) => {
	const [ state, setState ] = useState('pending');
	const [ result, setResult ] = useState(undefined);
	const [ error, setError ] = useState(undefined);

	const isPending = useMemo(
		() => state === 'pending',
		[ state ],
	);

	useEffect(
		() => {
			asyncFunction().
			then(
				(data) => {
					setResult(data);
					setState('done');
				}
			).
			catch(
				(error) => {
					setError(error);
					setState('error');
				}
			);
		},
		[],
	);

	return {
		isPending,
		result,
		error,
	};
}

const UseAsyncPage = () => {
	const { isPending, result, error } = useAsync(
		async () => {
			const response = await fetch('http://localhost:4000/messages');

			return await response.json();
		}
	);

	return (
		<>
			<h3>Playground</h3>
			{
				isPending
					? <p>Loading...</p>
					: result.map(
						(message) => <p>{message.text}</p>
					)
			}
		</>
	);
};

export {
	UseAsyncPage,
};
