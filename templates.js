function commentTemplate(comment) {
  const author = `<h4>${comment.author}</h4>`;
  const text = `<p>${comment.text}</p>`;

  return `<div class="comment">${author}${text}</div>`;
}

export function listTemplate(comments) {
  const items = comments.map((comment) => `<li>${commentTemplate(comment)}</li>`).join('\n');
  return `<ol>${items}</ol>`;
}