(function() {
  var input = document.getElementById('search-input');
  var noResults = document.getElementById('no-results');
  if (!input) return;

  var toolCards = document.querySelectorAll('.tool-card');
  var categorySections = document.querySelectorAll('.home-category-section');

  input.addEventListener('input', function() {
    var q = input.value.toLowerCase().trim();
    var visible = 0;

    toolCards.forEach(function(card) {
      var title = (card.dataset.title || '').toLowerCase();
      var desc = (card.dataset.desc || '').toLowerCase();
      var match = !q || title.indexOf(q) !== -1 || desc.indexOf(q) !== -1;
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    categorySections.forEach(function(section) {
      var sectionCards = section.querySelectorAll('.tool-card');
      var sectionVisible = 0;
      sectionCards.forEach(function(c) {
        if (c.style.display !== 'none') sectionVisible++;
      });
      section.style.display = sectionVisible === 0 && q ? 'none' : '';
    });

    if (noResults) {
      noResults.style.display = visible === 0 && q ? 'block' : 'none';
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
    if (e.key === 'Escape' && document.activeElement === input) {
      input.value = '';
      input.dispatchEvent(new Event('input'));
      input.blur();
    }
  });
})();
