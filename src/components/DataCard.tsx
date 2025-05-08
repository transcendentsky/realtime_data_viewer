'use client';

import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DataValue } from '@/types';
import { Zap, Activity, AlertTriangle } from 'lucide-react';

interface DataCardProps {
  label: string;
  data: DataValue;
}

const getIconForLabel = (label: string): React.ReactNode => {
  if (label.includes('电压')) { // Voltage
    return <Zap className="w-5 h-5 text-accent" />;
  }
  if (label.includes('功率')) { // Power
    return <Activity className="w-5 h-5 text-accent" />;
  }
  return <AlertTriangle className="w-5 h-5 text-muted-foreground" />; // Default icon
};

const DataCard: FC<DataCardProps> = ({ label, data }) => {
  const [isPulsing, setIsPulsing] = useState(false);
  const prevValueRef = React.useRef<number>();

  useEffect(() => {
    if (prevValueRef.current !== undefined && prevValueRef.current !== data.value) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 300); // Duration of the pulse animation
      return () => clearTimeout(timer);
    }
    prevValueRef.current = data.value;
  }, [data.value]);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        {getIconForLabel(label)}
      </CardHeader>
      <CardContent>
        <div 
          className={`text-3xl font-bold transition-all duration-300 ease-in-out ${isPulsing ? 'text-accent scale-105' : 'text-foreground scale-100'}`}
        >
          {data.value.toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{data.unit}</p>
      </CardContent>
    </Card>
  );
};

export default DataCard;
