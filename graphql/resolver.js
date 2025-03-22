const data = {
    school: [
        {
            schClg: "school",
            name: "international",
            address: "kolar",
            students: [1, 3],
        },
        {
            schClg: "clg",
            name: "truba",
            address: "airport",
            students: [2],
        },
    ],
    students: [
        {
            id: 1,
            name: "Romil Jain",
            class: "12th",
            schClg: "school",
        },
        {
            id: 2,
            name: "Nancy Jain",
            class: "clg",
            schClg: "clg",
        },
        {
            id: 3,
            name: "Mansi Jain",
            class: "12th",
            schClg: "school",
        },
    ],
};

// It's responsible for creating the data supply role
export const resolvers = {
    Student: {
        schClg: (parent, arg, context, info) => {
            return data.school.find((sc) => sc.schClg === parent.schClg);
        },
    },
    School: {
        students: (parent, arg, context, info) => {
            return data.students.filter((st) => parent.students.includes(st.id))
        }
    },
    Query: {
        school: () => data.school,
        students: () => data.students,
    },
    Mutation: {
        addStudent: (parent, arg, context, info) => {
            console.log(arg)
            const newStudent = {
                id: data.students.length + 1,
                ...arg
            }
            data.students.push(newStudent)
            return newStudent
        }
    }
};


/*


mutation updateInfo(
        $name: String,
        $class: String
        $schClg: String) {
   addStudent(
        name: $name,
        class: $class
        schClg: $schClg){

          name

        }
  
}



*/