// Load a document only when its degree popup is opened.
const degreeDialog = document.getElementById('degree-dialog');
const degreeOpen = document.getElementById('degree-open');
const degreeClose = document.getElementById('degree-close');
const degreePreview = document.getElementById('degree-preview');
const degreeLink = document.getElementById('degree-document-link');
const docChoices = [...degreeDialog.querySelectorAll('.doc-choice')];
function selectDocument(choice) {
  docChoices.forEach(button => button.setAttribute('aria-pressed', String(button === choice)));
  degreePreview.src = choice.dataset.preview;
  degreePreview.title = choice.textContent;
  degreeLink.href = choice.dataset.url;
}
degreeOpen.addEventListener('click', () => {
  degreeDialog.showModal();
  document.body.classList.add('locked');
  selectDocument(docChoices[0]);
});
docChoices.forEach(choice => choice.addEventListener('click', () => selectDocument(choice)));
degreeClose.addEventListener('click', () => degreeDialog.close());
degreeDialog.addEventListener('close', () => {
  degreePreview.removeAttribute('src');
  document.body.classList.remove('locked');
  degreeOpen.focus();
});
degreeDialog.addEventListener('click', event => {
  if (event.target !== degreeDialog) return;
  const box = degreeDialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) degreeDialog.close();
});
