import { MongoClient } from "../../deps.ts";
import logger from "./logger.ts";

const MONGO_URI = `mongodb+srv://coderhouse:%405PmAPWakmq%40GHx@coderhouse.q5mhnd3.mongodb.net/coderhouse-project?authMechanism=SCRAM-SHA-1`;

const client = new MongoClient();

try {
  // await client.connect(MONGO_URI);
  await client.connect(MONGO_URI);
  logger.debug(`Base de datos conectada ${MONGO_URI}`);
} catch (err) {
  logger.error(err);
}

const dbConn = client.database("coderhouse-project");

export default dbConn;
