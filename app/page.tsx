"use client";

import { gameModes } from "@/utils/data/gamemodesEnum";
import { SparkingDataElement } from "@/utils/data/types";
import {
  getCostlessRandomTeam,
  getRandomCharacter,
  getRandomTeam,
} from "@/utils/getDataMethods";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export default function Home() {
  const [gameMode, setGameMode] = useState<number>(gameModes.Single);
  const [characters, setCharacters] = useState<SparkingDataElement[]>([]);
  const membersRef = useRef<HTMLSelectElement>(null);

  const getCharacter = () => {
    switch (gameMode) {
      case 0:
        setCharacters(getRandomCharacter());
        break;
      case 1:
        setCharacters(getRandomTeam(15));
        break;
      case 2:
        setCharacters(
          getCostlessRandomTeam(Number(membersRef.current?.value) || 5)
        ); //members number
        break;
      default:
        break;
    }
  };

  const changeGamemode = (event: ChangeEvent<HTMLSelectElement>) => {
    setGameMode(Number(event.target.value));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={getCharacter} className="outline bg-white text-black">
        Roll Characters
      </button>
      <select
        name="gamemode"
        className="text-black"
        defaultValue={gameModes.Single}
        onChange={changeGamemode}
      >
        <option value={gameModes.Single}> Singolo </option>
        <option value={gameModes.Team}>Team PD</option>
        <option value={gameModes.CostlessTeam}>Team senza PD</option>
      </select>
      {gameMode === gameModes.CostlessTeam && (
        <select
          name="members"
          className="text-black"
          defaultValue={5}
          ref={membersRef}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      )}
      <div className="flex justify-items-center items-center">
        {characters.map((character) => (
          <div key={character.id} className="m-4">
            <div>id : {character.id}</div>
            <div>name: {character.name}</div>
            <div>cost: {character.cost}</div>
            <Image
              className="w-auto h-auto"
              src={`/${character.img}.png`}
              width={300}
              height={300}
              alt="img"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
