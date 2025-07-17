import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  MapPin, 
  Filter,
  Download,
  Eye,
  Calendar
} from 'lucide-react';
import DataVisualization from '../components/DataVisualization';
import InteractiveMap from '../components/InteractiveMap';
import { useLanguage } from '../contexts/LanguageContext';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');

  const categoryData = {
    health: {
      title: 'Health Infrastructure & Services',
      description: 'Comprehensive health data including hospitals, PHCs, vaccination coverage, and budget allocation',
      icon: '🏥',
      color: 'from-red-500 to-pink-500',
      stats: [
        { label: 'Public Hospitals', value: '25,778', change: '+5.2%' },
        { label: 'Hospital Beds', value: '7.13L', change: '+3.8%' },
        { label: 'PHCs', value: '30,045', change: '+2.1%' },
        { label: 'Doctors', value: '5.2L', change: '+7.3%' }
      ]
    },
    sanitation: {
      title: 'Sanitation & Hygiene',
      description: 'Water supply, sewage treatment, waste management, and Swachh Bharat Mission progress',
      icon: '🚰',
      color: 'from-blue-500 to-cyan-500',
      stats: [
        { label: 'Toilet Coverage', value: '98.6%', change: '+2.1%' },
        { label: 'Waste Processing', value: '70%', change: '+5.4%' },
        { label: 'Water Supply', value: '83.2%', change: '+1.8%' },
        { label: 'Open Defecation Free', value: '95.1%', change: '+0.9%' }
      ]
    },
    budget: {
      title: 'Government Budget & Spending',
      description: 'State and central budget allocation, expenditure tracking, and scheme-wise spending analysis',
      icon: '💰',
      color: 'from-green-500 to-emerald-500',
      stats: [
        { label: 'Total Budget', value: '₹47.66L Cr', change: '+12.3%' },
        { label: 'Capital Expenditure', value: '₹10.68L Cr', change: '+15.2%' },
        { label: 'Health Allocation', value: '₹2.73L Cr', change: '+8.7%' },
        { label: 'Education Allocation', value: '₹1.12L Cr', change: '+6.4%' }
      ]
    },
    education: {
      title: 'Education System Performance',
      description: 'School enrollment, literacy rates, infrastructure, teacher-student ratio, and learning outcomes',
      icon: '📚',
      color: 'from-purple-500 to-indigo-500',
      stats: [
        { label: 'Gross Enrollment', value: '98.2%', change: '+1.5%' },
        { label: 'Literacy Rate', value: '77.7%', change: '+0.8%' },
        { label: 'Schools', value: '14.89L', change: '+2.3%' },
        { label: 'Teachers', value: '95.1L', change: '+4.1%' }
      ]
    },
    agriculture: {
      title: 'Agriculture & Rural Development',
      description: 'Crop production, irrigation, farmer welfare schemes, and agricultural technology adoption',
      icon: '🌾',
      color: 'from-yellow-500 to-orange-500',
      stats: [
        { label: 'Cropped Area', value: '198.4M Ha', change: '+1.2%' },
        { label: 'Irrigation Coverage', value: '52.6%', change: '+3.1%' },
        { label: 'PM-KISAN Beneficiaries', value: '11.77 Cr', change: '+2.8%' },
        { label: 'Food Production', value: '329.7M T', change: '+4.2%' }
      ]
    },
    welfare: {
      title: 'Women & Child Welfare',
      description: 'Maternal health, child nutrition, women empowerment programs, and social security schemes',
      icon: '👩‍👧‍👦',
      color: 'from-pink-500 to-rose-500',
      stats: [
        { label: 'ICDS Centers', value: '13.6L', change: '+1.9%' },
        { label: 'Institutional Births', value: '89.4%', change: '+2.3%' },
        { label: 'Jan Aushadhi Kendras', value: '9,300', change: '+18.2%' },
        { label: 'SHG Members', value: '6.9 Cr', change: '+5.7%' }
      ]
    }
  };

  const currentCategory = categoryData[categoryId as keyof typeof categoryData];

  if (!currentCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
          <p className="text-gray-600">The requested category does not exist.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'charts', label: 'Charts', icon: PieChart },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'map', label: 'Geographic', icon: MapPin }
  ];

  const states = [
    { value: 'all', label: 'All States' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'rajasthan', label: 'Rajasthan' }
  ];

  const years = ['2024', '2023', '2022', '2021', '2020'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${currentCategory.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{currentCategory.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {currentCategory.title}
              </h1>
              <p className="text-lg opacity-90">
                {currentCategory.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentCategory.stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <div className="ml-auto flex items-center space-x-2">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </button>
              <button className="flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200">
                <Eye className="h-4 w-4 mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                      ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Overview</h3>
                <DataVisualization category={categoryId!} type="overview" />
              </div>
            )}

            {activeTab === 'charts' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistical Charts</h3>
                <DataVisualization category={categoryId!} type="charts" />
              </div>
            )}

            {activeTab === 'trends' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Analysis</h3>
                <DataVisualization category={categoryId!} type="trends" />
              </div>
            )}

            {activeTab === 'map' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
                <InteractiveMap category={categoryId!} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;