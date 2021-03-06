import React, { Component } from 'react';

import './Notification.css';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.deleteNotificationHandler = this.deleteNotificationHandler.bind(this);
    }

    //setTimeout for removing notifications if has an expirration time 
    componentDidMount() {
        if (this.props.notification.expires) {
            setTimeout(() => {
                this.props.delete(this.props.notification.id);
            }, this.props.notification.expires);
        }
    }

    //update the componend if these conditions are met
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.notification.hasChanged) {
            return true;
        }

        if (this.props.notification.deleted) {
            return true;
        }
        return false;
    }

    //End

    //get current params and pass them to Notifications.js to execute delete
    deleteNotificationHandler = () => {
        this.props.delete(this.props.notification.id);
    }

    render() {
        //variable for maintainance
        let propsNotification = this.props.notification;

        //removing 'New' if the notifications is old or already seen
        let isNew = ['NewNotif'];
        if (!propsNotification.new) {
            isNew.push('Hide');
        }

        let notification = null; //initial set of variable for controled render acording passed props
        if (!propsNotification.deleted) {
            switch (propsNotification.type) {
                case 'text':
                    notification = (
                        <div className={this.props.class} >
                            <p className={isNew.join(' ')}>new</p>
                            <div className='Notify-title'>{propsNotification.title}</div>
                            <div className='Notify-text'>{propsNotification.text}</div>
                            <div type='button' className='material-icons Nofity-delete' onClick={this.deleteNotificationHandler} >delete_forever</div>
                        </div>
                    )
                    break;

                case 'bonus':
                    notification = (
                        <div className={this.props.class} >
                            <p className={isNew.join(' ')}>new</p>
                            <div className='Notify-title Bonus-title'>{propsNotification.title}</div>
                            <div className='Notify-text Bonus-text'>{propsNotification.requirement}</div>
                            <div type='button' className='material-icons Nofity-delete' onClick={this.deleteNotificationHandler} >delete_forever</div>
                        </div>
                    )

                    break;
                case 'Promotion':
                    notification = (
                        <div className={this.props.class} >
                            <p className={isNew.join(' ')}>new</p>
                            <img className='Notification-img Promotion-img' src={propsNotification.image} alt={propsNotification.image} />
                            <a href={propsNotification.link} className='Notify-text Promotion-text' >
                                <div className='Notify-title Promotion-title'>{propsNotification.title}</div>
                            </a>
                            <div type='button' className='material-icons Nofity-delete' onClick={this.deleteNotificationHandler} >delete_forever</div>
                        </div>
                    )
                    break;

                default:
                    notification = '';
                    break;
            }
        }

        return (
            <React.Fragment>
                {notification}
            </React.Fragment>
        )
    }
}

export default Notification;