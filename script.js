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
    
        const modal = document.getElementById("myModal");
        const modalImage = document.querySelector(".modalImage");
        const modalDescription = document.querySelector(".modalDescription");
        const modalLink = document.querySelector(".modalLink");
        const modalGithub = document.querySelector(".modalGithub");
        const modalClose = document.querySelector(".close");

        function openModal(project) {
          modalImage.src = project.imageModal;
          modalImage.alt = project.imageModalAlt;
          modalDescription.textContent = currentLanguage === 'fr' ? project.mission.fr : project.mission.en;
          modalLink.textContent = currentLanguage === 'fr' ? 'Voir le projet' : 'View Project';
          modalLink.href = project.link;
          modalGithub.href = project.linkGithub;
          modal.style.display = "block";
      }

  
      function closeModal() {
          modal.style.display = "none";
      }
  
      modalClose.onclick = closeModal;
      window.onclick = function(event) {
          if (event.target == modal) {
              closeModal();
          }
      };



        function filterProjects(categories) {
            projectsContainer.innerHTML = '';
    
            projects.forEach(project => {
                if (categories.includes('all') || (project.categories && categories.some(category => project.categories.includes(category)))) {
                    const projectElement = document.createElement('div');
                    projectElement.classList.add('project');
                     // Ajoutez un gestionnaire d'événement pour ouvrir le modal au clic sur le projectElement
                    projectElement.addEventListener('click', () => {
                      openModal(project);
                  });
    
                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('image-container');
                    const imageElement = document.createElement('img');
                    imageElement.src = project.image;
                    imageElement.alt = project.title;
                    imageContainer.appendChild(imageElement);
    
                    const overlay = document.createElement('div');
                    overlay.classList.add('overlay');
    
                    const titleElement = document.createElement('h1');
                    titleElement.textContent = project.title;
    
                    const descriptionElement = document.createElement('p');
                    descriptionElement.textContent = project.descriptions[currentLanguage] || project.descriptions['fr'];
    
                    //const linkElement = document.createElement('a');
                    //linkElement.href = project.link;
                    //linkElement.textContent = currentLanguage === 'fr' ? 'Voir le projet' : 'View';
    
                    overlay.appendChild(titleElement);
                    overlay.appendChild(descriptionElement);
                    //overlay.appendChild(linkElement);
    
                    imageContainer.appendChild(overlay);
    
                    projectElement.appendChild(imageContainer);
    
                    projectsContainer.appendChild(projectElement);
                    imageElement.addEventListener('click', () => {
                      openModal(project);
                  });
                }
            });
        }
    
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
    



// Récupération du conteneur des compétences dans le HTML
const skillsContainer = document.getElementById('skillsContainer');

// Chargement des données depuis le fichier JSON
fetch('./competences.json')
  .then(response => response.json())
  .then(data => {
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
      progressBarInnerElement.style.width = '0';
      progressBarElement.appendChild(progressBarInnerElement);

      skillElement.appendChild(nameElement);
      skillElement.appendChild(progressBarElement);

      skillsContainer.appendChild(skillElement);
    });

    // Observer chaque skillElement une fois qu'ils sont tous ajoutés
    document.querySelectorAll('.skill').forEach(skillElement => {
      observer.observe(skillElement);
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors du chargement des compétences :', error);
  });

// Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.progress-bar');
      progressBars.forEach(progressBar => {
        progressBar.style.width = progressBar.style.getPropertyValue('--percentage');
      });
      observer.unobserve(entry.target); // Arrêter d'observer une fois l'animation déclenchée
    }
  });
}, {
  threshold: 0.1 
});







document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
  const notification = document.getElementById('notification');
  const isEnglish = window.location.pathname.includes('index-en.html');

  form.addEventListener('submit', function(event) {
      event.preventDefault(); 

      // Récupération des valeurs des champs
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const sujet = document.getElementById('sujet').value.trim();
      const message = document.getElementById('message').value.trim();

      if (name === '' || email === '' || sujet === '' || message === '') {
        alert(isEnglish ? 'Please fill out all fields.' : 'Veuillez remplir tous les champs.');
        return;
    }

    // Vérification si l'email est valide
    if (!isValidEmail(email)) {
      alert( isEnglish  ? 'Please enter a valid email address.' : 'Veuillez saisir une adresse e-mail valide.');
        return;
    }

      // Envoi du formulaire
      const mailtoLink = `mailto:ilona.tsivunchyk@gmail.com?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(message)}`;
      window.location.href = mailtoLink;

      // Réinitialisation des champs du formulaire
      form.reset();
      // Affichage de la notification correspondante
        showNotification(isEnglish ? '🚀 Message sent successfully!' : '🚀 Message envoyé avec succès!');
    
  });

  // Fonction pour valider l'email
  function isValidEmail(email) {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;
      return emailRegex.test(email);
  }


  // Fonction pour afficher la notification
  function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    // Masquer la notification après 3 secondes
    setTimeout(function() {
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        // Réinitialiser la classe hide après l'animation
        setTimeout(function() {
            notification.classList.remove('hide');
        }, 500);
    }, 3000);
}
});





document.addEventListener('DOMContentLoaded', function() {
  // Gestionnaire pour le bouton du menu
  document.querySelector('.menu-toggle').addEventListener('click', function() {
      const nav = document.querySelector('.nav ul');
      toggleMenuDisplay(nav);
  });
  const navItems = document.querySelectorAll('.nav ul li a'); // Sélectionne les liens dans les éléments li
  navItems.forEach(item => {
      item.addEventListener('click', function() {
          const nav = document.querySelector('.nav ul');
          closeMenu(nav);
          
      });
  });
});

function toggleMenuDisplay(nav) {
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

function closeMenu(nav) {
  nav.style.display = 'none';
}





document.addEventListener('DOMContentLoaded', function() {
    var contactIcon = document.getElementById('contactIcon');
    var contactModal = document.getElementById('contactModal');
    var closeModal = document.querySelector('.contact-modal .close');

    contactIcon.addEventListener('click', function() {
        contactModal.classList.toggle('show');
    });

    closeModal.addEventListener('click', function() {
        contactModal.classList.remove('show');
    });

    // Fermer la modal en cliquant à l'extérieur
    window.addEventListener('click', function(event) {
        if (event.target === contactModal) {
            contactModal.classList.remove('show');
        }
    });
});



