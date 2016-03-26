import todos from 'reducers/todos';
import types from 'constants/ActionTypes';
import { List, fromJS } from 'immutable';

describe('todos reducer', () => {

    it('should provide the initial state', () => {
        expect(todos(undefined, {})).to.be.equal(List());
    });

    it('should return the current state if the action is not known', () => {
        expect(
            todos(
                fromJS([
                    {
                        id: 100,
                        text: 'buy milk',
                        completed: false
                    }
                ]),
                {
                    type: 'ACTION!'
                }
            )
        ).to.be.equal(
            fromJS([
                {
                    id: 100,
                    text: 'buy milk',
                    completed: false
                }
            ])
        );
    });

    describe('GET_TODOS_SUCCESS action ->', () => {

        it('should return the received todos', () => {
            expect(
                todos(List(), {
                    type: types.GET_TODOS_SUCCESS,
                    response: [
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        }
                    ]
                })
            ).to.be.equal(
                fromJS([
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    }
                ])
            );
        });

    });

    describe('ADD_TODO action ->', () => {

        it('should add the temporary todo into the empty list', () => {
            expect(
                todos(List(), {
                    type: types.ADD_TODO,
                    id: 100
                })
            ).to.be.equal(
                fromJS([
                    {
                        id: 100,
                        text: '',
                        completed: false,
                        new: true
                    }
                ])
            );
        });

        it('should add the temporary todo into the not empty list', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        }
                    ]),
                    {
                        type: types.ADD_TODO,
                        id: 100
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    },
                    {
                        id: 100,
                        text: '',
                        completed: false,
                        new: true
                    }
                ])
            );
        });

    });

    describe('CREATE_TODO action ->', () => {

        it('should create the todo if there is the temporary todo', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 100,
                            text: '',
                            completed: false,
                            new: true
                        }
                    ]),
                    {
                        type: types.CREATE_TODO,
                        id: 100,
                        text: 'buy milk'
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 100,
                        text: 'buy milk',
                        completed: false,
                        new: false
                    }
                ])
            );
        });

        it('should return the current state, if there is no the temporary todo', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        }
                    ]),
                    {
                        type: types.CREATE_TODO,
                        id: 100,
                        text: 'buy milk'
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    }
                ])
            );
        });

    });

    describe('EDIT_TODO action ->', () => {

        it('should change the todo at the beginning of the list', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 100,
                            text: 'buy milk',
                            completed: false
                        },
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        }
                    ]),
                    {
                        type: types.EDIT_TODO,
                        id: 100,
                        text: 'buy potato'
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 100,
                        text: 'buy potato',
                        completed: false
                    },
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    }
                ])
            );
        });

        it('should change the todo at the end of the list', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        },
                        {
                            id: 100,
                            text: 'buy milk',
                            completed: false
                        }
                    ]),
                    {
                        type: types.EDIT_TODO,
                        id: 100,
                        text: 'buy potato'
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    },
                    {
                        id: 100,
                        text: 'buy potato',
                        completed: false
                    }
                ])
            );
        });

        it('should return the current state, if there is no the todo', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        },
                        {
                            id: 100,
                            text: 'buy milk',
                            completed: false
                        }
                    ]),
                    {
                        type: types.EDIT_TODO,
                        id: 500,
                        text: 'buy potato'
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    },
                    {
                        id: 100,
                        text: 'buy milk',
                        completed: false
                    }
                ])
            );
        });

    });

    describe('DELETE_TODO action ->', () => {

        it('should delete the todo at the beginning of the list', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 100,
                            text: 'buy milk',
                            completed: false
                        },
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        },
                        {
                            id: 101,
                            text: 'buy eggs',
                            completed: true
                        }
                    ]),
                    {
                        type: types.DELETE_TODO,
                        id: 100
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    },
                    {
                        id: 101,
                        text: 'buy eggs',
                        completed: true
                    }
                ])
            );
        });

        it('should delete the todo at the middle of the list', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        },
                        {
                            id: 100,
                            text: 'buy milk',
                            completed: false
                        },
                        {
                            id: 101,
                            text: 'buy eggs',
                            completed: true
                        }
                    ]),
                    {
                        type: types.DELETE_TODO,
                        id: 100
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    },
                    {
                        id: 101,
                        text: 'buy eggs',
                        completed: true
                    }
                ])
            );
        });

        it('should delete the todo at the end of the list', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        },
                        {
                            id: 101,
                            text: 'buy eggs',
                            completed: true
                        },
                        {
                            id: 100,
                            text: 'buy milk',
                            completed: false
                        }
                    ]),
                    {
                        type: types.DELETE_TODO,
                        id: 100
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    },
                    {
                        id: 101,
                        text: 'buy eggs',
                        completed: true
                    }
                ])
            );
        });

        it('should return the current state, if there is no the todo', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        }
                    ]),
                    {
                        type: types.DELETE_TODO,
                        id: 100
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    }
                ])
            );
        });

    });

    describe('COMPLETE_TODO ->', () => {

        it('should mark the todo as completed', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        },
                        {
                            id: 101,
                            text: 'buy eggs',
                            completed: true
                        },
                        {
                            id: 100,
                            text: 'buy milk',
                            completed: false
                        }
                    ]),
                    {
                        type: types.COMPLETE_TODO,
                        id: 100
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    },
                    {
                        id: 101,
                        text: 'buy eggs',
                        completed: true
                    },
                    {
                        id: 100,
                        text: 'buy milk',
                        completed: true
                    }
                ])
            );
        });

        it('should mark the todo as uncompleted', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        },
                        {
                            id: 101,
                            text: 'buy eggs',
                            completed: true
                        },
                        {
                            id: 100,
                            text: 'buy milk',
                            completed: false
                        }
                    ]),
                    {
                        type: types.COMPLETE_TODO,
                        id: 101
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    },
                    {
                        id: 101,
                        text: 'buy eggs',
                        completed: false
                    },
                    {
                        id: 100,
                        text: 'buy milk',
                        completed: false
                    }
                ])
            );
        });

        it('should return the current state, if there is no the todo', () => {
            expect(
                todos(
                    fromJS([
                        {
                            id: 99,
                            text: 'buy bread',
                            completed: false
                        }
                    ]),
                    {
                        type: types.COMPLETE_TODO,
                        id: 100
                    }
                )
            ).to.be.equal(
                fromJS([
                    {
                        id: 99,
                        text: 'buy bread',
                        completed: false
                    }
                ])
            );
        });

    });

});
