import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface DataVisualizationProps {
  category: string;
  type: 'overview' | 'charts' | 'trends' | 'comparison';
  comparisonData?: {
    type: 'regions' | 'years';
    regions?: string[];
    years?: string[];
  };
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ category, type, comparisonData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, getChartConfig());
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [category, type, comparisonData]);

  const getChartConfig = () => {
    const baseConfig = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        tooltip: {
          mode: 'index' as const,
          intersect: false,
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
          },
        },
      },
    };

    if (type === 'overview') {
      return {
        type: 'doughnut' as const,
        data: getOverviewData(),
        options: {
          ...baseConfig,
          scales: {}, // Doughnut charts don't use scales
        },
      };
    } else if (type === 'charts') {
      return {
        type: 'bar' as const,
        data: getBarChartData(),
        options: baseConfig,
      };
    } else if (type === 'trends') {
      return {
        type: 'line' as const,
        data: getTrendData(),
        options: {
          ...baseConfig,
          interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false,
          },
        },
      };
    } else if (type === 'comparison') {
      return {
        type: 'bar' as const,
        data: getComparisonChartData(),
        options: {
          ...baseConfig,
          plugins: {
            ...baseConfig.plugins,
            title: {
              display: true,
              text: `${category.charAt(0).toUpperCase() + category.slice(1)} Comparison`,
            },
          },
        },
      };
    }

    return {
      type: 'bar' as const,
      data: getBarChartData(),
      options: baseConfig,
    };
  };

  const getOverviewData = () => {
    const categoryData = {
      health: {
        labels: ['Hospitals', 'PHCs', 'CHCs', 'Sub-Centers'],
        data: [25778, 30045, 5624, 158417],
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
      education: {
        labels: ['Primary Schools', 'Secondary Schools', 'Higher Secondary', 'Colleges'],
        data: [1048000, 245000, 125000, 52000],
        colors: ['#9966FF', '#FF9F40', '#FF6384', '#36A2EB'],
      },
      sanitation: {
        labels: ['Individual Toilets', 'Community Toilets', 'Public Toilets', 'Waste Processing'],
        data: [108000000, 567000, 125000, 4200],
        colors: ['#4BC0C0', '#36A2EB', '#FFCE56', '#FF6384'],
      },
      agriculture: {
        labels: ['Rice', 'Wheat', 'Sugarcane', 'Cotton'],
        data: [118000, 109000, 37500, 6200],
        colors: ['#FFD93D', '#6BCF7F', '#FF6B9D', '#C89CFF'],
      },
      budget: {
        labels: ['Health', 'Education', 'Infrastructure', 'Agriculture'],
        data: [273000, 112000, 185000, 98000],
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
      welfare: {
        labels: ['ICDS Centers', 'Anganwadi Centers', 'Skill Centers', 'SHGs'],
        data: [1360000, 1380000, 32000, 6900000],
        colors: ['#FF9F40', '#FF6384', '#9966FF', '#36A2EB'],
      },
    };

    const data = categoryData[category as keyof typeof categoryData];
    return {
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          backgroundColor: data.colors,
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    };
  };

  const getBarChartData = () => {
    const categoryData = {
      health: {
        labels: ['Uttar Pradesh', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat'],
        datasets: [
          {
            label: 'Hospitals',
            data: [3245, 2876, 2456, 2180, 1987],
            backgroundColor: '#FF6384',
          },
          {
            label: 'Hospital Beds',
            data: [125000, 110000, 89000, 76000, 68000],
            backgroundColor: '#36A2EB',
          },
        ],
      },
      education: {
        labels: ['Uttar Pradesh', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat'],
        datasets: [
          {
            label: 'Schools',
            data: [195000, 108000, 45600, 52400, 48200],
            backgroundColor: '#9966FF',
          },
          {
            label: 'Enrollment Rate (%)',
            data: [87, 92, 94, 91, 93],
            backgroundColor: '#FF9F40',
          },
        ],
      },
      sanitation: {
        labels: ['Uttar Pradesh', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat'],
        datasets: [
          {
            label: 'Toilet Coverage (%)',
            data: [96.2, 98.8, 99.1, 98.6, 97.9],
            backgroundColor: '#4BC0C0',
          },
          {
            label: 'Waste Management (%)',
            data: [65, 78, 82, 75, 80],
            backgroundColor: '#36A2EB',
          },
        ],
      },
      agriculture: {
        labels: ['Uttar Pradesh', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat'],
        datasets: [
          {
            label: 'Crop Production (Million Tonnes)',
            data: [59.2, 18.4, 16.8, 14.2, 12.6],
            backgroundColor: '#FFD93D',
          },
          {
            label: 'Irrigation Coverage (%)',
            data: [78, 65, 72, 68, 85],
            backgroundColor: '#6BCF7F',
          },
        ],
      },
      budget: {
        labels: ['Uttar Pradesh', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat'],
        datasets: [
          {
            label: 'Total Budget (₹ Thousand Crores)',
            data: [635, 487, 345, 298, 275],
            backgroundColor: '#FF6384',
          },
          {
            label: 'Per Capita Budget (₹)',
            data: [28500, 42300, 47800, 46200, 44200],
            backgroundColor: '#36A2EB',
          },
        ],
      },
      welfare: {
        labels: ['Uttar Pradesh', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat'],
        datasets: [
          {
            label: 'ICDS Centers',
            data: [285000, 128000, 98000, 85000, 78000],
            backgroundColor: '#FF9F40',
          },
          {
            label: 'Beneficiaries (Millions)',
            data: [18.5, 8.9, 6.2, 5.8, 5.1],
            backgroundColor: '#FF6384',
          },
        ],
      },
    };

    return categoryData[category as keyof typeof categoryData];
  };

  const getTrendData = () => {
    const labels = ['2020', '2021', '2022', '2023', '2024'];
    const categoryData = {
      health: {
        datasets: [
          {
            label: 'Hospital Beds (Thousands)',
            data: [713, 735, 758, 782, 806],
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            tension: 0.4,
          },
          {
            label: 'Doctors (Thousands)',
            data: [420, 445, 472, 498, 525],
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            tension: 0.4,
          },
        ],
      },
      education: {
        datasets: [
          {
            label: 'Enrollment Rate (%)',
            data: [86.2, 88.1, 90.3, 92.1, 93.8],
            borderColor: '#9966FF',
            backgroundColor: 'rgba(153, 102, 255, 0.1)',
            tension: 0.4,
          },
          {
            label: 'Literacy Rate (%)',
            data: [74.0, 75.2, 76.1, 76.8, 77.7],
            borderColor: '#FF9F40',
            backgroundColor: 'rgba(255, 159, 64, 0.1)',
            tension: 0.4,
          },
        ],
      },
      sanitation: {
        datasets: [
          {
            label: 'Toilet Coverage (%)',
            data: [95.6, 96.5, 97.2, 97.8, 98.6],
            borderColor: '#4BC0C0',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            tension: 0.4,
          },
          {
            label: 'Waste Processing (%)',
            data: [58, 62, 65, 67, 70],
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            tension: 0.4,
          },
        ],
      },
      agriculture: {
        datasets: [
          {
            label: 'Food Production (Million Tonnes)',
            data: [296.7, 308.6, 315.7, 323.5, 329.7],
            borderColor: '#FFD93D',
            backgroundColor: 'rgba(255, 217, 61, 0.1)',
            tension: 0.4,
          },
          {
            label: 'Irrigation Coverage (%)',
            data: [48.2, 49.1, 50.5, 51.8, 52.6],
            borderColor: '#6BCF7F',
            backgroundColor: 'rgba(107, 207, 127, 0.1)',
            tension: 0.4,
          },
        ],
      },
      budget: {
        datasets: [
          {
            label: 'Total Budget (₹ Lakh Crores)',
            data: [34.8, 37.9, 41.2, 44.7, 47.7],
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            tension: 0.4,
          },
          {
            label: 'Health Allocation (%)',
            data: [4.2, 4.6, 5.1, 5.4, 5.7],
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            tension: 0.4,
          },
        ],
      },
      welfare: {
        datasets: [
          {
            label: 'ICDS Centers (Lakhs)',
            data: [12.8, 13.0, 13.2, 13.4, 13.6],
            borderColor: '#FF9F40',
            backgroundColor: 'rgba(255, 159, 64, 0.1)',
            tension: 0.4,
          },
          {
            label: 'Beneficiaries (Crores)',
            data: [6.2, 6.4, 6.6, 6.7, 6.9],
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            tension: 0.4,
          },
        ],
      },
    };

    return {
      labels,
      ...categoryData[category as keyof typeof categoryData],
    };
  };

  const getComparisonChartData = () => {
    if (!comparisonData) return getBarChartData();

    if (comparisonData.type === 'regions' && comparisonData.regions) {
      const [region1, region2] = comparisonData.regions;
      const regionNames = {
        'tamil-nadu': 'Tamil Nadu',
        'karnataka': 'Karnataka',
        'maharashtra': 'Maharashtra',
        'gujarat': 'Gujarat',
        'rajasthan': 'Rajasthan',
        'west-bengal': 'West Bengal',
      };

      const healthData = {
        labels: ['Hospitals', 'Beds (000s)', 'Doctors (000s)', 'Budget (₹ Cr)', 'Coverage (%)'],
        datasets: [
          {
            label: regionNames[region1 as keyof typeof regionNames] || region1,
            data: [2456, 89, 12.5, 156, 78.5],
            backgroundColor: '#FF6384',
          },
          {
            label: regionNames[region2 as keyof typeof regionNames] || region2,
            data: [2180, 76, 11.2, 142, 76.8],
            backgroundColor: '#36A2EB',
          },
        ],
      };

      return healthData;
    } else if (comparisonData.type === 'years' && comparisonData.years) {
      const [year1, year2] = comparisonData.years;
      
      const yearData = {
        labels: ['Hospitals', 'Beds (000s)', 'Doctors (000s)', 'Budget (₹ Cr)', 'Coverage (%)'],
        datasets: [
          {
            label: year1,
            data: [2456, 89, 12.5, 156, 78.5],
            backgroundColor: '#FF6384',
          },
          {
            label: year2,
            data: [2380, 86.5, 11.8, 142, 76.2],
            backgroundColor: '#36A2EB',
          },
        ],
      };

      return yearData;
    }

    return getBarChartData();
  };

  return (
    <div className="w-full">
      <div className="relative" style={{ height: '400px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default DataVisualization;