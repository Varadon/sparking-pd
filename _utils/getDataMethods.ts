import { sparkingData } from "./data/sparkingData";
import { SparkingDataElement } from "./data/types";

export const getRandomCharacter = (banlist: number[]) => {
  let characters = [...sparkingData];
  characters = removeBannedCharacters(characters, banlist);
  const randomIndex = Math.floor(Math.random() * characters.length);
  return [characters[randomIndex]];
};

export const getRandomTeam = (pd: number, banlist: number[]) => {
  const team: SparkingDataElement[] = [];
  let characters = [...sparkingData];
  characters = removeBannedCharacters(characters, banlist);

  let remainingPd = pd;

  while (remainingPd > 0 && characters.length > 0) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const character = characters[randomIndex];
    team.push(character);
    remainingPd -= character.cost;
    if (character.transformFrom)
      characters = removeTransformations(characters, randomIndex);
    else characters.splice(randomIndex, 1);

    characters = characters.filter((el) => el.cost <= remainingPd);
  }

  return team;
};

export const getCostlessRandomTeam = (members: number, banlist: number[]) => {
  const team: SparkingDataElement[] = [];
  let characters = [...sparkingData];
  characters = removeBannedCharacters(characters, banlist);

  for (let i = 0; i < members; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const character = characters[randomIndex];
    team.push(character);
    if (character.transformFrom)
      characters = removeTransformations(characters, randomIndex);
    else characters.splice(randomIndex, 1);
  }
  return team;
};

const removeBannedCharacters = (
  characters: SparkingDataElement[],
  banlist: number[]
) => {
  const banlistSet = new Set(banlist);
  characters = characters.filter((el) => !banlistSet.has(el.id));

  return characters;
};

const removeTransformations = (
  characters: SparkingDataElement[],
  id: number
) => {
  const character = characters[id];
  return (characters = characters.filter(
    (el) => el.transformFrom !== character.transformFrom
  ));
};
