export interface ISpotifyAPI {
  searchTracks(query: string): Promise<any>
  searchTracksByGenre(genre: string): Promise<any>
}
