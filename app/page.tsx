import TikTokDownloader from '@/components/TikTokDownloader';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <TikTokDownloader />
      </div>
    </main>
  );
}