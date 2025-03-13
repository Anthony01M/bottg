'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ru';

type TranslationsType = {
	[key in Language]: {
		[key: string]: string;
	};
};

const translations: TranslationsType = {
	en: {
		profile: 'Profile',
		store: 'Store',
		generator: 'Generator',
		nft: 'NFT',
		level: 'Level',
		experience: 'Experience',
		statistics: 'Statistics',
		generatedImages: 'Generated Images',
		purchasedItems: 'Purchased Items',
		gallery: 'Gallery',
		dailyRewards: 'Daily Rewards',
		getRewards: 'Claim rewards every day to increase your level and earn bonuses!',
		imageGenerator: 'Image Generator',
		prompt: 'Prompt',
		promptPlaceholder: 'Describe the image you want to generate',
		generationModel: 'Generation Model',
		selectModel: 'Select a model',
		modelSize: 'Model Size',
		selectSize: 'Select size',
		imageCount: 'Number of images',
		createImage: 'Create new image',
		myCollection: 'My Collection',
		marketplace: 'Marketplace',
		searchNft: 'Search NFT...',
		creator: 'Creator',
		createNft: 'Create NFT on TON',
		in: 'in',
		generatingImages: 'Generating your images',
		processing: 'Processing',
		pleaseWait: 'Please wait',
		imageGenerationInProgress: 'Image generation in progress',
		settings: 'Settings',
		language: 'Language',
		selectLanguage: 'Select Language',
		theme: 'Theme',
		light: 'Light',
		dark: 'Dark',
		system: 'System',
	},
	ru: {
		profile: 'Профиль',
		store: 'Магазин',
		generator: 'Генератор',
		nft: 'NFT',
		level: 'Уровень',
		experience: 'Опыт',
		statistics: 'Статистика',
		generatedImages: 'Сгенерировано изображений',
		purchasedItems: 'Куплено товаров',
		gallery: 'Галерея',
		dailyRewards: 'Ежедневные награды',
		getRewards: 'Получайте награды каждый день, чтобы повысить свой уровень и получить бонусы!',
		imageGenerator: 'Генератор изображений',
		prompt: 'Промпт',
		promptPlaceholder: 'Опишите изображение, которое вы хотите сгенерировать',
		generationModel: 'Модель генерации',
		selectModel: 'Выберите модель генерации',
		modelSize: 'Размер модели',
		selectSize: 'Выберите размер модели',
		imageCount: 'Количество изображений',
		createImage: 'Создать новое изображение',
		myCollection: 'Моя коллекция',
		marketplace: 'Маркетплейс',
		searchNft: 'Поиск NFT...',
		creator: 'Создатель',
		createNft: 'Создать NFT в TON',
		in: 'в',
		generatingImages: 'Генерация изображений',
		processing: 'Обработка',
		pleaseWait: 'Пожалуйста, подождите',
		imageGenerationInProgress: 'Идет генерация изображений',
		settings: 'Настройки',
		language: 'Язык',
		selectLanguage: 'Выберите язык',
		theme: 'Тема',
		light: 'Светлая',
		dark: 'Темная',
		system: 'Системная',
	}
};

type LanguageContextType = {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [language, setLanguage] = useState<Language>('en');

	useEffect(() => {
		if (window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code) {
			const userLang = window.Telegram.WebApp.initDataUnsafe.user.language_code;
			if (userLang === 'ru') {
				setLanguage('ru');
			}
		} else {
			const browserLang = navigator.language.split('-')[0];
			if (browserLang === 'ru') {
				setLanguage('ru');
			}
		}
	}, []);

	const t = (key: string) => {
		return translations[language][key] || key;
	};

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error('useLanguage must be used within a LanguageProvider');
	}
	return context;
}