// import
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// import model mongo
const Member = require("./src/models/member");
const Profile = require("./src/models/profile");

// init express
const app = express();

// parsing json
app.use(bodyParser.json());

// graphql
app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
    type Member {
        _id: ID!
        username: String!
        nickname: String!
        role: String!
        email: String!
        password: String
    }

    type Profile {
      _id: ID!
      avatar: String!
      status: String!
    }

    input MemberInput {
      username: String!
      nickname: String!
      role: String!
      email: String!
      password: String
    }

    input ProfileInput {
      avatar: String!
      status: String!
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
  `),
    rootValue: {
      members: () => {
        return Member.find() // fetch data
          .then(result => {
            return result.map(member => {
              return { ...member._doc };
            });
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      profiles: () => {
        return Profile.find()
          .then(result => {
            return result.map(profile => {
              return { ...profile._doc };
            });
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      createMember: args => {
        return Member.findOne({ email: args.memberInput.email })
          .then(member => {
            if (member) {
              throw new Error("member exist");
            }

            return bcrypt.hash(args.memberInput.password, 12);
          })
          .then(hashedPassword => {
            const member = new Member({
              username: args.memberInput.username,
              nickname: args.memberInput.nickname,
              role: args.memberInput.role,
              email: args.memberInput.email,
              password: hashedPassword
            });

            // save data to mongodb
            return member.save();
          })
          .then(result => {
            return { ...result._doc, password: null };
          })
          .catch(err => {
            throw err;
          });
      },
      createProfile: args => {
        const profile = new Profile({
          avatar: args.profileInput.avatar,
          status: args.profileInput.status
        });

        // save data to mongodb
        return profile
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc };
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }
    },
    graphiql: true
  })
);

// database
mongoose
  .connect(`mongodb://localhost:27017/kedai-foxty`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database.");

    // server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log("Server is listening on port: " + port);
    });
  })
  .catch(err => {
    console.log("Error occured.");
    console.log(err);
  });
