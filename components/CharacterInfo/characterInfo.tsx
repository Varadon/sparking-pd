import { SparkingDataElement } from "@/_utils/data/types";
import {
  getCostlessRandomTeam,
  getRandomCharacter,
  getRandomTeam,
} from "@/_utils/getDataMethods";
import Image from "next/image";
import { useRef } from "react";

interface CharacterInfoProps {
  characters: SparkingDataElement[];
  setCharacters: (characters: SparkingDataElement[]) => void;
  gameMode: number;
  banlist: number[];
}

export default function CharacterInfo({
  characters,
  setCharacters,
  gameMode,
}: // banlist,
CharacterInfoProps) {
  const membersRef = useRef<HTMLSelectElement>(null);

  const getCharacters = () => {
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
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col justify-center items-start">
      <div
        className="w-60 h-11 p-px bg-black/70 border rounded-full border-black flex justify-center items-center"
        onClick={getCharacters}
      >
        <button className="w-60 h-10 bg-black/70 border-2 rounded-full border-slate-600 active:bg-orange-500 active:border-yellow-200">
          GENERA
        </button>
      </div>
      {characters.map((character) => (
        <div
          key={character.id}
          className="flex justify-center items-center m-4"
        >
          <Image
            className="w-48 h-48 object-cover"
            src={`/${character.img}.png`}
            width={150}
            height={150}
            alt="img"
            priority
          />
          <div className="text-center">{character.name}</div>
          <div className="text-center">costo: {character.cost}</div>
        </div>
      ))}
    </div>
  );
}
