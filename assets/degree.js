// Every credential has its own accessible native dialog and document selector.
document.querySelectorAll('[data-degree-open]').forEach(opener => {
  const dialog = document.getElementById(opener.dataset.degreeOpen);
  const preview = dialog.querySelector('.document-preview');
  const link = dialog.querySelector('.degree-document-link');
  const choices = [...dialog.querySelectorAll('.doc-choice')];
  function selectDocument(choice) {
    choices.forEach(button => button.setAttribute('aria-pressed', String(button === choice)));
    preview.src = choice.dataset.preview;
    preview.title = choice.textContent;
    link.href = choice.dataset.url;
    link.textContent = choice.dataset.linkLabel;
    dialog.querySelectorAll('[data-credential-story]').forEach(story => {
      story.hidden = story.dataset.credentialStory !== choice.dataset.story;
    });
  }
  opener.addEventListener('click', () => {
    dialog.showModal();
    document.body.classList.add('locked');
    selectDocument(choices[0]);
  });
  choices.forEach(choice => choice.addEventListener('click', () => selectDocument(choice)));
  dialog.querySelector('[data-degree-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    preview.removeAttribute('src');
    document.body.classList.remove('locked');
    opener.focus();
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
});
