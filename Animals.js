// Fetch animal data from the server
fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(data => {
    const animalNames = document.getElementById('animal-names');
    const animalDetails = document.getElementById('animal-details');

    // Display animal names
    data.forEach(animal => {
      const listItem = document.createElement('li');
      listItem.textContent = animal.name;
      listItem.addEventListener('click', () => {
        displayAnimalDetails(animal);
      });
      animalNames.appendChild(listItem);
    });

    // Display animal details
    function displayAnimalDetails(animal) {
      animalDetails.innerHTML = `
        <h3>${animal.name}</h3>
        <img src="${animal.image}" alt="${animal.name}">
        <p>Votes: ${animal.votes}</p>
      `;

      // Vote for an animal
      const voteInput = document.getElementById('vote-input');
      const voteButton = document.getElementById('vote-button');

      voteButton.addEventListener('click', () => {
        const votes = parseInt(voteInput.value);
        animal.votes += votes;
        animalDetails.querySelector('p').textContent = `Votes: ${animal.votes}`;
        voteInput.value = '0';
      });
    }
  });

// Reset votes
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(data => {
      data.forEach(animal => {
        animal.votes = 0;
      });

      const animalDetails = document.getElementById('animal-details');
      const votesParagraph = animalDetails.querySelector('p');
      votesParagraph.textContent = 'Votes: 0';
    });
});

// Add new animal
const animalForm = document.getElementById('animal-form');
animalForm.addEventListener('submit', event => {
  event.preventDefault();

  const nameInput = document.getElementById('animal-name');
  const imageInput = document.getElementById('animal-image');
  const votesInput = document.getElementById('animal-votes');

  const newAnimal = {
    name: nameInput.value,
    image: imageInput.value,
    votes: parseInt(votesInput.value)
  };

  fetch('http://localhost:3000/characters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAnimal)
  })
    .then(response => response.json())
    .then(data => {
      const animalNames = document.getElementById('animal-names');
      const listItem = document.createElement('li');
      listItem.textContent = data.name;
      listItem.addEventListener('click', () => {
        displayAnimalDetails(data);
      });
      animalNames.appendChild(listItem);

      nameInput.value = '';
      imageInput.value = '';
      votesInput.value = '0';
    });
});
