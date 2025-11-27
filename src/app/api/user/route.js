

import clientPromise from "@/lib/mongoDb";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { data } = await req.json();
    const client = await clientPromise;
    const db = client.db("blood-bankDB"); 
    const users = db.collection("users");

    const updatedUser = await users.findOneAndUpdate(
      { email: data.email },
      { $set: data },
      { upsert: true, returnDocument: "after" }
    );

    return Response.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}


//get data user
export async function GET(req) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return Response.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("blood-bankDB");
    const users = db.collection("users");

    const user = await users.findOne({ email });

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GET ERROR:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}