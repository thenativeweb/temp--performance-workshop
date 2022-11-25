self.onmessage = ({ data }) => {
	const { imageId, format, image } = data;

	const canvas = new OffscreenCanvas(1, 1);
	const ctx = canvas.getContext('2d');

	canvas.width = image.width;
	canvas.height = image.height;
	ctx.drawImage(image, 0, 0);

	canvas.convertToBlob({ type: format }).
	then(
		(blob) => {
			if (blob === undefined) {
				self.postMessage({ imageId, status: 'failure' });

				return;
			}

			blob.arrayBuffer().
			then(
				buffer => {
					if (buffer === undefined) {
						self.postMessage({ imageId, status: 'failure' });

						return;
					}

					self.postMessage(
						{ imageId, status: 'success', buffer },
						[ buffer ],
					);
				}
			);
		},
	);
};
