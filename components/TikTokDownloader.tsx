'use client';

import { useState } from 'react';
import { UrlInput } from './UrlInput';
import { ResultCard } from './ResultCard';
import { TikTokResponse } from '@/types/tiktok';
import { toast } from 'sonner';

export default function TikTokDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TikTokResponse | null>(null);
  const [recentDownloads, setRecentDownloads] = useState<string[]>([]);

  const handleDownload = async () => {
    if (!url.trim()) {
      toast.error('Please enter a TikTok URL');
      return;
    }

    if (!url.includes('tiktok.com')) {
      toast.error('Please enter a valid TikTok URL');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://tikdownpro-o5z8mcgex-ryoevisu-s-projects.vercel.app/api/download?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!data.status) {
        throw new Error('Failed to fetch video');
      }

      setResult(data);
      setRecentDownloads((prev) => [url, ...prev].slice(0, 5));
      toast.success('Video fetched successfully!');
    } catch (error) {
      toast.error('Failed to download. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.includes('tiktok.com')) {
        setUrl(text);
        toast.success('URL pasted from clipboard');
      }
    } catch (error) {
      toast.error('Failed to read from clipboard');
    }
  };

  const clearHistory = () => {
    setRecentDownloads([]);
    toast.success('Download history cleared');
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
          TikTok Downloader
        </h1>
        <p className="text-muted-foreground">
          Download your favorite TikTok videos and audio tracks instantly
        </p>
      </div>

      <UrlInput
        url={url}
        setUrl={setUrl}
        loading={loading}
        onDownload={handleDownload}
        onPaste={handlePaste}
      />

      {result && (
        <ResultCard
          result={result}
          recentDownloads={recentDownloads}
          onClearHistory={clearHistory}
        />
      )}
    </div>
  );
}