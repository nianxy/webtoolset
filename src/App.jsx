import { useState } from 'react'
import toolsData from './tools.json'
import './App.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  const handleToolClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Left navigation */}
      <div className="w-80 bg-gray-900/50 backdrop-blur-xl border-r border-gray-700/50 flex flex-col shadow-2xl">
        {/* Logo area */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Toolset</h1>
                <a 
                  href="https://github.com/nianxy/webtoolset" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  title="GitHub Repository"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
              <p className="text-xs text-gray-500">Toolset Collection</p>
            </div>
          </div>
        </div>
        
        {/* Category list */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {toolsData.categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category)}
              className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                selectedCategory?.name === category.name
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    selectedCategory?.name === category.name
                      ? 'bg-white/20'
                      : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                  selectedCategory?.name === category.name
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50'
                }`}>
                  {category.tools.length}
                </span>
              </div>
            </button>
          ))}
        </nav>
        
        {/* Bottom info */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="text-xs text-gray-500 text-center">
            <p>Total {toolsData.categories.length} categories</p>
            <p className="mt-1">{toolsData.categories.reduce((acc, cat) => acc + cat.tools.length, 0)} tools</p>
          </div>
        </div>
      </div>

      {/* Right content area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {selectedCategory ? (
          <div className="max-w-7xl mx-auto">
            {/* Title area */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {selectedCategory.name}
                </h2>
              </div>
              <p className="text-gray-400 ml-13">This category has {selectedCategory.tools.length} tools</p>
            </div>
            
            {/* Tool card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {selectedCategory.tools.map((tool, index) => (
                <button
                  key={tool.name}
                  onClick={() => handleToolClick(tool.url)}
                  className="group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Background light effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    
                    {/* Tool name */}
                    <h3 className="font-semibold text-gray-200 mb-2 text-lg group-hover:text-white transition-colors">
                      {tool.name}
                    </h3>
                    
                    {/* Hint text */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-blue-400 transition-colors">
                      <span>Click to open</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-400 mb-2">Welcome to Toolset</h3>
              <p className="text-gray-500">Please select a category from the left to start</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
