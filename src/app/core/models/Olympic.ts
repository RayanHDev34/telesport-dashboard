// TODO: create here a typescript interface for an olympic country

import { Participation } from "./Participation";

/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
export class OlympicCountry {
  constructor(
    public id: number,
    public country: string,
    public participations: Participation[]
  ) {}
 static fromJson(json: any): OlympicCountry {
    return new OlympicCountry(
      json.id,
      json.country,
      json.participations.map((p: any) => Participation.fromJson(p))
    );
  }
   getTotalMedals(): number {
    return this.participations.reduce((sum, p) => sum + p.medalsCount, 0);
  }
}