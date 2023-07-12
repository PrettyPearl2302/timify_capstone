import {Podcast} from './podcast.js'
import { Episode } from './episode.js';

Podcast.hasMany(Episode, { foreignKey: 'podcastUuid' });
Episode.belongsTo(Podcast, { foreignKey: 'podcastUuid' });


export {Podcast, Episode};