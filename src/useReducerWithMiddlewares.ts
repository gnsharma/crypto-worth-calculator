import {useReducer, useEffect, useRef, ReducerState, ReducerAction, Dispatch, Reducer} from 'react';

type MiddlewareType<R extends Reducer<any, any>> = (action: ReducerAction<R>, state: ReducerState<R>) => unknown;

const useReducerWithMiddlewares = <R extends Reducer<any, any>, I>(reducer: R,
    initialState: I & ReducerState<R>,
    middlewares: Array<MiddlewareType<R>> = [],
    afterDispatchMiddleWares: Array<MiddlewareType<R>> = [],
    initializer: (arg: I & ReducerState<R>) => ReducerState<R> = initialState => initialState
  ): [ReducerState<R>, Dispatch<ReducerAction<R>>] => {
    const [state, dispatch] = useReducer(reducer, initialState, initializer);

    const currentRef = useRef<ReducerAction<R> | undefined>();
    useEffect(() => {
      if (currentRef.current !== undefined) {
        const action = currentRef.current;
        afterDispatchMiddleWares.map((middleware) => middleware(action, state));
      }
    }, [afterDispatchMiddleWares, state]);
  
    const dispatchUsingMiddleware = (action: ReducerAction<R>) => {
      middlewares.map((middleware) => middleware(action, state));
      currentRef.current = action;
      dispatch(action);
    }
    return [state, dispatchUsingMiddleware];
  };

  export default useReducerWithMiddlewares;