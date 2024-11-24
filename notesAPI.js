const LOCAL_STORAGE_KEY = "noticeapp-notice";

const MOCK_NOTES = [
  {
    id: 1,
    title: "Hallo Developers",
    content: "Programming is fun!",
    lastUpdated: 12,
  },
];

localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MOCK_NOTES));

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(title, content) {
  const notes = getNotes();

  notes.push({
    title,
    content,
    id: getNextId(),
    lastUpdated: new Date().getTime(),
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function getNextId() {
  const notes = getNotes();

  const sortedNotes = notes.sort((noteA, noteB) => noteA.id - noteB.id);

  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.id) break;

    nextId = note.id + 1;
  }

  return nextId;
}
