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
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';
  private static firecrawlApp: FirecrawlApp | null = null;

  static saveApiKey(apiKey: string): void {
    if (!apiKey || apiKey.trim() === '') {
      throw new Error('API key cannot be empty');
    }
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    this.firecrawlApp = new FirecrawlApp({ apiKey });
    console.log('API key saved successfully');
  }

  static getApiKey(): string | null {
    const apiKey = localStorage.getItem(this.API_KEY_STORAGE_KEY);
    if (!apiKey) {
      console.warn('No API key found in localStorage');
      return null;
    }
    return apiKey;
  }

  static async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      const app = new FirecrawlApp({ apiKey });
      // Make a minimal test request
      const testResponse = await app.crawlUrl('https://example.com', {
        limit: 1,
        scrapeOptions: {
          formats: ['html']
        }
      });
      return testResponse.success;
    } catch (error) {
      console.error('API key validation failed:', error);
      return false;
    }
  }

  static async crawlWebsite(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      console.error('No API key found');
      return { success: false, error: 'API key not found. Please set your API key first.' };
    }

    try {
      console.log('Initializing crawl for URL:', url);
      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const crawlResponse = await this.firecrawlApp.crawlUrl(url, {
        limit: 100,
        scrapeOptions: {
          formats: ['markdown', 'html'],
          timeout: 30000 // 30 seconds timeout
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