import { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { choose, randomArrayBy, randomString } from 'zufall';

const count = 1000;

const worker = new Worker(new URL('../workers/joinWorker.js', import.meta.url));

const clients = randomArrayBy(
	() => ({
		id: v4(),
		name: `${randomString()} ${randomString()}`,
	}),
	count,
);

const manufacturers = randomArrayBy(
	() => ({
		id: v4(),
		name: `${randomString()} ${choose(['Inc.', 'Co.', 'AG'])}`,
	}),
	count,
);

const products = randomArrayBy(
	() => ({
		id: v4(),
		name: randomString(),
		manufacturer: choose(manufacturers).id,
	}),
	count,
);

const orders = randomArrayBy(
	() => ({
		id: v4(),
		product: choose(products).id,
		client: choose(clients).id,
	}),
	count,
);

const joinOrders = () => {
	const result = [];

	for (const product of products) {
		for (const manufacturer of manufacturers) {
			for (const order of orders) {
				for (const client of clients) {
					if (product.manufacturer !== manufacturer.id) {
						continue;
					}
					const denormalizedProduct = {
						...product,
						manufacturer,
					};

					if (order.product !== product.id) {
						continue;
					}
					if (order.client !== client.id) {
						continue;
					}
					const denormalizedOrder = {
						...order,
						product: denormalizedProduct,
						client,
					};

					result.push(denormalizedOrder);
				}
			}
		}
	}

	return result;
};

const JoinWorkerPage = () => {
	const [ denormalizedOrders, setDenormalizedOrders ] = useState([]);

	const handleStartWorkingClicked = useCallback(
		() => {
			//setDenormalizedOrders(joinOrders());

			setDenormalizedOrders([]);
			worker.postMessage({
				clients,
				manufacturers,
				products,
				orders,
			});
		},
		[ worker ],
	);

	useEffect(
		() => {
			const handleWorkerMessage = ({ data }) => {
				setDenormalizedOrders((oldValue) => [ ...oldValue, data ]);
				console.log({ data, denormalizedOrders })
			};

			worker.onmessage = handleWorkerMessage;

			return () => {
				worker.onmessage = undefined;
			};
		},
		[ worker, setDenormalizedOrders ],
	);

	const [ count, setCount ] = useState(0);

	return (
		<>
			<button
				onClick={ handleStartWorkingClicked }
			>
				Start working
			</button>
			<button onClick={() => setCount(count + 1)}>
				{ count }
			</button>
			{
				denormalizedOrders.map(
					order => <div>{JSON.stringify(order, null, 2)}</div>
				)
			}
		</>
	);
};

export {
	JoinWorkerPage,
};
