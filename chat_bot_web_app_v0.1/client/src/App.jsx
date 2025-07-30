import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Chat from "./components/Chat";
import Settings from "./pages/Settings";


import "./styles/App.css";

function App() {
	return (
		<div className="app-container">
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="chat" element={<Chat />} />
						<Route path="settings" element={<Settings />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
