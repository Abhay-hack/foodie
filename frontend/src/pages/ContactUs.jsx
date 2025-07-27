// frontend/src/pages/ContactUs.jsx
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser'; // Import emailjs
// Removed: import { toast } from 'react-toastify'; // No longer using react-toastify for this

const ContactUs = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });

  // NEW STATE: To control the visibility of the success message panel
  const [showSuccessPanel, setShowSuccessPanel] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'sending', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset status when user starts typing again
    if (submissionStatus !== 'idle' || showSuccessPanel) {
      setSubmissionStatus('idle');
      setErrorMessage('');
      setShowSuccessPanel(false); // Hide success panel if user starts typing again
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
    setShowSuccessPanel(false); // Ensure success panel is hidden during submission attempt

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log('Email successfully sent!', result.text);
        setSubmissionStatus('idle'); // Reset status to idle after success
        setShowSuccessPanel(true); // Show the success panel
        setFormData({ from_name: '', from_email: '', subject: '', message: '' }); // Clear form
      }, (error) => {
        console.error('Email sending failed:', error.text);
        setSubmissionStatus('error');
        setErrorMessage('Failed to send message. Please try again later.');
      });
  };

  const handleSendAnotherMessage = () => {
    setShowSuccessPanel(false); // Hide the success panel
    setSubmissionStatus('idle'); // Reset status
    setErrorMessage(''); // Clear any messages
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Contact Us</h1>

      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Have a question, feedback, or just want to say hello? Fill out the form below
        and we'll get back to you as soon as possible!
      </p>

      {/* Conditionally render the form or the success panel */}
      {!showSuccessPanel ? (
        // FORM SECTION
        <form ref={form} onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white p-8 rounded-lg shadow-md transition-opacity duration-500">
          {/* Inline Submission Status Message for Sending/Error */}
          {submissionStatus === 'sending' && (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative text-center animate-pulse" role="alert">
              Sending your message...
            </div>
          )}
          {submissionStatus === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
              Error: {errorMessage || 'Something went wrong. Please try again.'}
            </div>
          )}

          <div>
            <label htmlFor="from_name" className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="from_name"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label htmlFor="from_email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="from_email"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Regarding your order / Feedback / General inquiry"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
              placeholder="Your message..."
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
              disabled={submissionStatus === 'sending'}
            >
              {submissionStatus === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      ) : (
        // SUCCESS PANEL SECTION
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in-up transition-opacity duration-700 ease-out">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Message Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for contacting us. We will get back to you as soon as possible.</p>
          <button
            onClick={handleSendAnotherMessage}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      )}

      {/* Optional: Add direct contact info below the form/panel */}
      <div className="mt-12 text-center text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Find Us</h2>
        <p className="mb-2">
          [Your Restaurant Name]
        </p>
        <p className="mb-2">
          123 Foodie Lane, Culinary City, FC 98765
        </p>
        <p className="mb-2">
          Phone: (123) 456-7890
        </p>
        <p className="mb-2">
          Email: info@[yourrestaurant].com
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          {/* Add social media icons here if desired */}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;