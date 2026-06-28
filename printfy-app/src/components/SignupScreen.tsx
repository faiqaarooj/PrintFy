import { useState } from "react";

interface SignupScreenProps {
  onSignup: (name: string) => void;
  onSwitchToLogin: () => void;
}

export function SignupScreen({ onSignup, onSwitchToLogin }: SignupScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!name || !email || !studentId || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }
    setError("");
    onSignup(name);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] sm:min-h-[600px] px-3 sm:px-4">
      <div className="w-full max-w-[400px] bg-white rounded-xl p-6 sm:p-8 shadow-[0px_2px_8px_rgba(0,0,0,0.06)]">
        {/* Logo */}
        <div className="text-center mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
            PrintFy
          </h1>
        </div>
        
        {/* Tagline */}
        <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          Join the smarter way to print
        </p>

        {/* Name Input */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="Enter your full name"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#EBEBEB] focus:outline-none focus:border-[#A8C5B5] transition-colors text-sm sm:text-base"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          />
        </div>

        {/* Email Input */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            University Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="your.email@university.edu.pk"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#EBEBEB] focus:outline-none focus:border-[#A8C5B5] transition-colors text-sm sm:text-base"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          />
        </div>

        {/* Student ID Input */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Student ID
          </label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => {
              setStudentId(e.target.value);
              setError("");
            }}
            placeholder="Enter your student ID"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#EBEBEB] focus:outline-none focus:border-[#A8C5B5] transition-colors text-sm sm:text-base"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          />
        </div>

        {/* Password Input */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Create a password"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#EBEBEB] focus:outline-none focus:border-[#A8C5B5] transition-colors text-sm sm:text-base"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-5 sm:mb-6">
          <label className="block text-xs sm:text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            placeholder="Confirm your password"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#EBEBEB] focus:outline-none focus:border-[#A8C5B5] transition-colors text-sm sm:text-base"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 sm:mb-4 px-3 py-2 rounded-lg bg-red-50 border border-red-100">
            <p className="text-xs sm:text-sm text-red-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {error}
            </p>
          </div>
        )}

        {/* Create Account Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-[#1A1A2E] text-white py-2.5 sm:py-3 rounded-lg hover:bg-[#2A2A3E] transition-colors mb-3 sm:mb-4 text-sm sm:text-base"
          style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}
        >
          Create Account
        </button>

        {/* Switch to Login */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-500" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-[#A8C5B5] hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}