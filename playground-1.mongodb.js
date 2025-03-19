// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("due_games");

users.findById("67c997a433b6f517ac0dd64a").populate({
    path: "borrowings",
    populate: [
      {
        path: "gl",
        populate: [
          {
            path: "game",
            model: "Game",
          },
          {
            path: "location",
            model: "Location",
            populate: {
              path: "manager",
              model: "User", // Assuming manager is a User
            },
          },
        ],
      },
    ],
  });