pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')

        IMAGE_BACKEND = "khushieee4/backend:latest"
        IMAGE_FRONTEND = "khushieee4/frontend:latest"

        VITE_FIREBASE_API_KEY = credentials('VITE_FIREBASE_API_KEY')
        VITE_FIREBASE_AUTH_DOMAIN = credentials('VITE_FIREBASE_AUTH_DOMAIN')
        VITE_FIREBASE_PROJECT_ID = credentials('VITE_FIREBASE_PROJECT_ID')
        VITE_FIREBASE_STORAGE_BUCKET = credentials('VITE_FIREBASE_STORAGE_BUCKET')
        VITE_FIREBASE_MESSAGING_SENDER_ID = credentials('VITE_FIREBASE_MESSAGING_SENDER_ID')
        VITE_FIREBASE_APP_ID = credentials('VITE_FIREBASE_APP_ID')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/MayeraaSingh/ToolShare.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build --no-cache -t $IMAGE_BACKEND -f backend/Dockerfile .'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                cd frontend
                docker build --no-cache \
                --build-arg VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY \
                --build-arg VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN \
                --build-arg VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID \
                --build-arg VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET \
                --build-arg VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID \
                --build-arg VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID \
                -t $IMAGE_FRONTEND .
                '''
            }
        }

        stage('Trivy Scan Backend') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL $IMAGE_BACKEND'
            }
        }

        stage('Trivy Scan Frontend') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL $IMAGE_FRONTEND'
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin
                docker push $IMAGE_BACKEND
                docker push $IMAGE_FRONTEND
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f backend-deployment.yaml
                kubectl apply -f frontend-deployment.yaml
                kubectl apply -f service.yaml

                kubectl rollout restart deployment backend-deployment
                kubectl rollout restart deployment frontend-deployment
                '''
            }
        }
    }
}
