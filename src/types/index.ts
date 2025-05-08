export interface DataValue {
  value: number;
  unit: string;
}

export interface MonitoredData {
  [key: string]: DataValue;
}

export interface RealtimeData {
  timestamp: string;
  data: MonitoredData;
}
