const keystone = require('keystone');
const { UserInputError } = require('apollo-server');

const Candidate = keystone.list('Candidate').model;
const User = keystone.list('User').model;

module.exports = {
  kind: 'mutation',
  name: 'createAccount',
  description: 'create a newCandidate account',
  args: {
    input: `input CreateCandidateAccountInput {
      firstName: String!
      lastName: String!
      email: String!
      password: String!
		}`,
  },
  type: `type CreateCandidateAccountPayload {
    token: String!
    name: String!
  }`,
  resolve: async ({ args, context: { services } }) => {
    const {
      input: {
        firstName, lastName, email, password,
      },
    } = args;
    try {
      const existing = await User.findOne({ email });
      if (!existing) {
        const newCandidate = new Candidate({
          email,
          password,
          firstName,
          lastName,
        });
        await newCandidate.save();
        // newCandidate.getActivationLinkEmail().send();
        services.sendActivationLink(newCandidate);
        return {
          name: newCandidate.name,
          token: newCandidate.signToken(),
        };
      }
      return Promise.reject(new UserInputError('email already exists'));
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
