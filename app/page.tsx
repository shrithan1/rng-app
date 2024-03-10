import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import RandomUser from "@/components/RandomUser";

export default async function Home() {
  const data = await getData();
  console.log(data);

  return (
    <main>
      <RandomUser></RandomUser>
      <RandomUser></RandomUser>
      <RandomUser></RandomUser>
      <RandomUser></RandomUser>
      <RandomUser></RandomUser>
    </main>
  );
}

async function getData() {
  const res = await fetch("https://randomuser.me/api/?results=5");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
