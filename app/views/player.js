import Mn from 'backbone.marionette';
import application from '../application';
import { timeToString } from '../libs/utils';


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

    initialize() {
        application.channel.reply('reset:UpNext', this.render, this);
        this.listenTo(application.appState, 'change:currentTrack', function() {
            let currentTrack = application.appState.get('currentTrack');
            if (currentTrack) {
                this.load(currentTrack);
            }
        });
    },

    onRender() {
        let audio = this.ui.player.get(0);
        audio.ontimeupdate = this.timeupdate;
        audio.onended = this.next;
        audio.onvolumechange = this.onVolumeChange;
        audio.volume = 0.5;
    },

    load(track) {
        let title = track.get('metas').title;
        let artist = track.get('metas').artist;
        let text;
        if (artist) {
            text = artist + ' - ' + title;
        } else {
            text = title;
        }
        this.ui.trackname.text(text);
        let self = this;
        track.getStream(function(url) {
            self.play(url);
        });
    },

    play(url) {
        let audio = this.ui.player.get(0);
        audio.src = url;
        audio.load();
        audio.play();
        this.ui.playButton.children('use').attr(
            'xlink:href', 
            require('../assets/icons/pause-lg.svg')
        );
    },

    prev() {
        let upNext = application.upNext;
        let currentTrack = application.appState.get('currentTrack');
        let index = upNext.indexOf(currentTrack);
        let prev = upNext.at(index - 1)
        if (prev) {
            application.appState.set('currentTrack', prev);
        }
    },

    next() {
        let upNext = application.upNext;
        let currentTrack = application.appState.get('currentTrack');
        let index = upNext.indexOf(currentTrack);
        let next = upNext.at(index + 1)
        if (next) {
            application.appState.set('currentTrack', next);
        }
    },

    scroll(e) {
        let audio = this.ui.player.get(0);
        let bar = this.ui.progressBar.get(0);
        let newTime = audio.duration * ((e.pageX - bar.offsetLeft) / bar.clientWidth);
        audio.currentTime = newTime;
    },

    onVolumeChange() {
        let player = application.appLayout.getRegion('player').currentView;
        let audio = player.ui.player.get(0);
        let bar = player.ui.volumeBar.get(0);
        let percent = audio.volume * 100 + '%';
        player.ui.volume.width(percent);
    },

    changeVol(e) {
        let audio = this.ui.player.get(0);
        let bar = this.ui.volumeBar.get(0);
        let volume = (e.pageX - bar.offsetLeft) / bar.clientWidth;
        audio.volume = volume;
    },

    toggle() {
        let audio = this.ui.player.get(0);
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

    timeupdate() {
        let player = application.appLayout.getRegion('player').currentView;
        let audio = player.ui.player.get(0);
        player.ui.currentTime.html(timeToString(audio.currentTime));
        player.ui.totalTime.html(timeToString(audio.duration));
        let percent = audio.currentTime / audio.duration * 100 + '%';
        player.ui.progress.width(percent);
    }
});

export default Player;
