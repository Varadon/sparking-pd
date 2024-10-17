import { gameModes } from "@/_utils/data/gamemodesEnum";
import Image from "next/image";
import { RefObject, useRef } from "react";

interface MenuProps {
  setGameMode: (gameMode: number) => void;
  setShowCharactersInfo: (value: boolean) => void;
  setBanlist: (values: number[]) => void;
  audioRef: RefObject<HTMLAudioElement>;
}

export default function Menu({
  setGameMode,
  setShowCharactersInfo,
  audioRef,
}: MenuProps) {
  const changeGamemode = (gamemode: number) => {
    audioRef.current?.play();
    setGameMode(gamemode);
    setShowCharactersInfo(true);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-4/6">
        <div className="flex justify-center items-center gap-4">
          <div className="flex flex-col gap-8">
            <div
              className="w-60 h-11 p-px bg-black/70 border rounded-full border-black flex justify-center items-center"
              onClick={() => changeGamemode(gameModes.Single)}
            >
              <button className="w-60 h-10 bg-black/70 rounded-full inner-border active:border-yellow-200">
                SINGOLO
              </button>
            </div>
            <div
              className="w-60 h-11 p-px bg-black/70 border rounded-full border-black flex justify-center items-center"
              onClick={() => changeGamemode(gameModes.Team)}
            >
              <button className="w-60 h-10 bg-black/70 rounded-full inner-border active:border-yellow-200">
                TEAM (PD)
              </button>
            </div>
            <div
              className="w-60 h-11 p-px bg-black/70 border rounded-full border-black flex justify-center items-center"
              onClick={() => changeGamemode(gameModes.CostlessTeam)}
            >
              <button className="w-60 h-10 bg-black/70  rounded-full inner-border active:border-yellow-200">
                TEAM
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-1/6">
        <button className="w-60 h-6 bg-black/50 flex items-center justify-center ">
          BANLIST
        </button>
        <Image
          width={30}
          height={10}
          src="/arrow.svg"
          alt="arrow"
          className="mt-2"
          color="white"
        />
      </div>
    </>
  );
}
