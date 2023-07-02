import { connectToDatabase } from "@utils/database";
import Training from "@models/training";
import { Configuration, OpenAIApi } from "openai";

//GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const training = await Training.findById(params.id).populate("creator");

    if (!training) return new Response("Training not found", { status: 404 });

    return new Response(JSON.stringify(training), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch training", {
      status: 500,
    });
  }
};

//PATCH (update)
export const PATCH = async (request, { params }) => {
  const { day, training, tag, complete, summary } = await request.json();

  try {
    await connectToDatabase();

    const existingTraining = await Training.findById(params.id);

    if (!existingTraining)
      return new Response("Training not found", { status: 404 });

    existingTraining.day = day;
    existingTraining.training = training;
    existingTraining.tag = tag;
    existingTraining.complete = complete;
    existingTraining.summary = summary;

    await existingTraining.save();

    return new Response(JSON.stringify(existingTraining), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update training", {
      status: 500,
    });
  }
};

//DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();

    await Training.findByIdAndRemove(params.id);

    return new Response("Training deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to delete training", {
      status: 500,
    });
  }
};

// PUT (update)
// update complete status
export const PUT = async (request, { params }) => {
  const { complete, training, summary } = await request.json();

  try {
    
    await connectToDatabase();

    const existingTraining = await Training.findById(params.id);

    if (!existingTraining)
      return new Response("Training not found", { status: 404 });

    existingTraining.complete = complete;
    existingTraining.summary = updatedSummary;

    console.log(updatedSummary);

    await existingTraining.save();

    return new Response(JSON.stringify(existingTraining), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update training", {
      status: 500,
    });
  }
};
