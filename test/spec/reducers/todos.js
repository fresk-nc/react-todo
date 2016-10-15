import { OrderedMap } from 'immutable';
import TodoRecord from 'records/TodoRecord';
import todos from 'reducers/todos';
import types from 'constants/ActionTypes';

describe('reducers', () => {
    describe('todos', () => {
        it('should provide the initial state', () => {
            expect(todos(undefined, {})).to.be.equal(OrderedMap());
        });

        it('should return the current state if the action is not known', () => {
            expect(
                todos(
                    OrderedMap({
                        '100': new TodoRecord({
                            id: '100',
                            text: 'buy milk'
                        })
                    }),
                    {
                        type: 'ACTION!'
                    }
                )
            ).to.be.equal(
                OrderedMap({
                    '100': new TodoRecord({
                        id: '100',
                        text: 'buy milk'
                    })
                })
            );
        });

        describe('GET_TODOS_SUCCESS action ->', () => {
            it('should return the received todos', () => {
                expect(
                    todos(OrderedMap(), {
                        type: types.GET_TODOS_SUCCESS,
                        response: [
                            {
                                id: '99',
                                text: 'buy milk',
                                completed: false,
                                sequence: 1
                            },
                            {
                                id: '100',
                                text: 'buy bread',
                                completed: false,
                                sequence: 2
                            }
                        ]
                    })
                ).to.be.equal(
                    OrderedMap({
                        '99': new TodoRecord({
                            id: '99',
                            text: 'buy milk',
                            sequence: 1
                        }),
                        '100': new TodoRecord({
                            id: '100',
                            text: 'buy bread',
                            sequence: 2
                        })
                    })
                );
            });
        });

        describe('ADD_TODO action ->', () => {
            it('should add the temporary todo into the empty list', () => {
                expect(
                    todos(OrderedMap(), {
                        type: types.ADD_TODO,
                        id: '100'
                    })
                ).to.be.equal(
                    OrderedMap({
                        '100': new TodoRecord({
                            id: '100',
                            new: true,
                            sequence: 1
                        })
                    })
                );
            });

            it('should add the temporary todo into the not empty list', () => {
                expect(
                    todos(
                        OrderedMap({
                            '99': new TodoRecord({
                                id: '99',
                                text: 'buy bread',
                                sequence: 1
                            })
                        }),
                        {
                            type: types.ADD_TODO,
                            id: '100'
                        }
                    )
                ).to.be.equal(
                    OrderedMap({
                        '99': new TodoRecord({
                            id: '99',
                            text: 'buy bread',
                            sequence: 1
                        }),
                        '100': new TodoRecord({
                            id: '100',
                            new: true,
                            sequence: 2
                        })
                    })
                );
            });
        });

        describe('CREATE_TODO action ->', () => {
            it('should create the todo', () => {
                expect(
                    todos(
                        OrderedMap({
                            '100': new TodoRecord({
                                id: '100',
                                new: true
                            })
                        }),
                        {
                            type: types.CREATE_TODO,
                            id: '100',
                            text: 'buy milk'
                        }
                    )
                ).to.be.equal(
                    OrderedMap({
                        '100': new TodoRecord({
                            id: '100',
                            text: 'buy milk'
                        })
                    })
                );
            });
        });

        describe('EDIT_TODO action ->', () => {
            it('should change the todo', () => {
                expect(
                    todos(
                        OrderedMap({
                            '99': new TodoRecord({
                                id: '99',
                                text: 'buy bread'
                            }),
                            '100': new TodoRecord({
                                id: '100',
                                text: 'buy milk'
                            })
                        }),
                        {
                            type: types.EDIT_TODO,
                            id: '100',
                            text: 'buy potato'
                        }
                    )
                ).to.be.equal(
                    OrderedMap({
                        '99': new TodoRecord({
                            id: '99',
                            text: 'buy bread'
                        }),
                        '100': new TodoRecord({
                            id: '100',
                            text: 'buy potato'
                        })
                    })
                );
            });
        });

        describe('DELETE_TODO action ->', () => {
            it('should delete the todo', () => {
                expect(
                    todos(
                        OrderedMap({
                            '99': new TodoRecord({
                                id: '99',
                                text: 'buy bread'
                            }),
                            '100': new TodoRecord({
                                id: '100',
                                text: 'buy milk'
                            })
                        }),
                        {
                            type: types.DELETE_TODO,
                            id: '100'
                        }
                    )
                ).to.be.equal(
                    OrderedMap({
                        '99': new TodoRecord({
                            id: '99',
                            text: 'buy bread'
                        })
                    })
                );
            });
        });

        describe('COMPLETE_TODO ->', () => {
            it('should mark the todo as completed', () => {
                expect(
                    todos(
                        OrderedMap({
                            '99': new TodoRecord({
                                id: '99',
                                text: 'buy bread',
                                completed: false
                            })
                        }),
                        {
                            type: types.COMPLETE_TODO,
                            id: '99'
                        }
                    )
                ).to.be.equal(
                    OrderedMap({
                        '99': new TodoRecord({
                            id: '99',
                            text: 'buy bread',
                            completed: true
                        })
                    })
                );
            });

            it('should mark the todo as uncompleted', () => {
                expect(
                    todos(
                        OrderedMap({
                            '99': new TodoRecord({
                                id: '99',
                                text: 'buy bread',
                                completed: true
                            })
                        }),
                        {
                            type: types.COMPLETE_TODO,
                            id: '99'
                        }
                    )
                ).to.be.equal(
                    OrderedMap({
                        '99': new TodoRecord({
                            id: '99',
                            text: 'buy bread',
                            completed: false
                        })
                    }),
                );
            });
        });
    });
});
