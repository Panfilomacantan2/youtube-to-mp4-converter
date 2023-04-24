import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/searchContext';
import { About } from './pages';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<SearchProvider>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</SearchProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
