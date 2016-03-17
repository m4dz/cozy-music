import Backbone from 'backbone';
import Track from '../models/track';
import cozysdk from 'cozysdk-client';
import application from '../application'

const Tracks = Backbone.Collection.extend({

    model: Track,

    initialize(models, options) {
        this.type = options.type;
        if (this.type == 'upNext') {
            this.listenTo(application, 'start', this.addCurrentToUpNext);
        }
    },

    addCurrentToUpNext() {
        this.listenTo(
            application.appState,
            'change:currentTrack',
            function(appState, currentTrack) {
                if (!this.contains(currentTrack)) {
                    this.push(currentTrack);
                }
            }
        );
    },

    comparator(model) {
        return model.get('metas').title;
    },

    sync(method, model, options) {
        if (method == 'read' && this.type) {
            cozysdk.run('Track', this.type, {}, (err, res) => {
                console.log('TRACKS fetch', err, res);
                if (res) {
                    let tracks = JSON.parse('' + res);
                    for (let i = 0; i < tracks.length; i++) {
                        this.add(tracks[i].value);
                    }
                    options.success();
                }
            });
        }
    }
});

cozysdk.defineRequest('File', 'music', (doc) => {
        if (doc.class == 'music') {
            emit(doc._id, doc);
        }
    }, (error, response) => {
        console.log('FILEMUSICREQ', error, response);
});

cozysdk.defineRequest('Track', 'all', (doc) => {
        emit(doc._id, doc);
    }, (error, response) => {
        console.log('ALLTRACKREQ', error, response);
});

cozysdk.defineRequest('Track', 'playable', (doc) => {
        if (!doc.hidden) {
            emit(doc._id, doc);
        }
    }, (error, response) => {
        console.log('PLAYABLEREQ', error, response);
});

cozysdk.defineRequest('Track', 'file', (doc) => {
        if (doc.ressource.type == 'file') {
            emit(doc._id, doc);
        }
    }, (error, response) => {
        console.log('TRACKFILEREQ', error, response);
});

cozysdk.defineRequest('Track', 'soundcloud', (doc) => {
        if (doc.ressource.type == 'soundcloud') {
            emit(doc._id, doc);
        }
    }, (error, response) => {
        console.log('TRACKSCREQ', error, response);
});

export default Tracks;
