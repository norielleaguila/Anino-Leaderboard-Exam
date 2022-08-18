// MOCK REDIS
export const DEFAULT = {
  redis: (config) => {
    const MockIORedis = require("ioredis-mock");
    const baseRedis = new MockIORedis();

    return {
      scanCount: 1000,

      _toExpand: false,
      client: {
        konstructor: () => baseRedis,
        args: [],
        buildNew: false,
      },
      subscriber: {
        konstructor: () => baseRedis.createConnectedClient(),
        args: [],
        buildNew: false,
      },
      tasks: {
        konstructor: () => baseRedis.createConnectedClient(),
        args: [],
        buildNew: false,
      },
    };
  },
};
