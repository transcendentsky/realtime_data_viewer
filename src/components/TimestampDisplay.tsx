import type { FC } from 'react';
import { Clock } from 'lucide-react';

interface TimestampDisplayProps {
  timestamp: string | null;
}

const TimestampDisplay: FC<TimestampDisplayProps> = ({ timestamp }) => {
  return (
    <div className="my-6 p-4 bg-card rounded-lg shadow">
      <div className="flex items-center text-lg">
        <Clock className="w-6 h-6 mr-3 text-accent" />
        <span className="font-medium text-muted-foreground">Last Update:</span>
        <span className="ml-2 font-mono text-foreground">
          {timestamp || 'Waiting for data...'}
        </span>
      </div>
    </div>
  );
};

export default TimestampDisplay;
