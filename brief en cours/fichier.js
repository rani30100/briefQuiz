//je creer ces variables générale pour pouvoir les utiliser en dehors de fetch 
let question;
let index = 0;
const scoreContainer = document.getElementById('scoreContainer');


// const scoreTab = document.getElementsById('scoreTab');

fetch('/questions.json')
.then(reponse => reponse.json())
.then(data => {
  
  questions = data;
  // me donne la reponse du premier object json du tableau
  const correctAnswer = questions[index].correctAnswerIndex;

  
  
  // Mélangez les questions
  data.sort(() => Math.random() - 0.5);
  // Appelez la fonction pour afficher la première question
  showQuestion(data, index);

});

//Je déclare la variable score à 0, 
//pour que a chaque que le joueur clique sur valider cela affiche son score
//si jamais la premiere réponse est fausse il a 0.
let score = 0;
const scoreText = document.querySelector('.score');
const pseudo = document.getElementById('mypseudo').value;
let isValidated = false;

const next = document.getElementById('next');
const btnValider= document.getElementById("valider");
btnValider.addEventListener('click', function checkAnswer(e) {
  e.preventDefault();

  
  if (isValidated) {
    return;
  }
  isValidated = true;


  // Récupérez la valeur de la réponse sélectionnée
  const choice = document.querySelector('input[type="radio"]:checked').value;

  // Récupérez l'index de la réponse correcte
  const correctAnswerIndex = questions[index].correctAnswerIndex;

  // Vérifiez si l'index est égal à 0
  if (index === 0) {
    // Cachez le bouton valider et affichez le bouton suivant
    btnValider.className = "hidden";
    next.style.display = "flex";
  }
  if (index !== 0) {
    // Cachez le bouton valider et affichez le bouton suivant
    btnValider.className = "hidden";
    next.style.display = "flex";
  }


  // Vérifiez si la réponse sélectionnée est correcte
  if (choice == correctAnswerIndex) {
    document.querySelector('.label' + choice).style.backgroundColor = 'green';
    
  } else {
    document.querySelector('.label' + choice).style.backgroundColor = 'red';
    document.querySelector('.label' + correctAnswerIndex).style.backgroundColor = 'green';
  }
// Affichez le bouton suivant si l'index n'est pas égal à 0
if (choice == correctAnswerIndex) {
  score++;
  scoreText.innerHTML = `${pseudo} ton score est ${score}`;
} else {
scoreText.innerHTML = `${pseudo} ton score est ${score}/25`;
}
// Affichez le bouton suivant si l'index n'est pas égal à 0
if (index !== 0) {
  btnValider.className = "hidden";
  next.style.display = "flex";
  }
  });

 
     
  //Btn next qui va pemettre d'empecher le rechargement de la page et de passer à la question suivant grace à length-1
  //des qu'il atteint la derniere question alors display none la section quiz

  next.addEventListener('click', function(e){
  e.preventDefault();
  if(index === questions.length-1){
  quiz.style.display = "none";
  scoreContainer.style.display = "flex";
  displayScore();
  
  return;
  }
  scoreContainer.style.display = "flex";
  // Boucle pour la réinitialisez la couleur de fond des réponses pour chaque question au meme moment ou on appuie sur valider
  for (let i = 0; i < 4; i++) {
  document.querySelector('.label' + i).style.backgroundColor = 'white';
  }
  
  isValidated = false;
  // Affichez le bouton valider
  btnValider.className = "";
  next.style.display = "none";
  
  // Pour passer à la question suivante on icrémente l'index qui représente les questions
  index++;

  //enfin on joue la joue fonction show question 
  showQuestion(questions, index);
  });




//cette foonctionne va permettre d'afficher les questions avec les données json correspondantes sur les endroits déterminés
function showQuestion(data, index) {
  //le h3 représente le titre de la question dans le fichier json
  const questions = document.querySelector('h3');  
  questions.textContent = data[index].title;
  
  // les labels representes les réponses sur le fichiers json// answers[] represente l'index soit le place de l'enfant (1er,2e,3e, 4e)
  const btn0 = document.querySelector('.label0');
  btn0.innerText = data[index].answers[0];
  
  const btn1 = document.querySelector('.label1');
btn1.innerText = data[index].answers[1];

const btn2 = document.querySelector('.label2');
btn2.innerText = data[index].answers[2];

const btn3 = document.querySelector('.label3');
btn3.innerText = data[index].answers[3];

}

// Je déclare mes variables qui correspondent a mes grandes sections//
const welcome = document.querySelector(".welcome");
const quiz = document.querySelector(".quiz");
quiz.style.display ="none"
const myForm = document.getElementById('form')

// Je selectionne le formulaire et ajoute evenement submit et sa fonction quand je submit//
form.addEventListener("submit", function (e){

// Pour ne pas afficher le bouton next quand on commence
e.preventDefault();
  next.style.display = "none"; 
  
    //Je gère l'affichage de mes pages//
  welcome.style.display ="none";
  quiz.style.display ="flex";
  
});

// derniere section

    function addScoreToTable(name, score) {
      // Récupérez la table
      const table = document.querySelector('.table');
      
      // Créez une nouvelle ligne pour le tableau
      const newRow = document.createElement('tr');
      
      // Créez les cellules pour le nom et le score
      const nameCell = document.createElement('td');
      const scoreCell = document.createElement('td');
      
      // Ajoutez le nom et le score dans les cellules
      nameCell.innerHTML = name;
      scoreCell.innerHTML = score;
      
      // Ajoutez les cellules à la ligne
      newRow.appendChild(nameCell);
      newRow.appendChild(scoreCell);
      
      // Ajoutez la ligne à la table
      table.appendChild(newRow);
    }

// j'ai deja une const score, je la change a let scores pour les differencier
    let scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Stocker les scores dans localStorage
    localStorage.setItem('scores', JSON.stringify(scores));

// j'ajoute le score et le pseudo dans le tableau de scores
scores.push({name: pseudo, score: score});
// Triez le tableau de scores en ordre décroissant pour avoir le meilleur joueur en premier
scores.sort((a, b) => b.score - a.score);


// Récupérer la référence de la table dans le HTML
const scoreTable = document.querySelector('.table');

// Utilisez une boucle pour ajouter chaque score dans le tableau
for (let i = 0; i < scores.length; i++) {
  scoreTable.innerHTML += `<tr><td>${scores[i].name}</td><td>${scores[i].score}</td></tr>`;
}



scores = scores.slice(0, 5);


    
function displayScore(){
  let table = document.querySelector('.table');
  table.innerHTML = "";
  for(let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    let value = JSON.parse(localStorage.getItem(key));
    let row = table.insertRow(i);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = value.pseudo;
    cell2.innerHTML = value.score;
  }
}









  

  


