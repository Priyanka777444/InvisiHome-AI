import React from 'react';
import { Target, Globe, Users, Zap, BarChart3, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About SDG 11</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Sustainable Cities and Communities</p>
        </div>

        {/* SDG 11 Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What is SDG 11?</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
            Sustainable Development Goal 11 aims to "Make cities and human settlements inclusive, safe, 
            resilient and sustainable." By 2050, it's projected that 68% of the world's population will 
            live in cities, making urban planning and sustainable development more critical than ever.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Key Targets</h3>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
                <li>• Ensure access to adequate housing</li>
                <li>• Provide sustainable transport systems</li>
                <li>• Enhance inclusive urbanization</li>
                <li>• Protect cultural and natural heritage</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
              <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">Global Impact</h3>
              <ul className="text-sm text-green-700 dark:text-green-400 space-y-2">
                <li>• 1 billion people live in slums</li>
                <li>• 3 billion need improved housing</li>
                <li>• Cities consume 78% of energy</li>
                <li>• Urban areas produce 70% of CO2</li>
              </ul>
            </div>
          </div>
        </div>

        {/* AI for Urban Inclusion */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <Zap className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI for Urban Inclusion</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
            Artificial Intelligence and Machine Learning technologies are revolutionizing how we understand 
            and address urban inequality. By analyzing vast datasets, we can identify underserved communities 
            and predict areas that need immediate attention.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced analytics to process urban data and identify patterns
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community Mapping</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Identify underserved areas and vulnerable populations
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <Shield className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Predictive Insights</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Forecast future urban challenges and opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <Globe className="w-8 h-8 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Approach</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Collection</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Gather comprehensive urban data including demographics, infrastructure, 
                  services, and economic indicators from reliable sources.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Model Training</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Develop and train machine learning models to identify patterns and 
                  predict underserved areas with high accuracy.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Visualization & Action</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Create interactive dashboards and actionable insights for policymakers 
                  and urban planners to drive inclusive development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real Datasets */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Real Datasets Used</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Primary Data Sources</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Census Bureau demographic data</li>
                <li>• World Bank urban development indicators</li>
                <li>• UN-Habitat slum mapping data</li>
                <li>• OpenStreetMap infrastructure data</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Supporting Datasets</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Municipal service accessibility maps</li>
                <li>• Economic survey data</li>
                <li>• Healthcare facility locations</li>
                <li>• Educational institution mapping</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>Note:</strong> All datasets are processed in compliance with privacy regulations 
              and used solely for research and development purposes to advance urban inclusion goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;