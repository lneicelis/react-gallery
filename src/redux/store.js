import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import requestMiddleware from './middlewares/request-middleware';

const finalCreateStore = compose(
    applyMiddleware(requestMiddleware, thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(rootReducer);

if (module.hot) {
    module.hot.accept('./reducers', () =>
        store.replaceReducer(require('./reducers/index').default)
    );
}

export default store;
