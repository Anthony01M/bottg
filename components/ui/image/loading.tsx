import React from 'react';

interface ImageLoadingProps {
	count?: number;
	size?: 'sm' | 'md' | 'lg';
}

export function ImageLoading({ count = 1, size = 'md' }: ImageLoadingProps) {
	const sizeClasses = {
		sm: 'h-24 w-24',
		md: 'h-32 w-32',
		lg: 'h-48 w-48'
	};

	const countArray = Array.from({ length: count }, (_, i) => i);

	return (
		<div className="grid grid-cols-2 gap-4">
			{countArray.map((index) => (
				<div
					key={index}
					className={`${sizeClasses[size]} rounded-lg overflow-hidden relative bg-muted`}
				>
					<div className="absolute inset-0 flex items-center justify-center">
						<svg
							className="animate-spin h-8 w-8 text-primary"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					</div>
					<div className="h-full w-full animate-pulse bg-gradient-to-r from-muted to-secondary opacity-75"></div>
				</div>
			))}
		</div>
	);
}

export function ProgressLoading({ percent = 0 }: { percent?: number }) {
	return (
		<div className="w-full bg-muted rounded-full h-2.5 mb-4">
			<div
				className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
				style={{ width: `${percent}%` }}
			></div>
			<div className="text-xs text-right mt-1 text-muted-foreground">
				{percent}% complete
			</div>
		</div>
	);
}