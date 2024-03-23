import {createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  collection: [
    {
      id: 1,
      name: 'See Later',
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
    renameCollection(state, action) {
      const {collectionId, newCollectionName} = action.payload;
      const currentCollection = state.collection.find(
        item => item.id === collectionId,
      );
      currentCollection.name = newCollectionName;
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
  renameCollection,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
