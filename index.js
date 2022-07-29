import ytcm from '@freetube/yt-comment-scraper'
import { createFile, readFile } from './utils.js'
import { listTemplate } from './templates.js'

const videos = JSON.parse(readFile('videos.json')).videos;
const allComments = [];

videos.forEach((video) => {
  const payload = {
    videoId: video.id,
    mustSetCookie: true,
    httpsAgent: null
  }

  ytcm.getComments(payload).then((commentsData) => {
    commentsData.comments.forEach((comment) => {
      payload.replyToken = comment.replyToken;

      ytcm.getCommentReplies(payload).then((repliesData) =>{
        comment._replies = repliesData.comments

      }).catch((error)=>{
        console.log(error);
      });

      allComments.push(comment);
    });

    let template = readFile('template.html');

    template = template.replace('%LIST%', listTemplate(allComments));

    createFile('./public/index.html', template);
  }).catch((error)=> {
    console.log(error);
  });
});

