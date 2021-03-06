////////////////////////////
// External dependencies  //
////////////////////////////

import update from 'immutability-helper';

////////////////////////////
// Internal dependencies  //
////////////////////////////

import { types } from '../actions/user';

const initialState = {
  request: {
    loading: false,
    lastUpdated: null,
    error: null,
    errored: false,
  },
  profile: null,
};

/**
 * Handles the `user` slice of state.
 *
 * @param {Object} state - Current state.
 * @param {Object} action - Action object.
 */
export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_USER_AUTH_REQ: {
      return update(state, {
        request: {
          $merge: {
            loading: true,
            lastUpdated: null,
            error: null,
            errored: false,
          },
        },
        profile: {
          $set: null,
        },
      });
    }

    case types.FETCH_USER_AUTH_SUCCESS: {
      const {
        payload: {
          profile,
        },
      } = action;

      return update(state, {
        request: {
          $merge: {
            loading: false,
            lastUpdated: Date.now(),
            error: null,
            errored: false,
          },
        },
        profile: {
          $set: profile,
        },
      });
    }

    case types.FETCH_USER_AUTH_FAILURE: {
      const {
        payload: error,
      } = action;

      return update(state, {
        request: {
          $merge: {
            loading: false,
            lastUpdated: null,
            error,
            errored: true,
          },
        },
        profile: {
          $set: null,
        },
      });
    }

    default: {
      return state;
    }
  }
}
