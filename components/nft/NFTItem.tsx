import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NFTItemProps {
	item: NFTItemType;
	isMarketplace?: boolean;
	creatorLabel?: string;
}

export function NFTItem({ item, isMarketplace = false, creatorLabel = "Creator" }: NFTItemProps) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center">
				<div className="w-12 h-12 bg-muted rounded-lg mr-4"></div>
				<div>
					<span className="font-medium">{item.name}</span>
					<p className="text-sm text-muted-foreground">
						{isMarketplace
							? `${creatorLabel}: ${item.creator}`
							: item.category}
					</p>
				</div>
			</div>
			{isMarketplace
				? <Button size="sm">{item.price}</Button>
				: <Badge>{item.price}</Badge>}
		</div>
	);
}