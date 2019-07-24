const fs = require('fs');
const glob = require("glob").Glob;
const rollup = require('rollup');
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve');
const rollupPluginCommonjs = require('rollup-plugin-commonjs');
const rimraf = require('rimraf');

const package = require('./package.json');

function run()
{
    (async ()=>{
        try
        {
            await removeBundles();
            await removePackages();
            await makeBundleDirectory();
            await makePackageDirectory();
            const dependencies = await getWebDependencies();
            const serverSafeBundleNames = await writeBundles(dependencies);
            await buildPackages(serverSafeBundleNames);
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

function getWebDependencies()
{
    return new Promise((resolve, reject)=>{
        if(package.webDependencies.length)
        {
            resolve(package.webDependencies);
        }
        else
        {
            reject('Nothing to bundle, check your package.json webDependencies array');
        }
    });
}

function writeBundles(dependencies)
{
    return new Promise((resolve, reject)=>{
        
        const writtenBundles = [];
        
        for (let i = 0; i < dependencies.length; i++)
        {
            let serverSafeName = dependencies[i].package.toLowerCase();
            serverSafeName = serverSafeName.replace(/[\/]/g, '-');
            serverSafeName = serverSafeName.replace(/\@/g, '');

            /**
             * Example:
             * fullPackageName = @codewithkyle/demo-package
             * namespace = codewithkyle
             * package = demo-package
             * filename = codewithkyle-demo-package
             */
            let fullPackageName = dependencies[i].package.toLowerCase();
            let namespace = (fullPackageName.match(/.*[\/]/)) ? fullPackageName.match(/.*[\/]/)[0].replace(/[\/\@]/g, '') : '';
            let package = fullPackageName.replace(/(.*?\/)/, '');

            /** Write pre-bundled bundle file */
            let data = `import ${ dependencies[i].import } from '${ fullPackageName }'\n`;
            if(dependencies[i].import.match(/(\*\sas)/))
            {
                let importName = dependencies[i].import;
                importName = importName.replace(/([\*]\sas\s)/, '');
                importName = importName.trim();
                data += `\nwindow.${ importName } = ${ importName }.default;`;
            }
            else
            {
                let importName = dependencies[i].import;
                importName = importName.replace(/[\{\}]/g, '');
                importName = importName.trim();
                data += `\nwindow.${ importName } = ${ importName };`;
            }
            
            fs.writeFile(`./_bundles/${ serverSafeName }.js`, data, (err)=>{
                if(err)
                {
                    console.log(err);
                }

                writtenBundles.push(serverSafeName);

                if(writtenBundles.length === dependencies.length)
                {
                    resolve(writtenBundles);
                }
            });
        }
    });
}

function buildPackages(serverSafeBundleNames)
{
    for (let i = 0; i < serverSafeBundleNames.length; i++)
    {
        const inputOptions = {
            input: `./_bundles/${ serverSafeBundleNames[i] }.js`,
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
            file: `./docs/assets/packages/${ serverSafeBundleNames[i] }.js`,
            format: 'iife'
        };
        build(inputOptions, outputOptions);
    }
    // for (let i = 0; i < dependencies.length; i++)
    // {
    //     // const requireStatements = data.toString().match(/(require.*?\;)/g);
    //     const requireStatements = data.toString().match(/((import[\s\t]).*?\;)/g);
            
    //     if(requireStatements)
    //     {
    //         for (let k = 0; k < requireStatements.length; k++)
    //         {
    //             /**
    //              * Example:
    //              * fullPackageName = @codewithkyle/demo-package
    //              * namespace = codewithkyle
    //              * package = demo-package
    //              * filename = codewithkyle-demo-package
    //              */
    //             let fullPackageName = requireStatements[k].match(/(?<=[\"\'])(.*?)(?=[\"\'])/)[0];
    //             let namespace = (fullPackageName.match(/.*[\/]/)) ? fullPackageName.match(/.*[\/]/)[0].replace(/[\/\@]/g, '') : '';
    //             let package = fullPackageName.replace(/(.*?\/)/, '');
    //             let filename  = `${ (namespace !== '') ? namespace + '-' : '' }${ package }`;

    //             let importName = requireStatements[k].match(/(?<=import).*(?=from)/)[0];
    //             importName = importName.replace(/(\*\sas)/, '');
    //             importName = importName.replace(/[\{\}]/g, '');
    //             importName = importName.replace(/[\s\t]/g, '');

    //             fullPackageName = fullPackageName.toLowerCase();
    //             namespace = namespace.toLowerCase();
    //             package = package.toLowerCase();
    //             filename = filename.toLowerCase();

    //             /** File contents for the pre-bundled bundles */
    //             let data = requireStatements[k];

    //             /** Will be imported as an object */
    //             if(requireStatements[k].match(/(\*\sas)/))
    //             {
    //                 data += `\nwindow.${ importName } = ${ importName }.default;`;
    //             }
    //             else
    //             {
    //                 /** Bundled as a function */
    //                 data += `\nwindow.${ importName } = ${ importName };`;
    //             }

    //             fs.writeFile(`./_bundles/${ filename }.js`, data, (err)=>{
    //                 if(err)
    //                 {
    //                     console.log(err);
    //                     return;
    //                 }

    //                 const inputOptions = {
    //                     input: `./_bundles/${ filename }.js`,
    //                     plugins: [
    //                         rollupPluginNodeResolve({
    //                             mainFields: ['browser', 'module', 'jsnext:main'],
    //                             extensions: [ '.mjs', '.js', '.json'],
    //                             browser: true
    //                         }),
    //                         rollupPluginCommonjs({
    //                             include: /node_modules/,
    //                             extensions: ['.cjs', '.js']
    //                         })
    //                     ]
    //                 };
    //                 const outputOptions = {
    //                     file: `./docs/assets/packages/${ filename }.js`,
    //                     format: 'iife'
    //                 };
    //                 build(inputOptions, outputOptions);
    //             });
    //         }

    //         let cleanData = data.toString();
    //         cleanData = cleanData.replace(/((import[\s\t]).*?\;)/g, '');

    //         fs.writeFile(dependencies[i], cleanData, (err)=>{
    //             if(err)
    //             {
    //                 throw err;
    //             }
    //         });
    //     }
    // }
}

async function build(inputOptions, outputOptions)
{
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
}

run();