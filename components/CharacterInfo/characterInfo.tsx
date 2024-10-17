import { gameModes } from "@/_utils/data/gamemodesEnum";
import { SparkingDataElement } from "@/_utils/data/types";
import {
  getCostlessRandomTeam,
  getRandomCharacter,
  getRandomTeam,
} from "@/_utils/getDataMethods";
import Image from "next/image";
import { useRef, useState } from "react";

interface CharacterInfoProps {
  characters: SparkingDataElement[];
  setCharacters: (characters: SparkingDataElement[]) => void;
  gameMode: number;
  banlist: number[];
}

const MIN_MEMBERS = 1;
const MAX_MEMBERS = 5;

export default function CharacterInfo({
  characters,
  setCharacters,
  gameMode,
}: // banlist,
CharacterInfoProps) {
  const [members, setMembers] = useState<number>(5);

  const audioRef = useRef<HTMLAudioElement>(null);

  const getCharacters = () => {
    audioRef.current?.play();
    switch (gameMode) {
      case 0:
        setCharacters(getRandomCharacter());
        break;
      case 1:
        setCharacters(getRandomTeam(15));
        break;
      case 2:
        setCharacters(getCostlessRandomTeam(members));
        break;
      default:
        break;
    }
  };

  const subtractMembers = () => {
    if (members === MIN_MEMBERS) return;

    return setMembers((members) => members - 1);
  };

  const addMembers = () => {
    if (members === MAX_MEMBERS) return;

    return setMembers((members) => members + 1);
  };

  return (
    <div className="flex flex-col items-start">
      <audio ref={audioRef}>
        <source src="/generate.mp3" type="audio/mpeg" />
      </audio>

      <div
        className="w-60 h-11 p-px bg-black/70 border rounded-full border-black flex justify-center items-center mt-6 mb-4 ms-auto mr-auto"
        onClick={getCharacters}
      >
        <button className="w-60 h-10 bg-black/70 rounded-full inner-border active:border-yellow-200">
          GENERA
        </button>
      </div>
      {gameMode === gameModes.CostlessTeam && (
        <>
          <div className="w-52 h-5 p-px bg-black/70 flex  items-center mt-4 mb-6 ms-auto mr-auto">
            <div className="w-1/3 flex justify-start items-center ms-2">
              <Image
                src="/minus.svg"
                alt="-"
                width={15}
                height={15}
                onClick={subtractMembers}
              />
            </div>
            <div className="w-1/3 flex justify-center items-center">
              {members}
            </div>
            <div className="w-1/3 flex justify-end items-center me-2">
              <Image
                src="/plus.svg"
                alt="-"
                width={15}
                height={15}
                onClick={addMembers}
              />
            </div>
          </div>
        </>
      )}
      {characters.map((character) => (
        <div
          key={character.id}
          className="flex justify-center items-center m-2 ml-5"
        >
          <div className="w-16 h-16 p-px bg-black/70 border rounded-md border-black flex justify-center items-center">
            <Image
              className="w-16 h-16 object-cover inner-border rounded-md"
              src={`/${character.img}.png`}
              width={150}
              height={150}
              alt="img"
              priority
            />
          </div>
          <div className="flex flex-col justify-center items-start ml-3">
            <div className="text-center capitalize font-[family-name:var(--font-inter)] font-bold">
              {character.name}
            </div>
            {gameMode === gameModes.Team && (
              <div className="text-center capitalize font-[family-name:var(--font-inter)] font-normal">
                {character.cost}pd
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
