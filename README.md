# Browser Board Game (NodeJs-Express-MongoDb-JavaScript)

![couw](https://raw.githubusercontent.com/sancode86/Browser-Board-Game-NodeJs-Express-MongoDb/master/imgs_project/couwgif.gif)

## INFO
Browser board game (with "cards" or "creatures") coded in vanilla JavaScript, using MongoDb, NodeJs, Express and EJS (templating language). Using passport for authenticating the users/players.

## Main menu
![couw](https://raw.githubusercontent.com/sancode86/Browser-Board-Game-NodeJs-Express-MongoDb/master/imgs_project/2.png)


## Inventory
![couw](https://raw.githubusercontent.com/sancode86/Browser-Board-Game-NodeJs-Express-MongoDb/master/imgs_project/2b.png)


## Buy, sell cards or stickers to apply to your creatures! (also you can gain cards by gambling with a dice).
![couw](https://raw.githubusercontent.com/sancode86/Browser-Board-Game-NodeJs-Express-MongoDb/master/imgs_project/buy.png)

Originally intended for online play (socket.io probably), the game currently supports playing against CPU. 
(it's a really, REALLY simple IA)

## Usage

1. First run: npm install.

2. You need to import into MongoDb:

- cartas.csv
- ventacartas.csv
- apuestascartas.csv

From '/excel_files', all with the same collection name.

Like this:
![couw](https://raw.githubusercontent.com/sancode86/Browser-Board-Game-NodeJs-Express-MongoDb/master/imgs_project/3.png)

or you won't have any cards to play!

3. Start server: npm start or npm run dev (for nodemon)


This project was obviously for learning, feel free to do whatever you want with it.

Coded with ❤️ & ☕
