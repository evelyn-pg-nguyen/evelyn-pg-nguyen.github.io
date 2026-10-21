// Native dialogs keep keyboard focus within the active case study.
document.querySelectorAll('[data-case-open]').forEach(opener => {
  const dialog = document.getElementById(opener.dataset.caseOpen);
  const videos = [...dialog.querySelectorAll('[data-video-src]')];
  opener.addEventListener('click', () => {
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('locked');
    videos.forEach(video => { video.src = video.dataset.videoSrc; });
  });
  dialog.querySelector('[data-case-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-case-demo]').addEventListener('click', () => {
    dialog.querySelector('.case-demo').scrollIntoView({behavior: 'auto', block: 'start'});
  });
  dialog.addEventListener('close', () => {
    videos.forEach(video => video.removeAttribute('src'));
    document.body.classList.remove('locked');
    opener.focus();
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
});
