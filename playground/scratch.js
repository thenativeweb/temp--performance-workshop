
let outSideVariable = "test";

function capitalize(aString) {
	const [ firstLetter, ...rest ] = aString;

	return [ firstLetter.toUpperCase(), ...rest ].join('');
}

let testInput = 'please capitalize this';

console.log(capitalize(testInput));
console.log(testInput);

let counter = 0;

function incrementCounter() {
	counter += 1;
}

console.log(counter);

incrementCounter();

console.log(counter);

incrementCounter();

console.log(counter);
