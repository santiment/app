podTemplate(label: 'app-builder', containers: [
  containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat', envVars: [
    envVar(key: 'DOCKER_HOST', value: 'tcp://docker-host-docker-host:2375')
  ])
]) {
  node('app-builder') {
    stage('Run Tests') {
      container('docker') {
        def scmVars = checkout scm
        def gitHead = scmVars.GIT_COMMIT.substring(0,7)

        sh "docker build -t app-frontend-test:${scmVars.GIT_COMMIT}-${env.BUILD_ID}-${env.CHANGE_ID} -f Dockerfile-test ."
        try {
          sh "docker run --rm -t app-frontend-test:${scmVars.GIT_COMMIT}-${env.BUILD_ID}-${env.CHANGE_ID} yarn test --ci"
        } finally {
        }

        if (env.BRANCH_NAME == "production") {
          withCredentials([
            string(
              credentialsId: 'SECRET_KEY_BASE',
              variable: 'SECRET_KEY_BASE'
            ),
            string(
              credentialsId: 'aws_account_id',
              variable: 'aws_account_id'
            )
          ]) {
            def awsRegistry = "${env.aws_account_id}.dkr.ecr.eu-central-1.amazonaws.com"
            docker.withRegistry("https://${awsRegistry}", "ecr:eu-central-1:ecr-credentials") {
              sh "docker build -t ${awsRegistry}/app:${env.BRANCH_NAME}-build -t ${awsRegistry}/app:${scmVars.GIT_COMMIT} --build-arg SECRET_KEY_BASE=${env.SECRET_KEY_BASE} --build-arg GIT_HEAD=${gitHead} ."
              sh "docker push ${awsRegistry}/app:${env.BRANCH_NAME}-build"
              sh "docker push ${awsRegistry}/app:${scmVars.GIT_COMMIT}"
            }
          }
        }
      }
    }
  }
}
