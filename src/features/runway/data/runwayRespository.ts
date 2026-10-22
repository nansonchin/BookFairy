
import { RunwayDataSchema, type Look } from "../domain/runwaySchema";
import raw from "./runway.json";

export class RunwayDataError extends Error {
  readonly problems: readonly string[];

  constructor(problems: readonly string[]) {
    super(`Runway data is invalid:\n- ${problems.join("\n- ")}`);
    this.name = "RunwayDataError";
    this.problems = problems;
  }
}

export function buildLooks(input: unknown): Look[] {
  const parsed = RunwayDataSchema.safeParse(input);
  if (!parsed.success) {
    throw new RunwayDataError(
      parsed.error.issues.map((issue) => `${issue.path.map(String).join(".")}: ${issue.message}`)
    );
  }

  const { collections, looks } = parsed.data;
  const problems: string[] = [];

  const collectionById = new Map<string, (typeof collections)[number]>();
  for (const collection of collections) {
    if (collectionById.has(collection.id)) {
      problems.push(`Duplicate collection id "${collection.id}"`);
    }
    collectionById.set(collection.id, collection);
  }

  const seenIds = new Set<string>();
  const seenNumbers = new Set<number>();
  const result: Look[] = [];

  for (const record of looks) {
    if (seenIds.has(record.id)) problems.push(`Duplicate look id "${record.id}"`);
    if (seenNumbers.has(record.number)) {
      problems.push(`Duplicate look number ${record.number} (${record.id})`);
    }
    seenIds.add(record.id);
    seenNumbers.add(record.number);

    const collection = collectionById.get(record.collectionId);
    if (!collection) {
      problems.push(`${record.id} points to unknown collection "${record.collectionId}"`);
      continue;
    }
    result.push({ ...record, collection });
  }

  if (problems.length > 0) throw new RunwayDataError(problems);

  return result.sort((a, b) => a.number - b.number);
}

export async function fetchLooks(): Promise<readonly Look[]> {
  return buildLooks(raw);
}