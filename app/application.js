import Mn from 'backbone.marionette';
import Backbone from 'backbone';
import Tracks from './collections/tracks';
import Playlists from './collections/playlists';
import AppLayout from './views/app_layout';

require('./styles/app.styl');

let Application = Mn.Application.extend({

    initialize: function () {
        this.allTracks = new Tracks([], { type: 'all' });
        this.upNext = new Tracks();
        this.upNext.on('change:currentTrack', function() {
            let upNext = app.upNext;
            let currentTrack = upNext.getAttr('currentTrack');
            if (!upNext.contains(currentTrack)) {
                upNext.push(currentTrack);
            }
        });
        this.allTracks.fetch({
            success: function() {
                app.allTracks.each(function(track) {
                    app.upNext.add(track);
                });
            }
        });

        this.allPlaylists = new Playlists();
        this.allPlaylists.fetch();

        this.headerInfos = new Backbone.Model({
            title: 'All Songs',
            count: 0
        });
    },

    onStart: function () {
        if (Backbone.history) {
            Backbone.history.start();
        }
        this.appLayout = new AppLayout();
        this.appLayout.render();
    },

    switchPlaylist: function(collection) {
        return this.appLayout.content.currentView.switchPlaylist(collection);
    }
});

let app = new Application();

export default app;
