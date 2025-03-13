'use client'

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"

interface LanguageSettingsProps {
	onBack: () => void
}

export function LanguageSettings({ onBack }: LanguageSettingsProps) {
	const { t, language, setLanguage } = useLanguage()

	return (
		<div className="p-4">
			<div className="flex items-center mb-6">
				<button
					onClick={onBack}
					className="mr-2 p-2 hover:bg-muted rounded-full"
				>
					<ChevronLeft className="h-5 w-5" />
				</button>
				<h2 className="text-xl font-semibold">{t('language')}</h2>
			</div>

			<Card className="p-6">
				<div className="space-y-4">
					<Button
						variant={language === 'en' ? 'default' : 'outline'}
						className="w-full flex items-center justify-between mb-2"
						onClick={() => setLanguage('en')}
					>
						<span className="flex items-center">
							<span className="mr-2">🇺🇸</span>
							English
						</span>
						{language === 'en' && <span>✓</span>}
					</Button>
					<Button
						variant={language === 'ru' ? 'default' : 'outline'}
						className="w-full flex items-center justify-between"
						onClick={() => setLanguage('ru')}
					>
						<span className="flex items-center">
							<span className="mr-2">🇷🇺</span>
							Русский
						</span>
						{language === 'ru' && <span>✓</span>}
					</Button>
				</div>
			</Card>
		</div>
	)
}