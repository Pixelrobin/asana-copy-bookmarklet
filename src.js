(async function () {

  // First get the title of the currently open task

  const taskTitleElement = document.querySelector('.TitleInput textarea');

  if (!taskTitleElement) {
      alert('Whoops! Couldn\'t find a task title. Make sure you have an Asana task open.');
      return;
  }

  let title = taskTitleElement.value;

  // Because the title comes from a textarea, we need to html escape it
  const tempEl = document.createElement('div');
  tempEl.innerText = title;
  title = tempEl.innerHTML;

  // Next, get the URL

  const { origin, pathname } = document.location;
  const parts = pathname.substring(1).split('/');

  // (I got this URL format from the existing "copy task link" feature in Asana)
  const url = [origin, 0, 0, parts[2], 'f'].join('/');

  // Construct some HTML and copy it

  const html = `<a href="${url}">${title}</a>`;

  // I guess you need two formats to copy HTML
  // https://www.nikouusitalo.com/blog/why-isnt-clipboard-write-copying-my-richtext-html/
  const item = new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([html], { type: 'text/plain' })
  });

  try {
    await navigator.clipboard.write([item]);

    // Just a neat little animation

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.animate(
        [
          { opacity: 0 },
          { opacity: 1 }
        ],
        { duration: 500 }
      );
    } else {
      alert('Link copied to clipboard!');
    }
  } catch (error) {
    console.log(error);
    alert('Something went wrong. Make sure the document is in focus and try again?');
  }
})();
