import axios from 'axios'
import { ISpotifyAPI } from './ISpotifyAPI'
import 'dotenv/config'

export class SpotifyService implements ISpotifyAPI {
  private clientId: string
  private clientSecret: string
  private accessToken: string | null = null

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId
    this.clientSecret = clientSecret
  }

  private async getAccessToken(): Promise<string | null> {
    if (this.accessToken) {
      return this.accessToken
    }

    try {
      const authData = new URLSearchParams()
      authData.append('grant_type', 'client_credentials')
      authData.append('client_id', this.clientId)
      authData.append('client_secret', this.clientSecret)

      const response = await axios.post(
        `${process.env.SPOTIFY_API_AUTH_URL}`,
        authData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      if (response.data.access_token) {
        this.accessToken = response.data.access_token
        return this.accessToken
      } else {
        throw new Error('Token de acesso não encontrado na resposta.')
      }
    } catch (error: any) {
      throw new Error(
        'Erro ao obter o token de acesso do Spotify: ' + error.message,
      )
    }
  }

  async searchTracksByGenre(genre: string): Promise<any> {
    try {
      const accessToken = await this.getAccessToken()

      const response = await axios.get(`${process.env.SPOTIFY_API_URL}`, {
        params: {
          q: `genre:"${genre}"`,
          type: 'track',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return response.data.tracks.items
    } catch (error: any) {
      throw new Error(
        'Erro ao buscar faixas por gênero no Spotify: ' + error.message,
      )
    }
  }

  async searchTracks(query: string): Promise<any> {
    try {
      const accessToken = await this.getAccessToken()

      const response = await axios.get(`${process.env.SPOTIFY_API_URL}`, {
        params: {
          q: query,
          type: 'track',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return response.data.tracks.items
    } catch (error: any) {
      throw new Error('Erro ao pesquisar faixas no Spotify: ' + error.message)
    }
  }
}

export default SpotifyService
