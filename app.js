import express from 'express';

// Initialize Express app and define port
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory notes storage with sample data
let notes = [
    { id: 1, text: 'Learn NodeJS' },
    { id: 2, text: 'Learn Express'},
    { id: 3, text: 'Learn MongoDB'},
    { id: 4, text: 'Learn Mongoose'}
]

// root route
app.get('/', (req, res) => {
    res.send('Welcome to the Notes API!')
})

//List Notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

//get a note by id
app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find((n) => n.id === id);

    if(!note){
        return res.status(404).json({error: 'Note not found'});
    }

    res.json(note);
})
// Add a note - validates text field and returns 201 on success
app.post('/api/notes', (req,res) => {
    // Validate that text field is provided
    if(!req.body.text){
        return res.status(400).json({error: 'Text is required'});
    }

    const newNote = {
        id: Date.now(), // Generate a unique id
        text: req.body.text
    };

    notes.push(newNote);
    res.status(201).json(newNote);
});

// Delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id); // req.params.id represents a dynamic value from the URL
    notes = notes.filter((note) => note.id !== id);
    res.json({message: 'Note deleted successfully'});
});

// Start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

