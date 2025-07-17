import React, { useState, useCallback } from 'react';
import { Upload, FileText, File, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  status: 'processing' | 'completed' | 'error';
  summary?: string;
  extractedData?: any[];
}

const UploadPage: React.FC = () => {
  const { t } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'health_budget_2024.pdf',
      size: '2.3 MB',
      type: 'PDF',
      uploadDate: '2024-01-15',
      status: 'completed',
      summary: 'Health budget allocation across 15 districts with detailed breakdowns for hospital infrastructure and vaccination programs.',
      extractedData: [
        { district: 'Chennai', allocation: '₹450 Cr', hospitals: 25, beds: 5000 },
        { district: 'Coimbatore', allocation: '₹320 Cr', hospitals: 18, beds: 3600 },
        { district: 'Madurai', allocation: '₹280 Cr', hospitals: 15, beds: 3000 }
      ]
    },
    {
      id: '2',
      name: 'education_statistics.xlsx',
      size: '1.8 MB',
      type: 'Excel',
      uploadDate: '2024-01-14',
      status: 'completed',
      summary: 'School enrollment and literacy rates across rural and urban areas with gender-wise breakdown.',
      extractedData: [
        { area: 'Rural', enrollment: '78%', literacy: '72%', schools: 1250 },
        { area: 'Urban', enrollment: '94%', literacy: '89%', schools: 450 }
      ]
    }
  ]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.name.split('.').pop()?.toUpperCase() || 'Unknown',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'processing'
      };

      setUploadedFiles(prev => [newFile, ...prev]);

      // Simulate processing
      setTimeout(() => {
        setUploadedFiles(prev => prev.map(f => 
          f.id === newFile.id 
            ? { 
                ...f, 
                status: 'completed', 
                summary: 'Document processed successfully. Data extracted and ready for analysis.',
                extractedData: generateMockData(file.name)
              }
            : f
        ));
      }, 3000);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const generateMockData = (filename: string) => {
    if (filename.toLowerCase().includes('health')) {
      return [
        { parameter: 'Hospitals', count: 156, capacity: '12,400 beds' },
        { parameter: 'PHCs', count: 234, coverage: '2.4M population' },
        { parameter: 'Doctors', count: 1840, ratio: '1:650' }
      ];
    } else if (filename.toLowerCase().includes('education')) {
      return [
        { level: 'Primary', schools: 1250, enrollment: '89%' },
        { level: 'Secondary', schools: 450, enrollment: '76%' },
        { level: 'Higher Secondary', schools: 180, enrollment: '65%' }
      ];
    }
    return [
      { category: 'Data Points', count: 1200, verified: '95%' },
      { category: 'Records', count: 450, accuracy: '98%' }
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Government Data</h1>
          <p className="text-lg text-gray-600">
            Upload PDF documents and Excel files to extract, analyze, and visualize public data
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <Upload className={`h-16 w-16 mb-4 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop files here or click to upload
              </h3>
              <p className="text-gray-600 mb-4">
                Supports PDF documents and Excel files up to 50MB
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.xlsx,.xls"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 cursor-pointer transition-all duration-200"
              >
                Choose Files
              </label>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <FileText className="h-5 w-5 mr-2 text-red-500" />
              PDF Documents with tables and data
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <File className="h-5 w-5 mr-2 text-green-500" />
              Excel files (.xlsx, .xls)
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-5 w-5 mr-2 text-blue-500" />
              OCR support for scanned documents
            </div>
          </div>
        </div>

        {/* Upload History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Upload History</h2>
            <p className="text-gray-600 mt-1">Track your uploaded files and their processing status</p>
          </div>

          <div className="divide-y divide-gray-200">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {file.type === 'PDF' ? (
                        <FileText className="h-8 w-8 text-red-500" />
                      ) : (
                        <File className="h-8 w-8 text-green-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{file.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.type}</span>
                        <span>•</span>
                        <span>Uploaded {file.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {file.status === 'processing' && (
                      <div className="flex items-center text-yellow-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
                        Processing...
                      </div>
                    )}
                    {file.status === 'completed' && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </div>
                    )}
                    {file.status === 'error' && (
                      <div className="flex items-center text-red-600">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Error
                      </div>
                    )}
                  </div>
                </div>

                {file.summary && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                    <p className="text-gray-700 text-sm">{file.summary}</p>
                  </div>
                )}

                {file.extractedData && file.extractedData.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Extracted Data Preview</h4>
                      <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Download className="h-4 w-4 mr-1" />
                        Download CSV
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="bg-gray-100">
                            {Object.keys(file.extractedData[0]).map((key) => (
                              <th key={key} className="px-4 py-2 text-left text-sm font-medium text-gray-700 capitalize">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {file.extractedData.slice(0, 3).map((row, index) => (
                            <tr key={index} className="border-t border-gray-200">
                              {Object.values(row).map((value, i) => (
                                <td key={i} className="px-4 py-2 text-sm text-gray-900">
                                  {String(value)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {file.extractedData.length > 3 && (
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          Showing 3 of {file.extractedData.length} records
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;