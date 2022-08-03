import ytcm from '@freetube/yt-comment-scraper'
import { createFile, readFile } from './utils.js'
import { listTemplate } from './templates.js'

const videos = JSON.parse(readFile('videos.json')).videos;
const allComments = [];

videos.forEach((video) => {
  const videoComments = [];
  const payload = {
    videoId: video.id,
    mustSetCookie: true,
    httpsAgent: null
  }

  ytcm.getComments(payload).then((commentsData) => {
    const repliesPromises = [];
    videoComments.push(...commentsData.comments);

    commentsData.comments.forEach((comment) => {
      payload.replyToken = comment.replyToken;

      repliesPromises.push(ytcm.getCommentReplies(payload));
    });

    return Promise.all(repliesPromises).then((repliesData) => {
      repliesData.forEach((reply, replyIndex) => {
        videoComments[replyIndex]._replies = reply.comments;
      });

      return videoComments;
    });
  })
  .then((comments) => {
    let template = readFile('template.html');

    template = template.replace('%LIST%', listTemplate(comments));

    createFile('./public/index.html', template);
    createFile('./public/output.json', JSON.stringify(comments));
  })
  .catch((error)=> {
    console.log(error);
  })
});

