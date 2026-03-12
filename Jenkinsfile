pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        IMAGE_BACKEND = "mishkaaaa/backend:latest"
        IMAGE_FRONTEND = "mishkaaaa/frontend:latest"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                credentialsId: 'github-creds',
                url: 'https://github.com/MayeraaSingh/ToolShare.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $IMAGE_BACKEND ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $IMAGE_FRONTEND ./frontend'
            }
        }

        stage('Trivy Scan Backend') {
            steps {
                sh 'trivy image $IMAGE_BACKEND'
            }
        }

        stage('Trivy Scan Frontend') {
            steps {
                sh 'trivy image $IMAGE_FRONTEND'
            }
        }

        stage('Push Images') {
            steps {
                sh 'echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin'
                sh 'docker push $IMAGE_BACKEND'
                sh 'docker push $IMAGE_FRONTEND'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f backend-deployment.yaml'
                sh 'kubectl apply -f frontend-deployment.yaml'
                sh 'kubectl apply -f service.yaml'
            }
        }
    }
}