import {
  Code,
  Users,
  BarChart3,
  Monitor,
  Eye,
  Zap,
  BookOpen,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Globe,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../global.css";
import { Editor } from "@monaco-editor/react";
import VisitorsCharts from "../component/VisitorsCharts";
import VisitorsEditors from "../component/VisitorsEditors";
import { useState } from "react";

export default function Visitors() {
  const cardsDummyData = [
    {
      icon: (
        <Monitor className="h-6 w-6 sm:h-8 sm:w-8 text-success group-hover:scale-110 transition-transform duration-300" />
      ),
      pulse: (
        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-success animate-bounce" />
      ),
      title: "Resizable Editors",
      color: "--su",
      text: "Comfort-first coding with fully resizable editors that adapt to your workflow and screen size. Drag, resize, and customize your coding environment.",
    },
    {
      icon: (
        <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-success group-hover:scale-110 transition-transform duration-300" />
      ),
      pulse: (
        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-success animate-bounce" />
      ),
      title: "Community Analytics",
      color: "--su",
      text: "Comprehensive insights into your coding community. Track progress, engagement, and many more events to come as we expand our analytics capabilities.",
    },
    {
      icon: (
        <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
      ),
      pulse: (
        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-secondary animate-spin" />
      ),
      title: "Easy Problem Creation",
      color: "--s",
      text: "Teachers can create and manage coding problems effortlessly. Say goodbye to pen-and-paper methods and hello to digital efficiency.",
    },
    {
      icon: (
        <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-info group-hover:scale-110 transition-transform duration-300" />
      ),
      pulse: (
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-info to-primary rounded-full animate-pulse" />
      ),
      title: "Eye-Friendly Dark Theme",
      color: "--in",
      text: "Designed for late-night coding sessions with a carefully crafted dark color palette that reduces eye strain and enhances focus.",
    },
    {
      icon: (
        <Users className="h-6 w-6 sm:h-8 sm:w-8 text-warning group-hover:scale-110 transition-transform duration-300" />
      ),
      pulse: (
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-warning rounded-full" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-warning rounded-full" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-warning rounded-full" />
        </div>
      ),
      title: "Built for Collaboration",
      color: "--wa",
      text: "Foster teamwork and learning in coding clubs and classroom environments. Connect, share, and grow together as a coding community.",
    },
    {
      icon: (
        <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-accent group-hover:scale-110 transition-transform duration-300" />
      ),
      pulse: (
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent rounded-full animate-ping" />
      ),
      title: "Assignment Ready",
      color: "--a",
      text: "Perfect for completing late-night coding assignments with all the tools you need. Streamlined workflow for maximum productivity.",
    },
  ];
  const [lightMode, setLightMode] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-300 text-base-content min-w-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-base-200 bg-base-300/95 backdrop-blur supports-[backdrop-filter]:bg-base-300/60">
        <div className="container mx-auto px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <span className="text-lg sm:text-xl font-bold">Paperless Code</span>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button
              className="btn btn-primary btn-sm sm:btn-md transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/40 animate-pulse text-xs sm:text-sm"
              onClick={() => setLightMode(true)}
            >
              Light Mode
            </button>
            <button
              className="btn btn-primary btn-sm sm:btn-md transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/40 animate-pulse text-xs sm:text-sm"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center py-12 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="badge badge-secondary bg-primary/20 text-primary-content border-primary/50 text-xs sm:text-sm">
                  Built for Educational Excellence
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="whitespace-nowrap inline-block overflow-hidden border-r-4 border-primary animate-typing text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    No more Paper !
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-base-content/80 leading-relaxed">
                  Paperless Code is designed for colleges, coding clubs, and
                  classrooms, converting the traditional pen-and-paper coding
                  approach into a dynamic, trackable, and collaborative coding
                  experience.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500 justify-center lg:justify-start">
                <button className="btn btn-primary btn-md sm:btn-lg transition-transform duration-300 ease-out hover:scale-105 active:scale-95" onClick={()=>navigate("/signup")}>
                  Get Started Free
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <div className="bg-base-200 rounded-lg p-4 sm:p-6 border border-base-content/10 shadow-2xl min-h-[200px] sm:min-h-[300px]">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-error rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-warning rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-success rounded-full"></div>
                  <span className="text-base-content/60 text-xs sm:text-sm ml-4">
                    algorithm.js
                  </span>
                </div>
                <div className="hidden sm:block">
                  <Editor
                    height="400px"
                    language="javascript"
                    theme="vs-dark"
                    value={`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

const result = binarySearch([1, 3, 5, 7, 9], 5);
console.log(result); // Output: 2`}
                    options={{
                      readOnly: false,
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: "on",
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      detectIndentation: false,
                      formatOnPaste: false,
                      formatOnType: false,
                    }}
                    onChange={() => {}}
                  />
                </div>
                <div className="block sm:hidden">
                  <pre className="text-xs text-success overflow-x-auto">
                    <code>{`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}`}</code>
                  </pre>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-secondary rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-12 sm:py-20 bg-base-200">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Not Just Another Code Editor 
            </h2>
            <p className="text-lg sm:text-xl text-base-content/80 max-w-3xl mx-auto backdrop-blur-sm bg-base-200/50 px-4 py-2 rounded-lg border border-primary/30 shadow-[0_0_20px_1px_var(--tw-shadow-color)] shadow-secondary/20">
              No fancy features, but features that matters to your organisation!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {cardsDummyData.map((card, index) => (
              <div
                key={index}
                className="relative group transition-transform duration-500 hover:scale-[1.03]"
              >
                <div
                  className="absolute inset-0 rounded-xl animated-border pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{
                    background: `linear-gradient(270deg, var(${card.color}), var(--p), var(${card.color}))`,
                  }}
                />

                <div
                  className="relative z-10 card bg-base-100 shadow-xl hover:shadow-2xl overflow-hidden border border-base-content/5 transition-all duration-300
                  flex flex-col h-full"
                >
                  <div className="card-body p-4 sm:p-6 flex flex-col justify-between h-full min-h-[200px] sm:min-h-[240px]">
                    <div className="flex items-center justify-between mb-2">
                      {card.icon}
                      {card.pulse}
                    </div>
                    <h2
                      className="card-title text-lg sm:text-xl transition-colors group-hover:text-[inherit]"
                      style={{ color: `var(${card.color})` }}
                    >
                      {card.title}
                    </h2>
                    <p className="text-sm sm:text-base text-base-content/70 mt-2">
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <VisitorsCharts />
        </div>
      </section>

      <div className="hidden lg:block">
        <VisitorsEditors />
      </div>

      {/* CTA Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Ditch Pen & Paper?
          </h2>
          <p className="text-lg sm:text-xl text-base-content/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join other Colleges, Coding Clubs, Cohorts, Global Assignments, and
            many more!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="btn btn-primary btn-md sm:btn-lg"
              onClick={() => navigate("/signup")}
            >
              Sign Up Today !
            </button>
          </div>
        </div>
      </section>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content border-t border-base-200">
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Paperless Code. All rights
            reserved.
          </p>
        </div>
      </footer>

      {lightMode && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box max-w-sm sm:max-w-2xl mx-4">
            {/* Modal Title */}
            <h3 className="font-bold text-lg sm:text-xl text-error mb-2">
              ⚠️ Light Mode Attempt Detected!
            </h3>

            <p className="py-4 text-sm sm:text-base text-base-content/80">
              We tried switching to light mode... and our servers cried. 🤷‍♀️
              <br />
              <br />
              Turns out,{" "}
              <span className="font-semibold text-primary">
                night owls code better in the dark
              </span>
              . 🌙✨
              <br />
              Light mode is currently{" "}
              <span className="font-semibold">banned</span> until further
              notice. If we get overwhelmed with petitions (or memes), we might
              reconsider.
              <br />
              <br />
              Until then, please embrace the shadows. 🖤
            </p>

            <div className="modal-action">
              <button
                className="btn btn-error btn-sm sm:btn-md"
                onClick={() => setLightMode(false)}
              >
                Close Before It Breaks Again 😅
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
