# GitHub Actions 部署配置

本项目提供了三种 GitHub Actions 部署工作流，根据您的私有仓库类型选择合适的工作流。

## 工作流文件

### 1. GitHub Container Registry (deploy.yml)
适用于使用 GitHub Container Registry (ghcr.io) 作为私有仓库。

### 2. DockerHub (deploy-dockerhub.yml)
适用于使用 DockerHub 作为私有仓库。

### 3. 自定义私有仓库 (deploy-private.yml)
适用于使用自定义私有仓库（如 Harbor、阿里云容器镜像服务等）。

## 配置步骤

### 方式一：使用 GitHub Container Registry

1. **启用 GitHub Packages**
   - 进入仓库 Settings → Actions → General
   - 在 Workflow permissions 中选择 "Read and write permissions"

2. **配置 Secrets**
   在仓库 Settings → Secrets and variables → Actions 中添加以下 Secrets：

   | Secret 名称 | 说明 | 示例 |
   |------------|------|------|
   | `SERVER_HOST` | 服务器 IP 地址或域名 | `192.168.1.100` 或 `example.com` |
   | `SERVER_USER` | 服务器用户名 | `root` 或 `ubuntu` |
   | `SERVER_SSH_KEY` | SSH 私钥 | `-----BEGIN RSA PRIVATE KEY-----...` |
   | `SERVER_PORT` | SSH 端口（可选，默认 22） | `22` |

3. **使用工作流**
   - 将 `deploy.yml` 重命名为 `deploy.yml`（如果需要）
   - 推送代码到 `main` 或 `master` 分支即可自动触发部署

### 方式二：使用 DockerHub

1. **配置 Secrets**
   在仓库 Settings → Secrets and variables → Actions 中添加以下 Secrets：

   | Secret 名称 | 说明 | 示例 |
   |------------|------|------|
   | `DOCKERHUB_USERNAME` | DockerHub 用户名 | `yourusername` |
   | `DOCKERHUB_TOKEN` | DockerHub 访问令牌 | `dckr_pat_xxxxx` |
   | `SERVER_HOST` | 服务器 IP 地址或域名 | `192.168.1.100` |
   | `SERVER_USER` | 服务器用户名 | `root` |
   | `SERVER_SSH_KEY` | SSH 私钥 | `-----BEGIN RSA PRIVATE KEY-----...` |
   | `SERVER_PORT` | SSH 端口（可选） | `22` |

2. **获取 DockerHub Token**
   - 登录 DockerHub
   - Account Settings → Security → New Access Token
   - 创建一个具有 Read & Write 权限的 token

3. **使用工作流**
   - 将 `deploy-dockerhub.yml` 重命名为 `deploy.yml`
   - 推送代码到 `main` 或 `master` 分支即可自动触发部署

### 方式三：使用自定义私有仓库

1. **配置 Secrets**
   在仓库 Settings → Secrets and variables → Actions 中添加以下 Secrets：

   | Secret 名称 | 说明 | 示例 |
   |------------|------|------|
   | `PRIVATE_REGISTRY_URL` | 私有仓库地址 | `registry.example.com` |
   | `PRIVATE_REGISTRY_USERNAME` | 仓库用户名 | `admin` |
   | `PRIVATE_REGISTRY_PASSWORD` | 仓库密码 | `password123` |
   | `PRIVATE_IMAGE_NAME` | 镜像名称 | `toolset/toolset-app` |
   | `SERVER_HOST` | 服务器 IP 地址或域名 | `192.168.1.100` |
   | `SERVER_USER` | 服务器用户名 | `root` |
   | `SERVER_SSH_KEY` | SSH 私钥 | `-----BEGIN RSA PRIVATE KEY-----...` |
   | `SERVER_PORT` | SSH 端口（可选） | `22` |

2. **使用工作流**
   - 将 `deploy-private.yml` 重命名为 `deploy.yml`
   - 推送代码到 `main` 或 `master` 分支即可自动触发部署

## 服务器准备

在目标服务器上需要预先安装 Docker：

```bash
# 安装 Docker
curl -fsSL https://get.docker.com | sh

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装
docker --version
```

## 手动触发部署

除了自动触发，您也可以手动触发部署：

1. 进入 GitHub 仓库的 Actions 页面
2. 选择 "Build and Deploy" 工作流
3. 点击 "Run workflow" 按钮
4. 选择分支并点击 "Run workflow"

## 部署流程

工作流执行以下步骤：

1. **构建阶段**
   - 检出代码
   - 设置 Docker Buildx
   - 登录到容器仓库
   - 构建并推送 Docker 镜像

2. **部署阶段**
   - SSH 连接到服务器
   - 登录到容器仓库
   - 拉取最新镜像
   - 停止并删除旧容器
   - 启动新容器
   - 清理未使用的镜像

## 访问应用

部署完成后，通过以下地址访问应用：

```
http://<SERVER_HOST>:8080
```

## 故障排查

### SSH 连接失败
- 检查 `SERVER_HOST`、`SERVER_USER`、`SERVER_SSH_KEY` 是否正确
- 确保服务器 SSH 服务正常运行
- 检查防火墙规则

### Docker 登录失败
- 检查容器仓库的用户名和密码/令牌是否正确
- 确认令牌具有足够的权限

### 镜像拉取失败
- 检查镜像名称和标签是否正确
- 确认网络连接正常
- 检查私有仓库访问权限

### 容器启动失败
- 查看容器日志：`docker logs toolset-app`
- 检查端口 8080 是否被占用
- 确认 Docker 有足够的资源

## 自定义配置

如需修改部署配置，可以编辑工作流文件中的以下内容：

- **端口映射**: 修改 `-p 8080:80` 中的端口号
- **容器名称**: 修改 `CONTAINER_NAME` 变量
- **镜像标签**: 修改 `IMAGE_TAG` 变量
- **重启策略**: 修改 `--restart unless-stopped`

## 安全建议

1. 使用 SSH 密钥而非密码认证
2. 定期轮换访问令牌
3. 限制 SSH 访问的 IP 地址
4. 使用防火墙限制端口访问
5. 定期更新 Docker 和依赖包
