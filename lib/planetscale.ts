import { Generated, Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

export type Comments = {
  id: Generated<number>;
  name: string;
  body: string;
  created_by: string;
};

export type Views = {
  slug: string;
  count: number;
};

export type Etf = {
  etf_id: Generated<number>;
  isin: string;
  url: string;
  name: string;
  currency: string;
};

export type PriceHistory = {
  price_id: Generated<number>;
  etf_id: number; // This should match the type of etf_id in the EtfTable, assuming it's not auto-generated change to number.
  date: Date;
  price: number;
};

export type Database = {
  comments: Comments;
  views: Views;
  etfs: Etf;
  price_history: PriceHistory;
};

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
