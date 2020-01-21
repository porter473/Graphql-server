const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt, 
    GraphQLList,
    GraphQLNonNull} = graphql;
const Books = require('../models/book');
const Authors = require('../models/author');


// dummy data
// const books = [
//     {name: "Aman ki kahani", genre: "drama", id: "1", authorId: "1"},
//     {name: "Aman ki kahani 2", genre: "sci-fic", id: "2", authorId: "2"},
//     {name: "Aman ki kahani 3", genre: "fantasy", id: "3", authorId: "3"},
//     {name: "Aman ki kahani 4", genre: "fantasy", id: "4", authorId: "3"},
//     {name: "Aman ki kahani 5", genre: "drama", id: "5", authorId: "2"},
//     {name: "Aman ki kahani 6", genre: "sci-fic", id: "6", authorId: "1"}
// ]

// const authors = [
//     {name: "Aman", age: 56, id: "1"},
//     {name: "Raman", age: 45, id: "2"},
//     {name: "AKS", age: 76, id: "3"}
// ]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>  ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                // return _.find(authors, {id: parent.authorId})
                return Authors.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>  ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return _.filter(books, {authorId: parent.id })
                return Books. find({authorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code goes here
                // return _.find(books, {id: args.id});
                return Books.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code goes here
                // return _.find(authors, {id: args.id});
                return Authors.findById(args.id);
            }
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Books.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Authors.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Authors({
                    name: args.name,
                    age: args.age
                });

                return author.save(); 
                                          
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Books({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

                return book.save(); 
                                          
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

