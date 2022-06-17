import { nonNull, objectType, stringArg, extendType } from 'nexus';
import { User } from './User';
// import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';

export const Blog = objectType({
  name: 'Blog',
  definition(t) {
    t.nonNull.int('id');
    t.string('title');
    t.string('category');
    t.string('description');
    t.string('published');
    t.string('createdAt');
    t.string('updatedAt');
    // t.list.string('tags');
    // t.list.field('authors', {
    //   type: User,
    //   async resolve(parent, _args, ctx) {
    //     return await ctx.prisma.user
    //       // .findUnique({
    //       //   where: {
    //       //     id: parent.id,
    //       //   },
    //       // })
    //       // .blogs();
    //   },
    // });
  },
});

// get ALl Links

export const BlogsQuery = extendType({
  type: 'Query',
  definition: t => {
    t.nonNull.list.field('blogs', {
      type: 'Blog',
      // args: { id: intArg('id of the user') },
      resolve: (_root, args, ctx): any => ctx.prisma.blog.findMany(),
    })
  },
})

// export const LinksQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.connectionField('links', {
//       type: Link,
//       resolve: async (_, { after, first }, ctx) => {
//         const offset = after ? cursorToOffset(after) + 1 : 0;
//         if (isNaN(offset)) throw new Error('cursor is invalid');

//         const [totalCount, items] = await Promise.all([
//           ctx.prisma.link.count(),
//           ctx.prisma.link.findMany({
//             take: first,
//             skip: offset,
//           }),
//         ]);

//         return connectionFromArraySlice(
//           items,
//           { first, after },
//           { sliceStart: offset, arrayLength: totalCount }
//         );
//       },
//     });
//   },
// });


// get Unique Link
// export const LinkByIDQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.nonNull.field('link', {
//       type: 'Link',
//       args: { id: nonNull(stringArg()) },
//       resolve(_parent, args, ctx) {
//         const link = ctx.prisma.link.findUnique({
//           where: {
//             id: args.id,
//           },
//         });
//         return link;
//       },
//     });
//   },
// });

// create link
// export const CreateLinkMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('createLink', {
//       type: Link,
//       args: {
//         title: nonNull(stringArg()),
//         url: nonNull(stringArg()),
//         imageUrl: nonNull(stringArg()),
//         category: nonNull(stringArg()),
//         description: nonNull(stringArg()),
//       },
//       async resolve(_parent, args, ctx) {
//         const user = await ctx.prisma.user.findUnique({
//           where: {
//             email: ctx.user.email,
//           },
//         });
//          if (!user || user.role !== 'ADMIN') {
//           throw new Error(`You do not have permission to perform action`);
//         }
//         const newLink = {
//           title: args.title,
//           url: args.url,
//           imageUrl: args.imageUrl,
//           category: args.category,
//           description: args.description,
//         };

//         return await ctx.prisma.link.create({
//           data: newLink,
//         });
//       },
//     });
//   },
// });

// update Link
// export const UpdateLinkMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('updateLink', {
//       type: 'Link',
//       args: {
//         id: stringArg(),
//         title: stringArg(),
//         url: stringArg(),
//         imageUrl: stringArg(),
//         category: stringArg(),
//         description: stringArg(),
//       },
//       resolve(_parent, args, ctx) {
//         return ctx.prisma.link.update({
//           where: { id: args.id },
//           data: {
//             title: args.title,
//             url: args.url,
//             imageUrl: args.imageUrl,
//             category: args.category,
//             description: args.description,
//           },
//         });
//       },
//     });
//   },
// });
// // delete Link
// export const DeleteLinkMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('deleteLink', {
//       type: 'Link',
//       args: {
//         id: nonNull(stringArg()),
//       },
//       resolve(_parent, args, ctx) {
//         return ctx.prisma.link.delete({
//           where: { id: args.id },
//         });
//       },
//     });
//   },
// });
