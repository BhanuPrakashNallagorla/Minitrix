import { useState } from 'react';
import { MessageCircle, Calendar, Send, TrendingUp, Zap, DollarSign } from 'lucide-react';

const DemoSection = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('Healthcare');
  const [messages, setMessages] = useState([
    { sender: 'user', text: 'Analyze this patient report for risk factors' },
    { sender: 'bot', text: 'Based on the medical history provided, I\'ve identified 3 key risk factors: elevated blood pressure (140/90), family history of cardiac events, and sedentary lifestyle. I recommend immediate consultation with cardiology and lifestyle modifications.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const industries = [
    { name: 'Healthcare', icon: '🏥', demo: 'Patient Risk Analysis' },
    { name: 'Finance', icon: '💰', demo: 'Fraud Detection' },
    { name: 'E-commerce', icon: '🛒', demo: 'Product Recommendations' }
  ];

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    
    const demoMessages = {
      Healthcare: [
        { sender: 'user', text: 'Analyze this patient report for risk factors' },
        { sender: 'bot', text: 'Based on the medical history provided, I\'ve identified 3 key risk factors: elevated blood pressure (140/90), family history of cardiac events, and sedentary lifestyle. I recommend immediate consultation with cardiology and lifestyle modifications.' }
      ],
      Finance: [
        { sender: 'user', text: 'Review this transaction for fraud indicators' },
        { sender: 'bot', text: 'Transaction flagged: Unusual spending pattern detected. $2,500 purchase at 3 AM, 500 miles from last known location, merchant category doesn\'t match user history. Confidence level: 87% fraudulent. Recommend immediate card suspension.' }
      ],
      'E-commerce': [
        { sender: 'user', text: 'Show recommendations for customer profile #12847' },
        { sender: 'bot', text: 'Based on purchase history and browsing behavior, top recommendations: 1) Wireless earbuds (92% match), 2) Laptop stand (87% match), 3) Phone case (81% match). Expected conversion rate: 34% higher than generic recommendations.' }
      ]
    };

    setMessages(demoMessages[industry as keyof typeof demoMessages] || messages);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = { sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const responses = {
        Healthcare: [
          'Based on the symptoms described, I recommend immediate blood work and ECG. The combination of chest pain and shortness of breath requires urgent evaluation.',
          'This patient profile indicates moderate cardiovascular risk. I suggest lifestyle modifications and follow-up in 2 weeks.',
          'The lab results show elevated markers. Consider referring to cardiology for further assessment.'
        ],
        Finance: [
          'Transaction pattern analysis shows 94% probability of fraudulent activity. Recommend immediate account freeze.',
          'Credit risk assessment complete: Low risk profile with excellent payment history over 5 years.',
          'Market volatility detected. Portfolio rebalancing recommended to maintain target allocation.'
        ],
        'E-commerce': [
          'Customer behavior analysis suggests 87% likelihood of purchase completion. Recommend personalized discount offer.',
          'Inventory optimization complete: Reorder quantities calculated based on seasonal trends.',
          'Customer satisfaction score: 4.8/5. Key drivers: fast delivery and product quality.'
        ]
      };
      
      const industryResponses = responses[selectedIndustry as keyof typeof responses] || responses.Healthcare;
      const randomResponse = industryResponses[Math.floor(Math.random() * industryResponses.length)];
      
      const botMessage = { sender: 'bot', text: randomResponse };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-gray-900/20 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">
            Experience Our SLMs in Action
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how our specialized models deliver precise, industry-specific responses
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Demo Interface */}
          <div className="relative">
            {/* Industry Selector */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
              {industries.map((industry) => (
                <button
                  key={industry.name}
                  onClick={() => handleIndustryChange(industry.name)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                    selectedIndustry === industry.name
                      ? 'bg-gray-800 border border-cyan-400 text-white hover:bg-gray-700'
                      : 'bg-gray-800 border border-gray-600 text-gray-300 hover:border-cyan-400 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-2">{industry.icon}</span>
                  {industry.name}
                </button>
              ))}
            </div>

            {/* Chat Interface */}
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700 p-3 sm:p-4">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-cyan-400" />
                  <span className="font-semibold text-white text-sm">SLM Demo - {selectedIndustry}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-green-400">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
              </div>

              <div className="h-48 sm:h-64 overflow-y-auto mb-3 sm:mb-4 space-y-2 sm:space-y-3 scrollbar-hide">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-3/4 p-3 rounded-xl text-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-100 border border-gray-700'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 text-gray-100 border border-gray-700 p-3 rounded-xl">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input Section */}
              <div className="flex space-x-2 border-t border-gray-700 pt-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Ask about ${selectedIndustry.toLowerCase()} analysis...`}
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-gray-800 border border-gray-600 hover:border-cyan-400 disabled:border-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 disabled:scale-100 hover:bg-gray-700 flex items-center"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* CTA Button Below Chatbox */}
            <div className="pt-8 flex justify-center">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('book-demo'))}
                className="bg-gray-800 border border-gray-600 hover:border-cyan-400 px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 hover:bg-gray-700 flex items-center space-x-2"
              >
                <Calendar className="h-4 w-4" />
                <span className="gradient-text-animated">Book Custom Demo</span>
              </button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4 flex flex-col mt-8 lg:mt-0">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold text-white mb-3">
                Real-Time Performance Metrics
              </h3>
              <p className="text-gray-400 text-sm">
                Watch our SLMs deliver faster, more accurate responses than generic alternatives
              </p>
            </div>

            {/* Visual Metrics with Charts */}
            <div className="space-y-4">
              {/* Response Time Chart */}
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 font-medium text-sm">Response Time Comparison</span>
                  <Zap className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">Our SLM</span>
                    <span className="text-green-400 font-bold text-sm">47ms</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full w-1/4 relative">
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Traditional LLM</span>
                    <span className="text-red-400 font-bold text-sm">180ms</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div className="bg-red-500/60 h-1.5 rounded-full w-full"></div>
                  </div>
                </div>
              </div>

              {/* Accuracy Visualization */}
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 font-medium text-sm">Accuracy Score</span>
                  <TrendingUp className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="relative">
                  <div className="text-2xl font-bold text-white mb-2 text-center">94.7%</div>
                  <div className="relative w-20 h-20 mx-auto">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#374151"
                        strokeWidth="6"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={`${94.7 * 2.51} ${(100 - 94.7) * 2.51}`}
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-xs text-blue-400 mt-2 text-center">Industry-specific training</div>
                </div>
              </div>

              {/* Cost Savings Chart */}
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 font-medium text-sm">Monthly Cost Comparison</span>
                  <DollarSign className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-end space-x-2 h-16">
                    <div className="flex flex-col items-center flex-1">
                      <div className="bg-gradient-to-t from-green-500 to-emerald-400 w-full rounded-t" style={{ height: '20%' }}></div>
                      <span className="text-xs text-green-400 mt-1">SLM</span>
                      <span className="text-xs font-bold text-white">$500</span>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="bg-gradient-to-t from-red-500 to-red-400 w-full rounded-t" style={{ height: '100%' }}></div>
                      <span className="text-xs text-red-400 mt-1">LLM API</span>
                      <span className="text-xs font-bold text-white">$2,500</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-green-400 font-bold text-sm">80% Savings</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;