'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import AppHeader from '@/components/AppHeader';
import TimestampDisplay from '@/components/TimestampDisplay';
import DataCard from '@/components/DataCard';
import type { RealtimeData, MonitoredData } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Helper to generate random float in a range
const getRandomFloat = (min: number, max: number, decimals: number): number => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};

// Generates a new data sample
const generateMockData = (): RealtimeData => {
  const data: MonitoredData = {
    'A相电压': { value: getRandomFloat(218.0, 222.0, 2), unit: 'V' },
    'B相电压': { value: Math.random() > 0.8 ? getRandomFloat(215.0, 225.0, 2) : getRandomFloat(0.0, 5.0, 2), unit: 'V' },
    'C相电压': { value: Math.random() > 0.8 ? getRandomFloat(215.0, 225.0, 2) : getRandomFloat(0.0, 5.0, 2), unit: 'V' },
    'A相电流': { value: getRandomFloat(2.0, 2.0, 2), unit: 'A' },
    'B相电流': { value: Math.random() > 0.8 ? getRandomFloat(215.0, 225.0, 2) : getRandomFloat(0.0, 5.0, 2), unit: 'A' },
    'C相电流': { value: Math.random() > 0.8 ? getRandomFloat(215.0, 225.0, 2) : getRandomFloat(0.0, 5.0, 2), unit: 'A' },
    '总有功功率': { value: getRandomFloat(0.5, 10.0, 2), unit: 'kW' },
  };
  return {
    timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    data,
  };
};

export default function Home() {
  const [latestData, setLatestData] = useState<RealtimeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial data load
    const initialData = generateMockData();
    setLatestData(initialData);
    setIsLoading(false);

    // Simulate real-time updates
    const intervalId = setInterval(() => {
      setLatestData(generateMockData());
    }, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader title="Realtime Data Viewer" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <TimestampDisplay timestamp={latestData?.timestamp ?? null} />
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="shadow-lg bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-5 w-3/5" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-4/5 mb-2" />
                  <Skeleton className="h-4 w-1/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : latestData && latestData.data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {Object.entries(latestData.data).map(([key, value]) => (
              <DataCard key={key} label={key} data={value} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground mt-10">No data available.</p>
        )}
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground border-t border-border">
        <p>&copy; {new Date().getFullYear()} Realtime Data Viewer. All rights reserved.</p>
      </footer>
    </div>
  );
}
