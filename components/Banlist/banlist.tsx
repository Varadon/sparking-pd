import { sparkingData as characters } from "@/_utils/data/sparkingData";
import Image from "next/image";

interface BanlistProps {
  banlist: number[];
  setBanlist: (banlist: number[]) => void;
}

export default function Banlist({ banlist, setBanlist }: BanlistProps) {
  const handleBanlist = (id: number) => {
    const newBanlist = [...banlist];
    const itemIndex = newBanlist.indexOf(id);
    if (itemIndex !== -1) newBanlist.splice(itemIndex, 1);
    else newBanlist.push(id);
    return setBanlist(newBanlist);
  };

  return (
    <div className="absolute open-animation h-4/5 w-full border rounded-2xl bg-black/70 overflow-y-auto ">
      <div className="flex justify-center gap-5 flex-wrap mx-4 mt-5 ">
        {characters.map((character) => (
          <div
            key={character.id}
            className="w-12 h-12 border rounded-md border-black flex justify-center items-center"
          >
            <Image
              src={`/${character.img}.png`}
              width={150}
              height={150}
              alt="pg"
              className={`w-12 h-12 object-cover inner-border rounded-md ${
                banlist.indexOf(character.id) !== -1 ? "opacity-25" : ""
              }`}
              onClick={() => handleBanlist(character.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
