pipeline {
  agent any
  environment {
    IMAGE = "ohhdude14/hw1-website"
    TAG = "${BUILD_NUMBER}"
  }
  stages {
    stage('Build') {
      steps { sh 'docker build --platform linux/amd64 -t $IMAGE:$TAG .' }
    }
    stage('Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
            usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          sh 'echo $DH_PASS | docker login -u $DH_USER --password-stdin'
          sh 'docker push $IMAGE:$TAG'
        }
      }
    }
    stage('Deploy') {
      steps {
        sh 'aws eks update-kubeconfig --name hw1-cluster --region us-east-1'
        sh 'kubectl set image deployment/hw1-website web=$IMAGE:$TAG'
        sh 'kubectl rollout status deployment/hw1-website'
      }
    }
  }
}
