import { z } from 'zod';
import { dateRefine, dateRefineMessage } from './utils/dates';

/** A "YYYY-MM" date string, validated against the project date format. */
export const monthDate = z.string().refine(dateRefine, dateRefineMessage);

/** Draft toggle: defaults to published (false) when omitted. */
export const draftFlag = z.boolean().optional().default(false);

/** An optional, validated absolute URL. */
export const optUrl = z.string().url().optional();
