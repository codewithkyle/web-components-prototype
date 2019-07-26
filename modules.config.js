const glob = require("glob").Glob;
const fs = require("fs");
const rimraf = require('rimraf');
const rollup = require('rollup');
const rollupPluginCommonjs = require('rollup-plugin-commonjs');

async function run()
{
    try
    {
        await removeModules();
        await createModulesDirectory();
        const modules = await getWebModules();
        await writeModules(modules);
    }
    catch (err)
    {
        throw err;
    }
}

function writeModules(modules)
{
    for (let i = 0; i < modules.length; i++)
    {
        fs.readFile(modules[i], (err, data)=>{
            if (err)
            {
                console.log(err);
            }

            let fileData = data.toString();

            let globalVariableName = fileData.match(/(?<=var\s).*?(?=\=[\s]\(function)/)[0].trim();

            let newData = '(function(){\n';
            newData += fileData;
            newData += `\nwindow.${ globalVariableName } = new ${ globalVariableName }();\n`;
            newData += '})();\n';

            let serverSafeName = modules[i].replace(/^.*[\\\/]/, '').toLowerCase();
            // let importName = serverSafeName.replace(/\.js/, '');
            // let exportName = data.toString().match(/(?<=exports\.).*\=/)[0].replace(/(\=.*)/, '').trim();

            // let newData = `import { ${ exportName } } from '${ importName }'\n`;
            // newData += `\nwindow.${ importName } = ${ exportName };`;

            fs.writeFile(`./docs/assets/modules/${ serverSafeName }`, newData, (err)=>{
                if(err)
                {
                    console.log(err);
                }
            });
        });
    }
}

function createModulesDirectory()
{
    return new Promise((resolve, reject)=>{
        fs.mkdir('./docs/assets/modules', (err)=>{
            if (err)
            {
                reject(err);
            }

            resolve();
        });
    });
}

function getWebModules()
{
    return new Promise((resolve, reject)=>{
        glob('./_modules/**/*.js', (err, files)=>{
            if (err)
            {
                reject(err);
            }

            resolve(files);
        });
    });
}

function removeModules()
{
    return new Promise((resolve, reject)=>{
        if(fs.existsSync('./docs/assets/modules'))
        {
            rimraf('./docs/assets/modules', (error)=>{
                if(error)
                {
                    reject(error);
                }

                resolve();
            });
        }
        else
        {
            resolve();
        }
    });
}

run();