const fs = require('fs');
const glob = require("glob").Glob;
const rollup = require('rollup');

glob('./docs/assets/es6/*.js', (err, files)=>{
    if(err)
    {
        throw err;
    }
    getRequiredPackages(files);
});

function getRequiredPackages(files)
{
    for (let i = 0; i < files.length; i++)
    {
        fs.readFile(files[i], (err, data)=>{
            if(err)
            {
                console.log(err);
                return;
            }

            const requireStatements = data.toString().match(/(require.*?\;)/g);
            
            if(requireStatements)
            {
                fs.mkdir('./bundles', (err)=>{
                    if(err)
                    {
                        throw err;
                    }

                    for (let k = 0; k < requireStatements.length; k++)
                    {
                        let packageName = requireStatements[k].match(/(?<=\")(.*?)(?=\")/)[0];
                        packageName.replace(/\@.*?\//, '');

                        const data = requireStatements[i];

                        fs.writeFile(`./bundles/${ packageName }.js`, data, (err)=>{
                            if(eff)
                            {
                                throw err;
                            }
                        });
                        const rollupOptions = {
                            input: './bundles/${ packageName }.js'
                        };
                        build(rollupOptions);
                    }
                });
            }
        });
    }
}

async function build(rollupOptions)
{
    const bundle = await rollup.rollup(rollupOptions);
    console.log(bundle);
}
