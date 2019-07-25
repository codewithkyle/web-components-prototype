const glob = require("glob").Glob;
const fs = require("fs");
const rimraf = require('rimraf');

if (fs.existsSync('./docs/assets/modules'))
{
    rimraf.sync('./docs/assets/modules');
}

fs.mkdir('./docs/assets/modules', (err)=>{
    if (err)
    {
        throw err;
    }

    glob('./_modules/**/*.js', (err, files)=>{
        if (err)
        {
            throw err;
        }
    
        for (let i = 0; i < files.length; i++)
        {
            let serverSafeName = files[i].replace(/^.*[\\\/]/, '').toLowerCase();
            fs.rename(files[i], `./docs/assets/modules/${ serverSafeName }`, (err) => {
                if (err)
                {
                    throw err;
                }
            });
        }
    });
});
