pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')

        IMAGE_BACKEND = "mishhkaaa/toolshare-backend:latest"
        IMAGE_FRONTEND = "mishhkaaa/toolshare-frontend:latest"

        FB_API_KEY = credentials('fb_api_key')
        FB_AUTH_DOMAIN = credentials('fb_auth_domain')
        FB_PROJECT_ID = credentials('fb_project_id')
        FB_STORAGE_BUCKET = credentials('fb_storage_bucket')
        FB_MSG_ID = credentials('fb_msg_id')
        FB_APP_ID = credentials('fb_app_id')
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
                sh 'docker build --no-cache -t $IMAGE_BACKEND -f backend/Dockerfile .'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                cd frontend
                docker build --no-cache \
                --build-arg VITE_FIREBASE_API_KEY=$FB_API_KEY \
                --build-arg VITE_FIREBASE_AUTH_DOMAIN=$FB_AUTH_DOMAIN \
                --build-arg VITE_FIREBASE_PROJECT_ID=$FB_PROJECT_ID \
                --build-arg VITE_FIREBASE_STORAGE_BUCKET=$FB_STORAGE_BUCKET \
                --build-arg VITE_FIREBASE_MESSAGING_SENDER_ID=$FB_MSG_ID \
                --build-arg VITE_FIREBASE_APP_ID=$FB_APP_ID \
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
