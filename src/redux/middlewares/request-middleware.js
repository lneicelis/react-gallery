import HttpRequest from '../../models/http-request';
import api from '../../services/api';
import {REQUEST_MADE, RESPONSE_RECEIVED} from '../action-types';

export default function requestMiddleware({dispatch}) {
    return function (next) {
        return function (action) {
            const {request} = action;

            if (request instanceof HttpRequest) {
                const promise = api.getResponse(request);

                dispatch({
                    type: REQUEST_MADE,
                    promise
                });

                promise
          .tap(response => {
              dispatch({
                  type: `${action.type}_SUCCESS`,
                  response
              });
          })
          .catch(error => {
              dispatch({
                  type: `${action.type}_FAILURE`,
                  error
              });

              return error;
          })
          .tap(response => {
              dispatch({
                  type: RESPONSE_RECEIVED,
                  response
              });
          });
            }

            next(action);
        };
    };
}