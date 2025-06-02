import { Editor } from "@monaco-editor/react";
import { CheckCircle2, Code2 } from "lucide-react";
import React from "react";
import { Controller } from "react-hook-form";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const CreateProblemEditor = ({ control, errors, languageSolutionArray }) => {
  if (!languageSolutionArray || languageSolutionArray.length === 0) {
    return (
      <div className="p-6 text-center text-lg text-gray-500">
        Please select at least one language to display editors.
      </div>
    );
  }

  const langKeyMap = {
    JAVASCRIPT: "javascript",
    PYTHON: "python",
    JAVA: "java",
  };
  const preferredOrder = ["javascript", "python", "java"];

  const sortedLanguages = languageSolutionArray.slice().sort((a, b) => {
    const aIndex = preferredOrder.indexOf(langKeyMap[a] || a.toLowerCase());
    const bIndex = preferredOrder.indexOf(langKeyMap[b] || b.toLowerCase());

    if (aIndex === -1 && bIndex === -1) {
      return 0; // both not in preferred list, keep order
    }
    if (aIndex === -1) return 1; // a after b
    if (bIndex === -1) return -1; // b after a
    return aIndex - bIndex; // sort by preferred order
  });

  return (
    <div className="mb-8">
      <PanelGroup direction="horizontal" className="min-h-[500px] max-w-[100%]">
        {sortedLanguages.map((language, index) => (
          <React.Fragment key={language}>
            <Panel defaultSize={33} minSize={15}>
              <div className="flex flex-col gap-6 h-full card bg-base-200 p-4 md:p-6 shadow-md overflow-y-auto">
                <h3 className="text-lg md:text-xl font-semibold mb-2 flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  {language} (Resizable)
                </h3>

                {/* Starter Code */}
                <div className="card bg-base-100 shadow-md">
                  <div className="card-body p-4 md:p-6">
                    <h4 className="font-semibold text-base md:text-lg mb-4">
                      Starter Code Template
                    </h4>
                    <div className="resize-y overflow-hidden min-h-[150px] max-h-[500px] border rounded-md">
                      <Controller
                        name={`codeSnippets.${language}`}
                        key={`codeSnippets-${language}`}
                        control={control}
                        render={({ field }) => (
                          <Editor
                            key={`editor-codeSnippets-${language}`}
                            height="100%"
                            language={language.toLowerCase()}
                            theme="vs-dark"
                            value={field.value}
                            onChange={field.onChange}
                            options={{
                              minimap: { enabled: false },
                              fontSize: 14,
                              lineNumbers: "on",
                              roundedSelection: false,
                              scrollBeyondLastLine: false,
                              automaticLayout: true,
                            }}
                          />
                        )}
                      />
                    </div>

                    {errors.codeSnippets?.[language] && (
                      <div className="mt-2 text-error text-sm">
                        {errors.codeSnippets[language].message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Reference Solution */}
                <div className="card bg-base-100 shadow-md">
                  <div className="card-body p-4 md:p-6">
                    <h4 className="font-semibold text-base md:text-lg mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      Reference Solution
                    </h4>
                    <div className="resize-y overflow-hidden min-h-[150px] max-h-[500px] border rounded-md">
                      <Controller
                        name={`referenceSolutions.${language}`}
                        key={`referenceSolutions-${language}`}
                        control={control}
                        render={({ field }) => (
                          <Editor
                            key={`editor-referenceSolutions-${language}`}
                            height="100%"
                            language={language.toLowerCase()}
                            theme="vs-dark"
                            value={field.value}
                            onChange={field.onChange}
                            options={{
                              minimap: { enabled: false },
                              fontSize: 14,
                              lineNumbers: "on",
                              roundedSelection: false,
                              scrollBeyondLastLine: false,
                              automaticLayout: true,
                              tabSize: 4,
                              insertSpaces: language.toLowerCase() !== "python",
                              detectIndentation: false,
                              formatOnPaste: false,
                              formatOnType: false,
                            }}
                          />
                        )}
                      />
                    </div>

                    {errors.referenceSolutions?.[language] && (
                      <div className="mt-2 text-error text-sm">
                        {errors.referenceSolutions[language].message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Panel>

            {index < languageSolutionArray.length - 1 && (
              <PanelResizeHandle className="bg-gray-600 w-2 cursor-col-resize" />
            )}
          </React.Fragment>
        ))}
      </PanelGroup>
    </div>
  );
};

export default CreateProblemEditor;
