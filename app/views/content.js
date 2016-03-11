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
        this.stopListening();
        application.headerInfos.set('count', collection.length);
        this.listenTo(collection, 'add', function() {
            application.headerInfos.set('count', collection.length);
        });
        this.listenTo(collection, 'remove', function() {
            application.headerInfos.set('count', collection.length);
        });
        this.listenTo(collection, 'reset', function() {
            application.headerInfos.set('count', collection.length);
        });
    }
});

export default Content;
