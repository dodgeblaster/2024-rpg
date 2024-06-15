export default {
    name: 'rpg-pipeline',
    stages: [
        {
            name: 'Source',
            actions: [
                {
                    type: 'SOURCE',
                    name: 'GithubRepo',
                    repo: '2024-rpg',
                    owner: 'dodgeblaster',
                    outputArtifact: 'sourceZip'
                }
            ]
        },
        {
            name: 'Prod',
            actions: [
                
                {
                    type: 'BUILD',
                    name: 'DeployGame',
                   env: {
                        AWS_KEY: '@ssm.PIPELINE_AWS_KEY',
                        AWS_SECRET: '@ssm.PIPELINE_AWS_SECRET'
                    },
                    script: [
                        'cd ./app',
                        'AWS_ACCESS_KEY_ID=${AWS_KEY} AWS_SECRET_ACCESS_KEY=${AWS_SECRET} node ../rise-front.js deploy'
                    ]
 
                }
            ]
        }
    ]
}
