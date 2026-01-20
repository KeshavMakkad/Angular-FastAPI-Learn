# FastAPI CI/CD Pipeline with GitHub Actions and Kubernetes

This repository contains a FastAPI backend application with a complete CI/CD pipeline implemented using GitHub Actions, Docker, and Kubernetes (k3s) running on AWS EC2.  
The project demonstrates automated testing, security scanning, containerization, and Kubernetes-based continuous deployment following DevSecOps best practices.

## Repository URL
https://github.com/KeshavMakkad/Angular-FastAPI-Learn

## Tech Stack
- Backend: FastAPI
- CI/CD: GitHub Actions
- Containerization: Docker
- Orchestration: Kubernetes (k3s)
- Cloud: AWS EC2
- Testing: Pytest
- Security: CodeQL, pip-audit, Trivy

## Local Setup

### Clone Repository
```bash
git clone https://github.com/KeshavMakkad/Angular-FastAPI-Learn.git
cd Angular-FastAPI-Learn/server
```

### Create Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
```

### Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Run Application
```bash
uvicorn main:app --reload
```

Application runs at:
http://127.0.0.1:8000

### Run Unit Tests
```bash
pytest
```

## Docker
### Build Image
```bash
docker build -t fastapi-backend .
```

### Run Container
```bash
docker run -p 8000:8000 fastapi-backend
```

### GitHub Secrets Configuration

The CI/CD pipeline requires the following GitHub Secrets:

- DOCKER_HUB_USERNAME	DockerHub username
- DOCKER_HUB_TOKEN	DockerHub access token
- KUBE_CONFIG	Base64-encoded Kubernetes kubeconfig
- Generate KUBE_CONFIG

### On the EC2 instance:
```bash
sudo cat /etc/rancher/k3s/k3s.yaml
```

### Encode locally:
```bash
base64 k3s.yaml
```

Paste the encoded output into the KUBE_CONFIG secret.

## CI Pipeline Overview

- Checkout source code
- Setup Python runtime
- Install dependencies
- Run unit tests
- Static code analysis using CodeQL
- Dependency vulnerability scan using pip-audit
- Docker image build
- Container vulnerability scan using Trivy
- Push trusted image to DockerHub

## CD Pipeline Overview

- Executes only after CI succeeds
- Authenticates to Kubernetes using kubeconfig
- Deletes existing pod to trigger redeployment
- Kubernetes pulls latest Docker image
- Deployment validated via pod and service checks

## Kubernetes Access

After deployment, the application is accessible via NodePort:
```bash
http://<EC2_PUBLIC_IP>:<NODE_PORT>
```

## Notes

- CI enforces security and quality gates before deployment
- CD uses Kubernetes self-healing for automated deployment
