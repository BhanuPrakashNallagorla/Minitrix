import { useState } from 'react';
import { post } from '../../lib/api';
import { Mail, Check, ArrowRight } from 'lucide-react';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await post('/api/newsletter', { email });
      setIsSubscribed(true);
      setEmail('');
    } catch (err: any) {
      alert(err?.data?.errors?.[0]?.msg || err.message || 'Subscription failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-br from-blue-600/10 to-blue-400/10 rounded-2xl border border-blue-500/20 p-8 text-center">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Welcome to our community!</h3>
        <p className="text-gray-400">
          Thank you for subscribing. You'll receive our latest insights on AI and SLM technology.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 backdrop-blur-sm rounded-2xl border border-neutral-700 p-8">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
        <p className="text-gray-400">
          Get the latest insights on AI, SLM technology, and industry trends delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
              Subscribing...
            </>
          ) : (
            <>
              <span>Subscribe to Newsletter</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterSubscription;
