"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TextArea from "antd/es/input/TextArea";
import Lottie from "lottie-react";
import ContactAnim from "../../../public/anim/contact-us.json";
import emailjs from '@emailjs/browser';

interface Profile {
  id: number;
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  mobile_number: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  file: File | null;
}

export default function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    file: null
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const fadeInAnimationVariant = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/profile');
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
        setError('Failed to load contact information.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit.');
        e.target.value = '';
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        file: file
      }));
      setFileName(file.name);
      setError(null);
    }
  };

  // Clear file selection
  const clearFileSelection = () => {
    setFormData(prev => ({
      ...prev,
      file: null
    }));
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'File upload failed');
      }

      const data = await response.json();
      return data.fileUrl;
    } catch (err) {
      console.error('File upload error:', err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      let fileUrl = null;
      
      if (formData.file) {
        fileUrl = await uploadFile(formData.file);
        if (!fileUrl) {
          throw new Error('File upload failed. Please try again.');
        }
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: profile?.name || "Karen Jane Mana-ay",
        subject: formData.subject || 'Contact Form Message',
        message: formData.message,
        reply_to: formData.email,
        // Add file information to the email
        file_info: fileUrl ? `\n\nAttachment: ${window.location.origin}${fileUrl}` : ''
      };

      if (fileUrl) {
        templateParams.message = `${formData.message}\n\n📎 Attachment: ${fileName}\nDownload: ${fileUrl}`;
      }

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams
      );

      console.log('Email sent successfully:', response);

      if (process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID) {
        try {
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
            templateParams
          );
          console.log('Auto-reply sent successfully');
        } catch (autoReplyError) {
          console.error('Auto-reply failed:', autoReplyError);
        }
      }
      
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', file: null });
      setFileName('');
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error('Failed to send message:', err);
      
      if (err.text) {
        setError(`Failed to send message: ${err.text}`);
      } else if (err.message) {
        setError(`Failed to send message: ${err.message}`);
      } else {
        setError('Failed to send message. Please try again or contact directly via email.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col md:flex-row justify-center items-center mt-[-70px] md:mt-[-50px]">
      <div className="w-full md:w-1/2">
        <motion.div
          variants={fadeInAnimationVariant}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-[20px] md:mb-[40px]">
            Get in touch, let's talk.
          </h1>
          {profile && (
            <div className="text-center mb-[30px] md:mb-[60px]">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Reach out to <span className="font-semibold text-purple-600">{profile.name}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {profile.location}
              </p>
            </div>
          )}
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
          >
            <p className="font-medium">Message sent successfully!</p>
            <p className="text-sm">Thank you for reaching out. I'll get back to you soon.</p>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          >
            <p className="font-medium">Error:</p>
            <p className="text-sm">{error}</p>
          </motion.div>
        )}

        <form ref={formRef} onSubmit={handleSubmit}>
          <motion.div
            variants={fadeInAnimationVariant}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="flex flex-col md:flex-row mb-4 gap-4 md:gap-8"
          >
            <div className="relative w-full md:w-[427px]">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Name
              </label>
            </div>

            <div className="relative w-full md:w-[427px]">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Email address
              </label>
            </div>
          </motion.div>

          {/* Subject field */}
          <motion.div
            variants={fadeInAnimationVariant}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="relative w-full mb-4"
          >
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Subject (optional)
            </label>
          </motion.div>

          <motion.div
            variants={fadeInAnimationVariant}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="relative w-full mb-4"
          >
            <TextArea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className="block px-2.5 pb-2.5 pt-4 w-full h-[180px] text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Message
            </label>
          </motion.div>

          {/* File attachment */}
          <motion.div
            variants={fadeInAnimationVariant}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="mb-4"
          >
            <div className="flex items-center justify-between p-2 border border-gray-300 rounded-lg dark:border-gray-600">
              <div className="flex items-center">
                <label htmlFor="file-upload" className="flex items-center cursor-pointer">
                  <span className="inline-flex items-center justify-center w-8 h-8 mr-2 bg-purple-100 text-purple-600 rounded-full dark:bg-purple-900 dark:text-purple-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {fileName ? fileName : 'Attach a file (optional)'}
                  </span>
                </label>
                <input
                  id="file-upload"
                  name="file"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
              </div>
              {fileName && (
                <button
                  type="button"
                  onClick={clearFileSelection}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Max file size: 10MB. Supported formats: PDF, DOC, DOCX, TXT, JPG, JPEG, PNG
            </p>
          </motion.div>

          <motion.div
            variants={fadeInAnimationVariant}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="w-full"
          >
            <button
              type="submit"
              disabled={submitting}
              className={`text-white w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </motion.div>
        </form>

        {/* Contact Information */}
        {profile && (
          <motion.div
            variants={fadeInAnimationVariant}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-2">Direct Contact</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Email: <a href={`mailto:${profile.email}`} className="text-purple-600 hover:text-purple-800">{profile.email}</a>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Location: {profile.location}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Contact #: {profile.mobile_number}
            </p>
          </motion.div>
        )}
      </div>

      <motion.div
        variants={fadeInAnimationVariant}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className="h-2/5 w-full md:w-2/5"
      >
        <Lottie animationData={ContactAnim} />
      </motion.div>
    </div>
  );
}