import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  BarChart3, 
  GitCompare, 
  FileText, 
  TrendingUp,
  Calendar,
  Users,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Upload,
      title: t('uploadTitle'),
      description: t('uploadDesc'),
      link: '/upload',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: BarChart3,
      title: t('visualizeTitle'),
      description: t('visualizeDesc'),
      link: '/category/health',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: GitCompare,
      title: t('compareTitle'),
      description: t('compareDesc'),
      link: '/compare',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: FileText,
      title: t('rtiTitle'),
      description: t('rtiDesc'),
      link: '/rti',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const recentUploads = [
    { name: 'Tamil Nadu Health Budget 2024', date: '2 hours ago', category: 'Health' },
    { name: 'Maharashtra Education Statistics', date: '5 hours ago', category: 'Education' },
    { name: 'Karnataka Agriculture Report', date: '1 day ago', category: 'Agriculture' }
  ];

  const trendingDatasets = [
    { name: 'COVID-19 Vaccination Data', views: '15.2K', category: 'Health' },
    { name: 'PM-KISAN Beneficiary List', views: '12.8K', category: 'Agriculture' },
    { name: 'School Infrastructure Report', views: '9.5K', category: 'Education' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                {t('appTitle')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
              {t('subtitle')}
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('transparencyDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/upload"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center"
              >
                {t('getStarted')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/category/health"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                {t('learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('featuresTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools for data transparency and civic engagement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Recent Uploads */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  {t('recentUploads')}
                </h3>
                <Link
                  to="/upload"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  {t('viewAll')}
                </Link>
              </div>
              <div className="space-y-4">
                {recentUploads.map((upload, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{upload.name}</p>
                      <p className="text-sm text-gray-500">{upload.date} • {upload.category}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Datasets */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  {t('trendingDatasets')}
                </h3>
                <Link
                  to="/category/health"
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  {t('viewAll')}
                </Link>
              </div>
              <div className="space-y-4">
                {trendingDatasets.map((dataset, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{dataset.name}</p>
                      <p className="text-sm text-gray-500">
                        <Users className="inline h-3 w-3 mr-1" />
                        {dataset.views} views • {dataset.category}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Impact Through Transparency
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">2.5M+</div>
                <div className="text-orange-100">Documents Processed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">50K+</div>
                <div className="text-orange-100">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">1,200+</div>
                <div className="text-orange-100">RTI Requests</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">28</div>
                <div className="text-orange-100">States Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;