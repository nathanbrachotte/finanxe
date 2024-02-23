import { Generated, Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

interface CommentsTable {
  id: Generated<number>;
  name: string;
  body: string;
  created_by: string;
}

interface ViewsTable {
  slug: string;
  count: number;
}

interface EtfTable {
  etf_id: Generated<number>;
  symbol: string;
  name: string;
}

interface PriceHistoryTable {
  price_id: Generated<number>;
  etf_id: number; // This should match the type of etf_id in the EtfTable, assuming it's not auto-generated change to number.
  date: Date;
  price: number;
}

interface Database {
  comments: CommentsTable;
  views: ViewsTable;
  etf: EtfTable;
  price_history: PriceHistoryTable;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
