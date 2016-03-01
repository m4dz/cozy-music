import Mn from 'backbone.marionette';

const TrackView = Mn.ItemView.extend({
    template: require('views/templates/track'),
    initialize: function () {
        if (this.model) {
            this.model.on('change', this.render, this);
        }
    },
    serializeData: function() {
        return {
            trackname: this.model.get('metas').title,
            id: this.model.get('_id')
        };
    }
});

export default TrackView;