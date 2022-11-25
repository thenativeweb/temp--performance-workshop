import { debounce, throttle } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';

const DebounceThrottleAbortPage = () => {
	const [ searchQuery, setSearchQuery ] = useState('');
	const [ searchResults, setSearchResults ] = useState([]);

	const handleSearchQueryChanged = useCallback(
		(event) => {
			setSearchQuery(event.target.value);
		},
		[ setSearchQuery ],
	);

	const performSearch = useCallback(
		(query) => {
			const requestId = v4();

			console.log(`START fetching ${requestId}: ${query}`);

			fetch('http://localhost:4000/search', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query }),
			}).
			then(
				(response) => response.json()
			).
			then(
				(messages) => {
					console.log(`FETCHED ${requestId}: ${query}`);
					setSearchResults(messages);
				}
			);
		},
		[ setSearchResults ],
	);

	const performAbortableSearch = useCallback(
		(query, signal) => {
			const requestId = v4();

			console.log(`START fetching ${requestId}: ${query}`);

			fetch('http://localhost:4000/search', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query }),
				signal,
			}).
			then(
				(response) => response.json()
			).
			then(
				(messages) => {
					console.log(`FETCHED ${requestId}: ${query}`);
					setSearchResults(messages);
				}
			).catch(
				() => {
					console.log(`ABORTED ${requestId}: ${query}`)
				}
			);
		},
		[ setSearchResults ],
	);

	const debouncedPerformSearch = useMemo(
		() => debounce(
			performSearch,
			500,
		),
		[ setSearchResults ],
	);

	const throttledPerformSearch = useMemo(
		() => throttle(
			performSearch,
			500,
		),
		[ setSearchResults ],
	);

	const throttledPerformbortableSeach = useMemo(
		() => throttle(
			performAbortableSearch,
			500,
		),
		[ setSearchResults ],
	);

	useEffect(
		() => {
			//performSearch(searchQuery);
			//debouncedPerformSearch(searchQuery);
			//throttledPerformSearch(searchQuery);
			const abortController = new AbortController();

			throttledPerformbortableSeach(searchQuery, abortController.signal);

			return () => {
				abortController.abort();
			};
		},
		[ searchQuery ],
	)

	return (
		<>
			<h3>Playground</h3>
			<input type="text" value={searchQuery} onChange={handleSearchQueryChanged} />
			{
				searchResults.map(
					(message) => <p>{ JSON.stringify(message) }</p>
				)
			}
		</>
	);
};

export {
	DebounceThrottleAbortPage,
};
