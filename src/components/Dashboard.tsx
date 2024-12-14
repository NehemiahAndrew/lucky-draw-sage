import React from 'react';
import { Card } from '@/components/ui/card';
import ResultsTable from './ResultsTable';
import NumberFrequency from './NumberFrequency';
import PredictionGenerator from './PredictionGenerator';
import RecentDraws from './RecentDraws';
import { DataScraper } from './DataScraper';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary mb-8">49ja Prediction Dashboard</h1>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Data Scraper</h2>
        <DataScraper />
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Draws</h2>
          <RecentDraws />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Number Frequency</h2>
          <NumberFrequency />
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Historical Results</h2>
        <ResultsTable />
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Prediction Generator</h2>
        <PredictionGenerator />
      </Card>
    </div>
  );
};

export default Dashboard;