'use client'

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/language-context";
import { ImageLoading, ProgressLoading } from "@/components/ui/image/loading";

export function Generator() {
  const { t } = useLanguage()
  const [modelSize, setModelSize] = useState('512x512')
  const [imageCount, setImageCount] = useState(1)
  const [prompt, setPrompt] = useState('')
  const [generationModel, setGenerationModel] = useState('stable-diffusion')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const handleGenerateImages = () => {
	setIsGenerating(true)
	setGenerationProgress(0)

	const interval = setInterval(() => {
	  setGenerationProgress(prev => {
		if (prev >= 95) {
		  clearInterval(interval)
		  return prev
		}
		return prev + Math.floor(Math.random() * 10) + 1
	  })
	}, 500)

	setTimeout(() => {
	  setIsGenerating(false)
	  setGenerationProgress(100)
	  clearInterval(interval)

	  setTimeout(() => {
		setGenerationProgress(0)
	  }, 1000)

	}, 5000 + Math.random() * 3000)
  }

  return (
	<div className="p-4">
	  <Card>
		<CardContent className="p-6">
		  <h3 className="text-xl font-semibold mb-4">{t('imageGenerator')}</h3>
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
			  <label className="block text-sm font-medium mb-1">{t('generationModel')}</label>
			  <Select
				value={generationModel}
				onValueChange={setGenerationModel}
				disabled={isGenerating}
			  >
				<SelectTrigger className="w-full">
				  <SelectValue placeholder={t('selectModel')} />
				</SelectTrigger>
				<SelectContent>
				  <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
				  <SelectItem value="dall-e">DALL-E</SelectItem>
				  <SelectItem value="midjourney">Midjourney</SelectItem>
				</SelectContent>
			  </Select>
			</div>
			<div>
			  <label className="block text-sm font-medium mb-1">{t('modelSize')}</label>
			  <Select
				value={modelSize}
				onValueChange={setModelSize}
				disabled={isGenerating}
			  >
				<SelectTrigger className="w-full">
				  <SelectValue placeholder={t('selectSize')} />
				</SelectTrigger>
				<SelectContent>
				  <SelectItem value="256x256">256x256</SelectItem>
				  <SelectItem value="512x512">512x512</SelectItem>
				  <SelectItem value="1024x1024">1024x1024</SelectItem>
				</SelectContent>
			  </Select>
			</div>
			<div>
			  <label className="block text-sm font-medium mb-1">{t('imageCount')}: {imageCount}</label>
			  <Slider
				value={[imageCount]}
				onValueChange={(value) => setImageCount(value[0])}
				max={4}
				step={1}
				className="w-full"
				disabled={isGenerating}
			  />
			</div>

			{generationProgress > 0 && (
			  <ProgressLoading percent={generationProgress} />
			)}

			{isGenerating ? (
			  <div className="mt-6">
				<p className="text-sm text-center mb-4 text-muted-foreground">
				  {t('generatingImages')}...
				</p>
				<ImageLoading count={imageCount} />
			  </div>
			) : (
			  <Button
				className="w-full"
				disabled={!prompt || isGenerating}
				onClick={handleGenerateImages}
			  >
				{t('createImage')}
			  </Button>
			)}
		  </div>
		</CardContent>
	  </Card>
	</div>
  )
}