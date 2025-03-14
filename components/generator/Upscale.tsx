import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageLoading } from "@/components/ui/image/loading";
import { useLanguage } from "@/lib/language-context";
import { Upload } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface UpscaleProps {
  onGenerate: (settings: any) => void;
  isGenerating: boolean;
}

export function Upscale({ onGenerate, isGenerating }: UpscaleProps) {
  const { t } = useLanguage();
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [upscaleFactor, setUpscaleFactor] = useState<'2x' | '4x'>('2x');
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSourceImage(file);
      
      // Create preview
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
      upscaleFactor
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
            <p className="text-sm text-muted-foreground">Upload image to upscale</p>
          </div>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Upscale Factor</label>
        <RadioGroup 
          value={upscaleFactor} 
          onValueChange={(value: '2x' | '4x') => setUpscaleFactor(value)}
          className="flex space-x-4"
          disabled={isGenerating}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2x" id="r1" />
            <Label htmlFor="r1">2x</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4x" id="r2" />
            <Label htmlFor="r2">4x</Label>
          </div>
        </RadioGroup>
      </div>

      {isGenerating ? (
        <div className="mt-6">
          <ImageLoading count={1} />
        </div>
      ) : (
        <Button
          className="w-full"
          disabled={!sourceImage || isGenerating}
          onClick={handleGenerate}
        >
          Upscale Image
        </Button>
      )}
    </div>
  );
}