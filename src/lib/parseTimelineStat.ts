import yaml from "js-yaml";
import { z } from "zod";
import { VisualizationParseError } from "./errors";

const TimelineStatSchema = z.object({
  value: z.number(),
  unit: z.string().optional(),
  label: z.string().min(1),
  note: z.string().optional(),
});

export type TimelineStatData = z.infer<typeof TimelineStatSchema>;

export function parseTimelineStat(source: string): TimelineStatData {
  let raw: unknown;
  try {
    raw = yaml.load(source);
  } catch {
    throw new VisualizationParseError(
      "TimelineStat",
      "could not parse source. Expected value, label fields."
    );
  }

  const result = TimelineStatSchema.safeParse(raw);
  if (!result.success) {
    throw new VisualizationParseError(
      "TimelineStat",
      result.error.issues.map((i) => i.message).join("; ")
    );
  }
  return result.data;
}
