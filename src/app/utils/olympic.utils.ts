import { OlympicCountry } from "../core/models/Olympic";

export const totalMedals = (c: OlympicCountry) =>
  c.participations.reduce((s, p) => s + p.medalsCount, 0);