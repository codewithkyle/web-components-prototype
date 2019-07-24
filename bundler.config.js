const fs = require('fs');
const glob = require("glob").Glob;
const rollup = require('rollup');
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve');
const rollupPluginCommonjs = require('rollup-plugin-commonjs');
const rimraf = require('rimraf');

function run()
{
    (async ()=>{
        try
        {
            await removeBundles();
            await removePackages();
            await makeBundleDirectory();
            await makePackageDirectory();
            const files = await getFiles();
            await buildPackages(files);
        }
        catch(error)
        {
            throw error;
        }
    })();
}

function removeBundles()
{
    return new Promise((resolve, reject)=>{
        if(fs.existsSync('./_bundles'))
        {
            rimraf('./_bundles', (error)=>{
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

function removePackages()
{
    return new Promise((resolve, reject)=>{
        if(fs.existsSync('./docs/assets/packages'))
        {
            rimraf('./docs/assets/packages', (error)=>{
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

function makeBundleDirectory()
{
    return new Promise((resolve, reject)=>{
        fs.mkdir('./_bundles', (err)=>{
            if(err)
            {
                reject(err);
            }
    
            resolve();
        });
    });
}

function makePackageDirectory()
{
    return new Promise((resolve, reject)=>{
        fs.mkdir('./docs/assets/packages', (err)=>{
            if(err)
            {
                reject(err);
            }
    
            resolve();
        });
    });
}

function getFiles()
{
    return new Promise((resolve, reject)=>{
        glob('./docs/assets/es6/*.js', (err, files)=>{
            if(err)
            {
                reject(err);
            }
        
            resolve(files);
        });
    });
}

function buildPackages(files)
{
    for (let i = 0; i < files.length; i++)
    {
        fs.readFile(files[i], (err, data)=>{
            if(err)
            {
                console.log(err);
                return;
            }

            // const requireStatements = data.toString().match(/(require.*?\;)/g);
            const requireStatements = data.toString().match(/((import[\s\t]).*?\;)/g);
            
            if(requireStatements)
            {
                for (let k = 0; k < requireStatements.length; k++)
                    {
                        /**
                         * Example:
                         * fullPackageName = @codewithkyle/demo-package
                         * namespace = codewithkyle
                         * package = demo-package
                         * filename = codewithkyle-demo-package
                         */
                        let fullPackageName = requireStatements[k].match(/(?<=[\"\'])(.*?)(?=[\"\'])/)[0];
                        let namespace = (fullPackageName.match(/.*[\/]/)) ? fullPackageName.match(/.*[\/]/)[0].replace(/[\/\@]/g, '') : '';
                        let package = fullPackageName.replace(/(.*?\/)/, '');
                        let filename  = `${ (namespace !== '') ? namespace + '-' : '' }${ package }`;

                        let importName = requireStatements[k].match(/(?<=import).*(?=from)/)[0];
                        importName = importName.replace(/(\*\sas)/, '');
                        importName = importName.replace(/[\{\}]/g, '');
                        importName = importName.replace(/[\s\t]/g, '');

                        fullPackageName = fullPackageName.toLowerCase();
                        namespace = namespace.toLowerCase();
                        package = package.toLowerCase();
                        filename = filename.toLowerCase();

                        /** File contents for the pre-bundled bundles */
                        let data = requireStatements[k];
                        data += `\nwindow.${ importName } = ${ importName };`;

                        fs.writeFile(`./_bundles/${ filename }.js`, data, (err)=>{
                            if(err)
                            {
                                console.log(err);
                                return;
                            }

                            const inputOptions = {
                                input: `./_bundles/${ filename }.js`,
                                plugins: [
                                    rollupPluginNodeResolve({
                                        mainFields: ['browser', 'module', 'jsnext:main'],
                                        extensions: [ '.mjs', '.js', '.json'],
                                        browser: true
                                    }),
                                    rollupPluginCommonjs({
                                        include: /node_modules/,
                                        extensions: ['.cjs', '.js']
                                    })
                                ]
                            };
                            const outputOptions = {
                                file: `./docs/assets/packages/${ filename }.js`,
                                format: 'iife'
                            };
                            build(inputOptions, outputOptions);
                        });
                    }
            }
        });
    }
}

async function build(inputOptions, outputOptions)
{
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
}

run();