import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const DataScraper = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrapedData, setScrapedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isValidatingKey, setIsValidatingKey] = useState(false);

  const handleApiKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) return;

    setIsValidatingKey(true);
    try {
      const isValid = await FirecrawlService.validateApiKey(apiKey);
      if (isValid) {
        FirecrawlService.saveApiKey(apiKey);
        toast({
          title: "Success",
          description: "API key validated and saved successfully",
          duration: 3000,
        });
        setApiKey('');
      } else {
        toast({
          title: "Error",
          description: "Invalid API key. Please check and try again.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate API key",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsValidatingKey(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    setError(null);
    setScrapedData(null);
    
    try {
      const savedApiKey = FirecrawlService.getApiKey();
      if (!savedApiKey) {
        setError("Please set your API key first");
        return;
      }

      console.log('Starting scrape for URL:', url);
      const result = await FirecrawlService.crawlWebsite(url);
      
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
      <form onSubmit={handleApiKeySubmit} className="space-y-4 mb-8">
        <div className="space-y-2">
          <label htmlFor="apiKey" className="text-sm font-medium">
            Firecrawl API Key
          </label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Firecrawl API key"
          />
        </div>
        <Button type="submit" disabled={!apiKey || isValidatingKey}>
          {isValidatingKey ? "Validating..." : "Save API Key"}
        </Button>
      </form>

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

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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