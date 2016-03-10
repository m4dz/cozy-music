import Mn from 'backbone.marionette';
import { syncFiles } from '../libs/file';
import scdl from '../libs/soundcloud';
import PlaylistsView from './playlists';


const Toolbar = Mn.LayoutView.extend({
    
    template: require('./templates/toolbar'),

    ui: {
        importSC: '#import-sc',
        search: '#search',
        searchText: '#search-text'
    },

    regions: {
        playlists: '.playlists',
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

    importSC: function() {
        let importSC = this.ui.importSC
        scdl.import(this.ui.importText.val());
        //importSC.addClass('focused');
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
