import { heroes } from "../data/heroes";
import type { Publisher } from "../interfaces/Interfaces";

export const getHeroesByPublisher = (publisher: Publisher) => {
  const validPublisher = ["DC Comics", "Marvel Comics"];
  if (!validPublisher.includes(publisher)) {
    throw new Error(`${publisher} is not a valid publisher`);
  }

  return heroes.filter((hero) => hero.publisher == publisher);
};
