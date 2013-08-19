Track = require '../models/track'

module.exports = class PlayQueue extends Backbone.Collection

    atPlay: 0

    # Model that will be contained inside the collection.
    model: Track

    # This is where ajax requests the backend.
    url: 'playqueue'

    playLoop: false

    # return current track pointed by atPlay if it exist
    getCurrentTrack: ->
        if 0 <= @atPlay < @length
            return @at(@atPlay)
        # else there is no track in the queue yet
        else
            return null

    # return next track, if there is no more track return null
    getNextTrack: ->
        if @atPlay < @length-1
            @atPlay += 1
            return @at(@atPlay)
        else if @playLoop and @length > 0
            @atPlay = 0
            return @at(@atPlay)
        else
            return null

    # return previous track, if this is the first track return null
    getPrevTrack: ->
        if @atPlay > 0
            @atPlay -= 1
            return @at(@atPlay)
        else if @playLoop and @length > 0
            @atPlay = @length - 1
            return @at(@atPlay)
        else
            return null

    # add the track at the end of the collection
    queue: (track)->
        @push track,
            sort: false

    # add the track at the index atPlay+1
    pushNext: (track)->
        if @length > 0
            @add track,
                at : @atPlay+1
        else
            @add track

    moveItem: (track, position)->
        # first : update atPlay value
        if @indexOf(track) == @atPlay
            @atPlay = position
        else
            if @indexOf(track) < @atPlay
                @atPlay -= 1
            if position <= @atPlay
                @atPlay += 1
        @remove track, false
        @add track,
            at: position

    # update atPlay value then call remove on track
    remove: (track, updateAtPlayValue = true)->
        if updateAtPlayValue
            if @indexOf(track) < @atPlay
                @atPlay -= 1
            else if @indexOf(track) == @atPlay
                id = track.get 'id'
                Backbone.Mediator.publish 'track:delete', "sound-#{id}"
                if @indexOf(track) is @indexOf(@last()) and @length > 1
                    @atPlay -= 1
        super track

    deleteFromIndexToEnd: (index)->
        @remove(@last()) while @indexOf(@last()) >= index

    # debug function
    show: ->
        console.log "PlayQueue content :"
        if @length >= 1
            for i in [0..@length-1]
                curM = @models[i]
                console.log i+") "+curM.attributes.title