import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import FirecrawlApp from '@mendable/firecrawl-js';

const API_KEY_STORAGE_KEY = 'firecrawl_api_key';

export const useFirecrawlKey = () => {
  const { toast } = useToast();
  const [isValidatingKey, setIsValidatingKey] = useState(false);

  const saveApiKey = (apiKey: string): void => {
    if (!apiKey || apiKey.trim() === '') {
      throw new Error('API key cannot be empty');
    }
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    console.log('API key saved successfully');
  };

  const getApiKey = (): string | null => {
    const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (!apiKey) {
      console.warn('No API key found in localStorage');
      return null;
    }
    return apiKey;
  };

  const validateApiKey = async (apiKey: string): Promise<boolean> => {
    setIsValidatingKey(true);
    try {
      const app = new FirecrawlApp({ apiKey });
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
    } finally {
      setIsValidatingKey(false);
    }
  };

  return {
    saveApiKey,
    getApiKey,
    validateApiKey,
    isValidatingKey
  };
};