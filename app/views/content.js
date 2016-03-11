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
        this.switchPlaylist(application.allTracks);
    },

    switchPlaylist: function (collection) {
        console.log(collection)
        this.showChildView('tracks',
            new TracksView({ collection: collection})
        );
        collection.on('add', function() {
            application.headerInfos.set('count', collection.length);
        });
        collection.on('remove', function() {
            application.headerInfos.set('count', collection.length);
        });
        collection.on('reset', function() {
            application.headerInfos.set('count', collection.length);
        });
    }
});

export default Content;
