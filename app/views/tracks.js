import Mn from 'backbone.marionette';
import TrackView from './track';
import application from '../application';


const TracksView = Mn.CompositeView.extend({

    template: require('./templates/tracks'),

    childViewContainer: '#track-list',

    childView: TrackView,

    onRender: function() {
        this.setCurrentTrack();
        this.listenTo(
            application.upNext,
            'change:currentTrack',
            this.setCurrentTrack
        );
    },

    setCurrentTrack: function() {
        if (application.upNext && application.upNext.attr('currentTrack')) {
            const track = application.upNext.attr('currentTrack');
            const item = this.children.findByModel(track);
            console.log(track)
            item.$el.addClass('playing').siblings().removeClass('playing');
        }
    }

});

export default TracksView;
