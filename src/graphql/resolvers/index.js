// import
import bcrypt from 'bcryptjs'
import logging from '../../helpers/logging'

// import model mongo
import Member from '../../models/member'
import Profile from '../../models/profile'

// graphql resolvers
module.exports = {
  // get data members
  members: async () => {
    try {
      const result = await Member.find()
      return result.map((member) => ({ ...member._doc }))
    } catch (err) {
      logging(err)
      throw err
    }
  },
  // get data profiles
  profiles: async () => {
    try {
      const result = await Profile.find()
      return result.map((profile) => {
        return { ...profile._doc }
      })
    } catch (err) {
      logging(err)
      throw err
    }
  },

  // create new member
  createMember: async (args) => {
    try {
      const member = await Member.findOne({ email: args.memberInput.email })
      if (member) {
        throw new Error('member exist')
      }

      const hashedPassword = await bcrypt.hash(args.memberInput.password, 12)

      const memberData = new Member({
        email: args.memberInput.email,
        password: hashedPassword
      })

      const memberResult = await memberData.save()

      // create profile

      const profile = new Profile({
        username: '',
        nickname: '',
        role: '',
        avatar: '',
        status: '',
        memberID: memberResult._id
      })

      const profileResult = await profile.save()

      // update member's profile id

      await Member.updateOne(
        { _id: memberResult._id },
        { $set: { profileID: profileResult._id } }
      )

      return { ...memberResult._doc }
    } catch (err) {
      logging(err)
      throw err
    }
  }
}
