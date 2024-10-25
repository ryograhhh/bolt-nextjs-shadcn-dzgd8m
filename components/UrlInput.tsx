'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Clipboard } from 'lucide-react';

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  loading: boolean;
  onDownload: () => void;
  onPaste: () => void;
}

export function UrlInput({ url, setUrl, loading, onDownload, onPaste }: UrlInputProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <Input
          placeholder="Paste TikTok URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="pr-10"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={onPaste}
        >
          <Clipboard className="h-4 w-4" />
        </Button>
      </div>
      <Button
        onClick={onDownload}
        disabled={loading}
        className="min-w-[120px]"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4 mr-2" />
        )}
        {loading ? 'Loading...' : 'Download'}
      </Button>
    </div>
  );
}