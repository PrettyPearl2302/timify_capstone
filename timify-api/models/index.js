import { User } from './user.js'
import { Comment } from './comment.js'
import { Episode } from './episode.js'
import { Rating } from './rating.js'
import { Podcast } from './podcast.js'
import { Bookmarked } from './bookmarked.js'

Podcast.hasMany(Episode, { as: 'episode', foreignKey: 'podcastId' })
Episode.belongsTo(Podcast, { as: 'podcast', foreignKey: 'podcastId' })
User.hasMany(Comment, { as: 'comments', foreignKey: 'userId' })
Comment.belongsTo(User, { as: 'user', foreignKey: 'userId' })
Episode.hasMany(Comment, { as: 'comments', foreignKey: 'episodeId' })
Comment.belongsTo(Episode, { as: 'episode', foreignKey: 'episodeId' })
User.hasMany(Rating, { as: 'ratings', foreignKey: 'userId' })
Rating.belongsTo(User, { as: 'user', foreignKey: 'userId' })
Rating.belongsTo(Episode, { as: 'episode', foreignKey: 'episodeId' })
Episode.hasMany(Rating, { as: 'ratings', foreignKey: 'episodeId' })
User.hasMany(Bookmarked, { as: 'bookmarks', foreignKey: 'userId' })
Bookmarked.belongsTo(User, { as: 'user', foreignKey: 'userId' })

export { User, Episode, Comment, Rating, Podcast, Bookmarked }
