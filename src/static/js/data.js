import { Octokit } from "@octokit/rest";
const { Base64 } = require("js-base64")

const getSite = () => {
    return fetch('https://api.github.com/repos/'+process.env.GIT_DATA+'/git/trees/main?recursive=1')
        .then(r => r.json())
        .then(d => {
            let tree = d.tree.map(item =>{
                return item.path
            }).filter(ite => {
                return ite.includes('md')
            })
            console.log(tree)
            
            

            console.log(tree)
            let result = {};




            tree.forEach((el) => el
                .split('/')
                .reduce((o, k) => o[k] = o[k] || {}, result)
            );
            let a =  {
                'categories': Object.keys(result),
                'tree': result
            }
            
            console.log(a)

            return d
        })
}

async function getSHA(path) {
    const result = await octokit.repos.getContent({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path,
    });
    const sha = result?.data?.sha;
    return sha;
}

const updateFile = async (content, path, name) => {
    const file = path+'/'+name+'.md'
    const sha = await getSHA(file);
    const contentEncoded = Base64.encode(content)
    const { data } = await octokit.repos.createOrUpdateFileContents({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        path: file,
        message: "Updated "+file,
        content: contentEncoded,
        sha
    })
    return data
}

export {getSite, updateFile}