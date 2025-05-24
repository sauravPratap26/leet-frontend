import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
} from "lucide-react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  noData,
  sampledpData,
  sampleStringProblem,
} from "../dummy data/DummyData";
import problemSchema from "../schema/problemSchema";
import CreateProblemBasicInfo from "./CreateProblemBasicInfo";
import CreateProblemTags from "./CreateProblemTags";
import CreateProblemActions from "./CreateProblemActions";
import CreateProblemTestCases from "./CreateProblemTestCases";
import CreateProblemEditor from "./CreateProblemEditor";
import CreateProblemAdditional from "./CreateProblemAdditional";

const CreateProblemForm = () => {
  const navigation = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      testcases: [{ input: "", output: "" }],
      tags: [],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
    },
  });
  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replacetestcases,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/problems/create-problem", value);
      console.log(res.data);
      toast.success(res.data.message || "Problem Created successfully⚡");
      navigation("/");
    } catch (error) {
      console.log(error);
      toast.error("Error creating problem");
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (error) => {
    console.log(error);
  };
  const loadSampleData = (selected = "random") => {
    let sampleData1;
    if (selected == "reset") {
      sampleData1 = noData;
    } else if (selected == "array") {
      sampleData1 = sampledpData;
    } else {
      sampleData1 = sampleStringProblem;
    }
    replaceTags(sampleData1.tags.map((tag) => tag));
    replacetestcases(sampleData1.testcases.map((tc) => tc));

    // Reset the form with sample data
    reset(sampleData1);
  };
  return (
    <div className=" py-8 px-4 w-full min-w-max">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-6 md:p-8 bg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b">
            <h2 className="card-title text-2xl md:text-3xl flex items-center gap-3">
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Create Problem
            </h2>
            <CreateProblemActions loadSampleData={loadSampleData} />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-8"
          >
            {/* Basic Information */}
            <CreateProblemBasicInfo register={register} errors={errors} />

            {/* Tags */}
            <CreateProblemTags
              appendTag={appendTag}
              removeTag={removeTag}
              tagFields={tagFields}
              register={register}
              errors={errors}
            />

            {/* Test Cases */}
            <CreateProblemTestCases
              appendTestCase={appendTestCase}
              removeTestCase={removeTestCase}
              testCaseFields={testCaseFields}
              register={register}
              errors={errors}
            />

            {/* Code Editor Sections */}
            <CreateProblemEditor errors={errors} control={control} />

            {/* Additional Information */}
            <CreateProblemAdditional errors={errors} register={register} />

            <div className="card-actions justify-end pt-4 border-t">
              <button type="submit" className="btn btn-primary btn-lg gap-2">
                {isLoading ? (
                  <span className="loading loading-spinner text-white"></span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Create Problem
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProblemForm;
