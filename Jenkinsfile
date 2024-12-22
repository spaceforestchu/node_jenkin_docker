pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Matches the name configured in Jenkins
    }

    environment {
        DOCKER_IMAGE = 'mightyhamsterlord/simple_server:latest' // Replace with your Docker Hub details
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Debug Docker') {
            steps {
                sh 'echo $PATH'
                sh 'which docker'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Make sure to set the correct path for your Dockerfile if it's not in the root of your project
                    sh 'docker buildx build --platform linux/amd64 -t mightyhamsterlord/simple_server:latest .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                    echo $DOCKER_PASSWORD | docker login -u mightyhamsterlord --password-stdin
                    docker push ${DOCKER_IMAGE}
                    '''
                }
            }
        }
    }
}
