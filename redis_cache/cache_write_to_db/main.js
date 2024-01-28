const { RedisConnector } = require("./redis_connector");
const { DBRepo } = require("../../backend/dist/main_db_client");

function constructDBObject(key, value) {
  return {
    name: key,
    content: value,
  };
}

async function writeToDB(object, mainDBConnector) {
  await mainDBConnector.createTemplate(object);
}

async function writeCacheToDB(redisConnector, batchCount) {
  const dbRepo = new DBRepo();
  const allKeys = await redisConnector.getAllKeys();

  const keyBatches = [];
  for (let i = 0; i < allKeys.length; i += 0) {
    keyBatches.push(allKeys.slice(i, i + batchCount));
    i += batchCount; //it is here instead up in the for loop init since we want to check for batch compatibility (e.g. the code will go out of bounds array if the length of the keys is 7 but we increment to 8 and try to access it)
    if (allKeys.length - (i + batchCount) < 0) {
      batchCount = allKeys.length - i;
    }
  }

  for (const keyBatch of keyBatches) {
    const writePromises = keyBatch.map(async (key) => {
      const value = await redisConnector.get(key);
      const dbObject = constructDBObject(key, value);
      await writeToDB(dbObject, dbRepo);
    });

    await Promise.all(writePromises);
  }
}

async function cache_clearer(batchCount) {
  const redisConnector = new RedisConnector();

  try {
    await redisConnector.connect();
    await writeCacheToDB(redisConnector, batchCount);
    redisConnector.clearDatabase();
  } finally {
    await redisConnector.disconnect();
  }
}
function fetch_data_wraper(){
  cache_clearer(4)
}
fetch_data_wraper()
setInterval(() =>fetch_data_wraper , 3600000);