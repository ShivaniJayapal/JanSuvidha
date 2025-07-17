import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Search,
  Filter,
  Download,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface RTISubmission {
  id: string;
  title: string;
  rtiNumber: string;
  department: string;
  submissionDate: string;
  responseDate?: string;
  status: 'pending' | 'responded' | 'overdue' | 'verified';
  description: string;
  documents: string[];
  isPublic: boolean;
  verificationStatus: 'verified' | 'unverified' | 'disputed';
}

const RTIPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const [rtiSubmissions] = useState<RTISubmission[]>([
    {
      id: '1',
      title: 'Hospital Infrastructure Budget Allocation 2024',
      rtiNumber: 'RTI/HEALTH/2024/001',
      department: 'Health & Family Welfare',
      submissionDate: '2024-01-10',
      responseDate: '2024-01-25',
      status: 'responded',
      description: 'Details about budget allocation for hospital infrastructure development across Tamil Nadu.',
      documents: ['budget_allocation_hospitals.pdf', 'infrastructure_plan.xlsx'],
      isPublic: true,
      verificationStatus: 'verified'
    },
    {
      id: '2',
      title: 'School Teacher Recruitment Data',
      rtiNumber: 'RTI/EDU/2024/015',
      department: 'Education',
      submissionDate: '2024-01-15',
      responseDate: '2024-02-01',
      status: 'responded',
      description: 'Information about teacher recruitment numbers, vacancies, and selection process.',
      documents: ['teacher_recruitment_2024.pdf'],
      isPublic: true,
      verificationStatus: 'verified'
    },
    {
      id: '3',
      title: 'Rural Water Supply Scheme Progress',
      rtiNumber: 'RTI/WATER/2024/008',
      department: 'Water Resources',
      submissionDate: '2024-01-20',
      status: 'pending',
      description: 'Status update on Jal Jeevan Mission implementation in rural areas.',
      documents: [],
      isPublic: false,
      verificationStatus: 'unverified'
    },
    {
      id: '4',
      title: 'Agricultural Subsidy Distribution',
      rtiNumber: 'RTI/AGRI/2024/032',
      department: 'Agriculture',
      submissionDate: '2023-12-15',
      status: 'overdue',
      description: 'Details about PM-KISAN and other agricultural subsidy distribution in the district.',
      documents: [],
      isPublic: true,
      verificationStatus: 'disputed'
    }
  ]);

  const departments = [
    'All Departments',
    'Health & Family Welfare',
    'Education',
    'Water Resources',
    'Agriculture',
    'Rural Development',
    'Urban Development'
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'responded':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responded':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </span>
        );
      case 'disputed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Disputed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Clock className="h-3 w-3 mr-1" />
            Unverified
          </span>
        );
    }
  };

  const filteredSubmissions = rtiSubmissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.rtiNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || submission.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || submission.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RTI Data Repository</h1>
          <p className="text-lg text-gray-600">
            Access verified RTI responses and submit your own government data requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total RTI Responses</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Verified Responses</p>
                <p className="text-2xl font-bold text-gray-900">1,089</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Responses</p>
                <p className="text-2xl font-bold text-gray-900">158</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Upload className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">43</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('browse')}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                  ${activeTab === 'browse'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                Browse RTI Responses
              </button>
              <button
                onClick={() => setActiveTab('submit')}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                  ${activeTab === 'submit'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                Submit RTI Response
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'browse' && (
              <div>
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="relative flex-1 min-w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search RTI responses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="responded">Responded</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>

                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {departments.map((dept, index) => (
                      <option key={index} value={index === 0 ? 'all' : dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* RTI List */}
                <div className="space-y-4">
                  {filteredSubmissions.map((submission) => (
                    <div key={submission.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{submission.title}</h3>
                            {getVerificationBadge(submission.verificationStatus)}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 space-x-4 mb-2">
                            <span className="flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              {submission.rtiNumber}
                            </span>
                            <span>{submission.department}</span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {submission.submissionDate}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3">{submission.description}</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                            {getStatusIcon(submission.status)}
                            <span className="ml-2 capitalize">{submission.status}</span>
                          </span>
                        </div>
                      </div>

                      {submission.documents.length > 0 && (
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Attached Documents:</h4>
                          <div className="flex flex-wrap gap-2">
                            {submission.documents.map((doc, index) => (
                              <div key={index} className="flex items-center bg-gray-50 rounded-lg px-3 py-2">
                                <FileText className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-sm text-gray-700">{doc}</span>
                                <button className="ml-2 text-blue-600 hover:text-blue-700">
                                  <Download className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            {submission.isPublic ? (
                              <span className="flex items-center">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Public Access
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                Restricted Access
                              </span>
                            )}
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View Full Response →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'submit' && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit RTI Response</h3>
                <p className="text-gray-600 mb-6">
                  Help build transparency by uploading RTI responses you've received from government departments.
                </p>

                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RTI Application Number *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., RTI/HEALTH/2024/001"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title/Subject *
                    </label>
                    <input
                      type="text"
                      placeholder="Brief description of the RTI request"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department/Authority *
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Department</option>
                      {departments.slice(1).map((dept, index) => (
                        <option key={index} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Provide details about the RTI request and response"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Response Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Documents
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Drop files here or click to upload RTI response documents
                      </p>
                      <input type="file" multiple className="hidden" />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="public-access"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="public-access" className="ml-2 text-sm text-gray-700">
                      Make this RTI response publicly accessible
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Submit for Review
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RTIPage;