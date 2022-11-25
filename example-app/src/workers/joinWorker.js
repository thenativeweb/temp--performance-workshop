self.onmessage = ({ data: { products, manufacturers, orders, clients }}) => {
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

					self.postMessage(denormalizedOrder);
				}
			}
		}
	}
};
