interface TelegramWebAppUser {
	id: number;
	first_name: string;
	last_name?: string;
	username?: string;
	photo_url?: string;
	language_code?: string;
}

interface TelegramWebAppInitData {
	query_id?: string;
	user?: TelegramWebAppUser;
	auth_date?: string;
	hash?: string;
}

interface TelegramWebApp {
	initData: string;
	initDataUnsafe: TelegramWebAppInitData;
	colorScheme: 'light' | 'dark';
	themeParams: {
		bg_color: string;
		text_color: string;
		hint_color: string;
		link_color: string;
		button_color: string;
		button_text_color: string;
	};
	ready(): void;
	expand(): void;
	close(): void;
}

interface Window {
	Telegram: {
		WebApp: TelegramWebApp;
	};
}

interface NFTItemType {
	id: number;
	name: string;
	price: string;
	category?: string;
	creator?: string;
}