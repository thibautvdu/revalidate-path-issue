import { NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-static"; // Forces static generation
// export const revalidate = 3600; // Revalidate every hour (3600 seconds)

async function fetchScriptContent(variable: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${variable}`,
    {
      next: {
        tags: [variable],
        revalidate: 86400,
      },
    }
  );
  const data = await res.json();
  return JSON.stringify(data);
}

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log("Regenerating script with variable", params.params.variable);

  const script = await fetchScriptContent(params.params.variable);
  return new NextResponse(
    `hello variable ${params.params.variable} ; date: ${Date.now()} ${script}`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
