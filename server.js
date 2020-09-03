const express = require('express');
const app = express();
app.use(express.json());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'This server holds the games you have played recently';
app.locals.games = [
  {
    id: 1,
    name: 'The Amazing Spider- man',
    mainCharacter : 'Peter Parker',
    genre: 'Action / Adventure',
		metaCriticReview: 71
	},
  {
    id: 2,
    name: 'Ghosts of Tsushima',
    mainCharacter: 'Jin Sakai',
    genre: 'RPG',
    metaCriticReview: 83
	},
  {
    id: 3,
    name: 'The Last of Us Part 2',
    mainCharacter: 'Ellie',
    genre: 'Survival/Horror',
    metaCriticReview: 94
	}
]

app.get('/', (request, response) => {
  response.send(`Oh heeeeey back end practice: ${app.locals.games}`);
});

app.get('/api/v1/games', (request, response) => {
  const games = app.locals.games

  response.json({ games })
})

app.get('/api/v1/games/:id', (request, response) => {
  const { id } = request.params;
  console.log(id)
  const game = app.locals.games.find(game => game.id === Number(id))
  if (!game) {
    return response.sendStatus(404);
  }

  response.status(200).json(game);
});

app.post('/api/v1/games', (request, response) => {
  const id = Date.now()
  const game = request.body
  
  for (let requiredParameter of [name, mainCharacter, genre, metaCriticReview]) {
    if (!game[requiredParameter]) {
      return response
        .status(422)
        .send({error: `You missed something! Expected Format: { name: <string>, mainCharacter: <string>, genre: <string>, metaCriticReview: <number>}. You're missing the ${requiredParameter} property.`})
    }
  }

  const { name, mainCharacter, genre, metaCriticReview } = game
  app.locals.games.push({ id, name, mainCharacter, genre, metaCriticReview })
  response.status(201).json({ id, name, mainCharacter, genre, metaCriticReview})
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});