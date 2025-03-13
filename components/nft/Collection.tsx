import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { NFTItem } from "./NFTItem";

interface NFTCollectionProps {
	items: NFTItemType[];
}

export function NFTCollection({ items }: NFTCollectionProps) {
	const { t } = useLanguage();

	return (
		<div className="space-y-4 mt-4">
			{items.map((item) => (
				<NFTItem key={item.id} item={item} />
			))}
			<Button className="w-full mt-4">{t('createNft')}</Button>
		</div>
	);
}