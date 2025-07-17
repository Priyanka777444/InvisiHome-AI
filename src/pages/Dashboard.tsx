import React, { useState } from 'react';
import { BarChart3, Map, TrendingUp, Users, AlertTriangle, CheckCircle, Upload, Download, FileText, PieChart, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedWard, setSelectedWard] = useState('Ward 1');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelResults, setModelResults] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Reset previous results when new file is uploaded
      setModelResults(null);
    }
  };

  const processFile = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    
    // Simulate AI/ML model processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock results - replace with your actual model output
    const mockResults = {
      fileName: uploadedFile.name,
      processedAt: new Date().toISOString(),
      totalAreas: 156,
      wellServed: 98,
      underserved: 58,
      predictions: [
        { ward: 'Ward 1', status: 'Well-Served', confidence: 0.87 },
        { ward: 'Ward 2', status: 'Underserved', confidence: 0.92 },
        { ward: 'Ward 3', status: 'Well-Served', confidence: 0.78 },
        { ward: 'Ward 4', status: 'Underserved', confidence: 0.85 },
      ]
    };
    
    setModelResults(mockResults);
    setIsProcessing(false);
  };

  const exportResults = () => {
    if (!modelResults) return;
    
    // Create CSV content
    const csvContent = [
      ['Ward', 'Status', 'Confidence'],
      ...modelResults.predictions.map((pred: any) => [
        pred.ward,
        pred.status,
        pred.confidence.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invisihome_results_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const mockData = {
    'Ward 1': { served: 75, underserved: 25, population: 45000 },
    'Ward 2': { served: 60, underserved: 40, population: 38000 },
    'Ward 3': { served: 85, underserved: 15, population: 52000 },
    'Ward 4': { served: 45, underserved: 55, population: 29000 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Urban Inclusion Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">AI-powered insights for sustainable urban development</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Population</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">164,000</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Well-Served Areas</p>
                <p className="text-2xl font-bold text-green-600">66%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Underserved Areas</p>
                <p className="text-2xl font-bold text-red-600">34%</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Improvement Rate</p>
                <p className="text-2xl font-bold text-blue-600">+12%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Interactive Map Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Map className="w-5 h-5 mr-2 text-blue-600" />
              Ward-Level Analysis
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Ward
              </label>
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {Object.keys(mockData).map(ward => (
                  <option key={ward} value={ward}>{ward}</option>
                ))}
              </select>
            </div>

            {/* File Upload Section */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-blue-600" />
                Upload Data for AI/ML Analysis
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Data File (CSV, JSON, Excel)
                  </label>
                  <input
                    type="file"
                    accept=".csv,.json,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                
                {uploadedFile && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-800 dark:text-blue-300">{uploadedFile.name}</span>
                      <span className="text-xs text-blue-600 dark:text-blue-400">
                        ({(uploadedFile.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      onClick={processFile}
                      disabled={isProcessing}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                    >
                      {isProcessing ? 'Processing...' : 'Process File'}
                    </button>
                  </div>
                )}
                
                {isProcessing && (
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-yellow-800 dark:text-yellow-300 text-sm">
                      AI/ML model is processing your data...
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Mock Map Visualization */}
            <div className={`rounded-lg p-8 mb-4 border-2 border-dashed transition-colors ${
              modelResults 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600' 
                : 'bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-gray-300 dark:border-gray-600'
            }`}>
              <div className="text-center">
                <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {modelResults ? 'AI/ML Model Results Visualization' : 'Interactive Map Placeholder'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {modelResults 
                    ? `Processed: ${modelResults.fileName} | ${modelResults.totalAreas} areas analyzed`
                    : 'Your AI/ML model visualization will appear here'
                  }
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Integration with Plotly/Folium maps</p>
                
                {modelResults && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={exportResults}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export Results</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Ward Data */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">Well-Served</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {modelResults 
                    ? `${Math.round((modelResults.wellServed / modelResults.totalAreas) * 100)}%`
                    : `${mockData[selectedWard as keyof typeof mockData].served}%`
                  }
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">Underserved</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                  {modelResults 
                    ? `${Math.round((modelResults.underserved / modelResults.totalAreas) * 100)}%`
                    : `${mockData[selectedWard as keyof typeof mockData].underserved}%`
                  }
                </p>
              </div>
            </div>
            
            {/* Model Results Summary */}
            {modelResults && (
              <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Analysis Results</h4>
                <div className="space-y-2">
                  {modelResults.predictions.map((pred: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{pred.ward}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          pred.status === 'Well-Served' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                        }`}>
                          {pred.status}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {(pred.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Model Performance Graphs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-600" />
              Model Performance Results
            </h2>
            
            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">87%</p>
                <p className="text-sm text-blue-700 dark:text-blue-400">Accuracy</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">84%</p>
                <p className="text-sm text-green-700 dark:text-green-400">Precision</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-orange-600">89%</p>
                <p className="text-sm text-orange-700 dark:text-orange-400">Recall</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-600">86%</p>
                <p className="text-sm text-purple-700 dark:text-purple-400">F1-Score</p>
              </div>
            </div>

            {/* Graph Visualizations */}
            <div className="space-y-6">
              {/* Classification Results Chart */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <PieChart className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Classification Results</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mock Pie Chart */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeDasharray="66, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">66%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Well-Served</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">66%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Underserved</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">34%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Importance Chart */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Feature Importance</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Infrastructure Quality</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">0.35</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '35%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Population Density</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">0.28</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '28%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Service Accessibility</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">0.22</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '22%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Economic Indicators</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">0.15</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '15%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confusion Matrix */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confusion Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="p-2"></th>
                        <th className="p-2 text-center text-gray-700 dark:text-gray-300">Predicted Well-Served</th>
                        <th className="p-2 text-center text-gray-700 dark:text-gray-300">Predicted Underserved</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 font-medium text-gray-700 dark:text-gray-300">Actual Well-Served</td>
                        <td className="p-2 text-center bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 font-bold">142</td>
                        <td className="p-2 text-center bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 font-bold">18</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-gray-700 dark:text-gray-300">Actual Underserved</td>
                        <td className="p-2 text-center bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 font-bold">12</td>
                        <td className="p-2 text-center bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 font-bold">128</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Model Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Sources</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Census demographic data</li>
                <li>• Infrastructure assessments</li>
                <li>• Service accessibility metrics</li>
                <li>• Economic indicators</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Model Features</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Population density analysis</li>
                <li>• Infrastructure quality scoring</li>
                <li>• Service accessibility mapping</li>
                <li>• Socioeconomic indicators</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Accuracy Metrics</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Model Accuracy: 87%</li>
                <li>• Precision: 84%</li>
                <li>• Recall: 89%</li>
                <li>• F1-Score: 86%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;