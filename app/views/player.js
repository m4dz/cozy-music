import Mn from 'backbone.marionette';
import application from '../application';

const Player = Mn.LayoutView.extend({
    
    template: require('./templates/player'),

    ui: {
        player: 'audio',
        currentTime: '#current-time',
        totalTime: '#total-time',
        progress: '#progress',
        playButton: '#play'
    },

    events: {
        'click #prev': 'prev',
        'click #play': 'toggle',
        'click #next': 'next',
        'click #progress-bar': 'scroll',
    },

    onRender: function() {
        const audio = this.ui.player.get(0);
        audio.ontimeupdate = this.timeupdate
    },

    play: function(url) {
        const audio = this.ui.player.get(0);
        audio.src = url;
        audio.load();
        audio.play();
    },

    prev: function() {

    },

    next: function() {
        
    },

    scroll: function() {
        
    },

    toggle: function() {
        const audio = this.ui.player.get(0);
        if (audio.paused && audio.src) {
            audio.play();
            this.ui.playButton.children().attr(
                'xlink:href', 
                require('svg-sprite!../assets/icons/pause-lg.svg')
            );
        } else if (audio.src) {
            audio.pause();
            this.ui.playButton.children().attr(
                'xlink:href', 
                require('svg-sprite!../assets/icons/play-lg.svg')
            );
        }
    },

    timeupdate: function() {
        const player = application.appLayout.getRegion('player').currentView;
        const audio = player.ui.player.get(0);
        player.ui.currentTime.html(timeToString(audio.currentTime));
        player.ui.totalTime.html(timeToString(audio.duration));
        const percent = audio.currentTime / audio.duration * 100 + '%';
        player.ui.progress.width(percent);
    }
});

function timeToString(time) {
    var totalSec = Math.floor(time);
    var hours = parseInt( totalSec / 3600 ) % 24;
    var minutes = parseInt( totalSec / 60 ) % 60;
    var seconds = totalSec % 60;

    hours = (hours < 10 ? '0' + hours : hours)
    minutes = (minutes < 10 ? '0' + minutes : minutes)
    seconds = (seconds < 10 ? '0' + seconds : seconds)

    var r = (hours == '00' ? '' : hours + ':')
            + (minutes == '00' ? '0:' : minutes + ':')
            + seconds;
    return r;
}

export default Player;
