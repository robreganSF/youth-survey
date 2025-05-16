'use client';

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ⛳️ Replace these with your real values from Supabase API settings:
const supabase = createClient(
  "https://jqxgywfsylpelvmrczqe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxeGd5d2ZzeWxwZWx2bXJjenFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzgwMDEsImV4cCI6MjA2MjkxNDAwMX0.C_szIp6DECCtSN7c6zkhIUlXmvis6OY8tfnhFL5s8Yw"
);

function SurveyForm() {
  const [formData, setFormData] = useState({
    role: "",
    strike_zone_issue_freq: "",
    umpire_difficulty: "",
    would_pay: "",
    email: "",
    story: "",
    subscribe_email: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'story') {
      const newValue = e.target.value.slice(0, 350);
      setCharCount(newValue.length);
      setFormData({ ...formData, [e.target.name]: newValue });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("survey_responses").insert([formData]);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your response has been saved successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 font-['Inter']">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1f2937] mb-4">⚾ Youth & Amateur Baseball and Fastpitch Softball Survey</h1>
          <p className="text-lg font-medium text-gray-600">What's really happening with umpires in youth and amateur baseball? We want your take.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Role and Strike Zone Issues - Group 1 */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#d1d5db]">
              <label className="block text-lg font-bold text-[#1f2937] mb-4">
                1. Which best describes your role?
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[#d1d5db] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-[#1f2937]"
              >
                <option value="">Select your role</option>
                <option>Coach</option>
                <option>Parent</option>
                <option>Umpire</option>
                <option>League Admin</option>
                <option>Other</option>
              </select>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#d1d5db]">
              <label className="block text-lg font-bold text-[#1f2937] mb-4">
                2. How often are strike-zone calls a problem in your games?
              </label>
              <select
                name="strike_zone_issue_freq"
                value={formData.strike_zone_issue_freq}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[#d1d5db] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-[#1f2937]"
              >
                <option value="">Select frequency</option>
                <option>Rarely</option>
                <option>Occasionally</option>
                <option>Often</option>
                <option>Constantly</option>
              </select>
            </div>
          </div>

          {/* Umpire Difficulty and Payment - Group 2 */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#d1d5db]">
              <label className="block text-lg font-bold text-[#1f2937] mb-4">
                3. How hard is it to find enough qualified umpires?
              </label>
              <select
                name="umpire_difficulty"
                value={formData.umpire_difficulty}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[#d1d5db] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-[#1f2937]"
              >
                <option value="">Select difficulty level</option>
                <option>Not hard</option>
                <option>Sometimes hard</option>
                <option>Very hard</option>
                <option>Near impossible</option>
              </select>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#d1d5db]">
              <label className="block text-lg font-bold text-[#1f2937] mb-4">
                4. Would you pay for a tool that ensures consistent, accurate strike-zone calls when umps are unavailable or inconsistent?
              </label>
              <select
                name="would_pay"
                value={formData.would_pay}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[#d1d5db] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-[#1f2937]"
              >
                <option value="">Select an option</option>
                <option>Yes</option>
                <option>Maybe</option>
                <option>No</option>
              </select>
            </div>
          </div>

          {/* Story Section - Full Width */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-[#d1d5db]">
            <label className="block text-lg font-bold text-[#1f2937] mb-4">
              5. Got a story?
            </label>
            <p className="text-base text-gray-600 mb-4">
              Tell us about a blown call, no-show ump, or moment that made you say: "there's got to be a better way."
            </p>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
              className="w-full p-3 border border-[#d1d5db] rounded-lg min-h-[120px] resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-[#1f2937]"
              placeholder="Share your experience..."
            />
            <p className="text-sm text-gray-500 mt-2 text-right">
              {charCount}/350 characters
            </p>
          </div>

          {/* Email Section - Full Width */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-[#d1d5db]">
            <label className="block text-lg font-bold text-[#1f2937] mb-4">
              6. Want to learn how we plan to solve the umpire shortage and related sportsmanship issues and frustration?
            </label>
            <p className="text-base text-gray-600 mb-4">
              Share your email. We're a startup in stealth mode, but we're ready to reveal to the most passionate baseball and softball people.
            </p>
            <input
              type="email"
              name="subscribe_email"
              value={formData.subscribe_email}
              onChange={handleChange}
              className="w-full p-3 border border-[#d1d5db] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-[#1f2937]"
              placeholder="your@email.com"
            />
            <p className="text-sm text-gray-500 mt-2">
              No spam — just 1 more survey and a monthly update if you're interested.
            </p>
          </div>

          <button
            type="submit"
            className="w-full md:w-[300px] mx-auto block bg-[#1e3a8a] text-white py-4 px-6 rounded-lg text-lg font-bold hover:bg-[#3b82f6] transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            Count Me In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SurveyForm;
