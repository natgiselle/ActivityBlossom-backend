const { gql } = require('apollo-server');

/* from graphQL documentation:

ex type def: 
type Character {
    name: String!
    appearsIn: [Episode!]!
}

The language is readable, but let's go over it so that we can have a shared vocabulary:

    Character is a GraphQL Object type, meaning it's a type with some fields. Most of the types in your schema will be Object types.
    name and appearsIn are fields on the Character type. That means that name and appearsIn are the only fields that can appear in any part of a GraphQL query that operates on the Character type.
    String is one of the built-in Scalar types. These are types that resolve to a single scalar value and can't have sub-selections in the query. We'll go over Scalar types more later.
    String! means that the field is a Non-Null type, meaning the GraphQL service promises to give you a value whenever you query this field. In SDL, we represent those with an exclamation mark.
    [Episode!]! represents an List type of Episode objects. When a List is Non-Null, you can always expect an array (with zero or more items) when you query the appearsIn field. In this case, since Episode! is also Non-Null within the list, you can always expect every item in the array to be an Episode object.

Now you know what a GraphQL Object type looks like and how to read the basics of SDL.

We must also define our queries and mutations.

If we have multiple queries or mutations, they will all be defined under said operation.

Ex:

type Query{
        getArtist(name: String!): Artist
        getArtists: [Artist]
    }

    here, there are two queries defined for said web page, a getArtist, 
    which takes in a name and returns a "Artist Object"
    and a getArtists, which returns a list of artists.

*/

const TypeDefs = gql`
    type User {
        id: ID!
        email: String!
        password: String!
        createdAt: String!
        avatarFlower: String
    }

    type Task {
        id: ID!
        title: String!
        description: String
        dueDate: String
        completed: Boolean!
        isEcoFriendly: Boolean!
        userId: ID!
        createdAt: String!
    }

    type Event {
        id: ID!
        title: String!
        description: String
        startDate: String!
        endDate: String
        userId: ID!
        createdAt: String!
    }

    type SustainabilityGoal {
        id: ID!
        title: String!
        description: String
        targetDate: String
        completed: Boolean!
        userId: ID!
        createdAt: String!
    }

    type EcoAction {
        id: ID!
        taskId: ID!
        description: String!
        impact: String
        userId: ID!
        createdAt: String!
    }

    input TaskInput {
        title: String!
        description: String
        dueDate: String
        isEcoFriendly: Boolean!
    }

    input EventInput {
        title: String!
        description: String
        startDate: String!
        endDate: String
    }

    input SustainabilityGoalInput {
        title: String!
        description: String
        targetDate: String
    }

    type Query {
        getUser(email: String!, password: String!): User
        getUsers: [User]!
        getTasks(userId: ID!): [Task]
        getTask(taskId: ID!, userId: ID!): Task
        getEvents(userId: ID!): [Event]
        getEvent(eventId: ID!): Event
        getSustainabilityGoals(userId: ID!): [SustainabilityGoal]
        getSustainabilityGoal(goalId: ID!): SustainabilityGoal
        getEcoActions(userId: ID!): [EcoAction]
    }

    type Mutation {
        register(email: String!, password: String!): User
        login(email: String!, password: String!): User
        createTask(taskInput: TaskInput, userId: ID!): Task
        updateTask(taskId: ID!, taskInput: TaskInput, userId: ID!): Task
        deleteTask(taskId: ID!, userId: ID!): String
        toggleTaskCompletion(taskId: ID!, userId: ID!): Task
        createEvent(eventInput: EventInput): Event
        updateEvent(eventId: ID!, eventInput: EventInput): Event
        deleteEvent(eventId: ID!): String
        createSustainabilityGoal(goalInput: SustainabilityGoalInput): SustainabilityGoal
        updateSustainabilityGoal(goalId: ID!, goalInput: SustainabilityGoalInput): SustainabilityGoal
        deleteSustainabilityGoal(goalId: ID!): String
        toggleGoalCompletion(goalId: ID!): SustainabilityGoal
        recordEcoAction(taskId: ID!, description: String!, impact: String): EcoAction
    }
`;

module.exports = TypeDefs;

