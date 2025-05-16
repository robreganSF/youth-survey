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
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("survey_responses").insert([formData]);
    setSubmitted(true);
  };

  if (submitted) return <p className="text-center text-green-600 mt-10">✅ Thanks! Your response has been saved.</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-center">⚾ Youth Baseball Survey</h2>

      <label className="block">
        Role:
        <select name="role" value={formData.role} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select</option>
          <option>Coach</option>
          <option>Parent</option>
          <option>Umpire</option>
          <option>League Admin</option>
          <option>Other</option>
        </select>
      </label>

      <label className="block">
        How often are strike-zone calls a problem?
        <select name="strike_zone_issue_freq" value={formData.strike_zone_issue_freq} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select</option>
          <option>Rarely</option>
          <option>Occasionally</option>
          <option>Often</option>
          <option>Constantly</option>
        </select>
      </label>

      <label className="block">
        How hard is it to find qualified umpires?
        <select name="umpire_difficulty" value={formData.umpire_difficulty} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select</option>
          <option>Not hard</option>
          <option>Sometimes hard</option>
          <option>Very hard</option>
          <option>Near impossible</option>
        </select>
      </label>

      <label className="block">
        Would you pay for a consistent strike-zone tool?
        <select name="would_pay" value={formData.would_pay} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select</option>
          <option>Yes</option>
          <option>Maybe</option>
          <option>No</option>
        </select>
      </label>

      <label className="block">
        Email (optional for follow-up):
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
      </label>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
}

export default SurveyForm;
