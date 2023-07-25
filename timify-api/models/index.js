import { User } from './user.js';
import { Comment } from './comment.js';
import { Episode } from './episode.js';

User.hasMany(Comment, {as: 'comments', foreignKey: 'userId'})
Comment.belongsTo(User, {as: 'user', foreignKey: 'userId'})
Episode.hasMany(Comment, {as: 'comments', foreignKey: 'episodeId'})
Comment.belongsTo(Episode, {as: 'episode', foreignKey: 'episodeId'})


export {User, Episode, Comment} ;