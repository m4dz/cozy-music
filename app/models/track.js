import Backbone from 'backbone';
import scdl from '../libs/soundcloud';
import cozysdk from 'cozysdk-client';

const Track = Backbone.Model.extend({

    defaults: {
        _id: undefined,
        playlists: '',
        metas: '',
        dateAdded: Date.now,
        plays: 0,
        ressource: '',
        hidden: false
    },

    idAttribute:'_id',

    sync(method, model, options) {
        switch (method) {
            case 'create':
                cozysdk.create('Track', model.toJSON(), (err, res) => {
                    console.log('CREATE TRACK', err, res);
                    if (res) {
                        model.set('_id', res._id);
                        options.success();
                    }
                });
                break;
            case 'read':
                cozysdk.find('Track', model.get('_id'), (err, res) => {
                    console.log('READ TRACK', err, res);
                    if (res) {
                        options.success();
                    }
                 });
                break;
            case 'update':
                cozysdk.updateAttributes(
                    'Track', model.id, model.toJSON(), (err, res) => {
                    if (res) {
                        options.success();
                    }
                    console.log('UPDATE TRACK', err, res);
                });
                break;
            case 'delete':
                cozysdk.destroy('Track', model.get('_id'), (err, res) => {
                    console.log('DELETE TRACK', err, res);
                    if (res) {
                        options.success();
                    }
                });
                break;
        }
    },

    getStream(callback) {
        let ressource = this.get('ressource');
        this.set('plays', this.get('plays') +1);
        this.save();
        switch (ressource.type) {
            case 'file':
                let id = this.get('ressource').fileID;
                cozysdk.getFileURL(id, 'file', (err, res) => {
                    console.log('FILEURL', err, res);
                    if (res) {
                        let url = 'http://' + res.split('@')[1]; // to delete in prod
                        callback(url);
                    }
                })
                break;
            case 'soundcloud':
                let url = this.get('ressource').url;
                callback(scdl.addClientID(url));
                break;
        }
    }
});

export default Track;
