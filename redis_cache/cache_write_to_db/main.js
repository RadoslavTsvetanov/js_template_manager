const { RedisConnector } = require("./redis_connector");
const { DBRepo } = require("./mongo_connector");

function constructDBObject(key, value) {
  return {
    name: key,
    content: value,
  };
}

async function writeToDB(object, mainDBConnector) {
  const log = await mainDBConnector.createTemplate(object);
  console.log(log)
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
  console.log("clearing cache")
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
const every_minute = 1 * 1000 * 60

setInterval(() =>{fetch_data_wraper() }, every_minute);