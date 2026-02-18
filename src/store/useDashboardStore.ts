import { create } from 'zustand';
import type { DashboardMetrics, ChartData, Activity, Notification } from '../types';

interface DashboardState {
  metrics: DashboardMetrics | null;
  chartData: ChartData[];
  activities: Activity[];
  notifications: Notification[];
  isLoading: boolean;
  fetchMetrics: () => Promise<void>;
  fetchChartData: () => Promise<void>;
  fetchActivities: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  markNotificationAsRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
}

const mockMetrics: DashboardMetrics = {
  totalUsers: 12847,
  activeUsers: 8932,
  revenue: 284750,
  growth: 12.5,
  conversionRate: 3.2,
};

const mockChartData: ChartData[] = [
  { name: 'Jan', value: 4000, change: 12, trend: 'up' },
  { name: 'Feb', value: 3000, change: -8, trend: 'down' },
  { name: 'Mar', value: 5000, change: 25, trend: 'up' },
  { name: 'Apr', value: 4500, change: 5, trend: 'up' },
  { name: 'May', value: 6000, change: 15, trend: 'up' },
  { name: 'Jun', value: 5500, change: -2, trend: 'down' },
];

const mockActivities: Activity[] = [
  {
    id: '1',
    user: 'Sarah Johnson',
    action: 'Created new project',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: 'create',
  },
  {
    id: '2',
    user: 'Mike Chen',
    action: 'Updated user settings',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: 'update',
  },
  {
    id: '3',
    user: 'Emily Davis',
    action: 'Deleted old reports',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: 'delete',
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'System Update',
    message: 'A new system update is available. Please review the changes.',
    type: 'info',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '2',
    title: 'Security Alert',
    message: 'Unusual login activity detected from a new device.',
    type: 'warning',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
];

export const useDashboardStore = create<DashboardState>((set, get) => ({
  metrics: null,
  chartData: [],
  activities: [],
  notifications: [],
  isLoading: false,

  fetchMetrics: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ metrics: mockMetrics, isLoading: false });
  },

  fetchChartData: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ chartData: mockChartData, isLoading: false });
  },

  fetchActivities: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ activities: mockActivities, isLoading: false });
  },

  fetchNotifications: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ notifications: mockNotifications, isLoading: false });
  },

  markNotificationAsRead: (id: string) => {
    const notifications = get().notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    set({ notifications });
  },

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    set(state => ({
      notifications: [newNotification, ...state.notifications],
    }));
  },
}));
