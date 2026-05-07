export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("dummyJSON raw response:", data);

    return Response.json(data, { status: res.status });

  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}