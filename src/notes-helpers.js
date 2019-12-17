export const findFolder = (folders = [], folderId) =>
    folders.find(folder => folder.id === folderId)

export const findNote = (notes = [], noteId) => {
    let note = notes.find(note => note.id === noteId)
    console.log('in findNote function', notes)
    return note
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
