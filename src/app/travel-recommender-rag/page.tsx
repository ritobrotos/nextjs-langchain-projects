"use client";
import { FC, ReactElement, useState, ChangeEvent } from "react";

export const TravelRecommenderRag: FC = (): ReactElement => {
  const [userUrl, setUserUrl] = useState<string>("");
  const [userQuestion, setUserQuestion] = useState<string>("");
  const [aiAnswer, setAiAnswer] = useState<string>("");

  const handleUserUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserUrl(event.target.value);
  };

  const handleUserQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserQuestion(event.target.value);
  };

  const fetchWebpageData = async (e) => {
    console.log(
      "Calling pinecone-insert-data API to scrape webpage data and insert to DB"
    );
    const res = await fetch("/api/pinecone-insert-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: userUrl }),
    });
    const data = await res.json();
    console.log(data);
  };

  const queryPinecone = async (e) => {
    console.log(
      "Calling pinecone-query-data API to get the answer of user queries."
    );
    const res = await fetch("/api/pinecone-query-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: userQuestion }),
    });
    const data = await res.json();
    setAiAnswer(data.message);
    console.log(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between py-10 bg-white max-w-screen-lg mx-auto border-2">
      <div className="flex flex-col items-center justify-center bg-red-300 w-full h-64 bg-opacity-50">
        <h1 className="text-5xl font-bold mb-10">
          Travel Recommender RAG Chatbot
        </h1>
        <p className="mt-10 text-black-500 font-bold text-lg">Powered By:</p>
        <p className="text-black-500 font-medium text-2xl mt-3">
          Langchain 🔗 | Pinecone 🧠 | OpenAI 🤖
        </p>
      </div>
      <div className="grid gap-3 m-6 grid-cols-4 w-full p-7 bg-gray-300">
        <div className="col-span-4">
          <p className="font-medium">URL of the external data source page</p>
        </div>

        <div className="col-span-3">
          <input
            type="text"
            id="user_url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full"
            placeholder="Enter URL"
            onChange={handleUserUrlChange}
            value={userUrl}
          />
        </div>

        <div className="col-span-1">
          <input
            type="button"
            className="rounded-md bg-blue-500 py-2 px-4 text-white"
            value="Upload Data"
            onClick={fetchWebpageData}
          />
        </div>
      </div>

      <div className="grid mb-20 gap-6 grid-cols-6 w-full p-10 bg-white h-64">
        <div className="col-span-6">
          <div className="selection:bg-fuchsia-300 selection:text-fuchsia-900">
            <p className="m-3 text-black-500 text-justify">{aiAnswer}</p>
          </div>
        </div>

        <div className="col-span-5">
          <textarea
            id="message"
            value={userQuestion}
            onChange={handleUserQuestionChange}
            rows={2}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 text-xl focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your query here"
          ></textarea>
        </div>

        <div className="col-span-1">
          <div className="flex items-center justify-center w-full">
            <input
              type="button"
              className="rounded-md bg-green-500 py-2 px-7 text-white"
              value="Submit"
              onClick={queryPinecone}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelRecommenderRag;
