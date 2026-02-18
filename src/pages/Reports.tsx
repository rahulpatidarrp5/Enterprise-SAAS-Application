import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, TrendingDown, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface Report {
  id: string;
  name: string;
  type: 'financial' | 'user' | 'performance' | 'sales';
  description: string;
  generatedDate: string;
  status: 'completed' | 'generating' | 'scheduled';
  downloads: number;
  trend: number;
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Revenue Report',
    type: 'financial',
    description: 'Comprehensive analysis of monthly revenue trends and projections',
    generatedDate: '2024-01-15',
    status: 'completed',
    downloads: 145,
    trend: 12.5,
  },
  {
    id: '2',
    name: 'User Engagement Analysis',
    type: 'user',
    description: 'Detailed user behavior and engagement metrics',
    generatedDate: '2024-01-14',
    status: 'completed',
    downloads: 89,
    trend: -5.2,
  },
  {
    id: '3',
    name: 'System Performance Report',
    type: 'performance',
    description: 'Server performance and uptime statistics',
    generatedDate: '2024-01-13',
    status: 'generating',
    downloads: 67,
    trend: 8.1,
  },
  {
    id: '4',
    name: 'Sales Quarterly Review',
    type: 'sales',
    description: 'Q4 sales performance and market analysis',
    generatedDate: '2024-01-12',
    status: 'completed',
    downloads: 234,
    trend: 15.3,
  },
  {
    id: '5',
    name: 'Customer Satisfaction Survey',
    type: 'user',
    description: 'Annual customer satisfaction and feedback analysis',
    generatedDate: '2024-01-10',
    status: 'scheduled',
    downloads: 156,
    trend: -2.1,
  },
];

export const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'financial': return 'bg-green-100 text-green-800';
      case 'user': return 'bg-blue-100 text-blue-800';
      case 'performance': return 'bg-purple-100 text-purple-800';
      case 'sales': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalDownloads = reports.reduce((sum, report) => sum + report.downloads, 0);
  const completedReports = reports.filter(r => r.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedReports}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">{totalDownloads}</p>
              </div>
              <Download className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              <option value="financial">Financial</option>
              <option value="user">User</option>
              <option value="performance">Performance</option>
              <option value="sales">Sales</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="generating">Generating</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(report.type)}`}>
                  {report.type}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Generated</span>
                  <span className="text-sm text-gray-900">{report.generatedDate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Downloads</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-900">{report.downloads}</span>
                    {report.trend !== 0 && (
                      <div className="flex items-center">
                        {report.trend > 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600" />
                        )}
                        <span className={`text-xs ${report.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {Math.abs(report.trend)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
