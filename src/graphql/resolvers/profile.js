// import
import logging from '../../helpers/logging'

// import model
import Profile from '../../models/profile'

// resolver
// get profile
export const profiles = async () => {
  try {
    const result = await Profile.find()
    return result.map((profile) => {
      return { ...profile._doc }
    })
  } catch (err) {
    logging(err)
    throw err
  }
}

// update profile
export const updateProfile = async (args) => {
  try {
    const profile = await Profile.findOne({ _id: args.input.id })
    if (!profile) {
      throw new Error('no profile')
    }

    const id = args.input.id
    const data = {
      username: args.input.username,
      nickname: args.input.nickname,
      role: args.input.role,
      avatar: args.input.avatar,
      status: args.input.status,
      updatedAt: new Date()
    }

    const result = await Profile.updateOne({ _id: id }, { $set: data })

    if (!result.ok) {
      throw new Error('something broke')
    }

    return { _id: id, ...data }
  } catch (err) {
    logging(err)
    throw err
  }
}
