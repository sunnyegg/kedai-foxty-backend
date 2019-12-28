// import
const bcrypt = require("bcryptjs");

// import model mongo
const Member = require("../../models/member");
const Profile = require("../../models/profile");

// graphql resolvers
module.exports = {
  members: async () => {
    // fetch data
    try {
      const result = await Member.find();
      return result.map(member => {
        return { ...member._doc };
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  profiles: async () => {
    try {
      const result = await Profile.find();
      return result.map(profile => {
        return { ...profile._doc };
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createMember: async args => {
    try {
      const member = await Member.findOne({ email: args.memberInput.email });
      if (member) {
        throw new Error("member exist");
      }

      const hashedPassword = await bcrypt.hash(args.memberInput.password, 12);

      const memberData = new Member({
        email: args.memberInput.email,
        password: hashedPassword
      });

      const memberResult = await memberData.save();

      // create profile

      const profile = new Profile({
        username: "",
        nickname: "",
        role: "",
        avatar: "",
        status: "",
        memberID: memberResult._id
      });

      const profileResult = await profile.save();

      // update member's profile id

      await Member.updateOne(
        { _id: memberResult._id },
        { $set: { profileID: profileResult._id } }
      );

      return { ...memberResult._doc };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
