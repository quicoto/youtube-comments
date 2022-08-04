import ytcm from '@freetube/yt-comment-scraper'
import { createFile, readFile } from './utils.js'
import { listTemplate } from './templates.js'

const videos = JSON.parse(readFile('videos.json')).videos;

function getVideoComments(video) {
  const videoComments = [];
  const payload = {
    videoId: video.id,
    mustSetCookie: true,
    httpsAgent: null
  }

  return ytcm.getComments(payload).then((commentsData) => {
    const repliesPromises = [];
    videoComments.push(...commentsData.comments);

    commentsData.comments.forEach((comment) => {
      if (comment.replyToken) {
        payload.replyToken = comment.replyToken;

        repliesPromises.push(ytcm.getCommentReplies(payload));
      }
    });

    return Promise.all(repliesPromises).then((repliesData) => {
      repliesData.forEach((reply, replyIndex) => {
        videoComments[replyIndex]._replies = reply.comments;
      });

      return videoComments;
    });
  })
  .catch((error)=> {
    console.log(error);
  })
}

async function asyncCall() {
  let template = readFile('template.html');
  let lists = '';

  for (const video of videos) {
    const comments = await getVideoComments(video);

    lists += listTemplate(video, comments);
  }

  template = template.replace('%LIST%', lists);

  await createFile('./public/index.html', template);
}

asyncCall();