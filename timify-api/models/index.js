import { User } from './user.js';
import { Comment } from './comment.js';
import { Episode } from './episode.js';
import { Rating } from './rating.js';

User.hasMany(Comment, {as: 'comments', foreignKey: 'userId'})
Comment.belongsTo(User, {as: 'user', foreignKey: 'userId'})
Episode.hasMany(Comment, {as: 'comments', foreignKey: 'episodeId'})
Comment.belongsTo(Episode, {as: 'episode', foreignKey: 'episodeId'})
User.hasMany(Rating, {as: 'ratings', foreignKey: 'userId'})
Rating.belongsTo(User, {as: 'user', foreignKey: 'userId'})
Rating.belongsTo(Episode, {as: 'episode', foreignKey: 'episodeId'})
Episode.hasMany(Rating, {as: 'ratings', foreignKey: 'episodeId'})

export {User, Episode, Comment, Rating} ;