import FirecrawlApp from '@mendable/firecrawl-js';

interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class FirecrawlService {
  private static firecrawlApp: FirecrawlApp | null = null;

  static async crawlWebsite(apiKey: string, url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      console.log('Initializing crawl for URL:', url);
      this.firecrawlApp = new FirecrawlApp({ apiKey });

      const crawlResponse = await this.firecrawlApp.crawlUrl(url, {
        limit: 100,
        scrapeOptions: {
          formats: ['markdown', 'html'],
          timeout: 30000
        }
      }) as CrawlResponse;

      if (!crawlResponse.success) {
        console.error('Crawl failed:', (crawlResponse as ErrorResponse).error);
        return { 
          success: false, 
          error: (crawlResponse as ErrorResponse).error || 'Failed to crawl website' 
        };
      }

      console.log('Crawl successful:', crawlResponse);
      return { 
        success: true,
        data: crawlResponse 
      };
    } catch (error) {
      console.error('Error during crawl:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to Firecrawl API';
      if (errorMessage.includes('401')) {
        return {
          success: false,
          error: 'Invalid API key. Please check your API key and try again.'
        };
      }
      return { 
        success: false, 
        error: errorMessage
      };
    }
  }
}