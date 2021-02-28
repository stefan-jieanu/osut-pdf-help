const express = require('express');
const path = require('path');
const multer = require('multer');
const pdf2txt = require('pdf-to-text');


let FileObjects = [];


const {spawn} = require('child_process');   
const { json } = require('express');
const server = express();

const port = 3000;

// serve the static files
server.use('/static', express.static(path.join(__dirname, '/public')));

// defining the storage for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/original');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/index.html'));
});

server.get('/get-all', (req, res) => {
    /*let python_output;

    // spawn a process to run the python script
    const python_script = spawn('python');

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

        let output = {
            files: []
        }
        
        let f_out = python_output.split('#');
        f_out.forEach(element => {
            output.files.push(element);
        });

        res.send(output);
    });*/
});

server.post('/get/:keywords', (req, res) => {

    let py_in = {
        nume: [],
        cuvinte_cheie: req.params['keywords']
    };

    for (let i = 0; i < FileObjects.length; i++) {
        if (FileObjects[i].text.includes(py_in.cuvinte_cheie))
        {
            py_in.nume.push(FileObjects[i].nume);
        }
    }
    
    let output = {
        file_links: [],
        file_names: []
    }

    for (let i = 0; i < py_in.nume.length; i++) 
    {
        output.file_names.push(py_in.nume[i]);
        output.file_links.push('http://25.64.181.255:3000/static/uploads/hightlighted/' + py_in.nume[i]);
    }
    
    // spawn a process to run the python script
    const python_script = spawn('python', ['highlight.py', JSON.stringify(py_in)]);

    python_script.stderr.on('data', (data) => {
        console.log('python error: ', data.toString());
    });

    // close event to make sure sure the child process is closed
    python_script.on('close', (code) => {
        console.log('Python closed with code: ', code);

        res.send(output); 
    });
});

const upload = multer({storage: storage});

server.post('/upload-pdf', upload.array('pdf-upload', 12), (req, res) => {
    
    // pdf2txt.pdfToText('E:/spacehack/osut-pdf-help/public/uploads/' + req.file.originalname, (err, data) => {
    //     if (err) console.log(err);
        
    //     console.log(FileObjects);
    //     FileObjects.push({title: req.file.originalname, text: data});
    // });

    for (let i = 0; i < req.files.length; i++) {
        pdf2txt.pdfToText('E:/spacehack/osut-pdf-help/public/uploads/original/' + req.files[i].originalname, (err, data) => {
            if (err) console.log(err);
            
            FileObjects.push({nume: req.files[i].originalname, text: data});
        });
    }

    if (!req.files) {
        res.send('No files :(');
    }
    res.redirect('/');
});

server.listen(port, () => {
    console.log(`Listening on port:${port}`);
});
