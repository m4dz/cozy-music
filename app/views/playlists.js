import Mn from 'backbone.marionette';
import PlaylistView from './playlist';
import application from '../application';
import Playlist from '../models/playlist';


const Playlists = Mn.CompositeView.extend({

    template: require('./templates/playlists'),

    childViewContainer: '#playlist-list',

    childView: PlaylistView,

    ui: {
        addPlaylist: '#add-playlist',
        playlistText: '#playlist-text',
    },

    events: {
        'click p': 'changePlaylist',
        'click #add-playlist': 'createPlaylist'
    },

    onRender: function() {
        let ui = this.ui;
        ui.addPlaylist.focusout(function() {
            if (ui.playlistText.val() == '') {
                ui.addPlaylist
                        .addClass('add-playlist')
                        .removeClass('input');
            }
        });
        ui.playlistText.keyup(function(e) {
            if(e.keyCode == 13) {
                let newPlaylist = new Playlist();
                newPlaylist.set('title', ui.playlistText.val());
                application.allPlaylists.add(newPlaylist);
                ui.addPlaylist
                        .addClass('add-playlist')
                        .removeClass('input');
            }
        });
    },

    changePlaylist: function(e) {
        let playlist = $(e.currentTarget);
        let playlists = $(".playlists p");
        let index = playlists.index(playlist) - 2;
        playlists.removeClass('selected');
        playlist.addClass('selected');
        
        application.headerInfos.set('title', e.currentTarget.innerHTML);

        if (playlist.attr('id') == "up-next") {
            application.switchPlaylist(application.upNext);
        } else if (playlist.attr('id') == "all-song") {
            application.switchPlaylist(application.allTracks);
        } else {
            this.currentIndex = index;
        }
    },

    createPlaylist: function() {
        this.ui.addPlaylist.removeClass('add-playlist').addClass('input');
        this.ui.playlistText.focus();
    },
    
    initialize: function() {
        this.collection = application.allPlaylists;
    }
});

export default Playlists;

