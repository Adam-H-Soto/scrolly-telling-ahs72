export class VisualizationParseError extends Error {
  constructor(component: string, detail: string) {
    super(`${component}: ${detail}`);
    this.name = "VisualizationParseError";
  }
}
