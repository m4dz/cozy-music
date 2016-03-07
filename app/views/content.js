import Mn from 'backbone.marionette';
import HeaderView from './header';
import TracksView from './tracks';
import application from '../application';


const Content = Mn.LayoutView.extend({
    
    template: require('./templates/content'),

    regions: {
        header: '[role="header"]',
        tracks: '[role="tracks"]',
    },

    onBeforeShow: function() {
        this.showChildView('header', new HeaderView());
        this.showChildView('tracks', new TracksView());
    },

    onRender: function() {
        application.allTracks.on('add', function() {
            application.headerInfos.set('count', application.allTracks.length);
        });
        application.allTracks.on('remove', function() {
            application.headerInfos.set('count', application.allTracks.length);
        });
    }
});

export default Content;
