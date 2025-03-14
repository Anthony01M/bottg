'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { User, ShoppingBag, Image as ImageIcon, Palette, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export function MobileNav() {
	const { t } = useLanguage()
	const router = useRouter()
	const pathname = usePathname()

	const leftNavItems = [
		{
			path: '/',
			label: t('profile'),
			icon: User
		},
		{
			path: '/shop',
			label: t('store'),
			icon: ShoppingBag
		},
	]

	const rightNavItems = [
		{
			path: '/nft',
			label: t('nft'),
			icon: Palette
		},
		{
			path: '/settings',
			label: t('settings'),
			icon: Settings
		},
	]

	const centerItem = {
		path: '/generator',
		label: t('generator'),
		icon: ImageIcon,
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-10">
			<div className="grid grid-cols-3 max-w-md mx-auto relative">
				<div className="flex justify-evenly">
					{leftNavItems.map((item) => renderNavItem(item, pathname, router))}
				</div>
				<div className="flex justify-center">
					{pathname === centerItem.path ? (
						renderNavItem(centerItem, pathname, router)
					) : (
						<button
							onClick={() => router.push(centerItem.path)}
							className="absolute left-1/2 -translate-x-1/2 -translate-y-1/3 flex flex-col items-center"
						>
							<div className="h-14 w-14 rounded-full flex items-center justify-center bg-primary shadow-lg">
								<centerItem.icon className="h-7 w-7 text-primary-foreground" />
							</div>
							<span className="text-xs mt-1 text-muted-foreground">
								{centerItem.label}
							</span>
						</button>
					)}
				</div>
				<div className="flex justify-evenly">
					{rightNavItems.map((item) => renderNavItem(item, pathname, router))}
				</div>
			</div>
		</div>
	)
}

function renderNavItem(item: { path: any; label: any; icon: any }, pathname: string, router: any[] | AppRouterInstance) {
	const isActive = pathname === item.path;

	return (
		<button
			key={item.path}
			onClick={() => router.push(item.path)}
			className="p-3 flex flex-col items-center relative"
		>
			<item.icon
				className={cn(
					"h-5 w-5",
					isActive ? "text-primary" : "text-muted-foreground"
				)}
			/>

			<span className={cn(
				"text-xs mt-1",
				isActive ? "text-primary" : "text-muted-foreground"
			)}>
				{item.label}
			</span>

			{isActive && (
				<div className="absolute -bottom-[1px] h-[3px] w-8 bg-primary rounded-full" />
			)}
		</button>
	);
}