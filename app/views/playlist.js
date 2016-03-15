import Mn from 'backbone.marionette';
import application from '../application';


const PlaylistView = Mn.ItemView.extend({
    
    template: require('./templates/playlist'),

    tagName: 'p',
    
    modelEvents: { change: 'render' },
    
    serializeData() {
        return {
            title: this.model.get('title')
        };
    }
});

export default PlaylistView;