'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextType = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>('system');

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') as Theme | null;
		if (storedTheme) {
			setTheme(storedTheme);
		}

		applyTheme(storedTheme || 'system');
	}, []);

	useEffect(() => {
		if (theme) {
			localStorage.setItem('theme', theme);
			applyTheme(theme);
		}
	}, [theme]);

	const applyTheme = (theme: Theme) => {
		const root = document.documentElement;
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		const effectiveTheme = theme === 'system' ? systemTheme : theme;

		root.classList.remove('light', 'dark');
		root.classList.add(effectiveTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}