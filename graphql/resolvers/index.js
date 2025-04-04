const usersResolvers = require('./users');
const tasksResolvers = require('./tasks');
const eventsResolvers = require('./events');
const sustainabilityGoalsResolvers = require('./sustainabilityGoals');
const ecoActionsResolvers = require('./ecoActions');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...tasksResolvers.Query,
        ...eventsResolvers.Query,
        ...sustainabilityGoalsResolvers.Query,
        ...ecoActionsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...tasksResolvers.Mutation,
        ...eventsResolvers.Mutation,
        ...sustainabilityGoalsResolvers.Mutation,
        ...ecoActionsResolvers.Mutation
    }
};
