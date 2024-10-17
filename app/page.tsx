"use client";

import Menu from "@/components/Menu/menu";
import { gameModes } from "@/_utils/data/gamemodesEnum";
import { SparkingDataElement } from "@/_utils/data/types";

import Image from "next/image";
import { useRef, useState } from "react";
import CharacterInfo from "@/components/CharacterInfo/characterInfo";
import "./globals.css";

export default function Home() {
  const [gameMode, setGameMode] = useState<number>(gameModes.Single);
  const [characters, setCharacters] = useState<SparkingDataElement[]>([]);
  const [showCharactersInfo, setShowCharactersInfo] = useState<boolean>(false);
  const [banlist, setBanlist] = useState<number[]>([]);

  const goToMenu = () => {
    setShowCharactersInfo(false);
    setCharacters([]);
  };

  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="flex flex-col h-screen md:items-center">
      <audio ref={audioRef}>
        <source src="/menu.mp3" type="audio/mpeg" />
      </audio>
      <div className="flex flex-col items-center justify-center h-1/6">
        <Image
          src="/logo.png"
          width={250}
          height={250}
          priority
          alt="logo"
          className="mt-12"
          onClick={goToMenu}
        />
      </div>
      {showCharactersInfo ? (
        <CharacterInfo
          characters={characters}
          setCharacters={setCharacters}
          gameMode={gameMode}
          banlist={banlist}
        />
      ) : (
        <Menu
          setGameMode={setGameMode}
          setShowCharactersInfo={setShowCharactersInfo}
          setBanlist={setBanlist}
          audioRef={audioRef}
        />
      )}
    </div>
  );
}
