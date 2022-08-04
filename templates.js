function commentTemplate(comment) {
  const hosts = ["Ricard Torres", "Jesús Castañeda"];
  const isHost = hosts.includes(comment.author);
  const author = `<h4 class="author">${comment.author} ${isHost ? '⭐️' : ''} <time>${comment.time}</time> </h4>`;
  const text = `<blockquote>${comment.text}</blockquote>`;
  let replies = '';
  let commentClass = ['comment'];

  if (comment._replies) {
    const items = comment._replies.map((comment) => `<li>${commentTemplate(comment)}</li>`).join('\n');

    replies = `<ol>${items}</ol>`;
  }

  if (isHost) {
    commentClass.push('comment--host');
  }

  return `<div class="${commentClass.join(' ')}">${author}${text}${replies}</div>`;
}

export function listTemplate(video, comments) {
  const items = comments.map((comment) => `<li>${commentTemplate(comment)}</li>`).join('\n');
  return `
  <h2>📺 <a target="_blank" title="${video.title}" href="https://www.youtube.com/watch?v=${video.id}">${video.title}</a></h2>
  <ol>${items}</ol>
  <hr>`;
}