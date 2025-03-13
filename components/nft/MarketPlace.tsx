import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { NFTItem } from "./NFTItem";

interface NFTMarketplaceProps {
	items: NFTItemType[];
}

export function NFTMarketplace({ items }: NFTMarketplaceProps) {
	const { t } = useLanguage();

	return (
		<div className="space-y-4 mt-4">
			<div className="flex items-center space-x-2">
				<Input placeholder={t('searchNft')} className="flex-grow" />
				<Button size="icon">
					<Search className="h-4 w-4" />
				</Button>
			</div>
			{items.map((item) => (
				<NFTItem
					key={item.id}
					item={item}
					isMarketplace
					creatorLabel={t('creator')}
				/>
			))}
		</div>
	);
}