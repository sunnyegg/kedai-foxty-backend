// import
import bcrypt from 'bcryptjs'
import logging from '../../helpers/logging'
import { token, refreshToken } from '../../configs/auth'

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

    return { ...memberResult._doc, password: null }
  } catch (err) {
    logging(err)
    throw err
  }
}

// get member
export const members = async () => {
  try {
    const result = await Member.find()
    return result.map((member) => ({ ...member._doc, password: null }))
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

// search member
export const searchMember = async (args) => {
  try {
    const regex = new RegExp(args.username, 'i')
    const member = await Profile.find({ username: regex })
    if (!member.length) {
      throw new Error('no member')
    }

    return member
  } catch (err) {
    logging(err)
    throw err
  }
}

// login member
export const loginMember = async (args) => {
  try {
    const member = await Member.findOne({ email: args.input.email })
    if (!member) {
      throw new Error('no member')
    }

    const check = bcrypt.compareSync(args.input.password, member.password)
    if (!check) {
      throw new Error('wrong password')
    }

    const createToken = token(member._id)
    const createRefresh = refreshToken(member._id)

    return { email: args.input.email, token: createToken, refreshToken: createRefresh }
  } catch (err) {
    logging(err)
    throw err
  }
}
