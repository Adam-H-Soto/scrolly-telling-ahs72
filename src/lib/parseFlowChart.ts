import yaml from "js-yaml";
import { z } from "zod";
import { VisualizationParseError } from "./errors";

const FlowStepSchema = z.object({
  step: z.string().min(1),
  actor: z.string().min(1),
  note: z.string().optional(),
});

const FlowChartSchema = z.array(FlowStepSchema).min(1);

export type FlowStep = z.infer<typeof FlowStepSchema>;
export type FlowChartData = FlowStep[];

export function parseFlowChart(source: string): FlowChartData {
  let raw: unknown;
  try {
    raw = yaml.load(source);
  } catch {
    throw new VisualizationParseError(
      "FlowChart",
      "could not parse source. Expected an array of steps."
    );
  }

  const result = FlowChartSchema.safeParse(raw);
  if (!result.success) {
    throw new VisualizationParseError(
      "FlowChart",
      result.error.issues.map((i) => i.message).join("; ")
    );
  }
  return result.data;
}
