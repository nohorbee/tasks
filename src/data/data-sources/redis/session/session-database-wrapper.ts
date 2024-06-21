import { redisDB } from "@config/redis-config";
import { DataBaseWrapper } from "@data/data-sources/redis/redis-database-wrapper";

export const sessionDatabase: DataBaseWrapper = {
  hSet: (hashKey, key, value) => redisDB.getClient().hSet(hashKey, key, value),
  del: (key: string) => redisDB.getClient().del(key),
  sAdd: (setKey, value) => redisDB.getClient().sAdd(setKey, value),
  sMembers: (setKey) => redisDB.getClient().sMembers(setKey),
  hGetAll: (hashKey) => redisDB.getClient().hGetAll(hashKey),
  expire: (key, secondsToExpire) =>
    redisDB.getClient().expire(key, secondsToExpire),
};
