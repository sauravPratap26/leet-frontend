import { z } from "zod";
const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z
    .array(
      z.object({
        value: z.string().trim().min(1, "Tag should have some value"),
      })
    )
    .min(1, "At least one tag is required"),

  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z
    .object({
      JAVASCRIPT: z
        .object({
          input: z.string().optional(),
          output: z.string().optional(),
          explanation: z.string().optional(),
        })
        .optional(),
      PYTHON: z
        .object({
          input: z.string().optional(),
          output: z.string().optional(),
          explanation: z.string().optional(),
        })
        .optional(),
      JAVA: z
        .object({
          input: z.string().optional(),
          output: z.string().optional(),
          explanation: z.string().optional(),
        })
        .optional(),
    })
    .optional(),

  codeSnippets: z.any().refine((val) => val !== undefined, {
    message: "Code snippets are required",
  }),
  referenceSolutions: z.any().refine((val) => val !== undefined, {
    message: "Reference solution is required",
  }),
});

export default problemSchema;
