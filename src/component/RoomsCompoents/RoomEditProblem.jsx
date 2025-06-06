import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import problemSchema from "../../schema/problemSchema";
import { axiosInstance } from "../../lib/axios";
import CreateProblemActions from "../CreateProblemActions";
import CreateProblemBasicInfo from "../CreateProblemBasicInfo";
import CreateProblemTags from "../CreateProblemTags";
import CreateProblemTestCases from "../CreateProblemTestCases";
import CreateProblemEditor from "../CreateProblemEditor";
import CreateProblemAdditional from "../CreateProblemAdditional";
import { useParams } from "react-router-dom";
import { useProblemStore } from "../../store/useProblemStore";
// your axios setup

const EditProblemForm = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: problem,
  });

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestcases,
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

  useEffect(() => {
    getProblemById(id);
  }, [getProblemById, id]);

  useEffect(() => {
    if (problem?.id) {
      replaceTags(problem.tags || []);
      replaceTestcases(problem.testcases || []);
      reset(problem);
    }
  }, [problem, replaceTags, replaceTestcases, reset]);

  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorData, setErrorData] = useState(null);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await axiosInstance.post(`/problem/update-problem/${problem.id}`, data);
      toast.success("Problem updated successfully ⚡");
    } catch (error) {
      console.log(error);
      if (error.response?.data?.code === 1056) {
        setErrorData(error.response.data);
        setModalOpen(true);
      } else {
        toast.error("Error updating problem");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (error) => {
    console.log(error);
  };

  if (isProblemLoading) {
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>;
    }
  return (
    <div className="py-8 px-4 w-full max-w-max min-w-[100%]">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-6 md:p-8 bg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b ">
            <CreateProblemActions isEdit />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-8"
          >
            <CreateProblemBasicInfo
              register={register}
              control={control}
              errors={errors}
            />
            <CreateProblemTags
              appendTag={appendTag}
              removeTag={removeTag}
              tagFields={tagFields}
              register={register}
              errors={errors}
            />
            <CreateProblemTestCases
              appendTestCase={appendTestCase}
              removeTestCase={removeTestCase}
              testCaseFields={testCaseFields}
              register={register}
              errors={errors}
            />
            <CreateProblemEditor
              errors={errors}
              control={control}
              languageSolutionArray={watch("languageSolutionArray")}
            />
            <CreateProblemAdditional
              errors={errors}
              register={register}
              languageSolutionArray={watch("languageSolutionArray")}
            />
            <div className="card-actions justify-end pt-4 border-t">
              <button type="submit" className="btn btn-primary btn-lg gap-2">
                {isLoading ? (
                  <span className="loading loading-spinner text-white"></span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Update Problem
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {modalOpen && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-xl text-error mb-2">
              Oops, something didn’t go right!
            </h3>
            <p className="text-base text-base-content mb-4">
              {errorData?.message || "Something went wrong during submission."}
            </p>

            {errorData?.data?.error?.details && (
              <div className="bg-base-200 p-4 rounded space-y-2">
                <p className="font-semibold text-sm">
                  {errorData?.data?.error?.message}
                </p>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Input:</span>{" "}
                    {errorData.data.error.details.input}
                  </p>
                  <p>
                    <span className="font-medium">Expected:</span>{" "}
                    {errorData.data.error.details.expected}
                  </p>
                  <p>
                    <span className="font-medium">Received:</span>{" "}
                    {errorData.data.error.details.received?.replace(/\n/g, "")}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    {errorData.data.error.details.status}
                  </p>
                </div>
              </div>
            )}
            <div className="modal-action">
              <button className="btn" onClick={() => setModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProblemForm;
