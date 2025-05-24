import { Lightbulb } from "lucide-react";
import React from "react";

const CreateProblemAdditional = ({ register, errors }) => {
  return (
    <div className="card bg-base-200 p-4 md:p-6 shadow-md">
      <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-warning" />
        Additional Information
      </h3>
      <div className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Constraints</span>
          </label>
          <textarea
            className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
            {...register("constraints")}
            placeholder="Enter problem constraints"
          />
          {errors.constraints && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.constraints.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Hints (Optional)</span>
          </label>
          <textarea
            className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
            {...register("hints")}
            placeholder="Enter hints for solving the problem"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Editorial (Optional)</span>
          </label>
          <textarea
            className="textarea textarea-bordered min-h-32 w-full p-3 resize-y"
            {...register("editorial")}
            placeholder="Enter problem editorial/solution explanation"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProblemAdditional;
