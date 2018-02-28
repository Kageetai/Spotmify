/*
 * TrackModal Messages
 *
 * This contains all the text for the TrackModal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  loading: {
    id: 'app.components.TrackModal.loading',
    defaultMessage: 'Loading track information',
  },
  error: {
    id: 'app.components.TrackModal.error',
    defaultMessage: 'Error loading track information',
  },
  acousticness: {
    id: 'app.components.TrackModal.acousticness',
    defaultMessage: 'acousticness',
  },
  danceability: {
    id: 'app.components.TrackModal.danceability',
    defaultMessage: 'danceability',
  },
  energy: {
    id: 'app.components.TrackModal.energy',
    defaultMessage: 'energy',
  },
  instrumentalness: {
    id: 'app.components.TrackModal.instrumentalness',
    defaultMessage: 'instrumentalness',
  },
  liveness: {
    id: 'app.components.TrackModal.liveness',
    defaultMessage: 'liveness',
  },
  speechiness: {
    id: 'app.components.TrackModal.speechiness',
    defaultMessage: 'speechiness',
  },
  valence: {
    id: 'app.components.TrackModal.valence',
    defaultMessage: 'valence',
  },
});
