"use client";

import { sparkingData } from "@/utils/data/sparkingData";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [lastIndex, setLastIndex] = useState<number>(0);

  const getCharacter = () => {
    setLastIndex((lastIndex) => lastIndex + 1);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={getCharacter} className="outline bg-white text-black">
        get character
      </button>
      <div>
        <div>id : {sparkingData[lastIndex].id}</div>
        <div>name: {sparkingData[lastIndex].name}</div>
        <div>cost: {sparkingData[lastIndex].cost}</div>
        <Image
          src={`/${sparkingData[lastIndex].img}.png`}
          width={300}
          height={300}
          alt="img"
        />
      </div>
    </div>
  );
}
