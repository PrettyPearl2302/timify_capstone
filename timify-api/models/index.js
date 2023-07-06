import { User } from './user.js';
import { Post } from './post.js';

User.hasMany(Post, { as: 'posts', foreignKey: 'userId' });
Post.belongsTo(User, { as: 'user', foreignKey: 'userId' });

export { User, Post };