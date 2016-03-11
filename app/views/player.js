import Mn from 'backbone.marionette';
import application from '../application';

const Player = Mn.LayoutView.extend({
    
    template: require('./templates/player'),

    ui: {
        player: 'audio',
        currentTime: '#current-time',
        totalTime: '#total-time',
        progress: '#progress',
        progressBar: '#progress-bar',
        volume: '#volume',
        volumeBar: '#volume-bar',
        playButton: '#play',
        trackname: '#trackname'
    },

    events: {
        'click #prev': 'prev',
        'click #play': 'toggle',
        'click #next': 'next',
        'click #progress-bar': 'scroll',
        'click #volume-bar': 'changeVol'
    },

    onRender: function() {
        const audio = this.ui.player.get(0);
        audio.ontimeupdate = this.timeupdate;
        audio.onended = this.next;
        audio.onvolumechange = this.onVolumeChange;
        audio.volume = 0.5;
        this.listenTo(application.upNext, 'change:currentTrack', function() {
            const upNext = application.upNext;
            const currentTrack = upNext.getAttr('currentTrack');
            if (currentTrack) {
                this.load(currentTrack);
            }
        });
    },

    load: function(track) {
        const title = track.get('metas').title;
        const artist = track.get('metas').artist;
        let text;
        if (artist) {
            text = artist + ' - ' + title;
        } else {
            text = title;
        }
        this.ui.trackname.text(text);
        track.getStream(function(url) {
            application.appLayout.getRegion('player').currentView.play(url);
        });
    },

    play: function(url) {
        const audio = this.ui.player.get(0);
        audio.src = url;
        audio.load();
        audio.play();
        this.ui.playButton.children('use').attr(
            'xlink:href', 
            require('../assets/icons/pause-lg.svg')
        );
    },

    prev: function() {
        const upNext = application.upNext;
        const currentTrack = upNext.getAttr('currentTrack');
        const index = upNext.indexOf(currentTrack);
        const prev = upNext.at(index - 1)
        if (prev) {
            upNext.setAttr('currentTrack', prev);
        }
    },

    next: function() {
        const upNext = application.upNext;
        const currentTrack = upNext.getAttr('currentTrack');
        const index = upNext.indexOf(currentTrack);
        const next = upNext.at(index + 1)
        if (next) {
            upNext.setAttr('currentTrack', next);
        }
    },

    scroll: function(e) {
        const audio = this.ui.player.get(0);
        const bar = this.ui.progressBar.get(0);
        const newTime = audio.duration * ((e.pageX - bar.offsetLeft) / bar.clientWidth);
        audio.currentTime = newTime;
    },

    onVolumeChange: function() {
        const player = application.appLayout.getRegion('player').currentView;
        const audio = player.ui.player.get(0);
        const bar = player.ui.volumeBar.get(0);
        const percent = audio.volume * 100 + '%';
        player.ui.volume.width(percent);
    },

    changeVol: function(e) {
        const audio = this.ui.player.get(0);
        const bar = this.ui.volumeBar.get(0);
        const volume = (e.pageX - bar.offsetLeft) / bar.clientWidth;
        audio.volume = volume;
    },

    toggle: function() {
        const audio = this.ui.player.get(0);
        if (audio.paused && audio.src) {
            audio.play();
            this.ui.playButton.children('use').attr(
                'xlink:href', 
                require('../assets/icons/pause-lg.svg')
            );
        } else if (audio.src) {
            audio.pause();
            this.ui.playButton.children('use').attr(
                'xlink:href', 
                require('../assets/icons/play-lg.svg')
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
