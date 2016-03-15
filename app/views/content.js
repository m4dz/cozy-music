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

    onBeforeShow() {
        let header = new HeaderView({ model: application.appState })
        this.showChildView('header', header);
        this.listenTo(
            application.appState,
            'change:currentPlaylist',
            this.switchPlaylist
        );
        this.switchPlaylist();
    },

    switchPlaylist() {
        let collection = application.appState.get('currentPlaylist').get('tracks');
        this.showChildView('tracks',
            new TracksView({ collection: collection})
        );
    }
});

export default Content;
