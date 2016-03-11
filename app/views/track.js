import Mn from 'backbone.marionette';
import application from '../application';
import { timeToString } from '../libs/utils';


const TrackView = Mn.ItemView.extend({
    
    template: require('./templates/track'),

    tagName: 'tr',

    events: {
        'click': 'play',
        'click .delete': 'delete'
    },

    modelEvents: { change: 'render' },

    play: function (e) {
        application.upNext.setAttr('currentTrack', this.model);
    },
    
    delete: function (e) {
        console.log('delete')
        const item = this.model;
        item.set('hidden', true);
        item.save();
        application.allTracks.remove(item);
        application.upNext.remove(item);
        e.stopPropagation();
    },
    
    serializeData: function() {
        const title = this.model.get('metas').title;
        const album = this.model.get('metas').album;
        const artist = this.model.get('metas').artist;
        let duration;
        if (this.model.get('metas').duration) {
            duration = timeToString(this.model.get('metas').duration / 1000);
        } else {
            duration = '--:--';
        }
        return {
            number: 4,
            title: title,
            artist: artist,
            album: album,
            duration: duration
        };
    }
});

export default TrackView;