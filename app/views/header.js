import Mn from 'backbone.marionette';
import application from '../application';
import Tracks from '../collections/tracks';

const Header = Mn.ItemView.extend({

    template: require('./templates/header'),

    events: {
        'click #reset-upnext': 'resetUpNext',
        'click #delete-playlist': 'deletePlaylist'
    },

    //modelEvents: { change: 'render' }, // DON'T WORK

    initialize: function() {
        this.model = application.headerInfos;
        this.listenTo(this.model, 'change', this.render)
    },

    serializeData: function() {
        return {
            title: this.model.get('title'),
            count: this.model.get('count')
        }
    },

    resetUpNext: function() {
        application.upNext.setAttr('currentTrack', undefined);
        application.upNext.reset();
        application.appLayout.getRegion('player').currentView.render();
    },

});

export default Header;
