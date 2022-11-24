const read = () => {
	//throw new Error('Help!');

	throw Promise.resolve();
};

const foo = () => {
	return `The data is: ${read()}`;
}

const bar = () => {
	return `I am a parent component, and ${foo()}`;
};

const suspense = (actual, fallback) => () => {
	try {
		return actual();
	} catch (ex) {
		if (ex instanceof Promise) {
			return fallback();
		}

		throw ex;
	}
};

const errorBoundary = (actual, fallback) => {
	try {
		return actual();
	} catch (ex) {
		if (ex instanceof Promise) {
			throw ex;
		}

		return fallback();
	}
}

const baz = () => errorBoundary(
	suspense(
		bar,
		() => 'no data :(',
	),
	() => 'an error occurred!',
);

console.log(baz());

/*
console.log(baz());
console.log((() => bar())());
console.log(bar());
console.log((() => foo())());
console.log(foo());
console.log((() => 42)());
console.log(42);

console.log(baz());
console.log((() => () => foo())()());
console.log((() => () => () => 42)()()());
*/
