export type Filter = string | string[];

/**
 * ActiveFilter represents the currently active filter over
 * the grid.
 *
 * It can be a plain string value or an array of strings.
 */
export default class ActiveFilter {
  private _filter: Filter;

  public constructor(filter: Filter) {
    this._filter = filter;
  }

  public get(): Filter {
    return this._filter;
  }

  public set(targetFilter: Filter): void {
    this._filter = targetFilter;
  }

  public toggle(targetFilter: string): void {
    this._filter = this._toggle(this._filter, targetFilter);
  }

  private _toggle(
    activeFilter: string | string[],
    targetFilter: string
  ): string | string[] {
    if (activeFilter === 'all') {
      return targetFilter;
    }

    if (Array.isArray(activeFilter)) {
      if (activeFilter.includes(targetFilter)) {
        const newActiveFilter = activeFilter.filter(
          (filter): boolean => filter !== targetFilter
        );
        return newActiveFilter.length === 1
          ? newActiveFilter[0]
          : newActiveFilter;
      }
      return [...activeFilter, targetFilter];
    }

    if (activeFilter === targetFilter) {
      return 'all';
    }

    return [activeFilter, targetFilter];
  }
}
