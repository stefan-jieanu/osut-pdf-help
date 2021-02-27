const express = require('express');
const {spawn} = require('child_process');   
const server = express();

const port = 3000;

server.get('/', (req, res) => {
    let python_output;

    // spawn a process to run the python script
    const python_script = spawn('python', ['example.py']);

    // collect the data from script
    python_script.stdout.on('data', (data) => {
        python_output = data.toString();
        console.log('running script');
    });

    // close event to make sure sure the child process is closed
    python_script.on('close', (code) => {
        console.log('Python closed with code: ', code);
        console.log(python_output);
    });

    // send the python output to the browser
    res.send(python_output);
});

server.listen(port, () => {
    console.log(`Listening on port:${port}`);
});
