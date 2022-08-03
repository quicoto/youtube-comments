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

export function listTemplate(comments) {
  const items = comments.map((comment) => `<li>${commentTemplate(comment)}</li>`).join('\n');
  return `<ol>${items}</ol>`;
}