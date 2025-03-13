'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Zap, ImageIcon, Gift } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useLanguage } from '@/lib/language-context'

export function Profile() {
	const { t } = useLanguage()
	const [user, setUser] = useState<{
		first_name: string;
		last_name?: string;
		username?: string;
		photo_url?: string;
		language_code?: string;
	} | null>(null)
	const [level] = useState(0)
	const [experience] = useState(0)

	useEffect(() => {
		if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
			setUser(window.Telegram.WebApp.initDataUnsafe.user)
		} else {
			console.error('Telegram WebApp is not available or user is undefined.')
		}
	}, [])

	const generatedImages = [
		"/placeholder.svg?height=100&width=100&text=Image1",
		"/placeholder.svg?height=100&width=100&text=Image2",
		"/placeholder.svg?height=100&width=100&text=Image3",
		"/placeholder.svg?height=100&width=100&text=Image4",
	]

	const dailyRewards = [
		{ day: 1, reward: "50 XP" },
		{ day: 2, reward: "100 XP" },
		{ day: 3, reward: "1 Free Gen" },
		{ day: 4, reward: "200 XP" },
		{ day: 5, reward: "2 Free Gens" },
		{ day: 6, reward: "300 XP" },
		{ day: 7, reward: "1 Random NFT" },
	]

	return (
		<div className="space-y-6 p-4">
			{user && (
				<Card className="bg-primary text-primary-foreground">
					<CardContent className="p-6">
						<div className="flex items-center space-x-4">
							<Avatar className="w-20 h-20 border-4 border-white">
								<AvatarImage src={user.photo_url} alt={user.first_name} />
								<AvatarFallback>{user.first_name[0]}</AvatarFallback>
							</Avatar>
							<div className="flex-grow">
								<h2 className="text-2xl font-bold">{`${user.first_name} ${user.last_name || ''}`}</h2>
								<p className="text-lg">@{user.username || 'username'}</p>
								<div className="flex items-center mt-2">
									<Star className="w-5 h-5 mr-1 text-yellow-300" />
									<span className="font-semibold">{t('level')} {level}</span>
								</div>
							</div>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="ghost" size="icon" className="rounded-full">
										<Gift className="h-6 w-6 text-yellow-300" />
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>{t('dailyRewards')}</DialogTitle>
										<DialogDescription>
											{t('getRewards')}
										</DialogDescription>
									</DialogHeader>
									<div className="grid grid-cols-7 gap-2 mt-4">
										{dailyRewards.map((reward) => (
											<div key={reward.day} className="flex flex-col items-center">
												<div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${reward.day <= 3 ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
													{reward.day}
												</div>
												<span className="text-xs mt-1 text-center">{reward.reward}</span>
											</div>
										))}
									</div>
								</DialogContent>
							</Dialog>
						</div>
					</CardContent>
				</Card>
			)}

			<Card>
				<CardContent className="p-6">
					<h3 className="text-lg font-semibold mb-3 flex items-center">
						<Zap className="w-5 h-5 mr-2 text-yellow-500" />
						{t('statistics')}
					</h3>
					<div className="space-y-3 text-sm">
						<div>
							<div className="flex justify-between mb-1">
								<span className="font-medium">{t('experience')}</span>
								<span>{experience} / 1000</span>
							</div>
							<Progress value={(experience / 1000) * 100} className="h-2" />
						</div>
						<div className="flex justify-between">
							<span>{t('generatedImages')}</span>
							<Badge variant="secondary" className="text-xs">0</Badge>
						</div>
						<div className="flex justify-between">
							<span>{t('purchasedItems')}</span>
							<Badge variant="secondary" className="text-xs">0</Badge>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-6">
					<h3 className="text-xl font-semibold mb-4 flex items-center">
						<ImageIcon className="w-6 h-6 mr-2 text-primary" />
						{t('gallery')}
					</h3>
					<div className="grid grid-cols-2 gap-4">
						{generatedImages.map((image, index) => (
							<Image
								key={index}
								src={image}
								alt={`Generated image ${index + 1}`}
								width={100}
								height={100}
								className="w-full h-auto rounded-lg shadow-md"
							/>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}