const express = require('express');
const path = require('path');
const multer = require('multer');

const {spawn} = require('child_process');   
const server = express();

const port = 3000;

// serve the static files
server.use('/static', express.static(path.join(__dirname, '/public')));

// defining the storage for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/index.html'));
});

server.get('/get-all', (req, res) => {

    let python_output;

    // spawn a process to run the python script
    const python_script = spawn('python', ['example.py']);

    // collect the data from script
    python_script.stdout.on('data', (data) => {
        python_output = data.toString();
        console.log(data.toString());
    });

    python_script.stderr.on('data', (data) => {
        console.log('python error: ', data.toString());
    });

    // close event to make sure sure the child process is closed
    python_script.on('close', (code) => {
        console.log('Python closed with code: ', code);
        res.send(python_output);
    });
});

const upload = multer({storage: storage});

server.post('/upload-pdf', upload.single('pdf-upload'), (req, res) => {
    if (!req.file) {
        res.send('No file :(');
    }
    res.redirect('/');
});

server.listen(port, () => {
    console.log(`Listening on port:${port}`);
});
