

export const findFolder = (folders = [], folderId) =>
    folders.find(folder => folder.id === folderId)

export const findNote = (notes = [], noteId) => {
    let result = notes
    console.log('in findNote', noteId)
    if (noteId) {
        result = []
        for (var i = 0; i < notes.length; ++i) {
            let note = notes[i]
            var notesId = note.id
            var parsedNoteId = parseInt(noteId)
            if (note.id == noteId)
                result.push(note)
        }
        //  result = notes.filter(note => note.folderid === folderId)}
    }
    console.log('findNote result', result)
    return result[0]
}

export const getNotesForFolder = (notes = [], folderId) => {

    let result = notes
    console.log('in getNotesForFolder', folderId)
    if (folderId) {
        result = []
        for (var i = 0; i < notes.length; ++i) {
            let note = notes[i]
            var noteFolderId = note.folderid
            var folderid = parseInt(folderId)
            if (note.folderid == folderId)
                result.push(note)
        }
        //  result = notes.filter(note => note.folderid === folderId)}
    }
    return result
}

export const countNotesForFolder = (notes = [], folderId) =>
    notes.filter(note => note.folderid === folderId).length
