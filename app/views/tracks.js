import Mn from 'backbone.marionette';
import TrackView from './track';

const TracksView = Mn.CompositeView.extend({

    template: require('./templates/tracks'),

    childViewContainer: '#track-list',

    childView: TrackView,

});

export default TracksView;
