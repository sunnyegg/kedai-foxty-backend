// import
import { buildSchema } from 'graphql'

// graphql schema
const Schema = buildSchema(`
    type Member {
      _id: ID!
      email: String!
      password: String
      profileID: Profile!
    }

    type Profile {
      _id: ID!
      username: String!
      nickname: String
      role: String
      avatar: String
      status: String
      memberID: Member!
      createdAt: String
      updatedAt: String
    }

    input MemberInput {
      email: String!
      password: String
    }

    input UpdateProfileInput {
      id: ID!
      username: String!
      nickname: String!
      role: String!
      avatar: String!
      status: String!
    }

    type RootQuery {
      members: [Member!]!
      profiles: [Profile!]!
    }

    type RootMutation {
      createMember(memberInput: MemberInput): Member
      deleteMember(id: String): String
      updateProfile(input: UpdateProfileInput): Profile
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
`)

export default Schema
