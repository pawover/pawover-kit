export interface Class<T, Arguments extends unknown[] = unknown[]> {
  new (...arguments_: Arguments): T;
  prototype: Pick<T, keyof T>;
}
