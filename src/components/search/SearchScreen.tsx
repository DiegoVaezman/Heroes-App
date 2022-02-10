import React, { useEffect, useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import { getHeroByName } from "../../selectors/getHeroByName";
import { HeroCard } from "../hero/HeroCard";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

export const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const query = useQuery().get("q") || "";
  const { onChange, searchText } = useForm({
    searchText: query,
  });

  const heroesFiltered = useMemo(() => getHeroByName(query), [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Búsquedas</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />

          <form onSubmit={(e) => handleSearch(e)}>
            <input
              type="text"
              placeholder="Buscar un héroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={(event) => onChange(event.target.value, "searchText")}
            />
            <button type="submit" className="btn btn-outline-primary mt-1">
              Buscar...
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Resultados</h4>
          <hr />
          {query === "" ? (
            <div className="alert alert-info">Buscar un héroe</div>
          ) : (
            heroesFiltered.length === 0 && (
              <div className="alert alert-info">No hay resultados: {query}</div>
            )
          )}
          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      </div>
    </>
  );
};
