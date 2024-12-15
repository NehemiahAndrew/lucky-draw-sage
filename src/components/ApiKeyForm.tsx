import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFirecrawlKey } from '@/hooks/useFirecrawlKey';

export const ApiKeyForm = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const { validateApiKey, saveApiKey, isValidatingKey } = useFirecrawlKey();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) return;

    try {
      const isValid = await validateApiKey(apiKey);
      if (isValid) {
        saveApiKey(apiKey);
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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
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
  );
};