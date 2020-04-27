export default function databaseAdapters(dbms, dbUrl, options) {
  function createConnection() {
    return dbms.connect(dbUrl, options);
  }

  function createResponseObject(data, hasDatabaseError) {
    return {
      data,
      hasDatabaseError,
    };
  }

  async function insert(model, data) {
    try {
      const process = new model(data).save();
      return createResponseObject(await process, false);
    } catch (err) {
      return createResponseObject(null, true);
    }
  }
  async function findOne(model, filter) {
    try {
      const process = model.findOne(filter).exec();
      return createResponseObject(await process, false);
    } catch (err) {
      return createResponseObject(null, true);
    }
  }
  async function find(model) {
    try {
      const process = model.find().exec();
      return createResponseObject(await process, false);
    } catch (err) {
      return createResponseObject(null, true);
    }
  }

  createConnection().then(() => console.log("Database connected!!!"));

  return Object.freeze({
    insert,
    findOne,
    find,
  });
}
