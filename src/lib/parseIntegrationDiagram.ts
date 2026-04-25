import yaml from "js-yaml";
import { z } from "zod";
import { VisualizationParseError } from "./errors";

const DiagramNodeSchema = z.object({
  label: z.string().min(1),
  role: z.enum(["source", "connector", "target"]),
  highlight: z.enum(["pain", "win"]).optional(),
});

const IntegrationDiagramSchema = z.object({
  before: z.array(DiagramNodeSchema).min(1),
  after: z.array(DiagramNodeSchema).min(1),
});

export type DiagramNode = z.infer<typeof DiagramNodeSchema>;
export type IntegrationDiagramData = z.infer<typeof IntegrationDiagramSchema>;

export function parseIntegrationDiagram(source: string): IntegrationDiagramData {
  let raw: unknown;
  try {
    raw = yaml.load(source);
  } catch {
    throw new VisualizationParseError(
      "IntegrationDiagram",
      "could not parse source. Expected before: and after: blocks."
    );
  }

  const result = IntegrationDiagramSchema.safeParse(raw);
  if (!result.success) {
    throw new VisualizationParseError(
      "IntegrationDiagram",
      "could not parse source. Expected before: and after: blocks."
    );
  }
  return result.data;
}
