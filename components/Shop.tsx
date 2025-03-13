'use client'

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export function Shop() {
	const { t } = useLanguage()

	return (
		<div className="p-4">
			<Card>
				<CardContent className="p-6">
					<h3 className="text-xl font-semibold mb-4">{t('store')}</h3>
					<p>Store content will appear here.</p>
				</CardContent>
			</Card>
		</div>
	)
}