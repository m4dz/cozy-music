import Mn from 'backbone.marionette';
import Backbone from 'backbone';
import Tracks from './collections/tracks';
import Playlists from './collections/playlists';
import AppLayout from './views/app_layout';


const Application = Mn.Application.extend({

	initialize: function () {
		this.allTracks = new Tracks();
        this.allTracks.fetch();
        this.upNext = new Tracks();

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
    }
});

export default new Application();
