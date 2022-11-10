import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Accepts content and adds it to IndexedDB
export const putDb = async (content) => {
  
  const updateDB = await openDB('jate', 1);

  const transaction = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('Data saved to the database', result.value);
};

// Gets all the content from IndexedDB
export const getDb = async () => {

  const updateDB = await openDB('jate', 1);

  const transaction = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.get(1);
  
  const result = await request;
  
  result
    ? console.log('Data retrieved from the database', result.value)
    : console.log('Data not found in the database');
  return result?.value;
};

initdb();
