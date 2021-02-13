const graphql=require('graphql');
const _=require('lodash');
const Book=require('../models/book');
const Author=require('../models/author');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
 }=graphql;

const BookType=new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, _2){
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType=new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,_2){
                return Book.find({authorId: parent.id});
            }
        }
    })
});

const RootQuery=new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(_1,args){
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(_1,args){
                return Author.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(_1, _2){
                return Book.find({});
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(_1,_2){
                return Author.find({});
            }
        }
    }
});

const mutation=new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve(_1, args){
                const author=new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook:{
            type: BookType,
            args: {
                title: {type: GraphQLNonNull(GraphQLString)},
                genre: {type: GraphQLNonNull(GraphQLString)},
                authorId: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(_1,args){
                const book=new Book({
                    title: args.title,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query: RootQuery,
    mutation
})