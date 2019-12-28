// import
const { buildSchema } = require("graphql");

// graphql schema
const Schema = buildSchema(`
    type Member {
      _id: ID!
      username: String!
      nickname: String!
      role: String!
      email: String!
      password: String
      profileID: Profile!
    }

    type Profile {
      _id: ID!
      avatar: String
      status: String
      memberID: Member!
    }

    input MemberInput {
      username: String!
      nickname: String!
      role: String!
      email: String!
      password: String
    }

    input ProfileInput {
      avatar: String
      status: String
    }

    type RootQuery {
      members: [Member!]!
      profiles: [Profile!]!
    }

    type RootMutation {
      createMember(memberInput: MemberInput): Member
      createProfile(profileInput: ProfileInput): Profile
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
`);

module.exports = Schema;
