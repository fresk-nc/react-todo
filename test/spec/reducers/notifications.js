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
                        message: 'message'
                    }
                ]),
                {
                    type: 'ACTION!'
                }
            )
        ).to.be.equal(
            fromJS([
                {
                    message: 'message'
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
                            message: 'message 1'
                        },
                        {
                            message: 'message 2'
                        }
                    ]),
                    {
                        type: types.DELETE_NOTIFICATION
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        message: 'message 2'
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
                        message: 'Todo isn\'t removed'
                    }
                ])
            );
        });

        it('should add a notification at the end of the list if list is not empty', () => {
            expect(
                notifications(
                    fromJS([
                        {
                            message: 'message'
                        }
                    ]),
                    {
                        type: types.DELETE_TODO_FAILURE
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        message: 'message'
                    },
                    {
                        message: 'Todo isn\'t removed'
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
                        message: 'Todo isn\'t created'
                    }
                ])
            );
        });

        it('should add a notification at the end of the list if list is not empty', () => {
            expect(
                notifications(
                    fromJS([
                        {
                            message: 'message'
                        }
                    ]),
                    {
                        type: types.CREATE_TODO_FAILURE
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        message: 'message'
                    },
                    {
                        message: 'Todo isn\'t created'
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
                        message: 'Todo isn\'t edited'
                    }
                ])
            );
        });

        it('should add a notification at the end of the list if list is not empty', () => {
            expect(
                notifications(
                    fromJS([
                        {
                            message: 'message'
                        }
                    ]),
                    {
                        type: types.EDIT_TODO_FAILURE
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        message: 'message'
                    },
                    {
                        message: 'Todo isn\'t edited'
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
                        message: 'Todo isn\'t edited'
                    }
                ])
            );
        });

        it('should add a notification at the end of the list if list is not empty', () => {
            expect(
                notifications(
                    fromJS([
                        {
                            message: 'message'
                        }
                    ]),
                    {
                        type: types.COMPLETE_TODO_FAILURE
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        message: 'message'
                    },
                    {
                        message: 'Todo isn\'t edited'
                    }
                ])
            );
        });

    });

});
