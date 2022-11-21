import { reverse } from 'lodash';

/**
 * Example function that takes a long time to execute.
 * Please do not modify!
 */
const sortMessages = (messages, delay=3000) => {
	const start = Date.now();

	let now = start;

	while (now - start < delay) {
		now = Date.now();
	}

	return reverse(messages);
};

export {
	sortMessages,
};
