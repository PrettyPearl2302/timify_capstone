import {Podcast} from './podcast.js'
import { Episode } from './episode.js';
import { ItunesInfo } from './itunesInfo.js';

Podcast.hasMany(Episode, { foreignKey: 'podcastUuid' });
Episode.belongsTo(Podcast, { foreignKey: 'podcastUuid' });
Podcast.hasOne(ItunesInfo, {
    foreignKey: 'podcastUuid'
  });


export {Podcast, Episode, ItunesInfo};