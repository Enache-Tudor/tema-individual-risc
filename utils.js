const { Sequelize, DataTypes } = require("sequelize");

//Daca aveti Windows este ok să folosiți următoarea secțiune de cod așa cum e:
const database = new Sequelize("Vedeți că aici mai trebuie ceva", "root", "", {
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true,
  },
});

/*Dacă aveți Macbook vă rugăm să schimbați codul de mai sus cu următoarele linii de cod:
 const database = new Sequelize("Vedeți că aici mai trebuie ceva", "root", "", {
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true,
  },
});

!!ATENTIE!! Doar partea cu const database=[...] până la comentariul pe care l-am adăugat trebuie modificată
*/

//aici aveti un link spre pagina de sequelize
//pachetul care se ocupa cu manipularea obiectelor si tabelelor
//din baza de date
//https://sequelize.org/docs/v6/getting-started/
//aveti in partea stanga mai multe capitole pe care sa le parcurgeti
//ca sa va faceti o oarecare idee despre ce este si cum functioneaza

const gameDb = database.define(
  "games",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfRelease: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    maxPossibleScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hasAward: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { freezeTableName: true }
);
const sessionDb = database.define(
  "sessions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    playerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    levelReached: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isHighscore: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    difficulty: {
      type: DataTypes.ENUM("Easy", "Medium", "Hard"),
      allowNull: false,
    },
    multiplier: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1.0,
    },
    deaths: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

gameDb.hasMany(sessionDb, {
  foreignKey: {
    allowNull: false,
  },
});
sessionDb.belongsTo(gameDb);

/**
 * Functia creaza tabelele in baza de date si le goleste daca exista deja.
 * @return
 * Daca operatia a mers, functia va returna 'succes!'
 * Daca operatia esueaza, functia va intoarce 'eroare!'
 */

function resetDatabase() {
  return database
    .sync({ force: true })
    .then(() => {
      return "succes!";
    })
    .catch((err) => {
      return "eroare!!";
    });
}

/**
 * Functia intoarce toate jocurile din baza de date
 * @return
 * Daca operatia a mers, va returna un array cu toate jocurile.
 * Daca operatia esueaza, va intoarce 'eroare!'
 */

function getAllGames() {
  return gameDb
    .findAll()
    .then((games) => {
      return games.map((game) => game.get());
    })
    .catch(() => {
      return "eroare!";
    });
}
/**
 * Functia primeste ca parametru un id (numar intreg) si intoarce jocul cu id-ul mentionat.
 * @param {number} id
 * @return
 * Daca operatia a mers, functia va returna jocul cu id-ul mentionat
 * Daca operatia esueaza, functia va intoarce 'eroare!'
 */

function getGameById(id) {
  return gameDb
    .findByPk(id)
    .then((game) => {
      return game.get();
    })
    .catch(() => {
      return "eroare!";
    });
}
/**
 * Functia primeste un joc ca parametru pe care il insereaza in baza de date
 * @return
 * Daca operatia a mers, functia va returna 'succes!'
 * Daca operatia esueaza, functia va intoarce 'eroare!'
 */

function insertGame(game) {
  return gameDb
    .create(game)
    .then(() => {
      return "succes";
    })
    .catch(() => {
      return "eroare!";
    });
}
function getAllSessions() {
  return sessionDb
    .findAll()
    .then((sessions) => {
      return sessions.map((session) => session.get());
    })
    .catch(() => {
      return "eroare!";
    });
}
function getSessionById(id) {
  return sessionDb
    .findByPk(id)
    .then((session) => {
      return session.get();
    })
    .catch(() => {
      return "eroare!";
    });
}
function insertSession(session) {
  return sessionDb
    .create(session)
    .then(() => {
      return "succes!";
    })
    .catch(() => {
      return "eroare!";
    });
}
/**
 * Functia primeste ca parametru un id (numar intreg) si sterge sesiunea cu id-ul mentionat.
 * @return
 * Daca operatia a mers, functia va returna 'succes!'
 * Daca operatia esueaza, functia va intoarce 'eroare!'
 */

function deleteSession(id) {
  return sessionDb
    .destroy({
      where: {
        id: id,
      },
    })
    .then(() => {
      return "succes!";
    })
    .catch(() => {
      return "eroare!";
    });
}
//nu stiu cum functioneaza dar merge
async function premiere(gameId) {
  try {
      const game = await gameDb.findByPk(gameId); // Găsește instanța specifică după ID

      if (game) {
          // Modifică câmpul `hasAward` și salvează instanța
          game.hasAward = true;
          await game.save(); // Salvează modificările în baza de date
          console.log(`Jocul cu id-ul ${gameId} a fost actualizat pentru a avea premiul.`);
      } else {
          console.log(`Nu s-a găsit niciun joc cu id-ul ${gameId}.`);
      }
  } catch (error) {
      console.error('Eroare la actualizarea câmpului hasAward:', error);
  }
}
module.exports = {
  resetDatabase,
  getAllGames,
  getGameById,
  insertGame,
  getAllSessions,
  getSessionById,
  insertSession,
  deleteSession,
  premiere,
};
