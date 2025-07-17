import React, { useState } from 'react';
import { GitCompare, Download, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import DataVisualization from '../components/DataVisualization';
import { useLanguage } from '../contexts/LanguageContext';

const ComparisonPage: React.FC = () => {
  const { t } = useLanguage();
  const [comparisonType, setComparisonType] = useState('regions');
  const [selectedCategory, setSelectedCategory] = useState('health');
  const [selectedRegion1, setSelectedRegion1] = useState('tamil-nadu');
  const [selectedRegion2, setSelectedRegion2] = useState('karnataka');
  const [selectedYear1, setSelectedYear1] = useState('2024');
  const [selectedYear2, setSelectedYear2] = useState('2023');

  const regions = [
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'west-bengal', label: 'West Bengal' }
  ];

  const categories = [
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' },
    { value: 'sanitation', label: 'Sanitation' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'budget', label: 'Budget' },
    { value: 'welfare', label: 'Women & Child Welfare' }
  ];

  const years = ['2024', '2023', '2022', '2021', '2020'];

  // Mock comparison data
  const getComparisonData = () => {
    if (comparisonType === 'regions') {
      return {
        'tamil-nadu': {
          health: {
            hospitals: 2456,
            beds: 89000,
            doctors: 12500,
            budget: 15600,
            coverage: 78.5
          },
          education: {
            schools: 45600,
            enrollment: 94.2,
            literacy: 80.1,
            teachers: 285000,
            infrastructure: 72.3
          }
        },
        'karnataka': {
          health: {
            hospitals: 2180,
            beds: 76000,
            doctors: 11200,
            budget: 14200,
            coverage: 76.8
          },
          education: {
            schools: 52400,
            enrollment: 91.8,
            literacy: 77.2,
            teachers: 295000,
            infrastructure: 68.9
          }
        }
      };
    } else {
      return {
        '2024': {
          health: {
            hospitals: 2456,
            beds: 89000,
            doctors: 12500,
            budget: 15600,
            coverage: 78.5
          }
        },
        '2023': {
          health: {
            hospitals: 2380,
            beds: 86500,
            doctors: 11800,
            budget: 14200,
            coverage: 76.2
          }
        }
      };
    }
  };

  const comparisonData = getComparisonData();

  const getMetricData = (region: string, category: string) => {
    return comparisonData[region as keyof typeof comparisonData]?.[category as keyof typeof comparisonData[keyof typeof comparisonData]] || {};
  };

  const calculateChange = (value1: number, value2: number) => {
    const change = ((value1 - value2) / value2) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'same',
      color: change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
    };
  };

  const renderMetricComparison = (metric: string, label: string, unit: string = '') => {
    let data1, data2;
    
    if (comparisonType === 'regions') {
      data1 = getMetricData(selectedRegion1, selectedCategory);
      data2 = getMetricData(selectedRegion2, selectedCategory);
    } else {
      data1 = getMetricData(selectedYear1, selectedCategory);
      data2 = getMetricData(selectedYear2, selectedCategory);
    }

    const value1 = data1[metric] || 0;
    const value2 = data2[metric] || 0;
    const change = calculateChange(value1, value2);

    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">{label}</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {comparisonType === 'regions' ? regions.find(r => r.value === selectedRegion1)?.label : selectedYear1}
            </span>
            <span className="text-lg font-semibold text-gray-900">
              {value1.toLocaleString()}{unit}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {comparisonType === 'regions' ? regions.find(r => r.value === selectedRegion2)?.label : selectedYear2}
            </span>
            <span className="text-lg font-semibold text-gray-900">
              {value2.toLocaleString()}{unit}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Difference</span>
              <span className={`flex items-center text-sm font-medium ${change.color}`}>
                {change.direction === 'up' && <TrendingUp className="h-4 w-4 mr-1" />}
                {change.direction === 'down' && <TrendingDown className="h-4 w-4 mr-1" />}
                {change.direction === 'same' && <Minus className="h-4 w-4 mr-1" />}
                {change.value}%
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <GitCompare className="h-8 w-8 mr-3 text-blue-600" />
            Data Comparison Tool
          </h1>
          <p className="text-lg text-gray-600">
            Compare government data across regions or time periods to identify trends and patterns
          </p>
        </div>

        {/* Comparison Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Comparison Type */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison Type</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="regions"
                    checked={comparisonType === 'regions'}
                    onChange={(e) => setComparisonType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-gray-700">Compare Different Regions</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="years"
                    checked={comparisonType === 'years'}
                    onChange={(e) => setComparisonType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-gray-700">Compare Different Years</span>
                </label>
              </div>
            </div>

            {/* Parameters */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Parameters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {comparisonType === 'regions' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Region 1</label>
                      <select
                        value={selectedRegion1}
                        onChange={(e) => setSelectedRegion1(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {regions.map((region) => (
                          <option key={region.value} value={region.value}>
                            {region.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Region 2</label>
                      <select
                        value={selectedRegion2}
                        onChange={(e) => setSelectedRegion2(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {regions.map((region) => (
                          <option key={region.value} value={region.value}>
                            {region.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year 1</label>
                      <select
                        value={selectedYear1}
                        onChange={(e) => setSelectedYear1(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year 2</label>
                      <select
                        value={selectedYear2}
                        onChange={(e) => setSelectedYear2(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <Download className="h-4 w-4 mr-2" />
              Export Comparison Report
            </button>
          </div>
        </div>

        {/* Comparison Results */}
        <div className="space-y-8">
          {/* Key Metrics Comparison */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Metrics Comparison</h3>
            
            {selectedCategory === 'health' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderMetricComparison('hospitals', 'Total Hospitals')}
                {renderMetricComparison('beds', 'Hospital Beds')}
                {renderMetricComparison('doctors', 'Doctors')}
                {renderMetricComparison('budget', 'Budget Allocation', ' Cr')}
                {renderMetricComparison('coverage', 'Coverage', '%')}
              </div>
            )}

            {selectedCategory === 'education' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderMetricComparison('schools', 'Total Schools')}
                {renderMetricComparison('enrollment', 'Enrollment Rate', '%')}
                {renderMetricComparison('literacy', 'Literacy Rate', '%')}
                {renderMetricComparison('teachers', 'Teachers')}
                {renderMetricComparison('infrastructure', 'Infrastructure Score', '%')}
              </div>
            )}
          </div>

          {/* Visual Comparison */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Visual Comparison</h3>
            <DataVisualization 
              category={selectedCategory} 
              type="comparison" 
              comparisonData={{
                type: comparisonType,
                regions: comparisonType === 'regions' ? [selectedRegion1, selectedRegion2] : undefined,
                years: comparisonType === 'years' ? [selectedYear1, selectedYear2] : undefined
              }}
            />
          </div>

          {/* Summary Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-gray-900 mb-2">Performance Leader</h4>
                <p className="text-sm text-gray-600">
                  {comparisonType === 'regions' 
                    ? `${regions.find(r => r.value === selectedRegion1)?.label} shows stronger performance in hospital infrastructure with 12% more beds per capita.`
                    : `${selectedYear1} shows significant improvement over ${selectedYear2} with 8.5% increase in healthcare coverage.`
                  }
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-gray-900 mb-2">Areas for Improvement</h4>
                <p className="text-sm text-gray-600">
                  {comparisonType === 'regions'
                    ? `Both regions could benefit from increased doctor-to-population ratios to meet WHO standards.`
                    : `Continued focus on rural healthcare infrastructure development is needed for sustained growth.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;