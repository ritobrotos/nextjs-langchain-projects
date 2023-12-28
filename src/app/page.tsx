"use client";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useState } from "react";

export const Home: FC = (): ReactElement => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold">NextJS Langchain Projects</h1>
    </div>
  );
};

export default Home;
