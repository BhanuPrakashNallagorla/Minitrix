import { useEffect, useState } from 'react';
import { TrendingDown, Zap, Shield } from 'lucide-react';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    role: '',
    countryName: 'United States',
    phone: '',
    additionalInfo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Hero form submitted:', formData);
    alert('Thank you for your interest! We will contact you within 2 hours.');
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      company: '',
      role: '',
      countryName: 'United States',
      phone: '',
      additionalInfo: ''
    });
  };

  const countriesUnsorted = [
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+1', flag: '🇨🇦', name: 'Canada' },
    { code: '+7', flag: '🇷🇺', name: 'Russia' },
    { code: '+7', flag: '🇰🇿', name: 'Kazakhstan' },
    { code: '+20', flag: '🇪🇬', name: 'Egypt' },
    { code: '+27', flag: '🇿🇦', name: 'South Africa' },
    { code: '+30', flag: '🇬🇷', name: 'Greece' },
    { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+32', flag: '🇧🇪', name: 'Belgium' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: '+36', flag: '🇭🇺', name: 'Hungary' },
    { code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: '+40', flag: '🇷🇴', name: 'Romania' },
    { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+43', flag: '🇦🇹', name: 'Austria' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+45', flag: '🇩🇰', name: 'Denmark' },
    { code: '+46', flag: '🇸🇪', name: 'Sweden' },
    { code: '+47', flag: '🇳🇴', name: 'Norway' },
    { code: '+48', flag: '🇵🇱', name: 'Poland' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+51', flag: '🇵🇪', name: 'Peru' },
    { code: '+52', flag: '🇲🇽', name: 'Mexico' },
    { code: '+53', flag: '🇨🇺', name: 'Cuba' },
    { code: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: '+56', flag: '🇨🇱', name: 'Chile' },
    { code: '+57', flag: '🇨🇴', name: 'Colombia' },
    { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
    { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
    { code: '+63', flag: '🇵🇭', name: 'Philippines' },
    { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
    { code: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: '+66', flag: '🇹🇭', name: 'Thailand' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+82', flag: '🇰🇷', name: 'South Korea' },
    { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+90', flag: '🇹🇷', name: 'Turkey' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
    { code: '+93', flag: '🇦🇫', name: 'Afghanistan' },
    { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: '+95', flag: '🇲🇲', name: 'Myanmar' },
    { code: '+98', flag: '🇮🇷', name: 'Iran' },
    { code: '+212', flag: '🇲🇦', name: 'Morocco' },
    { code: '+213', flag: '🇩🇿', name: 'Algeria' },
    { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
    { code: '+218', flag: '🇱🇾', name: 'Libya' },
    { code: '+220', flag: '🇬🇲', name: 'Gambia' },
    { code: '+221', flag: '🇸🇳', name: 'Senegal' },
    { code: '+222', flag: '🇲🇷', name: 'Mauritania' },
    { code: '+223', flag: '🇲🇱', name: 'Mali' },
    { code: '+224', flag: '🇬🇳', name: 'Guinea' },
    { code: '+225', flag: '🇨🇮', name: 'Ivory Coast' },
    { code: '+226', flag: '🇧🇫', name: 'Burkina Faso' },
    { code: '+227', flag: '🇳🇪', name: 'Niger' },
    { code: '+228', flag: '🇹🇬', name: 'Togo' },
    { code: '+229', flag: '🇧🇯', name: 'Benin' },
    { code: '+230', flag: '🇲🇺', name: 'Mauritius' },
    { code: '+231', flag: '🇱🇷', name: 'Liberia' },
    { code: '+232', flag: '🇸🇱', name: 'Sierra Leone' },
    { code: '+233', flag: '🇬🇭', name: 'Ghana' },
    { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: '+235', flag: '🇹🇩', name: 'Chad' },
    { code: '+236', flag: '🇨🇫', name: 'Central African Republic' },
    { code: '+237', flag: '🇨🇲', name: 'Cameroon' },
    { code: '+238', flag: '🇨🇻', name: 'Cape Verde' },
    { code: '+239', flag: '🇸🇹', name: 'São Tomé and Príncipe' },
    { code: '+240', flag: '🇬🇶', name: 'Equatorial Guinea' },
    { code: '+241', flag: '🇬🇦', name: 'Gabon' },
    { code: '+242', flag: '🇨🇬', name: 'Republic of the Congo' },
    { code: '+243', flag: '🇨🇩', name: 'Democratic Republic of the Congo' },
    { code: '+244', flag: '🇦🇴', name: 'Angola' },
    { code: '+245', flag: '🇬🇼', name: 'Guinea-Bissau' },
    { code: '+246', flag: '🇮🇴', name: 'British Indian Ocean Territory' },
    { code: '+248', flag: '🇸🇨', name: 'Seychelles' },
    { code: '+249', flag: '🇸🇩', name: 'Sudan' },
    { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
    { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
    { code: '+252', flag: '🇸🇴', name: 'Somalia' },
    { code: '+253', flag: '🇩🇯', name: 'Djibouti' },
    { code: '+254', flag: '🇰🇪', name: 'Kenya' },
    { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
    { code: '+256', flag: '🇺🇬', name: 'Uganda' },
    { code: '+257', flag: '🇧🇮', name: 'Burundi' },
    { code: '+258', flag: '🇲🇿', name: 'Mozambique' },
    { code: '+260', flag: '🇿🇲', name: 'Zambia' },
    { code: '+261', flag: '🇲🇬', name: 'Madagascar' },
    { code: '+262', flag: '🇷🇪', name: 'Réunion' },
    { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
    { code: '+264', flag: '🇳🇦', name: 'Namibia' },
    { code: '+265', flag: '🇲🇼', name: 'Malawi' },
    { code: '+266', flag: '🇱🇸', name: 'Lesotho' },
    { code: '+267', flag: '🇧🇼', name: 'Botswana' },
    { code: '+268', flag: '🇸🇿', name: 'Eswatini' },
    { code: '+269', flag: '🇰🇲', name: 'Comoros' },
    { code: '+290', flag: '🇸🇭', name: 'Saint Helena' },
    { code: '+291', flag: '🇪🇷', name: 'Eritrea' },
    { code: '+297', flag: '🇦🇼', name: 'Aruba' },
    { code: '+298', flag: '🇫🇴', name: 'Faroe Islands' },
    { code: '+299', flag: '🇬🇱', name: 'Greenland' },
    { code: '+350', flag: '🇬🇮', name: 'Gibraltar' },
    { code: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
    { code: '+353', flag: '🇮🇪', name: 'Ireland' },
    { code: '+354', flag: '🇮🇸', name: 'Iceland' },
    { code: '+355', flag: '🇦🇱', name: 'Albania' },
    { code: '+356', flag: '🇲🇹', name: 'Malta' },
    { code: '+357', flag: '🇨🇾', name: 'Cyprus' },
    { code: '+358', flag: '🇫🇮', name: 'Finland' },
    { code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
    { code: '+370', flag: '🇱🇹', name: 'Lithuania' },
    { code: '+371', flag: '🇱🇻', name: 'Latvia' },
    { code: '+372', flag: '🇪🇪', name: 'Estonia' },
    { code: '+373', flag: '🇲🇩', name: 'Moldova' },
    { code: '+374', flag: '🇦🇲', name: 'Armenia' },
    { code: '+375', flag: '🇧🇾', name: 'Belarus' },
    { code: '+376', flag: '🇦🇩', name: 'Andorra' },
    { code: '+377', flag: '🇲🇨', name: 'Monaco' },
    { code: '+378', flag: '🇸🇲', name: 'San Marino' },
    { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
    { code: '+381', flag: '🇷🇸', name: 'Serbia' },
    { code: '+382', flag: '🇲🇪', name: 'Montenegro' },
    { code: '+383', flag: '🇽🇰', name: 'Kosovo' },
    { code: '+385', flag: '🇭🇷', name: 'Croatia' },
    { code: '+386', flag: '🇸🇮', name: 'Slovenia' },
    { code: '+387', flag: '🇧🇦', name: 'Bosnia and Herzegovina' },
    { code: '+389', flag: '🇲🇰', name: 'North Macedonia' },
    { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
    { code: '+421', flag: '🇸🇰', name: 'Slovakia' },
    { code: '+423', flag: '🇱🇮', name: 'Liechtenstein' },
    { code: '+500', flag: '🇫🇰', name: 'Falkland Islands' },
    { code: '+501', flag: '🇧🇿', name: 'Belize' },
    { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
    { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
    { code: '+504', flag: '🇭🇳', name: 'Honduras' },
    { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
    { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
    { code: '+507', flag: '🇵🇦', name: 'Panama' },
    { code: '+508', flag: '🇵🇲', name: 'Saint Pierre and Miquelon' },
    { code: '+509', flag: '🇭🇹', name: 'Haiti' },
    { code: '+590', flag: '🇬🇵', name: 'Guadeloupe' },
    { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
    { code: '+592', flag: '🇬🇾', name: 'Guyana' },
    { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
    { code: '+594', flag: '🇬🇫', name: 'French Guiana' },
    { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
    { code: '+596', flag: '🇲🇶', name: 'Martinique' },
    { code: '+597', flag: '🇸🇷', name: 'Suriname' },
    { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
    { code: '+599', flag: '🇨🇼', name: 'Curaçao' },
    { code: '+670', flag: '🇹🇱', name: 'East Timor' },
    { code: '+672', flag: '🇦🇶', name: 'Antarctica' },
    { code: '+673', flag: '🇧🇳', name: 'Brunei' },
    { code: '+674', flag: '🇳🇷', name: 'Nauru' },
    { code: '+675', flag: '🇵🇬', name: 'Papua New Guinea' },
    { code: '+676', flag: '🇹🇴', name: 'Tonga' },
    { code: '+677', flag: '🇸🇧', name: 'Solomon Islands' },
    { code: '+678', flag: '🇻🇺', name: 'Vanuatu' },
    { code: '+679', flag: '🇫🇯', name: 'Fiji' },
    { code: '+680', flag: '🇵🇼', name: 'Palau' },
    { code: '+681', flag: '🇼🇫', name: 'Wallis and Futuna' },
    { code: '+682', flag: '🇨🇰', name: 'Cook Islands' },
    { code: '+683', flag: '🇳🇺', name: 'Niue' },
    { code: '+684', flag: '🇦🇸', name: 'American Samoa' },
    { code: '+685', flag: '🇼🇸', name: 'Samoa' },
    { code: '+686', flag: '🇰🇮', name: 'Kiribati' },
    { code: '+687', flag: '🇳🇨', name: 'New Caledonia' },
    { code: '+688', flag: '🇹🇻', name: 'Tuvalu' },
    { code: '+689', flag: '🇵🇫', name: 'French Polynesia' },
    { code: '+690', flag: '🇹🇰', name: 'Tokelau' },
    { code: '+691', flag: '🇫🇲', name: 'Micronesia' },
    { code: '+692', flag: '🇲🇭', name: 'Marshall Islands' },
    { code: '+850', flag: '🇰🇵', name: 'North Korea' },
    { code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
    { code: '+853', flag: '🇲🇴', name: 'Macau' },
    { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
    { code: '+856', flag: '🇱🇦', name: 'Laos' },
    { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    { code: '+886', flag: '🇹🇼', name: 'Taiwan' },
    { code: '+960', flag: '🇲🇻', name: 'Maldives' },
    { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
    { code: '+962', flag: '🇯🇴', name: 'Jordan' },
    { code: '+963', flag: '🇸🇾', name: 'Syria' },
    { code: '+964', flag: '🇮🇶', name: 'Iraq' },
    { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+967', flag: '🇾🇪', name: 'Yemen' },
    { code: '+968', flag: '🇴🇲', name: 'Oman' },
    { code: '+970', flag: '🇵🇸', name: 'Palestine' },
    { code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
    { code: '+972', flag: '🇮🇱', name: 'Israel' },
    { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
    { code: '+974', flag: '🇶🇦', name: 'Qatar' },
    { code: '+975', flag: '🇧🇹', name: 'Bhutan' },
    { code: '+976', flag: '🇲🇳', name: 'Mongolia' },
    { code: '+977', flag: '🇳🇵', name: 'Nepal' },
    { code: '+992', flag: '🇹🇯', name: 'Tajikistan' },
    { code: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
    { code: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
    { code: '+995', flag: '🇬🇪', name: 'Georgia' },
    { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
    { code: '+998', flag: '🇺🇿', name: 'Uzbekistan' }
  ];

  // Sort countries alphabetically by name
  const countries = countriesUnsorted.sort((a, b) => a.name.localeCompare(b.name));
  
  const texts = [
    "Own Your AI. Protect Your Data. Scale Without Limits.",
    "Transform your AI strategy with purpose-built Small Language Models that deliver enterprise-grade results at a fraction of the cost.",
    "The Smart Alternative to Expensive LLM APIs"
  ];

  const metrics = [
    { icon: TrendingDown, value: 80, suffix: '%', label: 'Cost Reduction' },
    { icon: Zap, value: 3, suffix: 'x', label: 'Faster Performance' },
    { icon: Shield, value: 100, suffix: '%', label: 'Data Privacy' }
  ];

  useEffect(() => {
    if (textIndex < texts.length) {
      if (charIndex < texts[textIndex].length) {
        const timeout = setTimeout(() => {
          setCurrentText(texts[textIndex].substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setTextIndex(textIndex + 1);
          setCharIndex(0);
        }, 0);
        return () => clearTimeout(timeout);
      }
    }
  }, [textIndex, charIndex, texts]);

  const [counters, setCounters] = useState(metrics.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => {
      metrics.forEach((metric, index) => {
        let currentValue = 0;
        const increment = Math.ceil(metric.value / 50);
        const interval = setInterval(() => {
          currentValue += increment;
          if (currentValue >= metric.value) {
            currentValue = metric.value;
            clearInterval(interval);
          }
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = currentValue;
            return newCounters;
          });
        }, 50);
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section-dark section-transition relative min-h-screen flex items-center justify-center pt-20 pb-16 md:pb-32">
      {/* Light Theme Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20"></div>
        {/* Floating Geometric Elements - Light Theme */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-20 h-20 border border-blue-200/40 transform rotate-45 animate-float`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-left lg:col-span-3 px-4 sm:px-0">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text-dark">
                  {textIndex === 0 && currentText}
                  {textIndex === 0 && <span className="animate-pulse">|</span>}
                </span>
                {textIndex > 0 && (
                  <span className="gradient-text-dark">
                    Own Your AI. Protect Your Data. Scale Without Limits.
                  </span>
                )}
              </h1>
              
              {textIndex >= 1 && (
                <h2 className="text-xl md:text-2xl font-semibold mb-4 animate-fade-in leading-relaxed" style={{color: 'var(--dark-text-secondary)'}}>
                  {textIndex === 1 && currentText}
                  {textIndex === 1 && <span className="animate-pulse">|</span>}
                  {textIndex > 1 && "Transform your AI strategy with purpose-built Small Language Models that deliver enterprise-grade results at a fraction of the cost."}
                </h2>
              )}
              
              {textIndex >= 2 && (
                <p className="text-lg text-accent animate-fade-in-delay mb-8" style={{color: 'var(--accent-primary)'}}>
                  {textIndex === 2 && currentText}
                  {textIndex === 2 && <span className="animate-pulse">|</span>}
                  {textIndex > 2 && "The Smart Alternative to Expensive LLM APIs"}
                </p>
              )}
            </div>


            {/* Animated Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 animate-fade-in-delay-3">
              {metrics.map((metric, index) => (
                <div key={index} className="card-dark text-center p-3 md:p-4 backdrop-blur-sm rounded-xl">
                  <div className="flex justify-center mb-2">
                    <metric.icon className="h-5 w-5 md:h-6 md:w-6" style={{color: 'var(--accent-primary)'}} />
                  </div>
                  <div className="text-xl md:text-2xl font-bold mb-1" style={{color: 'var(--dark-text-primary)'}}>
                    {counters[index]}{metric.suffix}
                  </div>
                  <div className="text-xs md:text-sm font-medium" style={{color: 'var(--dark-text-tertiary)'}}>{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="card-dark backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-2xl animate-fade-in-delay lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1" style={{color: 'var(--dark-text-primary)'}}>Get Started Today</h3>
              <p className="text-sm" style={{color: 'var(--dark-text-secondary)'}}>Book a consultation with our AI experts</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name and Business Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-text-secondary)'}}>
                    Full Name <span style={{color: 'var(--accent-primary)'}}>*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="input-dark w-full px-3 py-3 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-text-secondary)'}}>
                    Business Email <span style={{color: 'var(--accent-primary)'}}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-dark w-full px-3 py-3 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Company Name and Role/Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-text-secondary)'}}>
                    Company Name <span style={{color: 'var(--accent-primary)'}}>*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="input-dark w-full px-3 py-3 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-text-secondary)'}}>
                    Your Role / Title <span style={{color: 'var(--accent-primary)'}}>*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="input-dark w-full px-3 py-3 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Phone Number and Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-text-secondary)'}}>
                    Phone Number <span style={{color: 'var(--dark-text-tertiary)'}}>(Optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <select
                        name="countryName"
                        value={formData.countryName}
                        onChange={handleInputChange}
                        className="input-dark w-28 px-3 py-3 rounded-lg text-transparent text-sm appearance-none"
                        style={{
                          backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 8px center',
                          backgroundSize: '16px'
                        }}
                      >
                        {countries.map((country) => (
                          <option key={country.name} value={country.name}>
                            {country.flag} {country.name} ({country.code})
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-0 pointer-events-none flex items-center px-3 text-sm" style={{color: 'var(--dark-text-primary)'}}>
                        {(() => {
                          const selectedCountry = countries.find(c => c.name === formData.countryName);
                          return selectedCountry ? `${selectedCountry.flag} ${selectedCountry.code}` : '🇺🇸 +1';
                        })()}
                      </div>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-dark flex-1 px-3 py-3 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: 'var(--dark-text-secondary)'}}>
                  Additional Information <span style={{color: 'var(--dark-text-tertiary)'}}>(Optional)</span>
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-dark w-full px-3 py-3 rounded-lg resize-none"
                />
              </div>

              {/* Privacy Policy */}
              <div className="flex items-start space-x-3 p-3 rounded-lg border" style={{backgroundColor: 'var(--dark-bg-secondary)', borderColor: 'var(--dark-border)'}}>
                <input
                  type="checkbox"
                  id="privacy"
                  className="mt-1 h-4 w-4 rounded focus:ring-2"
                  style={{color: 'var(--accent-primary)', backgroundColor: 'var(--dark-bg-primary)', borderColor: 'var(--dark-border)'}}
                  required
                />
                <label htmlFor="privacy" className="text-sm leading-relaxed" style={{color: 'var(--dark-text-secondary)'}}>
                  I agree to Minitrix's{' '}
                  <a href="#" className="underline font-medium hover:opacity-80" style={{color: 'var(--accent-primary)'}}>
                    Privacy Policy
                  </a>{' '}
                  and consent to receive occasional updates. <span style={{color: 'var(--accent-primary)'}}>*</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary-dark w-full px-6 py-3 rounded-lg font-bold"
              >
                Book Your Demo
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;