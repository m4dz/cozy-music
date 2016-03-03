import Mn from 'backbone.marionette';
import { syncFiles } from '../libs/file';
import scdl from '../libs/soundcloud';

const Toolbar = Mn.LayoutView.extend({
    
    template: require('./templates/toolbar'),

    ui: {
        importSC: '#import-sc',
        importText: '#import-text'
    },

    events: {
        'click #sync-files': 'sync',
        'click #import-sc': 'importSC'
    },

    sync: function() {
        syncFiles();
    },

    importSC: function() {
        let importSC = this.ui.importSC
        scdl.import(this.ui.importText.val());
        //importSC.addClass('focused');
    }
});

export default Toolbar;
