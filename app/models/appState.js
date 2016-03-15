import Backbone from 'backbone';

const AppState = Backbone.Model.extend({

    defaults: {
        currentTrack: '',
        currentPlaylist: '',
    },

    sync(method, model, options) {
        // prevent sync
    }
});

export default AppState;
