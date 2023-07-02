import { connectToDatabase } from "@utils/database";

import Training from "@models/training";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const trainings = await Training.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(trainings), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};
