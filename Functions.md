# List of Muninn Functions

## Add Game
`add_game` adds a user-defined game to the games database.

This function uses a `title`, a `publisher`, an array of `tags`, and `platforms`.

It first checks to see if the requirements (a title, a publisher, tags, and platforms) have been filled in, and if not, returns a 401. If they have been filled in, it makes a new game with the inputted information. Before adding this game to the database, the function checks to see if this game has already been added to the database by searching for its title in the database. If the game does already exist, the game isn't added to the database and tells the user that a similar game has been found in the database. If the game is found not to already exist, the game gets saved to the database and tells the user that it's been added to the database.

## Add User
`add_user` adds a user to the list of all users.

This function uses a `username`, a `password`, and an `email`.

The function first checks to see if the username or email matches that of an existing user. If either of these does match an existing user, the user is informed that the user they are trying to create already exists. If they don't match an existing user, then the password is hashed and a new user is created using the username, password, and email. A 401 is sent if there is an error in this process.

## Login
`login` allows users to successfully login to their account on Muninn.

This function uses a `username`, a `password`, and an `email`.

The function first checks to see if the username exists in the list of existing users. If not, then the user is informed that the username hasn't been found and a 401 is sent. If it does exist, then the function checks to see if the password matches the username. If not, then the user if informed that there's a password mismatch and a 401 is sent. If it does match, then the user id is successfully sent.

## Add Review
`add_review` adds a review to a specific game by a specific user.

This function uses a `userId`, a `gameId`, a `desc`, and a `rating`.

The function first creates a new review using the userId, gameId, desc, and rating and saves the review. It then adds the review to the user's reviews. After this, the function calculates the new average rating of the game being reviewed with the new review score being taken into account, then changes the game's rating to this calculated average rating. Finally, the review is added to the game's reviews.

## View Game
`view_game` opens information for a game, including its reviews.

This function takes in an `id`.

The function finds a game using the passed-in id, then sends the game plus the reviews associated with the game.

## Search Game
`search_game` searches for a game with a search_query and displays information for the game after a search.

This function takes in a `search_query`.

The function looks through the database of games and finds games with similar names to the search query. It then returns the JSON strings of these games and sends them. These JSON strings are used to display the games after a search.

## Display Game
`display_game` gets and displays information about a game via its ID.

This function takes in an `id`.

The function looks through the database of games and finds a game with the inputted id. It then returns the JSON string of the game associated with the id.

## Serve Default Games
`serve_default_games` serves a list of game names to the frontend for searching through the database.

## Add Game to Library
`add_game_to_library` allows users to add a game to their library.

This function uses a `userID` and a `gameID`.

The function finds the user associated with the userID by searching through the list of existing users. It then pushes the game associated with the gameID onto the user's library and saves it. If there's an error along the way, a 401 is sent; otherwise, a 201 is sent.

## Display User
`display_user` gets a user by their user id and returns user information. This is for users looking at their own profile.

This function takes in an `id`.

The function finds the user associated with the id by searching through the list of existing users. It then displays the information associated with the user, including the user's friends, reviews, their wishlist, their library, and their suggested games.

## Display Profile
`display_profile` gets a profile by their user id and returns profile information. This is for users looking at someone else's profile.

This function takes in an `id`.

The function finds the user associated with the id by searching through the list of existing users. It then displays the information associated with the user, including the user's friends, reviews, and their library.
