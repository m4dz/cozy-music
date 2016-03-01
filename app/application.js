import Mn from 'backbone.marionette';
import Backbone from 'backbone';
import Tracks from './collections/tracks';
import TracksView from './views/tracks';


const Application = Mn.Application.extend({

	initialize: function () {
		this.allTracks = new Tracks();
        this.allTracks.fetch();
	},

    onStart: function () {
        console.log('start');
        if (Backbone.history) {
            Backbone.history.start();
        }
        this.tracksView = new TracksView();
        this.tracksView.render();
    }
});

export default new Application();
