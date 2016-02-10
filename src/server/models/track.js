// See documentation on https://github.com/cozy/cozy-db

import cozydb from 'cozydb';

export const Track = cozydb.getModel('Track', {
    title: String,
    artist: String,
    album: String,
    year: String,
    genre: String,
    duration: String,
    playlists: Object,
    dateAdded: {
        type: Date, 
        default: Date.now
    },
    lastPlayed: Date,
    plays: {
        type: Number,
        default: 0
    },
    binary: Object
});

Track.all = (callback) => {
    Track.request('all', {}, (err, tracks) => {
        const error = err || tracks.error;
        callback(error, tracks);
    });
};
