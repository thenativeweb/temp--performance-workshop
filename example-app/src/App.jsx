import { MessageBoardPage } from './pages/MessageBoardPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { Route, Routes } from 'react-router-dom';

const App = () => (
	<Routes>
		<Route
			index
			element={ <MessageBoardPage /> }
		/>
		<Route
			path="/playground"
			element={ <PlaygroundPage /> }
		/>
	</Routes>
);

export {
	App,
};
