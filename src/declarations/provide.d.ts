import classNamesLib from 'classnames';

declare global {
  const cn: typeof classNamesLib;

  type Dictionary<T> = Record<string, T>;
}
