import { Editor } from "@monaco-editor/react";
import React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Submission from "./Submission";
import { Play, Terminal } from "lucide-react";
const SolveProblemRightPanel = ({
  selectedLanguage,
  code,
  setCode,
  submission,
  testcases,
  isExecuting,
  handleRunCode,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl h-full flex flex-col">
      <div className="card-body p-0 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="tabs tabs-bordered flex justify-between mr-10">
          <button className="tab tab-active gap-2">
            <Terminal className="w-4 h-4" />
            Code Editor
          </button>
          <button
            className={`btn btn-primary gap-2 ${isExecuting ? "loading" : ""}`}
            onClick={handleRunCode}
            disabled={isExecuting}
          >
            {!isExecuting && <Play className="w-4 h-4" />}
            Submit Solution
          </button>
        </div>

        {/* Resizable Panels */}
        <PanelGroup direction="vertical" className="flex-grow">
          {/* Code Editor */}
          <Panel defaultSize={60} minSize={30}>
            <div className="h-full">
              <Editor
                height="100%"
                language={selectedLanguage.toLowerCase()}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 20,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </Panel>

          {/* Resize Handle with visible bar */}
          <PanelResizeHandle className="h-2 bg-white/70 flex items-center justify-center cursor-row-resize group relative">
            <div className="h-1 w-10 bg-base-content/40 rounded group-hover:bg-base-content/80 transition-all" />
          </PanelResizeHandle>

          {/* Test Case Results */}
          <Panel defaultSize={40} minSize={20}>
            <div className="h-full overflow-y-auto p-4 bg-base-100 border-t border-base-300">
              {submission ? (
                <Submission submission={submission} />
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-4">Test Cases</h3>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr>
                          <th>Input</th>
                          <th>Expected Output</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testcases.map((testCase, index) => (
                          <tr key={index}>
                            <td className="font-mono">{testCase.input}</td>
                            <td className="font-mono">{testCase.output}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </Panel>
        </PanelGroup>

        {/* Submit Button */}
      </div>
    </div>
  );
};

export default SolveProblemRightPanel;
