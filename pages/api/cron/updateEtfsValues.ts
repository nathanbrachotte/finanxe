// import { queryBuilder } from "@/lib/planetscale";
import axios from "axios";
import * as cheerio from "cheerio";
import { Generated, Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { Database, Etf } from "@/lib/planetscale";
import { headers } from "next/headers";
import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

// export const config = {
//   runtime: "edge",
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const etfs = await getAllETFs();
    console.log({ etfs });
    const response = await fetchNewETFPrices(etfs);
    console.log({ response });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ success: false });
  }

  return res.status(200).json({ success: true });
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    // url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }),
});
console.log({ dbUrl: process.env.DATABASE_URL });

async function getAllETFs() {
  const res = await queryBuilder
    .selectFrom("etfs")
    .select(["name", "isin", "url"])
    .execute();

  return res;
}

async function getPriceInEuro(priceInUSD: number) {
  const { data } = await axios.get(
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_dfPoDOZTOdmWVDsrMF8KqhHrt0kHw6OLLZyhvAq8&currencies=EUR"
  );
  const eurRate = data.data.EUR;

  return priceInUSD * eurRate;
}

async function fetchNewETFPrices(etfs: Omit<Etf, "etf_id">[]) {
  const allFetches = [
    {
      url: "https://www.ishares.com/uk/individual/en/products/251882/ishares-msci-world-ucits-etf-acc-fund?switchLocale=y&siteEntryPassthrough=true",
    },
  ].map(async (etf) => {
    try {
      // If iShares.com :
      const { data } = await axios.get(etf.url);
      console.log({ data });
      const $ = cheerio.load(data);
      $("script, style").remove();
      fs.writeFileSync("test.html", $.html());
      // Extract the price of the ETF using appropriate selectors
      // Use the appropriate CSS selector to find the NAV price
      const priceText = $("li.navAmount .header-nav-data")
        .first()
        .text()
        .trim();
      console.log("🚀 ~ ].map ~ priceText:", priceText);

      // Assuming the price is always prefixed with "USD ", you can remove it to get just the numeric value
      const priceInUSD = Number(priceText.replace("USD ", ""));
      const priceInEUR = await getPriceInEuro(Number(priceInUSD));

      return priceInEUR;
    } catch (error) {
      console.log({ error });
    }
    // const price = data.results[0].c;
    // const date = new Date(data.results[0].t);
    // const res = await queryBuilder
    //   .insertInto("price_history", ["etf_id", "date", "price"])
    //   .values([etf.etf_id, date, price])
    //   .execute();
  });

  return Promise.all(allFetches);
}

// export async function addEntryToEtf(slug: string) {
//   const data = await queryBuilder.selectFrom("etf");
//   console.log({ data });
//   // .where("slug", "=", slug)
//   // .select(["count"])
//   // .execute();
// }
