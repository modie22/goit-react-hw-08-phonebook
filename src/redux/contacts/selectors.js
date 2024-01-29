import { createSelector } from '@reduxjs/toolkit';

export const selectItems = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilter = state => state.filter;

export const selectSortedContacts = state => {
  const sortedContacts = [...state.contacts.items].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return sortedContacts;
};

export const selectFilteredContacts = createSelector(
  [selectSortedContacts, selectFilter],
  (contacts, filter) =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
);
