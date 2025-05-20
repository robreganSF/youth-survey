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

  const [submitted, setSubmitted] = useState(false);
  const [submittedWithoutEmail, setSubmittedWithoutEmail] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [lateEmail, setLateEmail] = useState("");

  useEffect(() => {
    // Get ref from URL parameters
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || 'unknown';
    setFormData(prev => ({ ...prev, ref }));
  }, []);

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

  const handleSubmitWithoutEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("survey_responses").insert([formData]);
    setSubmittedWithoutEmail(true);
  };

  const handleLateEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("survey_responses").insert([{ ...formData, subscribe_email: lateEmail }]);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🎉 You're on the list!</h2>
          <p className="text-gray-600 mb-6">Thanks for stepping up. Keep an eye out for an email from surveys@bigleagueballpark.com. No spam. Just one more deeper survey to hone in our upcoming solution. We also promise a BIG reveal within a few weeks on exactly what we are bringing to market. You will be the first to know.</p>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-2">Want to share this survey with anyone as passionate about the game as you?</p>
            <a 
              href="https://baseball-survey.vercel.app/ref=survey" 
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Share this link
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (submittedWithoutEmail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your answers help us understand the real problems around youth and amateur umpiring — and how to fix them.</p>
          <p className="text-gray-600 mb-6">We're working on something new and revolutionary. If you're curious or want to stay in the loop, there's still time to join the early-access list by providing your email address. We are only collecting emails for one additional survey, and to announce our solution once it is ready. No spam, ever!</p>
          
          <form onSubmit={handleLateEmailSubmit} className="space-y-4">
            <input
              type="email"
              value={lateEmail}
              onChange={(e) => setLateEmail(e.target.value)}
              className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring text-base text-foreground"
              placeholder="your@email.com"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg text-lg font-bold hover:bg-secondary transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              Count Me In
            </button>
          </form>
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

          {/* Submission Options Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground text-center">Before you finish…</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Option 1: Count Me In */}
              <div className="bg-card p-8 rounded-xl shadow-sm border border-border flex flex-col">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Want to see what other coaches, parents & umpires are saying?
                </h3>
                <p className="text-base text-muted-foreground mb-6">
                  Enter your email to get early access to full survey results — and be first to preview the solution we're building to restore fairness and reduce drama behind the plate.
                </p>
                <div className="space-y-4 mt-auto">
                  <input
                    type="email"
                    name="subscribe_email"
                    value={formData.subscribe_email}
                    onChange={handleChange}
                    className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring text-base text-foreground"
                    placeholder="your@email.com"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg text-lg font-bold hover:bg-secondary transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Count Me In
                  </button>
                  <p className="text-sm text-muted-foreground text-center">
                    No spam. No selling. Just value for baseball people like you.
                  </p>
                </div>
              </div>

              {/* Option 2: Submit Without Email */}
              <div className="bg-card p-8 rounded-xl shadow-sm border border-border flex flex-col">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Prefer to stay anonymous?
                </h3>
                <p className="text-base text-muted-foreground mb-6">
                  You can still submit your answers without sharing your email.
                </p>
                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={handleSubmitWithoutEmail}
                    className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-lg text-lg font-bold hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Submit Without Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SurveyForm;
