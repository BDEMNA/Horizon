// Gestion des onglets
const tabs = document.querySelectorAll('.service-tabs button');
const sections = document.querySelectorAll('.service-section');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Retire la classe active de tous les onglets
    tabs.forEach(t => t.classList.remove('active'));
    // Active l'onglet cliqué
    tab.classList.add('active');

    // Masque toutes les sections
    sections.forEach(sec => sec.classList.remove('active'));
    // Affiche la section liée à l'onglet
    const targetId = tab.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');
  });
});

// Gestion du switch Images / Vidéos
const switches = document.querySelectorAll('.media-switch');

switches.forEach(switchBlock => {
  const buttons = switchBlock.querySelectorAll('button');
  const section = switchBlock.closest('.service-section');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Retire la classe active de tous les boutons
      buttons.forEach(b => b.classList.remove('active'));
      // Active le bouton cliqué
      btn.classList.add('active');

      // Masque toutes les galeries
      section.querySelectorAll('.media-gallery').forEach(gallery => {
        gallery.classList.remove('active');
      });

      // Affiche la galerie correspondante
      const type = btn.getAttribute('data-type');
      section.querySelector(`.media-gallery.${type}`).classList.add('active');
    });
  });
});
