import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import type { ChartData } from '../../types';

interface BarChartProps {
  data: ChartData[];
  title: string;
  loading?: boolean;
}

export const BarChart = memo<BarChartProps>(({ data, title, loading = false }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-16 text-sm font-medium text-gray-600 flex-shrink-0">
                {item.name}
              </div>
              <div className="flex-1 relative min-w-0">
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div
                    className="bg-primary-600 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-500 min-w-fit"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium whitespace-nowrap">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              {item.change && (
                <div className="flex items-center gap-1 text-sm flex-shrink-0">
                  {item.trend === 'up' && (
                    <span className="text-green-600">↑</span>
                  )}
                  {item.trend === 'down' && (
                    <span className="text-red-600">↓</span>
                  )}
                  <span className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {Math.abs(item.change)}%
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

BarChart.displayName = 'BarChart';
