# Tic Tac Toe
- GitHub Pages Link: 
https://scocuzza.github.io/TicTacToe/html/index.html
- Single Player And Multiplayer Tic Tac Toe Game
- See if you can beat the Single Player Opponent !
- Customize Player Name and Player Character
- Keep and Record Score in a Leaderboard across multiple rounds !
- Responsive and Playable on PC and all Mobile Devices
- Enable Audio !

## List of Technologies Used
- HTML
- CSS
- Javascript
- Chrome

## Link to wireframe and User Stories
- WireFrame
https://drive.google.com/file/d/1tcLrbXskvsy6xBd_P9nYVV7IlHcYkfQ6/view?usp=sharing

- User Stories
https://git.generalassemb.ly/prudential-0921/project-1

## Development and Problem Solving Strategy
User Story Driven Development.
1. Develop a WireFrame Design 
2. Create basic Html Elements
3. Add Event Listeners to functional elements
4. Create functionality based on user stories, starting with the easiest first
5. Work on flex display for positioning of elements using CSS
6. Implement basic CSS styling - backgrounds, colors, button styling, hover animations
7. Tacking Extra features one by one by repeating steps 2-6

## List unsolved problems which would be fixed in future iterations.
- Show that you are battling against the computer when in Single Player Mode
- Allow Muliplayer across devices

## Describe how you solved for the winner
- First thing was to represent the Tic Tac Toe Board as an array
- Each index in the array corresponds to a box on the board
- Write If / Else If statements to check if (first 3 indexes, second 3 indexes, third 3 indexes) are all a matching character (this will give you a winning row, do the same for vertical and diagonal matches o)
## Describe how some of your favorite functions work
- checkForWinner(board, player) - takes the current board and player argument to see if any terminal states have been reached (3 in a row, 3 vertical, 3 diagonal, or full board and no matches (tie))
- storePlayerLocalStorage() - after each time a player updates their name or icon - call this function to keep the data persist upon exit/refresh
