export interface DataBaseWrapper {
  hSet(hashKey: string, key: string, value: string): Promise<number>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  del(key: string): Promise<any>;
  sAdd(setKey: string, value: string[]): Promise<number>;
  sMembers(setKey: string): Promise<string[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hGetAll(hashKey: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expire(key: string, secondsToExpire: number): Promise<any>;
}
