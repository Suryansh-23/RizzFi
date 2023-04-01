const CLIENT_ID = '50f677edb8b642cb953310692baf439e'
const REDIRECT_URI = chrome.identity.getRedirectURL('spotify-auth')
const SCOPES = ['user-read-private', 'user-read-email']
const STATE = Math.random().toString(36).substring(2, 15)

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'play') {
    // Get the user's access token
    const accessToken = await getAccessToken()
    if (!accessToken) {
      console.error('Access token not available')
      return
    }

    // Search for the track
    const query = encodeURIComponent('We will rock you')
    const searchEndpoint = `https://api.spotify.com/v1/search?q=${query}&type=track`
    const response = await fetch(searchEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await response.json()
    const track = data.tracks.items[0]

    if (!track) {
      console.error('Track not found')
      return
    }

    // Play the track
    const playEndpoint = 'https://api.spotify.com/v1/me/player/play'
    await fetch(playEndpoint, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: [track.uri],
      }),
    })

    console.log('Playing track:', track.name)
  }
})

// Get the access token using the Spotify Web API authorization code flow
async function getAccessToken() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI,
  )}&scope=${SCOPES.join('%20')}&state=${STATE}`
  const redirectUrl = await new Promise((resolve) => {
    chrome.identity.launchWebAuthFlow({ url: authUrl, interactive: true }, (redirectUrl) => {
      resolve(redirectUrl)
    })
  })
  const urlParams = new URLSearchParams(new URL(redirectUrl).search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')

  if (!code || state !== STATE) {
    console.error('Authorization failed')
    return null
  }

  const tokenEndpoint = 'https://accounts.spotify.com/api/token'
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${CLIENT_ID}:d6ab81fe9ddf402790cecaaf1c69e9c6`)}`,
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}`,
  })
  const data = await response.json()
  return data.access_token
}
