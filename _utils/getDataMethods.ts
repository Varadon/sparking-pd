import { sparkingData } from "./data/sparkingData";
import { SparkingDataElement } from "./data/types";

export const getRandomCharacter = () => {
  const randomIndex = Math.floor(Math.random() * sparkingData.length);
  return [sparkingData[randomIndex]];
};

export const getRandomTeam = (pd: number) => {
  const team: SparkingDataElement[] = [];
  let characters = [...sparkingData];
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

export const getCostlessRandomTeam = (members: number) => {
  const team: SparkingDataElement[] = [];
  let characters = [...sparkingData];

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

const removeTransformations = (
  characters: SparkingDataElement[],
  id: number
) => {
  const character = characters[id];
  return (characters = characters.filter(
    (el) => el.transformFrom !== character.transformFrom
  ));
};
