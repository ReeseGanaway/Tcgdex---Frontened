import {
  FETCH_USER,
  START_FETCHING_USER,
  END_FETCHING_USER,
  GET_COLLECTIONID,
} from "./userActions";

export const getUserThunk = (email) => async (dispatch) => {
  try {
    dispatch({ type: START_FETCHING_USER });
    const user = await fetch(`https://tcgdex.herokuapp.com/users/${email}`);
    const data = await user.json();
    dispatch({ type: GET_COLLECTIONID, payload: data.collection_id });
    dispatch({ type: FETCH_USER, payload: data });

    dispatch({ type: END_FETCHING_USER });
  } catch (err) {
    console.error(err.message);
  }
};
