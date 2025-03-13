'use client'

import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import { Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"

interface ThemeSettingsProps {
	onBack: () => void
}

export function ThemeSettings({ onBack }: ThemeSettingsProps) {
	const { t } = useLanguage()
	const { theme, setTheme } = useTheme()

	return (
		<div className="p-4">
			<div className="flex items-center mb-6">
				<button
					onClick={onBack}
					className="mr-2 p-2 hover:bg-muted rounded-full"
				>
					<ChevronLeft className="h-5 w-5" />
				</button>
				<h2 className="text-xl font-semibold">{t('theme')}</h2>
			</div>

			<Card>
				<CardContent className="p-6">
				<div className="space-y-4">
					<Button
						variant={theme === 'light' ? 'default' : 'outline'}
						className="w-full flex items-center justify-between mb-2"
						onClick={() => setTheme('light')}
					>
						<span className="flex items-center">
							<Sun className="mr-2 h-5 w-5" />
							{t('light')}
						</span>
						{theme === 'light' && <span>✓</span>}
					</Button>

					<Button
						variant={theme === 'dark' ? 'default' : 'outline'}
						className="w-full flex items-center justify-between mb-2"
						onClick={() => setTheme('dark')}
					>
						<span className="flex items-center">
							<Moon className="mr-2 h-5 w-5" />
							{t('dark')}
						</span>
						{theme === 'dark' && <span>✓</span>}
					</Button>

					<Button
						variant={theme === 'system' ? 'default' : 'outline'}
						className="w-full flex items-center justify-between"
						onClick={() => setTheme('system')}
					>
						<span className="flex items-center">
							<Monitor className="mr-2 h-5 w-5" />
							{t('system')}
						</span>
						{theme === 'system' && <span>✓</span>}
					</Button>
				</div>
				</CardContent>
			</Card>
		</div>
	)
}