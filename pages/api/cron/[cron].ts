import { NextRequest, NextResponse } from "next/server";
import { queryBuilder } from "@/lib/planetscale";

export async function addEntryToEtf(slug: string) {
  const data = await queryBuilder.selectFrom("etf");
  // .where("slug", "=", slug)
  // .select(["count"])
  // .execute();
}

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const cron = req.nextUrl.pathname.split("/")[3];
  console.log(cron);

  if (!cron) return new Response("No cron provided", { status: 400 });

  // @see https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const response = await updateETFPrices();

  return new NextResponse(JSON.stringify(response), {
    status: 200,
  });
}

async function updateETFPrices() {
  return null;
}
