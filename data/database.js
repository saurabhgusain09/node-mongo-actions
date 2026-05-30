import { MongoClient } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

let database;

try {
  console.log('Hang On! Connecting to your DB...');

  await client.connect();

  console.log('Connected to your DB Server');

  database = client.db(dbName);

  await database.command({ ping: 1 });

  console.log('Ping Successful!');
} catch (error) {
  console.error('Oops! Connection failed.', error);
  process.exit(1);
}

export default database;