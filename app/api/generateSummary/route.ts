import { database } from "@/appwrite";
import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const todos = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "When responding, welcome the user always as Mr Hedi and limit the response to 200 characters",
        },
        {
          role: "user",
          content: `Hi there provide summary of the following todos. Count how many todos are in each category such as To do,
                    In progress and Done, then tell the user to have a productive day! Here's the data ${JSON.stringify(
                      todos
                    )}`,
        },
      ],
    });
    const { data } = response;

    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    console.log("OpenAI API Error:", error);
    return NextResponse.error();
  }
}
