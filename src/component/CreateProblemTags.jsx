import { BookOpen, Plus, Trash2 } from "lucide-react";
import React from "react";

const CreateProblemTags = ({
  appendTag,
  removeTag,
  tagFields,
  register,
  errors,
}) => {
  return (
    <div className="card bg-base-200 p-4 md:p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Tags
        </h3>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => appendTag({ value: "" })}
        >
          <Plus className="w-4 h-4 mr-1" /> Add Tag
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tagFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              className="input input-bordered flex-1"
              {...register(`tags.${index}.value`)}
              placeholder="Enter tag"
            />
            <button
              type="button"
              className="btn btn-ghost btn-square btn-sm"
              onClick={() => removeTag(index)}
              disabled={tagFields.length === 1}
            >
              <Trash2 className="w-4 h-4 text-error" />
            </button>
          </div>
        ))}
      </div>
      {errors.tags && (
        <div className="mt-2 text-error text-sm flex flex-col">
          {/* Top-level array validation error */}
          {errors.tags.message && <div>{errors.tags.message}</div>}

          {/* Root-level refine error (if used) */}
          {errors.tags?.root?.message && <div>{errors.tags.root.message}</div>}

          {/* Individual item errors */}
          {Array.isArray(errors.tags) &&
            errors.tags.map(
              (tag, index) =>
                tag?.value?.message && (
                  <div key={index}>
                    Tag {index + 1}: {tag.value.message}
                  </div>
                )
            )}
        </div>
      )}
    </div>
  );
};

export default CreateProblemTags;
