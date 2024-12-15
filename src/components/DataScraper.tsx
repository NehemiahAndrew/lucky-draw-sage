import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ApiKeyForm } from './ApiKeyForm';
import { useFirecrawlKey } from '@/hooks/useFirecrawlKey';
import { Loader2 } from "lucide-react";

export const DataScraper = () => {
  const { toast } = useToast();
  const { getApiKey } = useFirecrawlKey();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrapedData, setScrapedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    setError(null);
    setScrapedData(null);
    
    try {
      const apiKey = getApiKey();
      if (!apiKey) {
        setError("Please set your API key first");
        return;
      }

      const result = await FirecrawlService.crawlWebsite(apiKey, url);
      
      if (result.success) {
        setScrapedData(result.data);
        toast({
          title: "Success",
          description: "Website data scraped successfully",
          duration: 3000,
        });
      } else {
        setError(result.error || "Failed to scrape website");
        toast({
          title: "Error",
          description: result.error || "Failed to scrape website",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to scrape website";
      console.error('Error scraping website:', error);
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
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
      <ApiKeyForm />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium">
            Website URL
          </label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the website URL"
            required
          />
        </div>
        
        {isLoading && (
          <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Scraping data...</span>
            </div>
          </div>
        )}
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Scraping Data..." : "Start Scraping"}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {scrapedData && (
        <Card className="mt-6 p-4">
          <h3 className="text-lg font-semibold mb-2">Scraped Data</h3>
          <div className="space-y-2">
            {scrapedData.status && (
              <p className="text-sm">Status: {scrapedData.status}</p>
            )}
            {scrapedData.completed && (
              <p className="text-sm">Pages Completed: {scrapedData.completed}</p>
            )}
            {scrapedData.total && (
              <p className="text-sm">Total Pages: {scrapedData.total}</p>
            )}
            {scrapedData.creditsUsed && (
              <p className="text-sm">Credits Used: {scrapedData.creditsUsed}</p>
            )}
            {scrapedData.data && (
              <div className="mt-4">
                <p className="font-semibold text-sm mb-2">Content:</p>
                <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60 text-sm">
                  {JSON.stringify(scrapedData.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};