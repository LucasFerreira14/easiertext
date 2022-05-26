var fs = require('fs');

const post = {
    "title": this.title,
    "text": this.text
};

const data = JSON.stringify(post);

fs.writeFile('./public/database.json', data, (err => {
    if (err) {
        throw err;
    }

    console.log("JSON data is saved.")
}))