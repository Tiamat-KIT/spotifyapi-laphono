import { Hono } from 'hono'
import {SpotifyApi} from "@spotify/web-api-ts-sdk"

const app = new Hono({})

function ExistEnvriomentVariable(){
  if(typeof SPOTIFY_CLIENT_ID === 'undefined' && typeof SPOTIFY_CLIENT_SECRET){
    if(typeof SPOTIFY_CLIENT_ID === "string" && typeof SPOTIFY_CLIENT_SECRET === "string"){
      return true
    } else {
      throw new Error('SPOTIFY Enviroment Variable is undefined')
    }
  } 
}

ExistEnvriomentVariable()

const web_api = SpotifyApi.withClientCredentials(
  SPOTIFY_CLIENT_ID as string,
  SPOTIFY_CLIENT_SECRET as string
)

app.get('/', (c) => {
  return c.text("Hello World!",200)
})

app.get('/top-five', async (c) => {
  const result = await web_api.currentUser.topItems(
    "tracks",
    "long_term",
    5
  )
  return c.json({
    musics: result.items
  })
})

export default app
