import notifications from 'reducers/notifications';
import types from 'constants/ActionTypes';
import { List, fromJS } from 'immutable';

describe('notifications reducer', () => {

    it('should provide the initial state', () => {
        expect(notifications(undefined, {})).to.be.equal(List());
    });

    it('should return the current state if the action is not known', () => {
        expect(
            notifications(
                fromJS([
                    {
                        type: 'notification.deleteFail'
                    }
                ]),
                {
                    type: 'ACTION!'
                }
            )
        ).to.be.equal(
            fromJS([
                {
                    type: 'notification.deleteFail'
                }
            ])
        );
    });

    describe('DELETE_NOTIFICATION action ->', () => {

        it('should return an empty list if there is nothing to remove', () => {
            expect(
                notifications(
                    List(),
                    {
                        type: types.DELETE_NOTIFICATION
                    }
                )
            ).to.be.equal(List());
        });

        it('should remove a notification at the beginning of the list', () => {
            expect(
                notifications(
                    fromJS([
                        {
                            type: 'notification.deleteFail'
                        },
                        {
                            type: 'notification.createFail'
                        }
                    ]),
                    {
                        type: types.DELETE_NOTIFICATION
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        type: 'notification.createFail'
                    }
                ])
            );
        });

    });

    describe('DELETE_TODO_FAILURE action ->', () => {

        it('should add a notification at empty list', () => {
            expect(
                notifications(
                    List(),
                    {
                        type: types.DELETE_TODO_FAILURE
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        type: 'notification.deleteFail'
                    }
                ])
            );
        });

        it('should add a notification at the end of the list if list is not empty', () => {
            expect(
                notifications(
                    fromJS([
                        {
                            type: 'notification.createFail'
                        }
                    ]),
                    {
                        type: types.DELETE_TODO_FAILURE
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        type: 'notification.createFail'
                    },
                    {
                        type: 'notification.deleteFail'
                    }
                ])
            );
        });

    });

    describe('CREATE_TODO_FAILURE action ->', () => {

        it('should add a notification at empty list', () => {
            expect(
                notifications(
                    List(),
                    {
                        type: types.CREATE_TODO_FAILURE
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        type: 'notification.createFail'
                    }
                ])
            );
        });

        it('should add a notification at the end of the list if list is not empty', () => {
            expect(
                notifications(
                    fromJS([
                        {
                            type: 'notification.deleteFail'
                        }
                    ]),
                    {
                        type: types.CREATE_TODO_FAILURE
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        type: 'notification.deleteFail'
                    },
                    {
                        type: 'notification.createFail'
                    }
                ])
            );
        });

    });

    describe('EDIT_TODO_FAILURE action ->', () => {

        it('should add a notification at empty list', () => {
            expect(
                notifications(
                    List(),
                    {
                        type: types.EDIT_TODO_FAILURE
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        type: 'notification.editFail'
                    }
                ])
            );
        });

        it('should add a notification at the end of the list if list is not empty', () => {
            expect(
                notifications(
                    fromJS([
                        {
                            type: 'notification.createFail'
                        }
                    ]),
                    {
                        type: types.EDIT_TODO_FAILURE
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        type: 'notification.createFail'
                    },
                    {
                        type: 'notification.editFail'
                    }
                ])
            );
        });

    });

    describe('COMPLETE_TODO_FAILURE action ->', () => {

        it('should add a notification at empty list', () => {
            expect(
                notifications(
                    List(),
                    {
                        type: types.COMPLETE_TODO_FAILURE
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        type: 'notification.editFail'
                    }
                ])
            );
        });

        it('should add a notification at the end of the list if list is not empty', () => {
            expect(
                notifications(
                    fromJS([
                        {
                            type: 'notification.createFail'
                        }
                    ]),
                    {
                        type: types.COMPLETE_TODO_FAILURE
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        type: 'notification.createFail'
                    },
                    {
                        type: 'notification.editFail'
                    }
                ])
            );
        });

    });

});
