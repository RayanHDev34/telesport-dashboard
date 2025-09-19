import { OlympicCountry } from "../core/models/olympic.models";

export const totalMedals = (c: OlympicCountry) =>
  c.participations.reduce((s, p) => s + p.medalsCount, 0);