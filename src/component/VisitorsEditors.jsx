import { useState } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import { Code, Globe, Sparkles } from "lucide-react";

const languageOptions = ["javascript", "python", "java"];

const languageContent = {
  javascript: `function quickSort(arr) {
  // Efficient sorting algorithm
  if (arr.length <= 1) return arr;
  // Implementation continues...
}
`,
  python: `def quick_sort(arr):
    # Efficient sorting algorithm
    if len(arr) <= 1:
        return arr
    # Implementation continues...
`,
  java: `public class QuickSort {
    public static int[] sort(int[] arr) {
        // Efficient sorting algorithm
        if (arr.length <= 1) return arr;
        // Implementation continues...
    }
}`,
};

export default function VisitorsEditors() {
  const [language, setLanguage] = useState("javascript");

  return (
    <section className="h-[400px]">
      <div className="container mx-auto px-4 lg:px-6 h-full mt-15">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Left Panel (Editor) */}
          <Panel defaultSize={30} minSize={25} className="relative h-full">
            <div className="card bg-base-100 shadow-xl h-full flex flex-col overflow-hidden">
              <div className="tabs tabs-boxed bg-base-200 rounded-none">
                {languageOptions.map((lang) => (
                  <button
                    key={lang}
                    className={`tab ${
                      language === lang
                        ? "tab-active bg-primary text-primary-content"
                        : ""
                    }`}
                    onClick={() => setLanguage(lang)}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
                <div className="tab flex items-center">
                  <Globe className="h-3 w-3 mr-1" /> More...
                </div>
              </div>
              <div className="flex-1">
                <Editor
                  language={language}
                  theme="vs-dark"
                  value={languageContent[language]}
                  height="100%" // ensure it fills available height
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    tabSize: 2,
                  }}
                />
              </div>
            </div>
          </Panel>

          {/* Resize Handle */}
          <PanelResizeHandle className="w-2 bg-white/70 hover:bg-white shadow-inner cursor-col-resize relative group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-1 bg-base-300 rounded-full group-hover:bg-base-800 transition-all"></div>
          </PanelResizeHandle>

          {/* Right Panel */}
          <Panel
            defaultSize={80}
            minSize={25}
            className="pl-6 h-full overflow-y-auto"
          >
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4">
                Multi-Language Support & Coding Friendly Editor
              </h3>
              <p className="text-base-content/80 mb-6 text-xl">
                Irritated of less space to type your code? {`\n`} Worry not, we got you covered, Resize editors and see what actually matters !
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="card bg-base-100 shadow hover:shadow-md transition-all hover:border-warning/50 border border-base-content/5 p-4 flex flex-col items-center">
                  <Code className="h-6 w-6 text-warning mb-2" />
                  <span className="text-sm text-base-content/70">
                    JavaScript
                  </span>
                </div>
                <div className="card bg-base-100 shadow hover:shadow-md transition-all hover:border-primary/50 border border-base-content/5 p-4 flex flex-col items-center">
                  <Code className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-base-content/70">Python</span>
                </div>
                <div className="card bg-base-100 shadow hover:shadow-md transition-all hover:border-error/50 border border-base-content/5 p-4 flex flex-col items-center">
                  <Code className="h-6 w-6 text-error mb-2" />
                  <span className="text-sm text-base-content/70">Java</span>
                </div>
              </div>
              <div className="flex items-center text-base-content/60 text-sm">
                <Sparkles className="h-4 w-4 mr-2 text-secondary" />
                <span>C++, C#, Go, Rust, and more languages coming soon!</span>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </section>
  );
}
