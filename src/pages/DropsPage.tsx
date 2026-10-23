import { useParams, useSearchParams } from "react-router-dom";
import { useLooksState } from "../features/runway/context/LooksContext";
import "../styles/DropsPage.scss";
import { useCallback, useMemo } from "react";
import {
  filterDrops,
  filtersToParams,
  listCountries,
  NO_FILTERS,
  parseFunction,
  sortNewestFirst,
  type DropFilters,
} from "../features/runway/domain/drop";
import { DropRoute } from "../features/runway/components/DropRoute/DropRoute";
import { DropCard } from "../features/runway/components/DropCard/DropCard";
import { DropFilterBar } from "../features/runway/components/DropFilterBar/DropFilterBar";

export function DropPage() {
  const state = useLooksState();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const looks = state.status === "ready" ? state.looks : null;
  const countries = useMemo(() => (looks ? listCountries(looks) : []), [looks]);
  const filters = useMemo(
    () => parseFunction(searchParams, countries),
    [searchParams, countries],
  );
  const visible = useMemo(
    () => (looks ? sortNewestFirst(filterDrops(looks, filters)) : []),
    [looks, filters],
  );

  const changeFilters = useCallback(
    (next: DropFilters) =>
      setSearchParams(filtersToParams(next), { replace: true }),
    [setSearchParams],
  );

  if (state.status === "loading") {
    return <p className="status">Backstage...</p>;
  }

  if (state.status === "error") {
    return (
      <p className="status" role="alert">
        Could not load the drops : {state.error.message}
      </p>
    );
  }

  return (
    <>
      <main className="drops-page container">
        <header>
          <p className="eyebrow">Every book, every city</p>
          <h1 className="drops-page__title">All drops</h1>
        </header>

        <DropFilterBar
          filters={filters}
          countries={countries}
          total={visible.length}
          onChange={changeFilters}
        />

        {visible.length === 0 ? (
          <p className="drops-page__empty">
            No drops match these filters.{" "}
            <button type="button" onClick={() => changeFilters(NO_FILTERS)}>
              Clear filters
            </button>
          </p>
        ) : (
          <ul className="drops-page__grid">
            {visible.map((look) => (
              <li key={look.id}>
                <DropCard look={look} />
              </li>
            ))}
          </ul>
        )}
      </main>

      {id && <DropRoute />}
    </>
  );
}
