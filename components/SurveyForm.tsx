'use client';

import { useState, useEffect } from "react";
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
    ref: "unknown",
  });

  useEffect(() => {
    // Get ref from URL parameters
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || 'unknown';
    setFormData(prev => ({ ...prev, ref }));
  }, []);

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
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">⚾ Baseball & Softball Officiating Survey</h1>
          <p className="text-lg font-medium text-muted-foreground">From missed calls to missing umpires — tell us what you're seeing in the game today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Role and Strike Zone Issues - Group 1 */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
              <label className="block text-lg font-bold text-foreground mb-4">
                1. Which best describes your role?
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring text-base text-foreground"
              >
                <option value="">Select your role</option>
                <option>Coach</option>
                <option>Parent</option>
                <option>Umpire</option>
                <option>League Admin</option>
                <option>Other</option>
              </select>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
              <label className="block text-lg font-bold text-foreground mb-4">
                2. How often are strike-zone calls a problem in your games?
              </label>
              <select
                name="strike_zone_issue_freq"
                value={formData.strike_zone_issue_freq}
                onChange={handleChange}
                required
                className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring text-base text-foreground"
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
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
              <label className="block text-lg font-bold text-foreground mb-4">
                3. How hard is it to find enough qualified umpires?
              </label>
              <select
                name="umpire_difficulty"
                value={formData.umpire_difficulty}
                onChange={handleChange}
                required
                className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring text-base text-foreground"
              >
                <option value="">Select difficulty level</option>
                <option>Not hard</option>
                <option>Sometimes hard</option>
                <option>Very hard</option>
                <option>Near impossible</option>
              </select>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
              <label className="block text-lg font-bold text-foreground mb-4">
                4. Would you pay for a tool that ensures consistent, accurate strike-zone calls when umps are unavailable or inconsistent?
              </label>
              <select
                name="would_pay"
                value={formData.would_pay}
                onChange={handleChange}
                required
                className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring text-base text-foreground"
              >
                <option value="">Select an option</option>
                <option>Yes</option>
                <option>Maybe</option>
                <option>No</option>
              </select>
            </div>
          </div>

          {/* Story Section - Full Width */}
          <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
            <label className="block text-lg font-bold text-foreground mb-4">
              5. Got a story? (Optional)
            </label>
            <p className="text-base text-muted-foreground mb-4">
              Tell us about a blown call, no-show ump, or moment that made you say: "there's got to be a better way."
            </p>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
              className="w-full p-3 border border-input rounded-lg min-h-[120px] resize-y focus:ring-2 focus:ring-ring focus:border-ring text-base text-foreground"
              placeholder="Share your experience..."
            />
            <p className="text-sm text-muted-foreground mt-2 text-right">
              {charCount}/350 characters
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="submit"
              className="w-[200px] bg-gray-500 text-white py-3 px-4 rounded-lg text-base font-bold hover:bg-gray-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              Submit without Email
            </button>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">Or</span>
              <i className="fas fa-arrow-down text-[#3b82f6] text-4xl"></i>
            </div>
          </div>

          {/* Email Section - Full Width */}
          <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
            <label className="block text-lg font-bold text-foreground mb-4">
              Learn how we plan to solve the umpire shortage and related sportsmanship issues and frustration?
            </label>
            <p className="text-base text-muted-foreground mb-4">
              Want to help shape the future of amateur baseball & softball? Share your email for Part 2 of the survey—plus exclusive updates on what we're building. We'll never spam or sell your info.
            </p>
            <div className="mb-4">
              <p className="text-lg font-bold text-foreground mb-2">Enter your email</p>
              <input
                type="email"
                name="subscribe_email"
                value={formData.subscribe_email}
                onChange={handleChange}
                className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring text-base text-foreground"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-[300px] mx-auto block bg-primary text-primary-foreground py-4 px-6 rounded-lg text-lg font-bold hover:bg-secondary transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            Count Me In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SurveyForm;
