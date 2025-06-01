const LANGUAGES = ["JAVASCRIPT", "PYTHON", "JAVA"];

const CreateProblemExamples = ({ register }) => {
  return (
    <div className="space-y-6 pt-4">
      <h3 className="text-lg font-semibold border-b pb-2">
        Examples (Optional)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LANGUAGES.map((lang) => (
          <div
            key={lang}
            className="bg-base-100 p-4 rounded-md shadow space-y-3"
          >
            <h4 className="font-semibold text-center border-b pb-1">{lang}</h4>

            <div className="form-control">
              <label className="label">Input</label>
              <textarea
                {...register(`examples.${lang}.input`)}
                className="textarea textarea-bordered min-w-[100%]"
                placeholder={`Input for ${lang}`}
              />
            </div>

            <div className="form-control">
              <label className="label">Output</label>
              <textarea
                {...register(`examples.${lang}.output`)}
                className="textarea textarea-bordered min-w-[100%]"
                placeholder={`Output for ${lang}`}
              />
            </div>

            <div className="form-control">
              <label className="label">Explanation</label>
              <textarea
                {...register(`examples.${lang}.explanation`)}
                className="textarea textarea-bordered min-w-[100%]"
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
