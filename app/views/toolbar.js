import Mn from 'backbone.marionette';
import { syncFiles } from '../libs/file';
import scdl from '../libs/soundcloud';
import PlaylistsView from './playlists';
import NotificationView from './notification';


const Toolbar = Mn.LayoutView.extend({
    
    template: require('./templates/toolbar'),

    ui: {
        importSC: '#import-sc',
        importText: '#import-sc-text',
        search: '#search',
        searchText: '#search-text'
    },

    regions: {
        playlists: '.playlists',
        notification: '[role="notification"]'
    },

    events: {
        'click #sync-files': 'sync',
        'click #import-sc': 'importStream',
        'click #search': 'search'
    },

    sync: function() {
        syncFiles();
    },

    onRender: function() {
        let ui = this.ui;
        this.showChildView('playlists', new PlaylistsView());
        ui.importSC.focusout(function() {
            if (ui.importText.val() == '') {
                ui.importSC
                    .addClass('button')
                    .removeClass('input')
                    .removeClass('input-focused');
            }
        });
        ui.search.focusout(function() {
            if (ui.searchText.val() == '') {
                ui.search.removeClass('input-focused');
            }
        });
        ui.importText.keyup(function(e) {
            if(e.keyCode == 13) {
                scdl.import(ui.importText.val());
            }
        });
    },

    showNotification: function(msg) {
        this.showChildView(
            'notification',
            new NotificationView({ message: msg})
        );
    },

    importStream: function() {
        this.ui.importSC
            .removeClass('button')
            .addClass('input')
            .addClass('input-focused');
        this.ui.importText.focus();
    },

    search: function() {
        this.ui.search.addClass('input-focused');
    }
});

export default Toolbar;
