import Mn from 'backbone.marionette';
import PlaylistView from './playlist';
import application from '../application';

const Playlists = Mn.CompositeView.extend({

    template: require('./templates/playlists'),

    childViewContainer: '#playlist-list',

    childView: PlaylistView,

    ui: {
        playlists: 'p',
    },

    events: {
        'click p': 'changePlaylist',
    },

    changePlaylist: function(e) {
        const playlist = $(e.currentTarget);
        $(".playlists p").removeClass('selected');
        playlist.addClass('selected');
        application.headerInfos.set('title', e.currentTarget.innerHTML);

        if (playlist.attr('id') == "up-next") {
            application.switchPlaylist(application.upNext);
        } else if (playlist.attr('id') == "all-song") {
            application.switchPlaylist(application.allTracks);
        }
        
    },
    
    initialize: function() {
        this.collection = application.allPlaylists;
    }
});

export default Playlists;

