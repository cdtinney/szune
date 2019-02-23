////////////////////////////
// External dependencies  //
////////////////////////////

import update from 'immutability-helper';

////////////////////////////
// Internal dependencies  //
////////////////////////////

import * as userActions from '../actions/user';

const initialState = {
  request: {
    loading: false,
    lastUpdated: null,
    error: null,
    errored: false,
  },
  profile: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case userActions.FETCH_AUTH_USER_REQ: {
      return update(state, {
        request: {
          $merge: {
            loading: true,
            lastUpdated: null,
            error: null,
            errored: false,
          },
        },
      });
    }

    case userActions.FETCH_AUTH_USER_SUCCESS: {
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

    case userActions.FETCH_AUTH_USER_FAILURE: {
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