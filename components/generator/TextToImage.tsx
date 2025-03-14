import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageLoading } from "@/components/ui/image/loading";
import { useLanguage } from "@/lib/language-context";

interface Text2ImgProps {
	onGenerate: (settings: any) => void;
	isGenerating: boolean;
	models: Model[];
}

export function TextToImage({ onGenerate, isGenerating, models }: Text2ImgProps) {
	const { t } = useLanguage();
	const [prompt, setPrompt] = useState('');
	const [negativePrompt, setNegativePrompt] = useState('');
	const [model, setModel] = useState(models[0]?.id || '');
	const [samplerSteps, setSamplerSteps] = useState(30);
	const [imageCount, setImageCount] = useState(1);
	const [size, setSize] = useState('512x512');

	const handleGenerate = () => {
		onGenerate({
			prompt,
			negativePrompt,
			model,
			samplerSteps,
			imageCount,
			size
		});
	};

	return (
		<div className="space-y-4">
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
					Sampler Steps: {samplerSteps}
				</label>
				<Slider
					value={[samplerSteps]}
					onValueChange={(value) => setSamplerSteps(value[0])}
					min={10}
					max={50}
					step={1}
					className="w-full"
					disabled={isGenerating}
				/>
			</div>

			<div>
				<label className="block text-sm font-medium mb-1">{t('modelSize')}</label>
				<Select
					value={size}
					onValueChange={setSize}
					disabled={isGenerating}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder={t('selectSize')} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="256x256">256x256</SelectItem>
						<SelectItem value="512x512">512x512</SelectItem>
						<SelectItem value="768x768">768x768</SelectItem>
						<SelectItem value="1024x1024">1024x1024</SelectItem>
					</SelectContent>
				</Select>
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
					disabled={!prompt || isGenerating}
					onClick={handleGenerate}
				>
					{t('createImage')}
				</Button>
			)}
		</div>
	);
}