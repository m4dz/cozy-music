import Mn from 'backbone.marionette';
import application from '../application';

const Header = Mn.ItemView.extend({

    template: require('views/templates/header'),
    
    initialize: function() {
        this.model = application.headerInfos;
        if (this.model) {
            this.model.on('change', this.render);
        }
    },

    serializeData: function() {
        return {
            title: this.model.get('title'),
            count: this.model.get('count')
        }
    },

});

export default Header;

