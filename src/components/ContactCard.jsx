import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageSquare, 
  Building, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Hubungi kami via email",
    value: "bombersoftgen@gmail.com",
    link: "mailto:muhammaddwifebrian@gmail.com",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Berbicara langsung dengan tim kami",
    value: "+62 813-4767-575",
    link: "https://wa.me/6283134767575",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Kantor kita",
    value: "Situbondo, Jawa Timur, Indonesia",
    link: "",
    gradient: "from-purple-500/20 to-pink-500/20",
  }
];

export function ContactCard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section className="relative py-16 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Form Section */}
          <div className="space-y-8" data-aos="fade-out">
            <div>
              <h3 className="text-3xl font-bold text-black mb-3">Send us a message</h3>
              <p className="text-black text-base">
                Konsultasikan project kamu, dan kami akan membalasnya dalam 24 jam
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3.5 bg-black/[0.08] border rounded-xl text-black placeholder-black/40 focus:outline-none focus:border-indigo-400 transition-all text-sm ${
                          errors.name ? 'border-red-400' : 'border-black/[0.15]'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>
                      )}
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black/40" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3.5 bg-black/[0.08] border rounded-xl text-black placeholder-black/40 focus:outline-none focus:border-indigo-400 transition-all text-sm ${
                          errors.email ? 'border-red-400' : 'border-black/[0.15]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black/40" />
                    <input
                      type="text"
                      placeholder="Company (Optional)"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-black/[0.08] border border-black/[0.15] rounded-xl text-black placeholder-black/40 focus:outline-none focus:border-indigo-400 transition-all text-sm"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-black/40" />
                    <textarea
                      placeholder="Tell us about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3.5 bg-black/[0.08] border rounded-xl text-black placeholder-black/40 focus:outline-none focus:border-indigo-400 transition-all resize-none text-sm ${
                        errors.message ? 'border-red-400' : 'border-black/[0.15]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group bg-[#259141] hover:bg-[#1F7338] text-white font-medium py-3.5 px-6 rounded-xl transition-all disabled:opacity-50 text-sm"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10 bg-black/[0.03] border border-black/10 rounded-2xl"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Message Sent!</h3>
                  <p className="text-gray-300 text-sm mb-6 max-w-xs mx-auto">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', company: '', message: '' });
                    }}
                    className="px-5 py-2.5 bg-black/[0.08] border border-black/[0.15] rounded-xl text-black hover:bg-black/[0.12] transition-all text-xs font-medium"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Contact Methods & Guarantee */}
          <div className="space-y-8">
            <div data-aos="fade-out">
              <h3 className="text-3xl font-bold text-black mb-3">Other ways to reach us</h3>
              <p className="text-gray-800 text-base">
                Pilh salah satu cara untuk menghubungi kami
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  className="block p-5 bg-[#2db34e5a] backdrop-blur-md rounded-2xl border border-black/[0.1] hover:bg-[#25914150] transition-all group"
                  data-aos="fade-out" data-aos-delay={index * 200}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient} border border-black/10 flex items-center justify-center shrink-0`}>
                      <method.icon className="w-6 h-6 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-gray-700 mb-0.5">{method.title}</h4>
                      <p className="text-black/60 text-xs mb-1 truncate">{method.description}</p>
                      <p className="text-black text-sm font-medium truncate">{method.value}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-black/30 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}