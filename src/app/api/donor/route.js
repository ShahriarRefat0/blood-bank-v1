import clientPromise from "@/lib/mongoDb";

export async function POST(req) {
  try {
    const { data } = await req.json();

    const client = await clientPromise;
    const db = client.db("blood-bankDB");
    const donors = db.collection("donors");

    const result = await donors.insertOne({
      ...data,
      createdAt: new Date(),
      status: "Available",
    });

    return Response.json(
      {
        success: true,
        message: "Donor info submitted",
        id: result.insertedId.toString(),
      },
      { status: 200 }
    );
  } catch (e) {
    console.log("Post donor info err:", e);
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("blood-bankDB");
    const donors = db.collection("donors");

    const allDonors = await donors.find().toArray();

    return Response.json({ success: true, donors: allDonors });
  } catch (e) {
    console.log("Get donor info error:", e);
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
