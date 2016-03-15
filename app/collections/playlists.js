import Backbone from 'backbone';
import Playlist from '../models/playlist';
import cozysdk from 'cozysdk-client';


const Playlists = Backbone.Collection.extend({
   	
   	model: Playlist,

    initialize() {
        this.on('add', this.onAdd, this);
    },

    onAdd(playlist) {
        if (!playlist.get('_id')) {
            playlist.save()
        }
    },
    
    comparator: 'title',

    sync(method, model, options) {
        if (method == 'read') {
            cozysdk.run('Playlist', 'all', {}, (err, res) => {
                console.log('Playlist fetched', err, res);
                if (res) {
                    let playlists = JSON.parse('' + res);
                    for (let i = 0; i < playlists.length; i++) {
                        this.add(playlists[i].value);
                    }
                    options.success();
                }
            });
        }
    }
});

cozysdk.defineRequest('Playlist', 'all', (doc) => {
        emit(doc._id, doc);
    }, (error, response) => {
        console.log('ALLPLAYLISTREQ', error, response);
});

export default Playlists;
