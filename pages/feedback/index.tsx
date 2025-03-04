import React, { useState } from 'react';
import Head from 'next/head';
import Heading from '../../components/Typography/heading';
import Paragraph from '../../components/Typography/paragraph';
import Button from '../../components/Buttons/button';
import { toast } from 'react-hot-toast';

interface FeedbackForm {
  name: string;
  email: string;
  category: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  category?: string;
  message?: string;
}

const FeedbackPage = () => {
  const [formData, setFormData] = useState<FeedbackForm>({
    name: '',
    email: '',
    category: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'General Feedback',
    'Technical Issues',
    'Speaker Suggestion',
    'Schedule Question',
    'Venue Question',
    'Other',
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      toast.success('Thank you for your feedback!');
      setFormData({
        name: '',
        email: '',
        category: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-primary-800 pt-16">
      <Head>
        <title>Feedback - AsyncAPI Conference</title>
        <meta name="description" content="Share your feedback about the AsyncAPI Conference" />
      </Head>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="text-lg sm:text-sm text-white font-semi-bold border-b-2 border-blue-400 mb-1 inline-block">
            Feedback
          </div>
          <Heading typeStyle="heading-md" className="text-gradient mt-4">
            Share Your Thoughts
          </Heading>
          <Paragraph typeStyle="body-lg" className="mt-6" textColor="text-gray-200">
            We value your feedback and are committed to making the AsyncAPI Conference better
          </Paragraph>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="max-w-2xl mx-auto card-bg p-8 rounded-xl"
        >
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-white mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md bg-gray-800 text-white border ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md bg-gray-800 text-white border ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Category Select */}
            <div>
              <label htmlFor="category" className="block text-white mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md bg-gray-800 text-white border ${
                  errors.category ? 'border-red-500' : 'border-gray-600'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="message" className="block text-white mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-2 rounded-md bg-gray-800 text-white border ${
                  errors.message ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Share your feedback or questions..."
              />
              {errors.message && (
                <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;