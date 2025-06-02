const CreateProblemExamples = ({ register, languageSolutionArray = [] }) => {
  const columnCount = languageSolutionArray.length;

  return (
    <div className="space-y-6 pt-4">
      <h3 className="text-lg font-semibold border-b pb-2">
        Examples (Optional)
      </h3>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {languageSolutionArray.map((lang) => (
          <div
            key={lang}
            className="bg-base-100 p-4 rounded-md shadow space-y-3"
          >
            <h4 className="font-semibold text-center border-b pb-1">
              {lang.toUpperCase()}
            </h4>

            <div className="form-control">
              <label className="label">Input</label>
              <textarea
                {...register(`examples.${lang}.input`)}
                className="textarea textarea-bordered w-full"
                placeholder={`Input for ${lang}`}
              />
            </div>

            <div className="form-control">
              <label className="label">Output</label>
              <textarea
                {...register(`examples.${lang}.output`)}
                className="textarea textarea-bordered w-full"
                placeholder={`Output for ${lang}`}
              />
            </div>

            <div className="form-control">
              <label className="label">Explanation</label>
              <textarea
                {...register(`examples.${lang}.explanation`)}
                className="textarea textarea-bordered w-full"
                placeholder={`Explanation for ${lang}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateProblemExamples;
