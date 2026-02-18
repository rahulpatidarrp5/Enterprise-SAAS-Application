import React, { useEffect } from 'react';
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { ActivityFeed } from './ActivityFeed';
import { BarChart } from '../charts/BarChart';
import { useDashboardStore } from '../../store/useDashboardStore';

export const DashboardOverview: React.FC = () => {
  const { metrics, isLoading, fetchMetrics, chartData, activities, fetchChartData, fetchActivities } = useDashboardStore();

  useEffect(() => {
    fetchMetrics();
    fetchChartData();
    fetchActivities();
  }, [fetchMetrics, fetchChartData, fetchActivities]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={metrics ? formatNumber(metrics.totalUsers) : '0'}
          change={metrics?.growth}
          trend={metrics?.growth && metrics.growth > 0 ? 'up' : 'down'}
          icon={<Users className="w-4 h-4" />}
          description="from last month"
          loading={isLoading}
        />
        
        <MetricCard
          title="Active Users"
          value={metrics ? formatNumber(metrics.activeUsers) : '0'}
          change={metrics?.growth}
          trend={metrics?.growth && metrics.growth > 0 ? 'up' : 'down'}
          icon={<Activity className="w-4 h-4" />}
          description="currently online"
          loading={isLoading}
        />
        
        <MetricCard
          title="Revenue"
          value={metrics ? formatCurrency(metrics.revenue) : '$0'}
          change={metrics?.growth}
          trend={metrics?.growth && metrics.growth > 0 ? 'up' : 'down'}
          icon={<DollarSign className="w-4 h-4" />}
          description="this month"
          loading={isLoading}
        />
        
        <MetricCard
          title="Conversion Rate"
          value={metrics ? `${metrics.conversionRate}%` : '0%'}
          change={metrics?.growth}
          trend={metrics?.growth && metrics.growth > 0 ? 'up' : 'down'}
          icon={<TrendingUp className="w-4 h-4" />}
          description="avg. conversion"
          loading={isLoading}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BarChart data={chartData} title="Monthly Revenue" loading={isLoading} />
        <ActivityFeed activities={activities} loading={isLoading} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">New signups today</span>
              <span className="text-sm font-medium text-gray-900">+24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active sessions</span>
              <span className="text-sm font-medium text-gray-900">142</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Page views</span>
              <span className="text-sm font-medium text-gray-900">3,847</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg. load time</span>
              <span className="text-sm font-medium text-gray-900">1.2s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Uptime</span>
              <span className="text-sm font-medium text-green-600">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Error rate</span>
              <span className="text-sm font-medium text-gray-900">0.1%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Health
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">CPU Usage</span>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Memory</span>
              <span className="text-sm font-medium text-gray-900">62%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Storage</span>
              <span className="text-sm font-medium text-gray-900">28%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
