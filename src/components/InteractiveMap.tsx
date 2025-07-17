import React, { useEffect, useRef } from 'react';
import { MapPin, Info } from 'lucide-react';

interface InteractiveMapProps {
  category: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ category }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock data for different states
  const stateData = {
    health: [
      { name: 'Tamil Nadu', hospitals: 2456, beds: 89000, color: '#22C55E' },
      { name: 'Karnataka', hospitals: 2180, beds: 76000, color: '#3B82F6' },
      { name: 'Maharashtra', hospitals: 2876, beds: 110000, color: '#10B981' },
      { name: 'Gujarat', hospitals: 1987, beds: 68000, color: '#6366F1' },
      { name: 'Rajasthan', hospitals: 1654, beds: 58000, color: '#8B5CF6' },
      { name: 'West Bengal', hospitals: 2234, beds: 82000, color: '#06B6D4' },
    ],
    education: [
      { name: 'Tamil Nadu', schools: 45600, enrollment: 94.2, color: '#22C55E' },
      { name: 'Karnataka', schools: 52400, enrollment: 91.8, color: '#3B82F6' },
      { name: 'Maharashtra', schools: 108000, enrollment: 92.0, color: '#10B981' },
      { name: 'Gujarat', schools: 48200, enrollment: 93.0, color: '#6366F1' },
      { name: 'Rajasthan', schools: 78500, enrollment: 85.2, color: '#8B5CF6' },
      { name: 'West Bengal', schools: 89600, enrollment: 88.5, color: '#06B6D4' },
    ],
    sanitation: [
      { name: 'Tamil Nadu', coverage: 99.1, waste: 82, color: '#22C55E' },
      { name: 'Karnataka', coverage: 98.6, waste: 75, color: '#3B82F6' },
      { name: 'Maharashtra', coverage: 98.8, waste: 78, color: '#10B981' },
      { name: 'Gujarat', coverage: 97.9, waste: 80, color: '#6366F1' },
      { name: 'Rajasthan', coverage: 97.2, waste: 68, color: '#8B5CF6' },
      { name: 'West Bengal', coverage: 96.8, waste: 71, color: '#06B6D4' },
    ],
  };

  const currentData = stateData[category as keyof typeof stateData] || stateData.health;

  return (
    <div className="w-full">
      {/* Map Container */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-6" style={{ height: '500px' }}>
        {/* Simplified India Map Representation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-2xl max-h-96">
            {/* SVG representation of India with clickable states */}
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Simplified state shapes */}
              <g className="states">
                {/* Maharashtra */}
                <polygon 
                  points="80,150 120,140 140,160 130,180 90,170"
                  fill={currentData.find(d => d.name === 'Maharashtra')?.color || '#9CA3AF'}
                  stroke="#374151"
                  strokeWidth="1"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  data-state="Maharashtra"
                />
                
                {/* Tamil Nadu */}
                <polygon 
                  points="160,220 180,210 190,240 170,250 155,235"
                  fill={currentData.find(d => d.name === 'Tamil Nadu')?.color || '#9CA3AF'}
                  stroke="#374151"
                  strokeWidth="1"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  data-state="Tamil Nadu"
                />
                
                {/* Karnataka */}
                <polygon 
                  points="140,200 170,190 180,210 160,220 145,215"
                  fill={currentData.find(d => d.name === 'Karnataka')?.color || '#9CA3AF'}
                  stroke="#374151"
                  strokeWidth="1"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  data-state="Karnataka"
                />
                
                {/* Gujarat */}
                <polygon 
                  points="60,120 90,110 100,140 80,150 65,135"
                  fill={currentData.find(d => d.name === 'Gujarat')?.color || '#9CA3AF'}
                  stroke="#374151"
                  strokeWidth="1"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  data-state="Gujarat"
                />
                
                {/* Rajasthan */}
                <polygon 
                  points="80,80 120,70 130,100 100,110 85,95"
                  fill={currentData.find(d => d.name === 'Rajasthan')?.color || '#9CA3AF'}
                  stroke="#374151"
                  strokeWidth="1"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  data-state="Rajasthan"
                />
                
                {/* West Bengal */}
                <polygon 
                  points="220,120 240,110 250,140 230,150 215,135"
                  fill={currentData.find(d => d.name === 'West Bengal')?.color || '#9CA3AF'}
                  stroke="#374151"
                  strokeWidth="1"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  data-state="West Bengal"
                />
              </g>
              
              {/* State labels */}
              <g className="labels text-xs">
                <text x="100" y="155" textAnchor="middle" className="fill-white font-medium">MH</text>
                <text x="175" y="235" textAnchor="middle" className="fill-white font-medium">TN</text>
                <text x="155" y="205" textAnchor="middle" className="fill-white font-medium">KA</text>
                <text x="75" y="130" textAnchor="middle" className="fill-white font-medium">GJ</text>
                <text x="100" y="90" textAnchor="middle" className="fill-white font-medium">RJ</text>
                <text x="235" y="130" textAnchor="middle" className="fill-white font-medium">WB</text>
              </g>
            </svg>
          </div>
        </div>
        
        {/* Map controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>Interactive Map View</span>
          </div>
        </div>
      </div>

      {/* Legend and Data Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Legend */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Info className="h-5 w-5 mr-2 text-blue-500" />
            Data Legend
          </h4>
          <div className="space-y-3">
            {currentData.map((state, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: state.color }}
                  />
                  <span className="text-sm text-gray-700">{state.name}</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {category === 'health' && `${state.hospitals} hospitals`}
                  {category === 'education' && `${state.enrollment}% enrollment`}
                  {category === 'sanitation' && `${state.coverage}% coverage`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State Details */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">State Performance Metrics</h4>
          <div className="space-y-4">
            {category === 'health' && (
              <>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Best Performing: Maharashtra</span>
                    <span className="font-medium">110K beds</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Average Performance</span>
                    <span className="font-medium">78K beds</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '71%' }}></div>
                  </div>
                </div>
              </>
            )}
            
            {category === 'education' && (
              <>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Best Enrollment: Tamil Nadu</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">National Average</span>
                    <span className="font-medium">90.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </>
            )}
            
            {category === 'sanitation' && (
              <>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Best Coverage: Tamil Nadu</span>
                    <span className="font-medium">99.1%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">National Target</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;