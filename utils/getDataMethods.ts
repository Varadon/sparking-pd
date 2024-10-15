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
    team.push(characters[randomIndex]);
    remainingPd -= characters[randomIndex].cost;
    characters.splice(randomIndex, 1);
    characters = characters.filter((el) => el.cost <= remainingPd);
  }

  return team;
};

export const getCostlessRandomTeam = (members: number) => {
  const team: SparkingDataElement[] = [];
  const characters = [...sparkingData];

  for (let i = 0; i < members; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    team.push(characters[randomIndex]);
    characters.splice(randomIndex, 1);
  }
  return team;
};
