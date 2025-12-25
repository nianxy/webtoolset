# GitHub Actions Deployment Configuration

This project provides three GitHub Actions deployment workflows. Choose the appropriate workflow based on your private registry type.

## Workflow Files

### 1. GitHub Container Registry (deploy.yml)
Suitable for using GitHub Container Registry (ghcr.io) as private registry.

### 2. DockerHub (deploy-dockerhub.yml)
Suitable for using DockerHub as private registry.

### 3. Custom Private Registry (deploy-private.yml)
Suitable for using custom private registry (such as Harbor, Alibaba Cloud Container Registry Service, etc.).

## Configuration Steps

### Method 1: Using GitHub Container Registry

1. **Enable GitHub Packages**
   - Go to repository Settings → Actions → General
   - Select "Read and write permissions" in Workflow permissions

2. **Configure Secrets**
   Add the following Secrets in repository Settings → Secrets and variables → Actions:

   | Secret Name | Description | Example |
   |------------|-------------|---------|
   | `SERVER_HOST` | Server IP address or domain | `192.168.1.100` or `example.com` |
   | `SERVER_USER` | Server username | `root` or `ubuntu` |
   | `SERVER_SSH_KEY` | SSH private key | `-----BEGIN RSA PRIVATE KEY-----...` |
   | `SERVER_PORT` | SSH port (optional, default 22) | `22` |

3. **Use Workflow**
   - Rename `deploy.yml` to `deploy.yml` (if needed)
   - Push code to `main` or `master` branch to automatically trigger deployment

### Method 2: Using DockerHub

1. **Configure Secrets**
   Add the following Secrets in repository Settings → Secrets and variables → Actions:

   | Secret Name | Description | Example |
   |------------|-------------|---------|
   | `DOCKERHUB_USERNAME` | DockerHub username | `yourusername` |
   | `DOCKERHUB_TOKEN` | DockerHub access token | `dckr_pat_xxxxx` |
   | `SERVER_HOST` | Server IP address or domain | `192.168.1.100` |
   | `SERVER_USER` | Server username | `root` |
   | `SERVER_SSH_KEY` | SSH private key | `-----BEGIN RSA PRIVATE KEY-----...` |
   | `SERVER_PORT` | SSH port (optional) | `22` |

2. **Get DockerHub Token**
   - Login to DockerHub
   - Account Settings → Security → New Access Token
   - Create a token with Read & Write permissions

3. **Use Workflow**
   - Rename `deploy-dockerhub.yml` to `deploy.yml`
   - Push code to `main` or `master` branch to automatically trigger deployment

### Method 3: Using Custom Private Registry

1. **Configure Secrets**
   Add the following Secrets in repository Settings → Secrets and variables → Actions:

   | Secret Name | Description | Example |
   |------------|-------------|---------|
   | `PRIVATE_REGISTRY_URL` | Private registry URL | `registry.example.com` |
   | `PRIVATE_REGISTRY_USERNAME` | Registry username | `admin` |
   | `PRIVATE_REGISTRY_PASSWORD` | Registry password | `password123` |
   | `PRIVATE_IMAGE_NAME` | Image name | `toolset/toolset-app` |
   | `SERVER_HOST` | Server IP address or domain | `192.168.1.100` |
   | `SERVER_USER` | Server username | `root` |
   | `SERVER_SSH_KEY` | SSH private key | `-----BEGIN RSA PRIVATE KEY-----...` |
   | `SERVER_PORT` | SSH port (optional) | `22` |

2. **Use Workflow**
   - Rename `deploy-private.yml` to `deploy.yml`
   - Push code to `main` or `master` branch to automatically trigger deployment

## Server Preparation

Docker needs to be pre-installed on the target server:

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
```

## Manual Trigger Deployment

In addition to automatic triggering, you can also manually trigger deployment:

1. Go to the Actions page of the GitHub repository
2. Select "Build and Deploy" workflow
3. Click "Run workflow" button
4. Select branch and click "Run workflow"

## Deployment Process

The workflow executes the following steps:

1. **Build Stage**
   - Checkout code
   - Set up Docker Buildx
   - Log in to container registry
   - Build and push Docker image

2. **Deployment Stage**
   - SSH connect to server
   - Log in to container registry
   - Pull latest image
   - Stop and delete old container
   - Start new container
   - Clean up unused images

## Access Application

After deployment, access the application at:

```
http://<SERVER_HOST>:8080
```

## Troubleshooting

### SSH Connection Failed
- Check if `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY` are correct
- Ensure server SSH service is running normally
- Check firewall rules

### Docker Login Failed
- Check if container registry username and password/token are correct
- Confirm token has sufficient permissions

### Image Pull Failed
- Check if image name and tag are correct
- Confirm network connection is normal
- Check private registry access permissions

### Container Startup Failed
- View container logs: `docker logs toolset-app`
- Check if port 8080 is occupied
- Confirm Docker has enough resources

## Custom Configuration

To modify deployment configuration, you can edit the following content in the workflow file:

- **Port Mapping**: Modify port number in `-p 8080:80`
- **Container Name**: Modify `CONTAINER_NAME` variable
- **Image Tag**: Modify `IMAGE_TAG` variable
- **Restart Policy**: Modify `--restart unless-stopped`

## Security Recommendations

1. Use SSH keys instead of password authentication
2. Rotate access tokens regularly
3. Restrict IP addresses for SSH access
4. Use firewall to restrict port access
5. Update Docker and dependencies regularly
