const notesListEl = document.querySelector(".notes-list");
const saveButtonEl = document.querySelector(".speichern-note");
const titleInputEl = document.getElementById("title-input");
const contentInputEl = document.getElementById("content-input");

saveButtonEl.addEventListener("click", clickSaveButton);

displayNotesList();
applyListeners();

function applyListeners() {
  const noteEntriesEls = document.querySelectorAll(".note-entry");

  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.addEventListener("click", () =>
      selectNote(noteEntry.getAttribute("data-id"))
    );
  });
}

function displayNotesList() {
  const notes = getNotes();

  const sortedNotes = notes.sort(
    (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated
  );

  let html = "";

  sortedNotes.forEach((note) => {
    html += `
  <div class="note-entry" data-id="${note.id}">
    <div class="note-title">${note.title}</div>
    <div class="note-content-teaser">
      ${note.content}
      </div>
      <div class="note-date">${new Date(note.lastUpdated).toLocaleString(
        "en-us"
      )}</div>
  </div> 
  `;
  });

  notesListEl.innerHTML = html;
}
function clickSaveButton() {
  const title = titleInputEl.value;
  const content = contentInputEl.value;

  if (!title || !content) {
    alert("Please enter a title and heading.");
    return;
  }
  saveNote(title, content);

  titleInputEl.value = "";
  contentInputEl.value = "";

  displayNotesList();
  applyListeners();
}

function selectNote(id) {
  const selectedNoteEl = document.querySelector(`.note-entry[data-id="${id}"]`);

  if (selectedNoteEl.classList.contains("selected-note")) return;

  const noteEntriesEls = document.querySelectorAll(".note-entry");
  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.classList.remove("selected-note");
  });

  selectedNoteEl.classList.add("selected-note");

  const notes = getNote();

  const selectedNote = notes.find((note) => note.id === Number(id));

  if (!selectedNote) return;

  titleInputEl.value = selectedNote.title;
  contentInputEl.value = selectedNote.content;
}
