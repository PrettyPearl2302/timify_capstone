import bcrypt from 'bcrypt'
import { User } from './models/user.js'

async function migrateUsers () {
  const encryptSalt = 10

  try {
    const users = await User.findAll()
    for (const user of users) {
      const hashedPassword = await bcrypt.compare(user.password, encryptSalt)
      await user.update({ password: hashedPassword })
    }

    console.log('User migration completed successfully.')
  } catch (error) {
    console.error('User migration failed:', error)
  }
}
migrateUsers()
