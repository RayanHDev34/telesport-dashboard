import { Participation } from "./participation.models";

export interface OlympicCountry {
  id: number;
  country: string;
  participations: Participation[];
}