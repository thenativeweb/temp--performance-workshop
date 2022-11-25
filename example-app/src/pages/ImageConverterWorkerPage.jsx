import { useCallback, useEffect } from 'react';

const worker = new Worker(new URL('../workers/imageConverterWorker.js', import.meta.url));

const ImageConverterWorkerPage = () => {
	const handleFileUploaded = useCallback(
		(event) => {
			const files = event.target.files;
			const file = files[0];
			const blob = new Blob([ file ]);
			createImageBitmap(blob).then(
				(image) => {
					worker.postMessage(
						{
							imageId: file.name,
							format: 'image/webp',
							image
						},
						[ image ],
					);
				}
			);
		},
		[ worker ],
	);

	useEffect(
		() => {
			const handleWorkerMessage = ({ data }) => {
				if (data.status !== 'success') {
					console.log('Failed converting ', data.imageId);

					return;
				}

				const blob = new Blob([ data.buffer ]);
				const objectUrl = window.URL.createObjectURL(blob);
				const link = document.createElement('a');

				link.href = objectUrl;
				link.download = data.imageId + '.webp';
				link.dispatchEvent(
					new MouseEvent('click', {
						bubbles: true,
						cancelable: true,
						view: window
					}),
				);
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
			<input type="file" accept="image/*" onChange={handleFileUploaded} />
		</>
	);
};

export {
	ImageConverterWorkerPage,
};
