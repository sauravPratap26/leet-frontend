import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { getLanguageId } from "../lib/lang";
import { useExecutionStore } from "../store/useExecutionStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import Submission from "../component/Submission";
import SubmissionsList from "../component/SubmissionList";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SolveProblemRightPanel from "../component/SolveProblemRightPanel";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();

  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [testcases, setTestCases] = useState([]);

  const { executeCode, submission, isExecuting } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [getProblemById, getSubmissionCountForProblem, id]);

  useEffect(() => {
    if (problem) {
      setCode(
        problem.codeSnippets?.[selectedLanguage] || submission?.sourceCode || ""
      );
      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage, submission?.sourceCode]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, getSubmissionForProblem, id]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log("Error executing code", error);
    }
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-200">
        <div className="card bg-base-100 p-8 shadow-xl">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading problem...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-lg mb-6">{problem.description}</p>

            {problem.examples && (
              <>
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {Object.entries(problem.examples).map(([lang, example]) => (
                  <div
                    key={lang}
                    className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
                  >
                    <div className="text-lg font-bold text-primary mb-4">
                      {lang}
                    </div>

                    <div className="mb-4">
                      <div className="text-indigo-300 mb-2 text-base font-semibold">
                        Input:
                      </div>
                      <span className=" px-4 py-1 rounded-lg font-semibold text-white">
                        {example.input.trim() || "No Input provided "}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="text-indigo-300 mb-2 text-base font-semibold">
                        Output:
                      </div>
                      <span className="px-4 py-1 rounded-lg font-semibold text-white">
                        {example.output.trim() || "No Output provided"}
                      </span>
                    </div>

                    <div>
                      <div className="text-emerald-300 mb-2 text-base font-semibold">
                        Explanation:
                      </div>
                      <p className="text-base-content/70 text-lg font-sem">
                        {example.explanation.trim() || "No example provided"}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {problem.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                <div className="bg-base-200 p-6 rounded-xl mb-6">
                  <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
            setSelectedLanguage={setSelectedLanguage}
            setCode={setCode}
          />
        );
      case "discussion":
        return (
          <div className="p-4 text-center text-base-content/70 min-h-screen">
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4 min-h-screen">
            {problem?.hints ? (
              <div className="bg-base-200 p-6 rounded-xl">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-200 w-full">
      <nav className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1 gap-2">
          <div className="mt-2">
            <h1 className="text-xl font-bold">{problem.title}</h1>
            <div className="flex items-center gap-2 text-sm text-base-content/70 mt-5">
              <Clock className="w-4 h-4" />
              <span>
                Updated{" "}
                {new Date(problem.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-base-content/30">•</span>
              <Users className="w-4 h-4" />
              <span>{submissionCount} Successful submissions</span>
              <span className="text-base-content/30">•</span>
              <div className="tooltip" data-tip="Coming in v2">
                <ThumbsUp className="w-4 h-4" />
              </div>
              {/* <span>95% Success Rate</span> */}
            </div>
          </div>
        </div>
        <div className="flex-none gap-4">
          {/* <button
            className={`btn btn-ghost btn-circle ${
              isBookmarked ? "text-primary" : ""
            }`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-5 h-5" />
          </button> */}
          <div className="tooltip" data-tip="Coming in v2">
            <button className="btn btn-ghost btn-circle">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <select
            className="select select-bordered select-primary w-40"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(problem.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <div className="container mx-auto p-4 min-w-[95%]">
        <PanelGroup direction="horizontal" className="w-full h-full">
          {/* Left Panel (Description + Tabs) */}
          <Panel defaultSize={50} minSize={30}>
            <div className="card bg-base-100 shadow-xl h-full overflow-x-auto">
              <div className="card-body p-0">
                {/* Tabs */}
                <div className="tabs tabs-bordered">
                  <button
                    className={`tab gap-2 ${
                      activeTab === "description" ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveTab("description")}
                  >
                    <FileText className="w-4 h-4" />
                    Description
                  </button>
                  <button
                    className={`tab gap-2 ${
                      activeTab === "submissions" ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveTab("submissions")}
                  >
                    <Code2 className="w-4 h-4" />
                    Submissions
                  </button>
                  <button
                    className={`tab gap-2 ${
                      activeTab === "discussion" ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveTab("discussion")}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Discussion
                  </button>
                  <button
                    className={`tab gap-2 ${
                      activeTab === "hints" ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveTab("hints")}
                  >
                    <Lightbulb className="w-4 h-4" />
                    Hints
                  </button>
                </div>

                <div className="p-6">{renderTabContent()}</div>
              </div>
            </div>
          </Panel>

          {/* Resize Handle */}
          <PanelResizeHandle className="w-2 bg-white/70 hover:bg-white shadow-inner cursor-col-resize relative group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-1 bg-base-300 rounded-full group-hover:bg-base-800 transition-all"></div>
          </PanelResizeHandle>

          {/* Right Panel (SolveProblemRightPanel) */}
          <Panel defaultSize={50} minSize={25}>
            <div className="h-full overflow-x-auto">
              <SolveProblemRightPanel
                selectedLanguage={selectedLanguage}
                code={code}
                setCode={setCode}
                submission={submission}
                testcases={testcases}
                isExecuting={isExecuting}
                handleRunCode={handleRunCode}
              />
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default ProblemPage;
