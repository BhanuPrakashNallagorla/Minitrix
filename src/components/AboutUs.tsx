import { Users, Target, Shield, Handshake, ArrowRight, Calendar } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            We're Closing the Gap Between Human Intelligence and Artificial Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            At Minitrix, we believe that the future belongs to organizations that can seamlessly blend human creativity with AI precision. We're not just building AI solutions—we're crafting the bridge that connects human insight with machine intelligence, creating possibilities that neither could achieve alone.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Minitrix was born from a simple observation: while AI technology was advancing at breakneck speed, most organizations were struggling to harness its true potential. We saw brilliant teams with innovative ideas hitting walls when it came to implementation, scalability, and real-world application.
                </p>
                <p>
                  Our founders, both seasoned technologists with deep experience in AI research and enterprise solutions, recognized that the missing piece wasn't more sophisticated algorithms—it was the human-centered approach to AI deployment. They envisioned a company that would serve as the translator between cutting-edge AI capabilities and practical business needs.
                </p>
                <p>
                  Today, Minitrix stands as that bridge. We combine technical excellence with strategic thinking, ensuring that every AI solution we develop doesn't just work in theory, but thrives in the complex, dynamic environment of real business operations. Our mission is to make AI accessible, practical, and transformative for organizations of every size and industry.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-12 border border-blue-500/20">
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">2020 - Foundation</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">2021 - First Enterprise Client</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">2023 - Global Expansion</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">2024 - AI Innovation Leader</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Our Philosophy Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Our Core Principles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Principle 1 */}
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-6xl font-bold text-blue-500/20 mb-2">01</div>
                <h3 className="text-2xl font-bold mb-4">Sovereign Intelligence</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We believe that organizations should maintain complete control over their AI systems and data. Our solutions are designed to enhance your capabilities while ensuring that your intellectual property, decision-making processes, and strategic advantages remain entirely under your control.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-6xl font-bold text-purple-500/20 mb-2">02</div>
                <h3 className="text-2xl font-bold mb-4">Performance Excellence</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Every solution we deliver is optimized for real-world performance. We don't just build AI that works in labs—we create systems that excel under pressure, scale with your growth, and deliver consistent results in the complex, dynamic environment of actual business operations.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <div className="text-6xl font-bold text-green-500/20 mb-2">03</div>
                <h3 className="text-2xl font-bold mb-4">True Partnership</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We don't just deliver solutions and walk away. We become your long-term AI partner, providing ongoing support, continuous optimization, and strategic guidance as your needs evolve. Your success with AI is our success, and we're committed to that journey together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="relative py-20 px-6 bg-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Team</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Behind every breakthrough AI solution is a diverse team of researchers, engineers, strategists, and domain experts who bring unique perspectives and deep expertise to every challenge. Our global team combines cutting-edge technical skills with real-world business acumen, ensuring that the solutions we develop are not just technologically advanced, but strategically sound and practically implementable.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-12 border border-blue-500/20">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-sm text-gray-400">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      15
                    </div>
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-sm text-gray-400">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      24
                    </div>
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-sm text-gray-400">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's Build the Future Together</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
            Whether you're looking to implement your first AI solution or scale existing capabilities, we're here to guide you through every step of the journey. Let's explore how Minitrix can help transform your organization's relationship with artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
              <Calendar className="w-5 h-5" />
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
              <span>View Our Services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
