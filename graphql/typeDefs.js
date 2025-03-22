export const typeDefs = `#graphql

    type School {
        schClg: String,
        name: String!
        address: String
        students: [Student]
    }

    type Student {
        id: Int,
        name: String!,
        class: String
        schClg: School
    }

    type Query { 
        school: [School]
        students: [Student]
    }

    type Mutation {
        addStudent(id: Int,
        name: String,
        class: String
        schClg: String): Student
    }
`;

/* ! this means that is mandatory
[] that means this is multiple types
type Query - where we define all the data we want (get)
type mutation - where we define all the data we update (post, put, delete)


*/
