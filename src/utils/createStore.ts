import { useState, useEffect } from 'react';

function createGlobalState<InitialState = object>(initialState: InitialState) {
  const state: InitialState = initialState;
  const subscribers = {} as { [K in keyof InitialState]: any[] };

  for (const i in state) {
    subscribers[i] = [];
  }

  function useGlobalState<SliceState>(
    key: keyof InitialState
  ): [SliceState, (value?: SliceState) => void] {
    // @ts-ignore
    if (!state.hasOwnProperty(key)) {
      throw new Error('Key does not exist in the store');
    }

    const [stateChunk, setStateChunk] = useState<SliceState>(
      state[key] as SliceState
    );

    useEffect(() => {
      subscribers[key].push(setStateChunk);

      return () => {
        const index = subscribers[key].findIndex((fn) => fn === setStateChunk);
        subscribers[key].splice(index, 1);
      };
    }, [key]);

    return [
      stateChunk,
      (value) => {
        // @ts-ignore
        setGlobalState(key, value);
      },
    ];
  }

  const setGlobalState = (key: keyof InitialState, value = null) => {
    // @ts-ignore
    if (!state.hasOwnProperty(key)) {
      throw new Error('Key does not exist in the store');
    }
    // @ts-ignore
    state[key] = value;
    subscribers[key].forEach((subscriber) => {
      subscriber(value);
    });
  };

  const getGlobalState = (key: keyof InitialState) => {
    // @ts-ignore
    if (!state.hasOwnProperty(key)) {
      throw new Error('Key does not exist in the store');
    }
    return state[key];
  };

  return {
    useGlobalState,
    setGlobalState,
    getGlobalState,
  };
}

export { createGlobalState };
