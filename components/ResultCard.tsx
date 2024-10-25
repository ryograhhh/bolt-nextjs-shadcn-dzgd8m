'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TikTokResponse } from '@/types/tiktok';
import { Download, Music, Video, Trash2, History, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ResultCardProps {
  result: TikTokResponse;
  recentDownloads: string[];
  onClearHistory: () => void;
}

export function ResultCard({ result, recentDownloads, onClearHistory }: ResultCardProps) {
  const downloadFile = async (url: string, type: 'video' | 'audio') => {
    try {
      toast.promise(
        (async () => {
          const response = await fetch(url);
          const blob = await response.blob();
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = `tiktok-${type}-${Date.now()}.${type === 'video' ? 'mp4' : 'mp3'}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(downloadUrl);
        })(),
        {
          loading: `Downloading ${type}...`,
          success: `${type} downloaded successfully!`,
          error: `Failed to download ${type}`,
        }
      );
    } catch (error) {
      toast.error(`Failed to download ${type}`);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Video Title:</h3>
          <p className="text-sm text-muted-foreground">{result.title}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Button
            variant="default"
            onClick={() => downloadFile(result.video[0], 'video')}
            className="w-full"
          >
            <Video className="h-4 w-4 mr-2" />
            Download Video
          </Button>
          <Button
            variant="default"
            onClick={() => downloadFile(result.audio[0], 'audio')}
            className="w-full"
          >
            <Music className="h-4 w-4 mr-2" />
            Download Audio
          </Button>
        </div>

        {recentDownloads.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="history">
              <AccordionTrigger className="text-sm">
                <History className="h-4 w-4 mr-2" />
                Recent Downloads
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {recentDownloads.map((downloadUrl, index) => (
                    <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                      <span className="truncate flex-1 mr-2">{downloadUrl}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => window.open(downloadUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={onClearHistory}
                    className="w-full mt-2"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear History
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </Card>
  );
}