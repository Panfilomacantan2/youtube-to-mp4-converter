import { useState, useEffect, useContext, createContext } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
	const [searchUrl, setSearchUrl] = useState([]);

	const contextValue = {
		searchUrl,
	};

	return <SearchContext.Provider value={{ contextValue }}>{children}</SearchContext.Provider>;
};

const useSearchVideoUrl = () => {
	const context = useContext(SearchContext);

	if (!context) {
		throw new Error('useSearchVideoUrl must be used within a ConfessionsProvider');
	}

	return context;
};

export { SearchProvider, useSearchVideoUrl };
