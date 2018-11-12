/*
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'boilerplate.containers.LibraryPage.header',
    defaultMessage: 'Your Library',
  },
  libraryTotal: {
    id: 'boilerplate.containers.LibraryPage.libraryTotal',
    defaultMessage: 'Total Count: {count}',
  },
  libraryLoading: {
    id: 'boilerplate.containers.LibraryPage.libraryLoading',
    defaultMessage: 'Loading...\nThis may take a while, we are loading your full library',
  },
  libraryEmpty: {
    id: 'boilerplate.containers.LibraryPage.libraryEmpty',
    defaultMessage: 'Seems like your library is empty.',
  },
  exportCsv: {
    id: 'boilerplate.containers.LibraryPage.exportCsv',
    defaultMessage: 'Export CSV',
  },
});
