import status from 'reducers/status';
import types from 'constants/ActionTypes';
import { Map } from 'immutable';

describe('status reducer', () => {

    it('should provide the initial state', () => {
        expect(status(undefined, {})).to.be.equal(Map({
            request: false,
            error: null
        }));
    });

    it('should return the current state if the action is not known', () => {
        expect(
            status(
                Map({
                    request: true,
                    error: null
                }),
                {
                    type: 'ACTION!'
                }
            )
        ).to.be.equal(
            Map({
                request: true,
                error: null
            })
        );
    });

    it('should handle GET_TODOS action', () => {
        expect(
            status(
                Map({
                    request: false,
                    error: null
                }),
                {
                    type: types.GET_TODOS
                }
            )
        ).to.be.equal(
            Map({
                request: true,
                error: null
            })
        );
    });

    it('should handle GET_TODOS_SUCCESS action', () => {
        expect(
            status(
                Map({
                    request: true,
                    error: null
                }),
                {
                    type: types.GET_TODOS_SUCCESS
                }
            )
        ).to.be.equal(
            Map({
                request: false,
                error: null
            })
        );
    });

    it('should handle GET_TODOS_FAILURE action', () => {
        expect(
            status(
                Map({
                    request: true,
                    error: null
                }),
                {
                    type: types.GET_TODOS_FAILURE,
                    error: 'error'
                }
            )
        ).to.be.equal(
            Map({
                request: false,
                error: 'error'
            })
        );
    });

});
