import Mn from 'backbone.marionette';
import application from '../application';


const PlaylistView = Mn.ItemView.extend({
    
    template: require('./templates/playlist'),

    tagName: 'p',
    
    initialize: function () {
        if (this.model) {
            this.model.on('change', this.render, this);
        }
    },
    
    serializeData: function() {
        return {
            title: this.model.get('title')
        };
    }
});

export default PlaylistView;