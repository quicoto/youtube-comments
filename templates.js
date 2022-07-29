function commentTemplate(comment) {
  const author = `<h4>${comment.author} <time>${comment.time}</time> </h4>`;
  const text = `<blockquote>${comment.text}</blockquote>`;
  let replies = '';

  if (comment._replies) {
    const items = comment._replies.map((comment) => `<li>${commentTemplate(comment)}</li>`).join('\n');

    replies = `<ol>${items}</ol>`;
  }

  return `<div class="comment">${author}${text}${replies}</div>`;
}

export function listTemplate(comments) {
  const items = comments.map((comment) => `<li>${commentTemplate(comment)}</li>`).join('\n');
  return `<ol>${items}</ol>`;
}