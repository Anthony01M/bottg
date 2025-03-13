import { ChevronRight } from "lucide-react"
import { ReactNode } from "react"

interface SettingItemProps {
	icon: ReactNode
	title: string
	value?: string
	onClick: () => void
}

export function SettingItem({ icon, title, value, onClick }: SettingItemProps) {
	return (
		<div
			className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-muted/50 transition-colors"
			onClick={onClick}
		>
			<div className="flex items-center">
				<div className="bg-primary/10 p-2 rounded-full text-primary mr-3">
					{icon}
				</div>
				<span>{title}</span>
			</div>
			<div className="flex items-center">
				{value && <span className="text-muted-foreground mr-2">{value}</span>}
				<ChevronRight className="h-5 w-5 text-muted-foreground" />
			</div>
		</div>
	)
}