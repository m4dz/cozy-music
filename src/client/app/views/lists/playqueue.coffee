###
    Inherited from tracklist

    Features :
    - drag and drop
    - remove tracks from list
    - maintain a pointer on the track at play
###

TrackView = require 'views/lists/playqueue_item'
TrackListView = require 'views/lists/tracklist'

module.exports = class PlayQueueView extends TrackListView

    itemview: TrackView
    template: require('views/templates/playqueue')

    events:
        'update-sort': 'updateSort'
        'remove-item': (e, track)->
            @collection.remove track
        'play-from-track': 'playFromTrack'
        'remove-from-track': 'removeFromTrack'
        'remove-to-track': 'removeToTrack'
        'click .save-button': (e)->
            alert 'not available yet'
        'click .show-prev-button': 'onClickShowPrevious'
        'click .clear': 'removeFromFirst'

    showPrevious: false

    initialize: ->
        super
        cookie = Cookies('isShowPreviousByDefault')
        @showPrevious = cookie? and cookie is "true"
        @listenTo @collection, 'change:atPlay', =>
            if @isRendered
                @render()
        @isRendered = false # a sad story...

    updateStatusDisplay: ->
        for id, view of @views
            index = @collection.indexOf view.model
            if index < @collection.atPlay
                if @showPrevious
                    view.$el.addClass 'already-played'
                else
                    view.$el.addClass 'hidden'
            else if index is @collection.atPlay
                view.$el.addClass 'at-play'

    afterRender: =>
        super
        # adding table stripes
        $('.tracks-display tr:odd').addClass 'odd'

        # update track status display
        @updateStatusDisplay()

        # enabling drag'n'drop with jquery-ui-1.10.3
        @$('#track-list').sortable
            opacity: 0.8
            delay: 150 # prevent unwanted drags when clicking on an element
            containment: "parent"
            axis: "y"
            placeholder: "track sortable-placeholder"
            # tolerance: "pointer"
            # to prevent table.th width to collapse, we need to override helper
            helper: (e, tr)->
                $originals = tr.children()
                $helper = tr.clone()
                $helper.children().each (index)->
                    # Set helper cell sizes to match the original sizes
                    $(this).width($originals.eq(index).width())
                return $helper
            # when drag'n'drop stop we need to update the collection
            stop: (event, ui) ->
                return if event.originalEvent?.dataTransfer?
                ui.item.trigger 'drop', ui.item.index()

        @isRendered = true

    beforeRender: ->
        if @isRendered
            @$('#track-list').sortable "destroy"
        super
        @isRendered = false

    beforeDetach: ->
        if @isRendered
            @$('#track-list').sortable "destroy"
        super
        @isRendered = false

    remove: ->
        @$('#track-list').sortable "destroy"
        super
        @isRendered = false

    disableSort: ->
        if @isRendered
            @$("#track-list").sortable "disable"

    enableSort: ->
        if @isRendered
            @$("#track-list").sortable "enable"

    updateSort: (event, track, position) ->
        @collection.moveItem track, position
        @render()

    playFromTrack: (event, track)->
        @collection.playFromTrack track

    removeFromTrack: (event, track)->
        index = @collection.indexOf track
        @collection.deleteFromIndexToEnd index
        @render()

    removeToTrack: (event, track)->
        index = @collection.indexOf track
        @collection.deleteFromBeginingToIndex index
        @render()

    removeFromFirst: (event)->
        @collection.deleteFromIndexToEnd 0
        @render()

    onClickShowPrevious: (e)=>
            @showPrevious = !@showPrevious
            Cookies.set 'isShowPreviousByDefault', @showPrevious
            @render()
