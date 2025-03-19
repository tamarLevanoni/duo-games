// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("due_games");

// Find a document in a collection.
db.getCollection("users").aggregate([
    {
      $match: { _id: ObjectId("67c997a433b6f517ac0dd64a") }
    },
    {
      $lookup: {
        from: "borrowings",
        localField: "borrowings",
        foreignField: "_id",
        as: "borrowed_games"
      }
    },
    {
      $unwind: "$borrowed_games"
    },
    {
      $lookup: {
        from: "gls",
        localField: "borrowed_games.gl",
        foreignField: "_id",
        as: "gl_info"
      }
    },
    {
      $unwind: "$gl_info"
    },
    {
      $lookup: {
        from: "games",
        localField: "gl_info.game",
        foreignField: "_id",
        as: "game_info"
      }
    },
    {
      $unwind: "$game_info"
    },
    {
      $lookup: {
        from: "locations",
        localField: "gl_info.location",
        foreignField: "_id",
        as: "location_info"
      }
    },
    {
      $unwind: "$location_info"
    },
    {
      $lookup: {
        from: "users",
        localField: "location_info.manager",
        foreignField: "_id",
        as: "manager_info"
      }
    },
    {
      $project: {
        name: 1,
        email: 1,
        borrowings: 1,
        borrowed_games: 1,
        game_info: 1,
        location_info: 1,
        manager_info: 1
      }
    }
  ]);

// populate({
//     path: "borrowings",
//     populate: [
//       {
//         path: "gl",
//         populate: [
//           {
//             path: "game",
//             model: "Game",
//           },
//           {
//             path: "location",
//             model: "Location",
//             populate: {
//               path: "manager",
//               model: "User", // Assuming manager is a User
//             },
//           },
//         ],
//       },
//     ],
//   });
  
