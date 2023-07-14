// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
import { Podcast, Episode, ItunesInfo } from './models/index.js';
import { sequelize } from './database.js';
import { taddyGraphqlRequest , taddyQuery} from './app.js';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);





// const podcastData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/podcasts.json'), 'utf8'));

// const seedDatabase = async () => {
//   try {
//     // Sync all models that aren't already in the database
//     await sequelize.sync({ alter: true });

//     await Podcast.bulkCreate(podcastData);
//     console.log('Podcast data has been seeded!');
//   } catch (error) {
//     console.error('Error seeding data:', error);
//   } finally {
//     await sequelize.close();
//   }
// };

// seedDatabase();