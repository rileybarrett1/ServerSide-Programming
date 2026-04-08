import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDatabase();
    await db.command({ ping: 1 });

    return NextResponse.json({
      ok: true,
      database: "rickmorty",
      message: "MongoDB connection is healthy.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "MongoDB connection check failed.";

    const hint =
      message.includes("SSL routines") ||
      message.includes("tlsv1 alert internal error")
        ? "Atlas TLS handshake failed. In MongoDB Atlas, confirm the cluster is running and add your current IP (or 0.0.0.0/0 for testing) under Network Access."
        : undefined;

    return NextResponse.json(
      {
        ok: false,
        database: "rickmorty",
        error: message,
        hint,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
