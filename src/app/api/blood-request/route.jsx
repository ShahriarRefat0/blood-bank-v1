import clientPromise from "@/lib/mongoDb";

export async function POST(req) {
  try {
    const { data } = await req.json();

    const client = await clientPromise;
    const db = client.db("blood-bankDB");
    const requests = db.collection("bloodRequests");
    const result = await requests.insertOne({
      ...data,
      createdAt: new Date(),
      status: "pending",
    });

    return Response.json(
      { success: true, message: "blood req submit", id: result.insertedId },
      { status: 200 }
    );
  } catch (e) {
    console.log("Post Blood req err:", e);
    return Response.json({ success: false, e: e.message }, { status: 500 });
  }
}

//get api
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("blood-bankDB");
    const requests = db.collection("bloodRequests");
    const allRequests = await requests.find().sort({ createdAt: -1 }).toArray();
    return Response.json({ success: true, requests: allRequests });
  } catch (e) {
    console.log("Get Blood req error:", e);
    return Response.json({ success: false, e: e.message }, { status: 500 });
  }
}


