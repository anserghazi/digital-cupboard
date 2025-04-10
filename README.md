# [Digital Cupboard](https://digitalcupboard.ca/) 

If you enjoy watching cooking videos on YouTube, you've probably encountered a video without an ingredient list or recipe in the description/comments. I'm sure those recipes would be fun to try, but I shouldn't have to rewatch the entire thing to jot the ingredients down! I want my ingredients *now*. :triumph:

[Digital Cupboard](https://digitalcupboard.ca/) takes every ingredient mentioned in a YouTube video and adds those ingredients to the online shopping cart of your convenience. It's easy - enter the URL of the cooking video, review your cart, and submit your order through your local grocery store's app/website.

## How it works
A noun list from each YouTube video is generated by taking the video's captions and filtering for nouns using WinkNLP. That list is then filtered for food-related nouns that exist in our ingredient database. When the ingredient list has been created, the user can add any missing ingredients and remove excess ingredients/nouns. Next, a local supermarket's online store is selected by the user, and each ingredient in the list is added to the store's cart if it exists. A link to that cart is then shared with the user.

## Tech Stack

- NestJS
- Express
- React
- Typescript
- MySQL
- AWS

## Installation & Running the app

Install the dependencies and start the server.

```bash
# install dependencies
$ npm i

# watch mode
$ npm run start:dev
```
