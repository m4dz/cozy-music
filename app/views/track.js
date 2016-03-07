import Mn from 'backbone.marionette';
import application from '../application';


const TrackView = Mn.ItemView.extend({
    
    template: require('views/templates/track'),

    tagName: 'tr',

    events: {
        'click': 'play',
        'click .delete': 'delete'
    },

    play: function (e) {
        this.model.getStreamAndPlay();
        $(e.currentTarget)
            .addClass('playing')
            .siblings()
            .removeClass('playing');
    },
    
    delete: function (e) {
        const item = this.model;
        item.set('hidden', true);
        item.save();
        application.allTracks.remove(item);
    },
    
    initialize: function () {
        if (this.model) {
            this.model.on('change', this.render, this);
        }
    },
    
    serializeData: function() {
        let number, title, artist, album;
        if (this.model.get('metas').title) {
            title = this.model.get('metas').title;
        }

        if (this.model.get('metas').album) {
            album = this.model.get('metas').album;
        }

        if (this.model.get('metas').artist) {
            artist = this.model.get('metas').artist;
        }
        return {
            number: 4,
            title: title,
            artist: artist,
            album: album
        };
    }
});

export default TrackView;