import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Card } from "@/components/ui/card";

export const DataScraper = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrapedData, setScrapedData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    
    try {
      const result = await FirecrawlService.crawlWebsite(url);
      
      if (result.success) {
        setScrapedData(result.data);
        toast({
          title: "Success",
          description: "Website data scraped successfully",
          duration: 3000,
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to scrape website",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error scraping website:', error);
      toast({
        title: "Error",
        description: "Failed to scrape website",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium">
            49ja Website URL
          </label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the 49ja website URL"
            required
          />
        </div>
        
        {isLoading && (
          <Progress value={progress} className="w-full" />
        )}
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Scraping Data..." : "Start Scraping"}
        </Button>
      </form>

      {scrapedData && (
        <Card className="mt-6 p-4">
          <h3 className="text-lg font-semibold mb-2">Scraped Data</h3>
          <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60 text-sm">
            {JSON.stringify(scrapedData, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
};