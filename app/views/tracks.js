import Mn from 'backbone.marionette';
import TrackView from './track';
import application from '../application';


const TracksView = Mn.CollectionView.extend({  
    el: '#app-hook',
    tagName: 'ul',

    childView: TrackView,
    events: {
        'click a': 'play',
        'click .delete': 'delete'
    },
    play: function (e) {
        const id = e.currentTarget.dataset.id;
        const item = this.collection.get(id);
        item.getStreamURL(playAudio);
    },
    delete: function (e) {
        const id = e.currentTarget.dataset.id;
        const item = this.collection.get(id);
        item.set('hidden', true);
        item.save()
        application.allTracks.remove(item)
        application.tracksView.render();
    },
    onRender: function(){
        console.log('render tracksview')
    },
    initialize: function() {
        this.collection = application.allTracks;
    }
});

const playAudio = function(url) {
    window.player.src = url;
    window.player.load();
    window.player.play();
}

export default TracksView;
