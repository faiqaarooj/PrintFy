import { useState } from "react";
import logo from "../assets/logo2.svg";

interface LoginScreenProps {
  onLogin: (name: string, type: "student" | "operator") => void;
  onSwitchToSignup: () => void;
}

export function LoginScreen({ onLogin, onSwitchToSignup }: LoginScreenProps) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!name || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== "1234") {
      setError("Incorrect password. Try again!");
      return;
    }
    setError("");
    if (name.toLowerCase() === "operator" || name.toLowerCase() === "admin") {
      onLogin(name, "operator");
    } else {
      onLogin(name, "student");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] sm:min-h-[600px] px-3 sm:px-4">
      <div className="w-full max-w-[400px] bg-white rounded-xl p-6 sm:p-8 shadow-[0px_2px_8px_rgba(0,0,0,0.06)]">
        
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src={logo} alt="PrintFy" className="h-28 sm:h-86" />
        </div>
       
        {/* Tagline */}
        <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          Skip the line. Not the print.
        </p>

        {/* Name Input */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            placeholder="Enter your name"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#EBEBEB] focus:outline-none focus:border-[#A8C5B5] transition-colors text-sm sm:text-base"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          />
        </div>

        {/* Password Input */}
        <div className="mb-5 sm:mb-6">
          <label className="block text-xs sm:text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            placeholder="Enter your password"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#EBEBEB] focus:outline-none focus:border-[#A8C5B5] transition-colors text-sm sm:text-base"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
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

        {/* Enter Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#1A1A2E] text-white py-2.5 sm:py-3 rounded-lg hover:bg-[#2A2A3E] transition-colors mb-3 sm:mb-4 text-sm sm:text-base text-center"
          style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}
        >
          Enter
        </button>

        {/* Switch to Signup */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-500" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Don't have an account?{" "}
            <button onClick={onSwitchToSignup} className="text-[#A8C5B5] hover:underline">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}