import { NextRequest, NextResponse } from "next/server";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 10; // seconds

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

// export async function generateStaticParams() {
//   const posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) =>
//     res.json()
//   )
//   return posts.map((post) => ({
//     id: String(post.id),
//   }))
// }

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log("Regenerating script with variable", params.params.variable);

  return new NextResponse(
    `hello variable ${params.params.variable} ; date: ${Date.now()}`
    // {
    //   headers: {
    //     "Vercel-CDN-Cache-Control": "max-age=86400", // 1 day
    //   },
    // }
  );
}
