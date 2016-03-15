import Mn from 'backbone.marionette';
import application from '../application';

const Notification = Mn.ItemView.extend({

    template: require('./templates/notification'),

    ui: {
        notification: '.notification',
    },

    initialize(options) {
        this.message = options.message;
    },

    onRender() {
        this.ui.notification.show();
        this.ui.notification.addClass('show');
        setTimeout(function() {
            $('.notification').hide();
        }, 4500);
    },

    serializeData() {
        return {
            message: this.message
        }
    }
});

export default Notification;
