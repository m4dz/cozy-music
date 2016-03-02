import Mn from 'backbone.marionette';
import { syncFiles } from '../libs/file';
import scdl from '../libs/soundcloud';

const Toolbar = Mn.LayoutView.extend({
    
    template: require('./templates/toolbar'),

    ui: {
        url: "input[type=text]"
    },

    events: {
        'click #sync-from-files': 'sync',
        'click #import': 'importSC'
    },

    onRender: function() {
    },

    sync: function() {
        syncFiles();
    },

    importSC: function() {
        scdl.import(this.ui.url.val());
    }
});

export default Toolbar;
