import { Zap, Clock, Shield, ArrowRight } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo2.svg";


interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Upload and print in seconds",
      color: "#ffc700",
      bgColor: "#ffc70020",
    },
    {
      icon: Clock,
      title: "Skip the Queue",
      description: "Choose your arrival time",
      color: "#0068a6",
      bgColor: "#0068a620",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Online or cash options",
      color: "#ec008c",
      bgColor: "#ec008c20",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden w-full">
      {/* Hero Section */}
      <div className="relative w-full">
        {/* Decorative Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "#ec008c" }}
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "#0068a6" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: "#ffc700" }}
          />
        </div>

        {/* Header */}
        <header className="relative px-6 lg:px-12 xl:px-20 py-6 flex items-center justify-between w-full">
          <img src={logo} alt="PrintFy" style={{ height: "400px" }} />
          <button
            onClick={onGetStarted}
            className="px-6 py-2 rounded-full text-white font-medium text-sm hover:scale-105 transition-transform"
            style={{
              background: "#ec008c",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Login
          </button>
        </header>

        {/* Hero Content */}
        <div className="relative px-6 lg:px-12 xl:px-20 pt-12 pb-20 w-full">
          <div className="text-center w-full">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border-2" style={{ borderColor: "#e9a600", background: "#e9a60010" }}>
              <span className="text-sm font-medium" style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#231f20" }}>
                Pakistan's Smartest Campus Print Solution
              </span>
            </div>

            {/* Main Headline */}
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", color: "#231f20" }}
            >
              Skip the line.
              <br />
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #ec008c 0%, #0068a6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Not the print.
              </span>
            </h2>

            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto px-4"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Upload your documents, choose your time, and breeze past the queue. PrintFy makes campus printing effortless.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onGetStarted}
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #ec008c 0%, #812c2c 100%)",
                  fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
                }}
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all border-3"
                style={{
                  fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
                  color: "#231f20",
                  borderWidth: "3px",
                  borderColor: "#231f20",
                }}
              >
                Watch Demo
              </button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 hidden lg:block animate-bounce">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg rotate-12"
              style={{ background: "#ffc700" }}
            >
          
          </div>
          </div>
          <div className="absolute top-40 right-10 hidden lg:block animate-bounce" style={{ animationDelay: "0.5s" }}>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: "#0068a6" }}
            >
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 lg:px-12 xl:px-20 py-20 w-full" style={{ background: "#f8f9fa" }}>
        <div className="w-full">
          <div className="text-center mb-16">
            <h3
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", color: "#231f20" }}
            >
              Why students{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #ec008c 0%, #ffc700 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                love
              </span>{" "}
              PrintFy
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-600" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
              Built for busy students who value their time
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2"
                style={{
                  borderWidth: "3px",
                  borderColor: hoveredFeature === index ? feature.color : "transparent",
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform transition-transform"
                  style={{
                    background: feature.bgColor,
                    transform: hoveredFeature === index ? "scale(1.1) rotate(5deg)" : "scale(1)",
                  }}
                >
                  <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <h4
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", color: "#231f20" }}
                >
                  {feature.title}
                </h4>
                <p className="text-gray-600" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 lg:px-12 xl:px-20 py-20 w-full">
        <div className="w-full">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 text-center">
            <div>
              <div
                className="text-5xl sm:text-6xl font-bold mb-2"
                style={{
                  fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
                  background: "linear-gradient(135deg, #0068a6 0%, #ec008c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                10K+
              </div>
              <p className="text-gray-600 font-medium" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                Documents Printed
              </p>
            </div>
            <div>
              <div
                className="text-5xl sm:text-6xl font-bold mb-2"
                style={{
                  fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
                  background: "linear-gradient(135deg, #ffc700 0%, #e9a600 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                500+
              </div>
              <p className="text-gray-600 font-medium" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                Happy Students
              </p>
            </div>
            <div>
              <div
                className="text-5xl sm:text-6xl font-bold mb-2"
                style={{
                  fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
                  background: "linear-gradient(135deg, #ec008c 0%, #812c2c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                5min
              </div>
              <p className="text-gray-600 font-medium" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                Average Wait Time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20" style={{ background: "#231f20" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h3
            className="text-4xl sm:text-5xl font-bold mb-6 text-white"
            style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}
          >
            Ready to print smarter?
          </h3>
          <p className="text-lg text-gray-300 mb-10" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            Join hundreds of students already using PrintFy
          </p>
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold hover:scale-105 transition-all shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #ffc700 0%, #e9a600 100%)",
              color: "#231f20",
              fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
            }}
          >
            Start Printing Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src={logo} alt="PrintFy" style={{ height: "00px" }} />
          <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            © 2026 PrintFy. Making campus printing delightful.
          </p>
        </div>
      </footer>
    </div>
  );
}