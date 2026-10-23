import { z } from "zod";
import { normalizeIsbn } from "./isbn";

const HexColor = z
  .string()
  .regex(/^#[0-9a-f]{6}$/i, "Expected a 6-digit hex color such as #2ec4b6");
const IsoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Expected a date such as 2026-03-08");
const NonEmpty = z.string().min(1);

export const COVER_MOTIFS = [
  "rings",
  "waves",
  "stripes",
  "moon",
  "dots",
  "diamonds",
] as const;
export const CoverMotifSchema = z.enum(COVER_MOTIFS);

export const DROP_STATUSES = ["waiting", "found"] as const;
export const DropStatusSchema = z.enum(DROP_STATUSES);

export const CollectionSchema = z.object({
  id: NonEmpty,
  name: NonEmpty,
  season: NonEmpty,
  tagline: NonEmpty,
});

export const LookRecordSchema = z.object({
  id: NonEmpty,
  number: z.number().int().positive(),
  collectionId: NonEmpty,
  book: z.object({
    title: NonEmpty,
    author: NonEmpty,
    isbn: z
      .string()
      .refine((value)=>normalizeIsbn(value)!==null,"Invalidd ISBN")
      .transform((value)=> normalizeIsbn(value)??value)
      .optional(),
    coverUrl: z.string().url().optional(),
  }),
  cover: z.object({
    background: HexColor,
    ink: HexColor,
    motif: CoverMotifSchema,
  }),
  spotlight: HexColor,
  status: DropStatusSchema.default("found"),
  concept: NonEmpty,
  drop: z.object({
    city: NonEmpty,
    country: NonEmpty,
    place: NonEmpty,
    date: IsoDate,
  }),
  backstage: NonEmpty,
});

export const RunwayDataSchema = z.object({
  collections: z.array(CollectionSchema).min(1),
  looks: z.array(LookRecordSchema).min(1),
});

export type DropStatus = z.infer<typeof DropStatusSchema>;
export type CoverMotif = z.infer<typeof CoverMotifSchema>;
export type Collection = z.infer<typeof CollectionSchema>;
export type LookRecord = z.infer<typeof LookRecordSchema>;

export type Look = LookRecord & { readonly collection: Collection };
