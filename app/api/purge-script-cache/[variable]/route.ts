import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log("Purge variable script cache");

  revalidatePath(`/api/script/${params.params.variable}`, "page");
  // revalidatePath(`/api/script/[variable]`, "page");

  // return new NextResponse(`purged /api/script/${params.params.variable}`);
  return new NextResponse(`purged /api/script/${params.params.variable}`);
}
