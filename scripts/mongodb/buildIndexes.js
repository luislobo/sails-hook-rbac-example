const mongodb = require('mongodb');
const {map} = require('lodash');

async function run() {
  const allIndexes = require('./indexes.json');

  const mongoClient = await mongodb.MongoClient.connect(
      sails.config.datastores.default.url, {useUnifiedTopology: true});
  const db = mongoClient.db('shre');
  await Promise.all(
      map(allIndexes, async (indexes, key) => {
        const toCreate = map(indexes, 'key');
        const unique = map(indexes, 'unique');
        const collection = db.collection(key);
        await Promise.all(map(toCreate,
            async (index, idx) => {
              const options = unique[idx] ? {unique: true} : {};
              await collection.createIndex(index, options);
            }));
      }));
}

module.exports = run;
