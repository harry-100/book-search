const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v -password')
                return userData;
            }
            throw new AuthenticationError("Please log in")
    }
},
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
          },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },
        saveBooks: async (parent, { book }, context) => {
              if (context.user) {
                  const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: book } },
                        { new: true }
                    );
                    return updateUser;
              }
                throw new AuthenticationError("Please log in")
            },
        removeBooks: async (parent, { book }, context) => {
                if (context.user) {
                    const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedBooks: book } },
                        { new: true }
                    );
                    return updateUser;
                }
                throw new AuthenticationError("Please log in")
            }
                
            }
};
module.exports = resolvers;