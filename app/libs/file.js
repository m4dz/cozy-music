import Track from '../models/track';
import application from '../application';
import cozysdk from 'cozysdk-client';


export function syncFiles() {
    cozysdk.run('File', 'music', {}, (err, res) => {
        console.log('syncFiles', err, res);
        if (res) {
            let files = JSON.parse('' + res);
            getAllTracksFileId(files);
        }
    });
}

function getAllTracksFileId(musicFiles) {
    cozysdk.run('Track', 'file', {}, (err, res) => {
        console.log('getAllTracksFileId', err, res);
        let tracksFileId = [];
        let allTracksFiles = [];
        let musicFilesFileId = [];
        if (res) {
            let tracks = JSON.parse('' + res);
            for (let i = 0; i < tracks.length; i++) {
                tracksFileId.push(tracks[i].value.ressource.fileID);
                allTracksFiles.push(new Track(tracks[i].value));
            }
            for (let i = 0; i < musicFiles.length; i++) {
                musicFilesFileId.push(musicFiles[i].value._id);
            }
            saveTrack(musicFiles, tracksFileId);
            deleteTrack(allTracksFiles, musicFilesFileId);
            let msg = 'All your audio files have been added';
            application.channel.request('notification', msg);
        }
    });
}

function deleteTrack(allTracks, musicFilesFileId) {
    for (let i = 0; i < allTracks.length; i++) {
        let t = allTracks[i];
        if (musicFilesFileId.indexOf(t.get('ressource').fileID) <= -1) { 
            t.destroy();
        }
    }
}

function saveTrack(musicFiles, tracksFileId) {
    let files = musicFiles;
    for (let i = 0; i < files.length; i++) {
        let file = files[i].value;
        let trackname = file.name; // TO DO : ID3TAG
        let fileid = file._id;
        let t = new Track({
            metas: { 
                title: trackname
            },
            ressource: {
                type: 'file',
                fileID: fileid
            }
        });

        if (tracksFileId.indexOf(fileid) <= -1) { // does not contains fileid 
            application.allTracks.add(t);
        }
    }
}
