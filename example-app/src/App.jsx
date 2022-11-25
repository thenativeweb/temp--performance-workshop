import { Route, Routes } from 'react-router-dom';
import { DebounceThrottleAbortPage } from './pages/DebounceThrottleAbortPage';
import { ImageConverterWorkerPage } from './pages/ImageConverterWorkerPage';
import { JoinWorkerPage } from './pages/JoinWorkerPage';
import { MessageBoardPage } from './pages/MessageBoardPage';
import { MessageBoardPageWithCodeSplitting } from './pages/MessageBoardPageWithCodeSplitting';
import { MessageBoardPageWithServer } from './pages/MessageBoardPageWithServer';
import { SuspensePage } from './pages/SuspensePage';
import { WorkerPage } from './pages/WorkerPage';

const App = () => (
	<Routes>
		<Route
			index
			element={
				<MessageBoardPage />
			}
		/>
		<Route
			path="/with-server"
			element={
				<MessageBoardPageWithServer />
			}
		/>
		<Route
			path="/with-code-splitting"
			element={
				<MessageBoardPageWithCodeSplitting />
			}
		/>
		<Route
			path="/worker"
			element={
				<WorkerPage />
			}
		/>
		<Route
			path="/join-worker"
			element={
				<JoinWorkerPage />
			}
		/>
		<Route
			path="/image-converter-worker"
			element={
				<ImageConverterWorkerPage />
			}
		/>
		<Route
			path="/use-async"
			element={
				<JoinWorkerPage />
			}
		/>
		<Route
			path="/debounce-throttle-abort"
			element={
				<DebounceThrottleAbortPage />
			}
		/>
		<Route
			path="/suspense"
			element={
				<SuspensePage />
			}
		/>
	</Routes>
);

export {
	App,
};
