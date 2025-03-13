'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "@/lib/theme-context"
import { Sun, Globe } from "lucide-react"
import { SettingItem } from "@/components/settings/SettingItem"
import { ThemeSettings } from "@/components/settings/Theme"
import { LanguageSettings } from "@/components/settings/Language"

export function Settings() {
	const { t, language } = useLanguage()
	const { theme } = useTheme()
	const [activeSetting, setActiveSetting] = useState<string | null>(null)

	const getThemeDisplay = () => {
		switch (theme) {
			case 'light': return t('light');
			case 'dark': return t('dark');
			case 'system': return t('system');
			default: return '';
		}
	}
	const getLanguageDisplay = () => {
		switch (language) {
			case 'en': return 'English';
			case 'ru': return 'Русский';
			default: return '';
		}
	}

	if (activeSetting === 'theme') {
		return <ThemeSettings onBack={() => setActiveSetting(null)} />;
	}

	if (activeSetting === 'language') {
		return <LanguageSettings onBack={() => setActiveSetting(null)} />;
	}

	return (
		<div className="p-4 pb-20">
			<h2 className="text-xl font-semibold mb-4">{t('settings')}</h2>

			<Card>
				<SettingItem
					icon={<Sun className="h-5 w-5" />}
					title={t('theme')}
					value={getThemeDisplay()}
					onClick={() => setActiveSetting('theme')}
				/>
				<div className="border-t border-border" />
				<SettingItem
					icon={<Globe className="h-5 w-5" />}
					title={t('language')}
					value={getLanguageDisplay()}
					onClick={() => setActiveSetting('language')}
				/>
			</Card>
		</div>
	)
}