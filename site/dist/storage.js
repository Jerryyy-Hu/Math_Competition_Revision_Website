/** Browser-local records. No user file is uploaded to the hosted site. */
const DATABASE = 'lemma-library-v1';
let database;

async function openDatabase() {
  if (!database) {
    database = new Promise((resolve, reject) => {
      const request = indexedDB.open(DATABASE, 1);
      request.onupgradeneeded = () => request.result.createObjectStore('materials', { keyPath: 'id' });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => { database = undefined; reject(request.error); };
    });
  }
  return database;
}

async function transact(mode, action) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('materials', mode);
    const request = action(transaction.objectStore('materials'));
    transaction.oncomplete = () => resolve(request?.result);
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error || new Error('Storage transaction was aborted.'));
  });
}

export const getMaterials = () => transact('readonly', (store) => store.getAll());
export const saveMaterial = (material) => transact('readwrite', (store) => store.put(material));

export function readPreferences() {
  try {
    const value = JSON.parse(localStorage.getItem('lemma-preferences-v1') || '{}');
    return { saved: Array.isArray(value.saved) ? value.saved : [], read: Array.isArray(value.read) ? value.read : [], last: typeof value.last === 'string' ? value.last : null };
  } catch {
    return { saved: [], read: [], last: null };
  }
}

export function writePreferences(value) {
  localStorage.setItem('lemma-preferences-v1', JSON.stringify(value));
}

export async function exportMaterials() {
  const records = await getMaterials();
  const materials = await Promise.all(records.map(async ({ file, ...record }) => ({
    ...record,
    file: file ? { name: file.name, type: file.type, data: await blobToDataUrl(file) } : null,
  })));
  return JSON.stringify({ format: 'lemma-materials', version: 1, exportedAt: new Date().toISOString(), materials }, null, 2);
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export async function importMaterials(text, topicKeys, collectionIds) {
  const backup = JSON.parse(text);
  if (backup.format !== 'lemma-materials' || backup.version !== 1 || !Array.isArray(backup.materials) || backup.materials.length > 1000) {
    throw new Error('This is not a supported Lemma backup.');
  }
  const records = [];
  for (const value of backup.materials) {
    if (!value || typeof value.title !== 'string' || value.title.length > 120 || typeof value.note !== 'string' || value.note.length > 10000) {
      throw new Error('The backup contains an invalid record.');
    }
    const url = value.url ? new URL(value.url) : null;
    if (url && !['https:', 'http:'].includes(url.protocol)) throw new Error('Only HTTP and HTTPS links are supported.');
    if (!collectionIds.has(value.collection)) throw new Error('The backup refers to an unknown collection.');
    if (value.topic && !topicKeys.has(value.topic)) throw new Error('The backup refers to an unknown topic.');
    if (value.topic && value.topic.split('/')[0] !== value.collection) throw new Error('The topic does not belong to the selected collection.');
    let file = null;
    if (value.file) {
      if (typeof value.file.name !== 'string' || !/^data:[^,]*;base64,[A-Za-z0-9+/=]*$/.test(value.file.data)) throw new Error('Invalid file in backup.');
      const encoded = value.file.data.slice(value.file.data.indexOf(',') + 1);
      if (encoded.length > 28_000_000) throw new Error('A file exceeds the 20 MB limit.');
      const raw = atob(encoded);
      if (raw.length > 20 * 1024 * 1024) throw new Error('A file exceeds the 20 MB limit.');
      file = new File([Uint8Array.from(raw, (char) => char.charCodeAt(0))], value.file.name, { type: value.file.type || 'application/octet-stream' });
    }
    records.push({ id: typeof value.id === 'string' && value.id.length < 100 ? value.id : crypto.randomUUID(), title: value.title, note: value.note, url: url?.href || '', collection: value.collection, topic: value.topic || '', file, createdAt: value.createdAt || new Date().toISOString() });
  }
  const db = await openDatabase();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction('materials', 'readwrite');
    for (const record of records) transaction.objectStore('materials').put(record);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  return records.length;
}
