// See documentation on https://github.com/cozy/cozy-db

import cozydb from 'cozydb';

export const Track = cozydb.getModel('Playlist', {
    title: String,
    tracks: Object,
    dateAdded: {
        type: Date, 
        default: Date.now
    }
});
