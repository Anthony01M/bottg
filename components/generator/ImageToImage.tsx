import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageLoading } from "@/components/ui/image/loading";
import { useLanguage } from "@/lib/language-context";
import { Upload, Image } from "lucide-react";

interface Img2ImgProps {
	onGenerate: (settings: any) => void;
	isGenerating: boolean;
	models: Model[];
}

export function ImageToImage({ onGenerate, isGenerating, models }: Img2ImgProps) {
	const { t } = useLanguage();
	const [sourceImage, setSourceImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [prompt, setPrompt] = useState('');
	const [negativePrompt, setNegativePrompt] = useState('');
	const [model, setModel] = useState(models[0]?.id || '');
	const [denoiseStrength, setDenoiseStrength] = useState(0.7);
	const [imageCount, setImageCount] = useState(1);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setSourceImage(file);

			const reader = new FileReader();
			reader.onload = (ev) => {
				setImagePreview(ev.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleGenerate = () => {
		onGenerate({
			sourceImage,
			prompt,
			negativePrompt,
			model,
			denoiseStrength,
			imageCount
		});
	};

	return (
		<div className="space-y-4">
			<div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center cursor-pointer relative">
				<input
					type="file"
					accept="image/*"
					onChange={handleImageUpload}
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
					disabled={isGenerating}
				/>

				{imagePreview ? (
					<div className="relative">
						<img
							src={imagePreview}
							alt="Source"
							className="max-h-64 mx-auto rounded-md"
						/>
						<Button
							size="sm"
							variant="destructive"
							className="absolute top-2 right-2"
							onClick={(e) => {
								e.stopPropagation();
								setSourceImage(null);
								setImagePreview(null);
							}}
							disabled={isGenerating}
						>
							Change
						</Button>
					</div>
				) : (
					<div className="flex flex-col items-center py-8">
						<Upload className="h-10 w-10 mb-2 text-muted-foreground" />
						<p className="text-sm text-muted-foreground">Upload source image</p>
					</div>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">{t('prompt')}</label>
				<Textarea
					placeholder={t('promptPlaceholder')}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					className="w-full"
					disabled={isGenerating}
				/>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">Negative Prompt</label>
				<Textarea
					placeholder="What to avoid in the generation"
					value={negativePrompt}
					onChange={(e) => setNegativePrompt(e.target.value)}
					className="w-full"
					disabled={isGenerating}
				/>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">{t('generationModel')}</label>
				<Select
					value={model}
					onValueChange={setModel}
					disabled={isGenerating}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder={t('selectModel')} />
					</SelectTrigger>
					<SelectContent>
						{models.map(m => (
							<SelectItem key={m.id} value={m.id}>
								{m.name} {m.isFree ? "(Free)" : `(${m.price} blocus)`}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">
					Denoise Strength: {denoiseStrength.toFixed(2)}
				</label>
				<Slider
					value={[denoiseStrength * 100]}
					onValueChange={(value) => setDenoiseStrength(value[0] / 100)}
					min={0}
					max={100}
					step={1}
					className="w-full"
					disabled={isGenerating}
				/>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">
					{t('imageCount')}: {imageCount}
				</label>
				<Slider
					value={[imageCount]}
					onValueChange={(value) => setImageCount(value[0])}
					max={4}
					step={1}
					className="w-full"
					disabled={isGenerating}
				/>
			</div>

			{isGenerating ? (
				<div className="mt-6">
					<ImageLoading count={imageCount} />
				</div>
			) : (
				<Button
					className="w-full"
					disabled={!sourceImage || !prompt || isGenerating}
					onClick={handleGenerate}
				>
					{t('createImage')}
				</Button>
			)}
		</div>
	);
}