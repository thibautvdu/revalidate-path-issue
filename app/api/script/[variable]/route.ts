import { NextRequest, NextResponse } from "next/server";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
// export const revalidate = 60; // seconds

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
// export const dynamicParams = true; // or false, to 404 on unknown paths

// export async function generateStaticParams() {
//   return [
//     // {
//     //   variable: "test",
//     // },
//   ];
// }

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log("Regenerating script with variable", params.params.variable);

  await fetch("https://google.com", {
    next: {
      tags: ["test-tag"], // Invalidate with revalidateTag('blog') on-demand
    },
  });

  return new NextResponse(
    `hello variable ${params.params.variable} ; date: ${Date.now()}`,
    {
      headers: {
        "Vercel-CDN-Cache-Control": "max-age=86400", // 1 day
      },
    }
  );
}
