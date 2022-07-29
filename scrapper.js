import ytcm from 'yt-comment-scraper'
import { readFile } from './utils'

const payload = {
  videoId: videoId, // Required
  sortByNewest: sortByNewest,
  continuation: continuation,
  mustSetCookie: false,
  httpsAgent: agent
}

ytcm.getComments(payload).then((data) =>{
    console.log(data);
}).catch((error)=>{
    console.log(error);
});