'use client'

import { useState, useEffect } from "react"

export function TelegramSync({ children }: { children: React.ReactNode }) {
	const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		if (window.Telegram?.WebApp) {
			const tgColorScheme = window.Telegram.WebApp.colorScheme;
			setColorScheme(tgColorScheme);

			if (window.Telegram.WebApp.themeParams) {
				const root = document.documentElement;
				const params = window.Telegram.WebApp.themeParams;

				root.style.setProperty('--tg-bg-color', params.bg_color);
				root.style.setProperty('--tg-text-color', params.text_color);
				root.style.setProperty('--tg-hint-color', params.hint_color);
				root.style.setProperty('--tg-link-color', params.link_color);
				root.style.setProperty('--tg-button-color', params.button_color);
				root.style.setProperty('--tg-button-text-color', params.button_text_color);
			}

			window.Telegram.WebApp.ready();
		}
	}, []);

	return (
		<div className={colorScheme}>
			{children}
		</div>
	);
}