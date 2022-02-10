import { heroes } from "../data/heroes";

export const getHeroByName = (name: string) => {
  if (name === "") {
    return [];
  } else {
    name = name.toLowerCase();
    return heroes.filter((hero) => hero.superhero.toLowerCase().includes(name));
  }
};
