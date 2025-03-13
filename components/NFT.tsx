'use client'

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/lib/language-context';
import { NFTCollection } from '@/components/nft/Collection';
import { NFTMarketplace } from '@/components/nft/MarketPlace';

export function NFT() {
	const { t } = useLanguage();
	const [activeTab, setActiveTab] = useState('collection');

	const collectionItems: NFTItemType[] = [
		{ id: 1, name: "Space Toncat", price: "10 TON", category: "Art" },
		{ id: 2, name: "Digital Tonscape", price: "5 TON", category: "Landscapes" },
		{ id: 3, name: "TONstract Art", price: "15 TON", category: "Abstract" },
		{ id: 4, name: "TONken", price: "8 TON", category: "Collectibles" },
	];

	const marketplaceItems: NFTItemType[] = [
		{ id: 1, name: "Golden TONcoin", price: "20 TON", creator: "cryptoartist" },
		{ id: 2, name: "TONmonaut", price: "30 TON", creator: "spaceexplorer" },
		{ id: 3, name: "TONland", price: "25 TON", creator: "digitalworld" },
		{ id: 4, name: "CryptoTONic", price: "15 TON", creator: "nftmaster" },
		{ id: 5, name: "TON Wave", price: "18 TON", creator: "artwave" },
	];

	return (
		<div className="p-4">
			<Card>
				<CardContent className="p-6">
					<h3 className="text-xl font-semibold mb-4">NFT {t('in')} TON</h3>
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="collection">{t('myCollection')}</TabsTrigger>
							<TabsTrigger value="marketplace">{t('marketplace')}</TabsTrigger>
						</TabsList>
						<TabsContent value="collection">
							<NFTCollection items={collectionItems} />
						</TabsContent>
						<TabsContent value="marketplace">
							<NFTMarketplace items={marketplaceItems} />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}