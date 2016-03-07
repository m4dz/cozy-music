import Backbone from 'backbone';


const Playlist = Backbone.Model.extend({
    
    defaults: {
        _id: undefined,
        title: '',
        tracks: [],
        dateAdded: Date.now
    },

    idAttribute:'_id',

    sync: function (method, model, options) {
        switch (method) {
            case 'create':
                cozysdk.create('Playlist', model.toJSON(), (err, res) => {
                    console.log('CREATE Playlist', err, res);
                    if (res) {
                        model.set('_id', res._id);
                        options.success();
                    }
                });
                break;
            case 'read':
                cozysdk.find('Playlist', model.get('_id'), (err, res) => {
                    console.log('READ Playlist', err, res);
                    if (res) {
                        options.success();
                    }
                 });
                break;
            case 'update':
                cozysdk.updateAttributes(
                    'Playlist', model.id, model.toJSON(), (err, res) => {
                    if (res) {
                        options.success();
                    }
                    console.log('UPDATE Playlist', err, res);
                });
                break;
            case 'delete':
                cozysdk.destroy('Playlist', model.get('_id'), (err, res) => {
                    console.log('DELETE Playlist', err, res);
                    if (res) {
                        options.success();
                    }
                });
                break;
        }
    },

    addTrack: function(track) {
        this.set('tracks', this.get('tracks').push(track));
    }
});

export default Playlist;
