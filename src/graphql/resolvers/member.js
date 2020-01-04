// import
import bcrypt from 'bcryptjs'
import logging from '../../helpers/logging'

// import model
import Member from '../../models/member'
import Profile from '../../models/profile'

// create new member
export const createMember = async (args) => {
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

// get member
export const members = async () => {
  try {
    const result = await Member.find()
    return result.map((member) => ({ ...member._doc }))
  } catch (err) {
    logging(err)
    throw err
  }
}

// delete member
export const deleteMember = async (args) => {
  try {
    const member = await Member.findOne({ _id: args.id })
    if (!member) {
      throw new Error('no member')
    }

    await Member.deleteOne({ _id: args.id })
    await Profile.deleteOne({ _id: member.profileID._id })

    return 'deleted'
  } catch (err) {
    logging(err)
    throw err
  }
}
