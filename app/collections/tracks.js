import Backbone from 'backbone';
import Track from '../models/track';
import cozysdk from 'cozysdk-client';


const Tracks = Backbone.Collection.extend({
    model: Track,

    initialize: function(models, options) {
        this.on('add', this.onAdd, this);
        if (options) {
            this.type = options.type;
        }
    },

    onAdd: function(track) {
        if (!track.get('_id')) {
            track.save()
        }
    },
    
    comparator: function (collection) {
        return collection.get('metas').title;
    },
    
    sync: function (method, model, options) {
        if (method == 'read' && this.type) {
            console.log('fetch');
            cozysdk.run('Track', this.type, {}, (err, res) => {
                console.log('TRACKS fetch', err, res);
                if (res) {
                    const tracks = JSON.parse('' + res);
                    for (let i = 0; i < tracks.length; i++) {
                        this.add(tracks[i].value);
                    }
                    options.success();
                }
            });
        }
    },

    clone: function(deep) {
        if(deep) {
            return new this.constructor(
                _.map(this.models, function(m) { return m.clone(); })
            );
        }else{
            return Backbone.Collection.prototype.clone();
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
