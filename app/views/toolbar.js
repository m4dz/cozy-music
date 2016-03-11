import Mn from 'backbone.marionette';
import { syncFiles } from '../libs/file';
import scdl from '../libs/soundcloud';
import PlaylistsView from './playlists';
import NotificationView from './notification';


const Toolbar = Mn.LayoutView.extend({
    
    template: require('./templates/toolbar'),

    ui: {
        importSC: '#import-sc',
        search: '#search',
        searchText: '#search-text'
    },

    regions: {
        playlists: '.playlists',
        notification: '[role="notification"]'
    },

    events: {
        'click #sync-files': 'sync',
        'click #search': 'search'
    },

    sync: function() {
        syncFiles();
    },

    onRender: function() {
        this.showChildView('playlists', new PlaylistsView());
    },

    showNotification: function(msg) {
        this.showChildView(
            'notification',
            new NotificationView({ message: msg})
        );
    },

    importSC: function() {
        let importSC = this.ui.importSC
        scdl.import(this.ui.importText.val());
    },

    search: function() {
        let search = this.ui.search;
        let searchText = this.ui.searchText;
        search.addClass('input-focused');
        search.focusout(function() {
            if (searchText.val() == '') {
                search.removeClass('input-focused');
            }
        });
    }
});

export default Toolbar;
