import React from "react";
import {
  GraduationCap,
  Users,
  Globe,
  BookOpen,
  Code2,
  TrendingUp,
  Zap,
  Star,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EnhancedSection() {
  const navigate = useNavigate();

  const cards = [
    {
      id: "teacher",
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Are You a College Admin or Educator?",
      frontSubtitle: "Say Goodbye to Outdated Classrooms",
      backTitle: "Empower Your Students, Effortlessly",
      backContent:
        "Still chasing attendance sheets and paper-based labs? Go digital with live classrooms, club creation tools, real-time progress tracking, and auto-graded assessments — all in one place. It’s education, upgraded.",
      gradient: "from-purple-600 to-blue-600",
      accentColor: "text-purple-400",
    },

    {
      id: "student",
      icon: <Users className="h-8 w-8" />,
      title: "Are You a Student or Club Lead?",
      frontSubtitle: "From Boilerplate to Brilliance",
      backTitle: "Code. Compete. Conquer.",
      backContent:
        "Struggling with boring practice and no feedback? Build curated question playlists, host coding rooms with invite-only access, compete with friends, and get real-time results — all in your control.",
      gradient: "from-green-600 to-teal-600",
      accentColor: "text-green-400",
    },
    {
      id: "educator",
      icon: <Globe className="h-8 w-8" />,
      title: "Teaching Online or Building a Brand?",
      frontSubtitle: "Go Beyond Zoom & PDFs",
      backTitle: "Monetize Your Knowledge Like a Pro",
      backContent:
        "Want to stand out in the online teaching crowd? Launch private playlists, track student performance, understand trends, and grow your reach — all with tools built for modern educators.",
      gradient: "from-orange-600 to-red-600",
      accentColor: "text-orange-400",
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-base-200 overflow-hidden relative">
      <div className="container mx-auto px-4 lg:px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Choose Your Path to Success
          </h2>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto">
            Discover how Paperless Code is not a Code Execution Platform
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 px-4 py-3 lg:px-0 overflow-y-hidden no-scrollbar">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group [perspective:1000px] w-[320px] h-80 flex-shrink-0"
            >
              <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl">
                  <div className="h-full bg-base-300 text-base-content p-6 rounded-2xl shadow-xl border border-base-content/20 flex flex-col justify-center items-center text-center transition-transform hover:scale-105">
                    <div className="mb-4 p-3 bg-primary/20 rounded-full">
                      <div className="text-primary">{card.icon}</div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold mb-3">
                      {card.title}
                    </h3>
                    <p className="text-base-content/80 text-sm lg:text-base mb-4">
                      {card.frontSubtitle}
                    </p>
                    <div className="flex items-center text-base-content/60 text-xs lg:text-sm">
                      <Sparkles className="h-4 w-4 mr-2" />
                      <span>Hover to discover more</span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl">
                  <div className="h-full bg-base-300 text-base-content p-6 rounded-2xl shadow-xl border border-base-content/30 flex flex-col justify-center">
                    <div className="mb-4">
                      <div
                        className={`inline-flex items-center ${card.accentColor} mb-2`}
                      >
                        {card.icon}
                        <Star className="h-4 w-4 ml-2" />
                      </div>
                      <h4 className="text-base lg:text-lg font-bold mb-3">
                        {card.backTitle}
                      </h4>
                    </div>
                    <p className="text-base-content/80 text-sm leading-relaxed">
                      {card.backContent}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Ready to Ditch Pen & Paper?
            </h2>

            <div className="bg-base-300 p-8 rounded-2xl mb-8 border border-base-content/10">
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary mr-2" />
                <span className="text-2xl font-semibold">
                  Think Paperless Code is just another online code execution
                  platform?
                </span>
              </div>
              <p className="text-base-content/80 text-lg leading-relaxed mb-6">
                <strong>You're utterly wrong!</strong> Paperless Code isn’t just
                a compiler — it’s a complete ecosystem. Build communities, track
                progress, and level up coding like never before.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center justify-center p-3 bg-base-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm font-medium">
                    Digital Classrooms
                  </span>
                </div>
                <div className="flex items-center justify-center p-3 bg-base-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-sm font-medium">Market Analytics</span>
                </div>
                <div className="flex items-center justify-center p-3 bg-base-100 rounded-lg">
                  <Code2 className="h-5 w-5 text-accent mr-2" />
                  <span className="text-sm font-medium">Global Community</span>
                </div>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-base-content/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              <span className="block">
                Join Colleges, Coding Clubs, Cohorts, Global Assignments, and
                more!
              </span>
              <span className="block font-semibold text-primary">
                We're evolving — invest early before prices go live!
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn btn-primary btn-md sm:btn-lg group"
                onClick={() => navigate("/signup")}
              >
                <Star className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                Sign Up Today!
              </button>
              {/* demo to be created, todo: phase 2 */}
              {/* <button
                className="btn btn-outline btn-md sm:btn-lg"
                onClick={() => navigate("/demo")}
              >
                <Globe className="h-5 w-5 mr-2" />
                View Demo
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
