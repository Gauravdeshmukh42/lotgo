import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  collection: [
    {
      id: 1,
      name: 'Collection 1',
      bookmarks: [
        {
          id: 1,
          attributes: {
            title: 'Bookmark 1',
            content: 'Bookmark 1 content',
          },
        },
        {
          id: 2,
          attributes: {
            title: 'Bookmark 2',
            content: 'Bookmark 2 content',
          },
        },
      ],
    },
  ],
};
const bookmarkSlice = createSlice({
  initialState,
  name: 'bookmark',
  reducers: {
    addCollection(state, action) {
      state.collection.push(action.payload);
    },
    removeCollection(state, action) {
      state.collection = state.collection.filter(
        item => item.id !== action.payload,
      );
    },
    addBookmark(state, action) {
      const {collectionId, bookmark} = action.payload;
      const collection = state.collection.find(
        collection => collection.name === collectionId,
      );
      if (collection) {
        console.log('New Bookmark added');
        collection.bookmarks.push(bookmark);
      }
    },
    removeBookmark(state, action) {
      const {collectionId, bookmarkTitle} = action.payload;
      const collection = state.collection.find(
        collection => collection.id === collectionId,
      );
      if (collection) {
        collection.bookmarks = collection.bookmarks.filter(
          bookmark => bookmark.attributes.title !== bookmarkTitle,
        );
        console.log('Bookmark Removed');
      }
    },
  },
});
export const {
  addCollection,
  removeCollection,
  addBookmark,
  removeBookmark,
  searchCollection,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
