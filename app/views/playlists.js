import Mn from 'backbone.marionette';
import PlaylistView from './playlist';
import application from '../application';

const Playlists = Mn.CompositeView.extend({

    template: require('views/templates/playlists'),

    childViewContainer: '#playlist-list',

    childView: PlaylistView,

    ui: {
        playlists: 'p',
    },

    events: {
        'click p': 'changePlaylist',
    },

    changePlaylist: function(e) { // TO DO
        this.ui.playlists.each(function() {
            $(this).removeClass('selected');
        });
        $(e.currentTarget).addClass('selected');
        application.headerInfos.set('title', e.currentTarget.innerHTML);
    },
    
    initialize: function() {
        this.collection = application.allPlaylists;
    }
});

export default Playlists;

