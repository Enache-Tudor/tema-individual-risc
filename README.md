# Temă individuală IT Back-End

## _Bine ați venIT, rău ați nimerIT 🐊_

![](https://media.giphy.com/media/SXJ5PXwRbRvQAJt2N7/giphy.gif)

Salutare din nou dragi recruți!! Sper că vă plac jocurile, deoarece asta va fi tematica de data asta!!
--a venit momentul să aplicați tot ce ați învățat la AC 📚. Drept delegat al Departamentului IT, divizia Back-End, va trebui să te ocupi să faci niște rute, o bază de date ~ tot alaiul 🎉.

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDdkdGFvZGdwZ29qYzhid2tndmZsMG9ybWxkdDhmamZ6cmEwdGttYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lKXEBR8m1jWso/giphy.gif)

### Definirea termenilor

Cred că știm cu toții cam ce ar reprezenta un [joc video](https://ro.wikipedia.org/wiki/Joc_video), iar în cazul nostru un 'Joc' va fi un obiect care va conține următoarele câmpuri:

```
{
    title: STRING,
    description: STRING,
    dateOfRelease: DATE,
    genre: STRING,
    platform:STRING,
    rating: FLOAT,
    maxPossibleScore:INT,
    hasAward: BOOL
}
```
Și cum degeaba am avea jocuri dacă n-am avea și persoane care să le joace, deci vom avea și 'Sessions' care va fi, surprinzător, tot un obiect ce conține următoarele câmpuri:
```
{
    playerName: STRING,
    score: INT,
    date: DATE,
    levelReached: INT,
    isHighscore: BOOl,
    difficulty:ENUM,
    multiplier:FLOAT,
    deaths:INT,
    gameId:INT
}
```

#### **Observații**:

1. în baza de date aceste obiecte vor avea și un Id 🆔, care va fi incrementat++ automat atunci când le introduceți.
2. între tabela `Games` și `Sessions` există o relație de tipul `One-To-Many`, mai multe detalii [aici](<https://en.wikipedia.org/wiki/One-to-many_(data_model)>).

# Set-up

![](https://media.giphy.com/media/l0MYyztZ0Hg0CD6Ks/giphy.gif)

1. În primul rând, pentru a putea descărca repository-ul trebuie să deschidem Git Bash la locația pe care ne-o dorim
2. Folosiți comanda `git clone https://gitlab.com/rucsandra.oprea04/tema-individuala_back_2024_cod`
3. După ce ni s-a descărcat proiectul trebuie să intrăm în folder-ul nou creat, cu `cd tema-individuala_back_2024_cod`
4. Acum, ca să începem să putem scrie cod, deschidem Visual Studio Code folosind `code .`
5. În VS Code vom porni un terminal, cu ajutorul căruia ne vom instala pachetele pe care le vom folosi, rulând comanda `npm i`

#### **Observație**:

Ca să vă scutim de treaba foarte enervantă de a tot inchide și apoi deschide server-ul la fiecare modificare, v-am inclus și pachetul `nodemon`. Folosind `npx nodemon` sau `nodemon server.js`, server-ul se va reporni de fiecare dată când facem o modificare.

#### **Altă observație🤠**:

Avem rugămintea pentru utilizatorii de Windows să folosiți Laragonul pentru a vizualiza bazele de date, deși în cadrul AC-ului ați lucrat cu extensia de sqlite. În celelalte cazuri, vă rugăm să folosiți în continuare sqlite împreună cu extensia de la VS Code. **!!!Pentru a folosi sqlite va trebuie să înlocuiți o mică parte din cod, acesta se află în utils.js, unde veți găsi și restul instrucțiunilor!!!**

## Cerințe

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN243Mm53bnpnc29zNXMwZzN5MjRxb2Zmeng4Y3lyMzA3dnNoc2xnaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUPJPzcdlbvaFUrF7y/giphy.gif)

- Crează o bază de date în Laragon cu numele `tema_back-end_2024` -**atenție** collation-ul trebuie să fie `ut8mb4_general_ci`
- Modifică fișierul `utils.js` astfel încât numele bazei de date să corespundă cu cel din cod **(valabil și pentru cei care nu au Windows și folosesc sqlite)**
- Crează o rută de reset pentru baza de date folosind `utils`
- Inițializează tabelele folosind ruta de reset
- Creează un obiect de tip `Game` și inserează-l în baza de date folosind `utils`
- Creează 3 obiecte de tip `Session` și inserează-le în baza de date folosind `utils`

---

**Observație**: toate cerințele de mai jos se realizează folosind Postman, iar pentru marea majoritate ar trebuie să faceți câte o rută separată, acolo unde are sens.

- Fă o rută pentru a adăuga obiecte de tip `Games` în baza de date.
  - Crează validări pentru această rută
- Creează o rută care apelată să returneze (folosindu-te de response) cât timp mai este până iese un joc sau cât timp a trecut
- Fă o rută pentru a adăuga obiecte de tip `Session` în baza de date
  - crează validări pentru această rută
**- Asigurați-vă de unicitatea câmpului `playerName` în tabela `Sessions ` atunci când introduceți o sesiune nouă de joc**
- Fă o rută care atunci când este apelată, să returneze toate sesiunile de joc ale unui joc specificat
- Pentru fiecare sesiune de joc recalculați scorul maxim obținut, înmulțind scorul existent cu multiplierul (acesta depinde de dificultate, e la libera alegere să atribuiți diferite valori pentru acesta) și afișați aceste valori
- Afișați toate jocurile în ordine crescătoare a rating-ului.
- Creați o rută care atunci când este apelată premiază jocul cu cel mai mare rating
  - implementați o soluție pentru a reține toate jocurile premiate (dacă un joc a avut la un moment dat cel mai mare rating, dar nu are în momentul actual cel mai mare rating nu înseamnă că premiul îi este retras)
- Afișați toate jocurile premiate

### !Nu vă demotivați dacă nu apucați să faceți tot 🕥, trimiteți cât apucați!
Și nu uitați că puteți căuta oricând pe Google!!!
<br>

### Înainte de a ne trimite tema vă rugăm 🙏 să ștergeți folder-ul `node_modules`

# ✨Mult Succes✨

![](https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif)
