import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(
  request: NextRequest,
  params: { params: { tag: string } }
) {
  await fetch(
    `https://revalidate-path-issue.vercel.app/api/purge-script-cache/${params.params.tag}`,
    { next: { tags: [params.params.tag] } }
  );
}
