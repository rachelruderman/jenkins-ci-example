pipeline {
  agent {
    // Uses official Cypress docker image for dependencies
    // https://docs.cypress.io/guides/continuous-integration/introduction#Official-Cypress-Docker-Images
    docker {
      image 'cypress/base:latest'
    }
  }
  stages {
    stage('build') {
      steps {
        sh 'npm ci'
        sh 'npx cypress verify'
      }
    }
    stage('start local server') {
      // Starts web server for E2E tests - replace with your own server invocation
      // https://docs.cypress.io/guides/continuous-integration/introduction#Boot-your-server
      steps {
        sh 'npm start &'
        sh 'npx wait-on "http-get://localhost:3000"' // Waits for above
      }
    }
    stage('cypress parallel tests') {
      environment {
        // For recording and parallelization to work you must set your CYPRESS_RECORD_KEY
        // in Manage Jenkins -> Configure System -> Global properties.
        CYPRESS_RECORD_KEY = credentials('CYPRESS_RECORD_KEY')
      }
      // Runs jobs in parallel
      // https://docs.cypress.io/guides/guides/parallelization
      parallel {
        stage('tester A') {
          steps {
            echo "Running build ${env.BUILD_ID}"
            sh "npx cypress run --record --parallel"
          }
        }
        stage('tester B') {
          steps {
            echo "Running build ${env.BUILD_ID}"
            sh "npx cypress run --record --parallel"
          }
        }
      }
    }
  }

  post {
    always {
      echo 'Stopping local server'
      sh 'pkill -f http-server'
    }
  }
}