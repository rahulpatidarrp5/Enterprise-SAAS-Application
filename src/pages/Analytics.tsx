import React, { useEffect } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BarChart } from '../components/charts/BarChart';
import { useDashboardStore } from '../store/useDashboardStore';

export const Analytics: React.FC = () => {
  const { chartData, isLoading, fetchChartData } = useDashboardStore();

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const analyticsData = [
    { name: 'Jan', value: 4000, change: 12, trend: 'up' as const },
    { name: 'Feb', value: 3000, change: -8, trend: 'down' as const },
    { name: 'Mar', value: 5000, change: 25, trend: 'up' as const },
    { name: 'Apr', value: 4500, change: 5, trend: 'up' as const },
    { name: 'May', value: 6000, change: 15, trend: 'up' as const },
    { name: 'Jun', value: 5500, change: -2, trend: 'down' as const },
  ];

  const userGrowthData = [
    { name: 'Jan', value: 1200, change: 8, trend: 'up' as const },
    { name: 'Feb', value: 1450, change: 12, trend: 'up' as const },
    { name: 'Mar', value: 1680, change: 15, trend: 'up' as const },
    { name: 'Apr', value: 1890, change: 10, trend: 'up' as const },
    { name: 'May', value: 2100, change: 8, trend: 'up' as const },
    { name: 'Jun', value: 2350, change: 5, trend: 'up' as const },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BarChart3 className="w-4 h-4" />
          Last 6 months
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$284,750</p>
                <p className="text-sm text-green-600">+12.5%</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">8,932</p>
                <p className="text-sm text-green-600">+15.2%</p>
              </div>
              <Users className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">3.2%</p>
                <p className="text-sm text-green-600">+0.8%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Session</p>
                <p className="text-2xl font-bold text-gray-900">4m 32s</p>
                <p className="text-sm text-red-600">-12s</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart data={analyticsData} title="Revenue Trend" loading={isLoading} />
        <BarChart data={userGrowthData} title="User Growth" loading={isLoading} />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Direct</span>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Organic Search</span>
                <span className="text-sm font-medium">28%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Social Media</span>
                <span className="text-sm font-medium">18%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Referral</span>
                <span className="text-sm font-medium">12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Desktop</span>
                <span className="text-sm font-medium">58%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Mobile</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tablet</span>
                <span className="text-sm font-medium">7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">/dashboard</span>
                <span className="text-sm font-medium">3,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">/analytics</span>
                <span className="text-sm font-medium">2,156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">/reports</span>
                <span className="text-sm font-medium">1,892</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
