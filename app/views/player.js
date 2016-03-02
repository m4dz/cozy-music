import Mn from 'backbone.marionette';

const Player = Mn.LayoutView.extend({
    
    template: require('./templates/player'),

    ui: {
        player: "audio"
    },

    onRender: function() {

    },

    play: function(url) {
        const audio = this.ui.player.get( 0 );
        audio.src = url;
        audio.load();
        audio.play();
    }
});

export default Player;
