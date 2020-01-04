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

    type Login {
      email: String!
      token: String!
      refreshToken: String!
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

    input LoginMember {
      email: String!
      password: String!
    }

    type RootQuery {
      members: [Member!]!
      profiles: [Profile!]!
    }

    type RootMutation {
      createMember(memberInput: MemberInput): Member
      deleteMember(id: String!): String
      searchMember(username: String!): [Profile]
      loginMember(input: LoginMember): Login
      updateProfile(input: UpdateProfileInput): Profile
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
`)

export default Schema
