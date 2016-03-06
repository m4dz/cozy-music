import Mn from 'backbone.marionette';
import application from '../application';

const Playlists = Mn.CompositeView.extend({

    template: require('views/templates/playlists'),

    childViewContainer: '#playlist-list',

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

    }
});

export default Playlists;

