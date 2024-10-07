import { NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-static"; // Forces static generation
// export const revalidate = 3600; // Revalidate every hour (3600 seconds)

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log("Regenerating script with variable", params.params.variable);

  return new NextResponse(
    `hello variable ${params.params.variable} ; date: ${Date.now()}`,
    {
      headers: {
        "Vercel-CDN-Cache-Control": "max-age=86400", // 1 day
      },
    }
  );
}
