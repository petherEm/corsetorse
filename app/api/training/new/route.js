import { connectToDatabase } from "@utils/database";
import Training from "@models/training";
import { Configuration, OpenAIApi } from "openai";

export const POST = async (req, res) => {
  const { userId, training, tag, complete, day } = await req.json();

  try {
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(config);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are very precise calories counter.",
        },
        {
          role: "user",
          content: `Provide short calories breakdown for ${training} for the person weighing 65kg 
          as a list, each item in the new line. Express always in kilograms not pounds. Use 'You' as a placeholder for the person.
          In the last sentence summarize how many calories the person will burn in total for this ${training}, sentece should start with "In total, the person will burn ... calories." and provide the example of healthy food equivalent for the number of total calories burned, also as the list, each item in the new line.
          The response should be formatted in SEO-friendly HTML, limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.
          Do not answer any other questions. Do not provide any other information.
          `,
        },
      ],
      temperature: 0,
    });

    console.log(response.data.choices[0].message.content);

    const updatedSummary = response.data.choices[0].message.content;

    await connectToDatabase();

    const newTraining = await new Training({
      creator: userId,
      day,
      training,
      tag,
      complete,
      summary: updatedSummary,
    });

    await newTraining.save();
    return new Response(JSON.stringify(newTraining), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new training", {
      status: 500,
    });
  }
};
