import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ContactUs = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });
  const [showSuccessPanel, setShowSuccessPanel] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submissionStatus !== 'idle' || showSuccessPanel) {
      setSubmissionStatus('idle');
      setErrorMessage('');
      setShowSuccessPanel(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
      setSubmissionStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setSubmissionStatus('sending');
    setErrorMessage('');
    setShowSuccessPanel(false);

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log('Email successfully sent!', result.text);
        setSubmissionStatus('idle');
        setShowSuccessPanel(true);
        setFormData({ from_name: '', from_email: '', subject: '', message: '' });
      }, (error) => {
        console.error('Email sending failed:', error.text);
        setSubmissionStatus('error');
        setErrorMessage('Failed to send message. Please try again later.');
      });
  };

  const handleSendAnotherMessage = () => {
    setShowSuccessPanel(false);
    setSubmissionStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-cream-50 font-poppins py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          className="text-4xl font-bold text-center text-orange-800 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="text-center text-gray-700 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Have a question, feedback, or just want to say hello? Fill out the form below
          and we'll get back to you as soon as possible!
        </motion.p>

        {!showSuccessPanel ? (
          <motion.form
            ref={form}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-6 bg-white p-8 rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {submissionStatus === 'sending' && (
              <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded-lg text-center animate-pulse" role="alert">
                Sending your message...
              </div>
            )}
            {submissionStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
                Error: {errorMessage}
              </div>
            )}
            <div>
              <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="from_name"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Your Name"
                required
                aria-label="Name"
              />
            </div>
            <div>
              <label htmlFor="from_email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="from_email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="your.email@example.com"
                required
                aria-label="Email"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Regarding your order / Feedback / General inquiry"
                required
                aria-label="Subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-y"
                placeholder="Your message..."
                required
                aria-label="Message"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
                disabled={submissionStatus === 'sending'}
                aria-label="Send Message"
              >
                {submissionStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-orange-800 mb-2">
              Message Sent Successfully!
            </h2>
            <p className="text-gray-700 mb-6">
              Thank you for contacting us. We will get back to you as soon as possible.
            </p>
            <button
              onClick={handleSendAnotherMessage}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label="Send Another Message"
            >
              Send Another Message
            </button>
          </motion.div>
        )}

        <motion.div
          className="mt-12 text-center text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-orange-800 mb-4">Find Us</h2>
          <p className="mb-2">QuickServe</p>
          <p className="mb-2">123 Foodie Lane, Culinary City, FC 98765</p>
          <p className="mb-2">Phone: (123) 456-7890</p>
          <p className="mb-2">Email: info@quickserve.com</p>
          <div className="mt-4 flex justify-center space-x-4">
            {/* Add social media icons if desired */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;