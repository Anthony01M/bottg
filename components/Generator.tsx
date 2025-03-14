'use client'

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/language-context";
import { ProgressLoading } from "@/components/ui/image/loading";
import { TextToImage } from "@/components/generator/TextToImage";
import { ImageToImage } from "@/components/generator/ImageToImage";
import { Upscale } from "@/components/generator/Upscale";
import { textToImageGenerationModel, imageToImageGenerationModel } from "@/lib/models";

export function Generator() {
	const { t } = useLanguage();
	const [activeTab, setActiveTab] = useState<GeneratorMode>('text2img');
	const [isGenerating, setIsGenerating] = useState(false);
	const [generationProgress, setGenerationProgress] = useState(0);

	const getTabTitle = () => {
		switch (activeTab) {
			case 'text2img':
				return t('text2imgGenerator');
			case 'img2img':
				return t('img2imgGenerator');
			case 'upscale':
				return t('upscaleTitle');
			default:
				return t('imageGenerator');
		}
	};

	const handleGenerateImages = (settings: GeneratorSettings) => {
		console.log("Generation settings:", settings);
		setIsGenerating(true);
		setGenerationProgress(0);

		const interval = setInterval(() => {
			setGenerationProgress(prev => {
				if (prev >= 95) {
					clearInterval(interval);
					return prev;
				}
				return prev + Math.floor(Math.random() * 10) + 1;
			});
		}, 500);

		setTimeout(() => {
			setIsGenerating(false);
			setGenerationProgress(100);
			clearInterval(interval);

			setTimeout(() => {
				setGenerationProgress(0);
			}, 1000);
		}, 5000 + Math.random() * 3000);
	};

	return (
		<div className="p-4">
			<Card className="relative flex flex-col min-h-[calc(100vh-2rem)]">
				<CardContent className="p-6 flex-grow overflow-auto">
					<h3 className="text-xl font-semibold mb-4">{getTabTitle()}</h3>

					<Tabs value={activeTab} onValueChange={setActiveTab as (value: string) => void} className="h-full flex flex-col relative">
						{generationProgress > 0 && (
							<ProgressLoading percent={generationProgress} />
						)}

						<div className="flex-grow overflow-auto pb-16">
							<TabsContent value="text2img" className="h-full">
								<TextToImage
									onGenerate={handleGenerateImages}
									isGenerating={isGenerating}
									models={textToImageGenerationModel}
								/>
							</TabsContent>

							<TabsContent value="img2img" className="h-full">
								<ImageToImage
									onGenerate={handleGenerateImages}
									isGenerating={isGenerating}
									models={imageToImageGenerationModel}
								/>
							</TabsContent>

							<TabsContent value="upscale" className="h-full">
								<Upscale
									onGenerate={handleGenerateImages}
									isGenerating={isGenerating}
								/>
							</TabsContent>
						</div>

						<div className="fixed left-0 right-0 bottom-16 z-10 px-4">
							<div className="max-w-md mx-auto">
								<div className="bg-card rounded-lg shadow-lg border">
									<TabsList className="grid w-full grid-cols-3">
										<TabsTrigger value="text2img">{t('text2img')}</TabsTrigger>
										<TabsTrigger value="img2img">{t('img2img')}</TabsTrigger>
										<TabsTrigger value="upscale">{t('upscale')}</TabsTrigger>
									</TabsList>
								</div>
							</div>
						</div>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}