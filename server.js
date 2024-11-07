const express = require("express");
const { LIMIT_COMPOUND_SELECT } = require("sqlite3");
const utils = require("./utils");
const app = express();
app.use(express.json());

const port = 1234;
app.listen(port, () => console.log(`Serverul merge pe portul ${port}`));



app.get("/tema", async (req, res) => {
  //funcțiile la care aveți acces din fișierul utils sunt:
  //resetDatabase(),
  //getAllGames(),
  //getGameById(id),
  //insertGame(game),
  //getAllSessions(),
  //getSessionById(id),
  //insertSession(session),
  //deleteSession(id),

  //Multă baftă!!!!!

  res.status(200).send("Ar trebui să vedeți asta în browser😎");
});

app.get("/reset", async(req,res)=>{
  await utils.resetDatabase();
  res.status(200).send("Baza de date a fost creata/resetata");
})
app.post("/addGame", async(req,res) =>{
  
  const { title, description, dateOfRelease, genre, platform, rating, maxPossibleScore, hasAward } = req.body;
  // Validare câmpuri obligatorii
  if (!title || !dateOfRelease || !platform) {
    return res.status(400).send("eroare");
  }

  // Validare tipuri de date și intervale
  if (typeof title !== 'string' || typeof platform !== 'string') {
    return res.status(400).send("eroare");
  }
  if (typeof rating !== 'number' || rating < 0 || rating > 10) {
    return res.status(400).send("eroare");
  }
  if (typeof maxPossibleScore !== 'number' || maxPossibleScore < 0) {
    return res.status(400).send("eroare");
  }
  if (hasAward !== undefined && typeof hasAward !== 'boolean') {
    return res.status(400).send("eroare");
  }
  const game = {
    title :title,
    description:description, 
    dateOfRelease:dateOfRelease, 
    genre :genre, 
    platform:platform, 
    rating:rating,
    maxPossibleScore:maxPossibleScore, 
    hasAward :hasAward
  };
  await utils.insertGame(game);
  res.status(200).send("jocul a fost adaugat in db")
})
app.get("/game/:id/release", async(req,res) =>{
  const id = req.params.id;
  const game = await utils.getGameById(id);

  const releaseDate = new Date(game.dateOfRelease);
  const now = new Date();

  const timeDifference = getTimeDifference(releaseDate, now);
  
  if (releaseDate > now) {
      res.json({ message: `Jocul va fi lansat în ${timeDifference.years} ani, ${timeDifference.months} luni și ${timeDifference.days} zile.` });
  } else {
      res.json({ message: `Jocul a fost lansat acum ${timeDifference.years} ani, ${timeDifference.months} luni și ${timeDifference.days} zile.` });
  }

  function getTimeDifference(date1, date2) {
    let years = date2.getFullYear() - date1.getFullYear();
    let months = date2.getMonth() - date1.getMonth();
    let days = date2.getDate() - date1.getDate();

    // Modific valorile negative
    if (days < 0) {
        months -= 1;
        days += new Date(date2.getFullYear(), date2.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return { years, months, days };
}
});
app.post("/session", async(req,res)=>{
  const { playerName, score, date, levelReached, isHighscore, difficulty, multiplier, deaths, gameId } = req.body;
  let allSessions = utils.getAllSessions();
  let exista = false;
  allSessions.array?.forEach(element => {
    if(element == playerName)
      exista = true;
  });

  if(!exista){
  // Validare câmpuri obligatori
  if (!playerName || !score || !date || !levelReached || !difficulty || !multiplier || !gameId) {
    return res.status(400).send("eroare camp obligatoriu");
  }

  // Validare tipuri de date
  if (typeof playerName !== 'string') {
    return res.status(400).send("eroare nume");
  }
  if (typeof score !== 'number' || score < 0) {
    return res.status(400).send("eroare ");
  }
  if (!['easy', 'medium', 'hard'].includes(difficulty)) {
    return res.status(400).send("eroare");
  }
  if (typeof multiplier !== 'number' || multiplier <= 0) {
    return res.status(400).send("eroare");
  }

  const sesiune ={
    playerName:playerName,
    score:score,
    date: date,
    levelReached: levelReached,
    isHighscore: isHighscore,
    difficulty:difficulty,
    multiplier:multiplier,
    deaths:deaths,
    gameId:gameId
  }
  await utils.insertSession(sesiune);
  res.status(200).send("totul ok")
}
res.status(400).send("numele deja exista");
})

app.get("/returnSession/:id", async(req,res)=>{
  const id = req.params.id;
  let sessions = await utils.getAllSessions();
  let allSessiuons = new Array();
  sessions.forEach(functie);

  function functie(sesiune){
    if(sesiune.gameId == id){
      allSessiuons.push(sesiune);
    }
  }
  res.send(allSessiuons);
})

app.get("/highScore/:id", async(req,res)=>{
  const id = req.params.id;
  let allHighscores = new Array();
  let allSessions = await utils.getAllSessions();
  allSessions.forEach(functie);

  function functie(item){ 
    if(item.gameId == id){
      let highScore = item.score * item.multiplier;
      allHighscores.push(highScore);
    }
  }
  res.send(allHighscores);
});

app.get("/games/descrescator", async(req,res)=>{
  let allGames = await utils.getAllGames();
  allGames.sort((a,b) => parseFloat(a.rating) - parseFloat(b.rating));
  console.log(allGames);
  res.send(allGames);
});
app.get("/premiere", async(req,res)=>{
  let allGames = await utils.getAllGames();
  allGames.sort((a,b) => parseFloat(b.rating) - parseFloat(a.rating));

  let toatePremiata = new Array();
  toatePremiata.push(allGames[0]);
  allGames.forEach(afisare)

  function afisare(game){
    if(game.hasAward){
      toatePremiata.push(game);
    }
  }
  res.send(toatePremiata);
})