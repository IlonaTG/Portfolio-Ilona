fetch('./projects.json')
    .then(response => response.json())
    .then(data => {
        displayProjects(data.projects);
    })
    .catch(error => {
        console.error('Une erreur s\'est produite lors du chargement des projets :', error);
    });

function displayProjects(projects) {
    const projectsContainer = document.querySelector('#portfolio .projects-container');
    const filterButtons = document.querySelectorAll('.filters .filter-btn');

    function filterProjects(categories) {
        projectsContainer.innerHTML = '';

        projects.forEach(project => {
            if (categories.includes('all') || (project.categories && categories.some(category => project.categories.includes(category)))) {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project');

                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');
                const imageElement = document.createElement('img');
                imageElement.src = project.image;
                imageElement.alt = project.title;
                imageContainer.appendChild(imageElement);

                const overlay = document.createElement('div');
                overlay.classList.add('overlay');

                const titleElement = document.createElement('h3');
                titleElement.textContent = project.title;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = project.description;

                const linkElement = document.createElement('a');
                linkElement.href = project.link;
                linkElement.textContent = 'Voir le projet';

                overlay.appendChild(titleElement);
                overlay.appendChild(descriptionElement);
                overlay.appendChild(linkElement);

                imageContainer.appendChild(overlay);

                projectElement.appendChild(imageContainer);

                projectsContainer.appendChild(projectElement);
            }
        });
    };

    // Ajouter un gestionnaire d'événement à chaque bouton de filtre
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategories = [button.dataset.filter];
            filterProjects(selectedCategories);
        });
    });

    // Afficher tous les projets par défaut au chargement de la page
    filterProjects(['all']);
}



// Récupérer le conteneur des compétences dans le HTML
const skillsContainer = document.getElementById('skillsContainer');

// Charger les données depuis le fichier JSON
fetch('./competences.json')
  .then(response => response.json())
  .then(data => {
    // Pour chaque compétence dans les données, créer un élément HTML et l'ajouter au conteneur
    data.competences.forEach(skill => {
      const skillElement = document.createElement('div');
      skillElement.classList.add('skill');

      const nameElement = document.createElement('p');
      nameElement.textContent = skill.name;

      const progressBarElement = document.createElement('div');
      progressBarElement.classList.add('progress');
      const progressBarInnerElement = document.createElement('div');
      progressBarInnerElement.classList.add('progress-bar');
      progressBarInnerElement.style.setProperty('--percentage', `${skill.percentage}%`);
      progressBarElement.appendChild(progressBarInnerElement);

      skillElement.appendChild(nameElement);
      skillElement.appendChild(progressBarElement);

      skillsContainer.appendChild(skillElement);
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors du chargement des compétences :', error);
  });





  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut

        // Récupérer les valeurs des champs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const sujet = document.getElementById('sujet').value.trim();
        const message = document.getElementById('message').value.trim();

        // Vérifier si tous les champs sont remplis
        if (name === '' || email === '' || sujet === '' || message === '') {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        // Vérifier si l'email est valide
        if (!isValidEmail(email)) {
            alert('Veuillez saisir une adresse e-mail valide.');
            return;
        }

        // Envoi du formulaire
        const mailtoLink = `mailto:ilona.tsivunchyk@gmail.com?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;

        // Réinitialiser les champs du formulaire
        form.reset();
    });

    // Fonction pour valider l'email
    function isValidEmail(email) {
        // Utilisez une expression régulière pour valider l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
