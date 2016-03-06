import Mn from 'backbone.marionette';
import Backbone from 'backbone';
import Tracks from './collections/tracks';
import AppLayout from './views/app_layout';


const Application = Mn.Application.extend({

	initialize: function () {
		this.allTracks = new Tracks();
        this.allTracks.fetch();
        this.upNext = new Tracks();

        this.headerInfos = new Backbone.Model({
            title: 'All Tracks',
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
