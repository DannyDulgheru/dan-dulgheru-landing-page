import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from '@/services/contactService';
import { trackContactFormSubmission } from '@/services/analyticsService';
import { fetchContactInfo, ContactInfo } from '@/services/contentService';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const info = await fetchContactInfo();
        if (info) {
          setContactInfo(info);
        }
      } catch (error) {
        console.error("Error loading contact information:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContactInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Submit to Firebase
      const result = await submitContactForm(formData);
      
      if (result.success) {
        // Track the successful submission
        trackContactFormSubmission();
        
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Unable to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section id="contact" className="py-24 px-6 relative scroll-margin">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="w-12 h-12 border-t-4 border-white rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 relative scroll-margin">
      {/* Background Elements */}
      <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-gradient-secondary opacity-10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-gradient-primary opacity-5 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="uppercase tracking-[0.3em] text-gray-400 text-sm mb-3">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            <span className="text-gradient">{contactInfo?.title || "Contact"}</span> {contactInfo?.subtitle || "Me"}
          </h2>
          <p className="text-gray-300 mt-4 max-w-lg mx-auto">{contactInfo?.availability || "Have a project in mind? Let's work together to create something extraordinary."}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="glass-morphism rounded-2xl border border-white/10 p-8 md:p-10 relative overflow-hidden">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-display font-medium mb-4">Contact Information</h3>
                <p className="text-gray-300">Ready to start a project? Have questions about my services?</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-gray-300"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Phone</h4>
                    <p className="text-gray-300 mt-1">{contactInfo?.phone || "+1 (123) 456-7890"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-gray-300"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Email</h4>
                    <p className="text-gray-300 mt-1">{contactInfo?.email || "hello@motiondesign.com"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-gray-300"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Location</h4>
                    <p className="text-gray-300 mt-1">{contactInfo?.location || "Los Angeles, California"}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {contactInfo?.socialLinks ? (
                    contactInfo.socialLinks.map((social, index) => (
                      <a 
                        key={index} 
                        href={social.url} 
                        className="w-10 h-10 flex items-center justify-center rounded-full glass-morphism border border-white/10 hover:bg-white/10 transition-colors"
                        aria-label={`Visit my ${social.platform} profile`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">{social.platform}</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="text-gray-300"
                        >
                          {social.platform.toLowerCase() === 'twitter' && (
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          )}
                          {social.platform.toLowerCase() === 'instagram' && (
                            <>
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </>
                          )}
                          {social.platform.toLowerCase() === 'dribbble' && (
                            <>
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                            </>
                          )}
                          {social.platform.toLowerCase() === 'behance' && (
                            <>
                              <path d="M16.5 13.5h-7m1-6.5h5.5M6 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                              <circle cx="12" cy="12" r="10"></circle>
                            </>
                          )}
                          {social.platform.toLowerCase() === 'github' && (
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          )}
                          {social.platform.toLowerCase() === 'linkedin' && (
                            <>
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </>
                          )}
                        </svg>
                      </a>
                    ))
                  ) : (
                    // Fallback social links
                    ['twitter', 'instagram', 'dribbble', 'behance'].map((social) => (
                      <a 
                        key={social} 
                        href="#" 
                        className="w-10 h-10 flex items-center justify-center rounded-full glass-morphism border border-white/10 hover:bg-white/10 transition-colors"
                        aria-label={`Visit my ${social} profile`}
                      >
                        <span className="sr-only">{social}</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="text-gray-300"
                        >
                          {social === 'twitter' && (
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          )}
                          {social === 'instagram' && (
                            <>
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </>
                          )}
                          {social === 'dribbble' && (
                            <>
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                            </>
                          )}
                          {social === 'behance' && (
                            <>
                              <path d="M16.5 13.5h-7m1-6.5h5.5M6 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                              <circle cx="12" cy="12" r="10"></circle>
                            </>
                          )}
                        </svg>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-primary opacity-20 blur-3xl"></div>
          </div>
          
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="glass-morphism rounded-2xl border border-white/10 p-8 md:p-10 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  placeholder="Project inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-lg bg-gradient-primary text-white font-medium hover:opacity-90 transition-all flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              
              {/* Decorative Elements */}
              <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-gradient-secondary opacity-20 blur-3xl"></div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
