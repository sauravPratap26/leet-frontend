import React from "react";

import { Controller } from "react-hook-form";
import Select from "react-select";
const languageOptions = [
  { label: "JavaScript", value: "JAVASCRIPT" },
  { label: "Python", value: "PYTHON" },
  { label: "Java", value: "JAVA" },
];

const CreateProblemBasicInfo = ({ register, control, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Title */}
      <div className="form-control md:col-span-2">
        <label className="label">
          <span className="label-text text-base md:text-lg font-semibold">
            Title
          </span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full text-base md:text-lg"
          {...register("title")}
          placeholder="Enter problem title"
        />
        {errors.title && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.title.message}
            </span>
          </label>
        )}
      </div>

      {/* Description */}
      <div className="form-control md:col-span-2">
        <label className="label">
          <span className="label-text text-base md:text-lg font-semibold">
            Description
          </span>
        </label>
        <textarea
          className="textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y"
          {...register("description")}
          placeholder="Enter problem description"
        />
        {errors.description && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.description.message}
            </span>
          </label>
        )}
      </div>

      {/* Difficulty */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-base md:text-lg font-semibold">
            Difficulty
          </span>
        </label>
        <select
          className="select select-bordered w-full text-base md:text-lg"
          {...register("difficulty")}
        >
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
        {errors.difficulty && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.difficulty.message}
            </span>
          </label>
        )}
      </div>

      {/* Language Selection */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-base md:text-lg font-semibold">
            Select Languages
          </span>
        </label>
        <Controller
          control={control}
          name="languageSolutionArray"
          render={({ field }) => (
            <Select
              isMulti
              options={languageOptions}
              className="w-full rounded-md border border-gray-600"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#1D232A",
                  borderColor: state.isFocused ? "#4b5563" : "#4b5563",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#6b7280", // Tailwind gray-500
                  },
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#1D232A",
                  color: "white",
                }),
                option: (base, { isFocused, isSelected }) => ({
                  ...base,
                  backgroundColor: isSelected
                    ? "#4b5563"
                    : isFocused
                    ? "#374151"
                    : "#1D232A",
                  color: "white",
                  cursor: "pointer",
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#374151",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "white",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#9ca3af",
                }),
                input: (base) => ({
                  ...base,
                  color: "white",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "white",
                }),
              }}
              classNamePrefix="react-select"
              value={languageOptions.filter((opt) =>
                field?.value?.includes(opt.value)
              )}
              onChange={(selectedOptions) => {
                field.onChange(selectedOptions.map((opt) => opt.value));
              }}
              placeholder="Select programming languages"
            />
          )}
        />
        {errors.languageSolutionArray && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.languageSolutionArray.message}
            </span>
          </label>
        )}
      </div>
    </div>
  );
};

export default CreateProblemBasicInfo;
