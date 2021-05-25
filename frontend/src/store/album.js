
const LOAD = 'album/LOAD';
const ADD_ONE = 'album/ADD_ONE'

const load = albums => ({
    type: LOAD,
    albums,
});

const addOneAlbum = oneAlbum => ({
  type: ADD_ONE,
  oneAlbum,
});


export const getAlbum = () => async dispatch => {
    const response = await fetch(`/api/album`);

    if (response.ok) {
      const albums = await response.json();
      // console.log('ALBUMS', albums)
      // prints an array of album objs
      dispatch(load(albums));
    }
};


export const getOneAlbum = (id) => async dispatch => {
  // console.log(id)
  const response = await fetch(`/api/album/${id}`);

  if (response.ok) {
    const oneAlbum = await response.json();
    // console.log('ALBUMS', oneAlbum)
    dispatch(addOneAlbum(oneAlbum));
  }
}

export const createAlbum = (data) => async dispatch => {
  const response = await fetch(`/api/album`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    const album = await response.json();
    dispatch(addOneAlbum(album));
    return album;
  }
}


const initialState = {};


const albumReducer = (state = initialState, action) => {
    if (action.type === 'album/LOAD') {
        const allAlbums = { ...state };
        // console.log(action.albums)
        action.albums.forEach(album => {
        allAlbums[album.id] = album;
      });
      return allAlbums;
    }
    if (action.type === 'album/ADD_ONE') {
      if (!state[action.oneAlbum.id]) {
        const newState = {
          ...state,
        [action.oneAlbum.id]: action.oneAlbum
        }
        // const photoList = action.oneAlbum.map(id => newState[id])
        // console.log(photoList)
        // photoList.push(action.oneAlbum)
        return newState;
      }
      return {
        ...state, [action.oneAlbum.id]: {
          ...state[action.oneAlbum.id], ...action.oneAlbum,
        }
      }
    }

  return state;
}

export default albumReducer;
