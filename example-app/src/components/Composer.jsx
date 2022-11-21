import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 1rem;

	border: 1px solid #222;
	border-radius: 10px;
`;

const Input = styled.textarea`
	min-height: 100px;
	margin: 1rem 0;
	font-family: sans-serif;
	background-color: inherit;
	color: inherit;
`;

const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const Button = styled.button`
	min-width: 100px;
	border: none;
	outline: none;
	border-radius: 40px;
	background-color: #222;
	color: inherit;
	padding: 0.5rem 1rem;

	transition: background-color 0.2s ease-out;

	&:hover {
		background-color: #2f2f2f;
	}
`;

const Composer = () => {
	return (
		<Container>
			<h3>TODO</h3>
		</Container>
	)
};

export {
	Composer,
};
