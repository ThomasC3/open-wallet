# Deployment Guide

This guide covers deploying Open Wallet to various environments.

## Quick Deploy Options

### Option 1: Docker Compose (Recommended for Development)

```bash
# Clone the repository
git clone https://github.com/ThomasC3/open-wallet.git
cd open-wallet

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Start with Docker Compose
docker-compose up -d

# Check logs
docker-compose logs -f api

# API available at http://localhost:3000
```

### Option 2: Node.js Direct

```bash
# Prerequisites: Node.js 18+, MongoDB/PostgreSQL running

# Clone and install
git clone https://github.com/ThomasC3/open-wallet.git
cd open-wallet
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run migrations (if using PostgreSQL)
npm run migrate

# Start server
npm start

# Or development mode with auto-reload
npm run dev
```

### Option 3: Cloud Platforms

#### Deploy to Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Create app
heroku create your-wallet-api

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set TOKENIZATION_API_KEY=your_key
heroku config:set JWT_SECRET=your_secret
heroku config:set ENCRYPTION_KEY=your_key

# Deploy
git push heroku main

# Open app
heroku open
```

#### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Create project
railway init

# Link database
railway add mongodb

# Set environment variables
railway variables set TOKENIZATION_API_KEY=your_key

# Deploy
railway up
```

#### Deploy to Render

1. Connect GitHub repository to Render
2. Create new Web Service
3. Configure environment variables
4. Deploy automatically on push

## Production Deployment

### Prerequisites

- **Server**: 2+ vCPU, 4GB+ RAM
- **Database**: MongoDB 6.0+ or PostgreSQL 14+
- **Redis**: Optional, for caching
- **Node.js**: 18.x LTS
- **SSL Certificate**: For HTTPS

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install MongoDB (if self-hosting)
# Follow: https://docs.mongodb.com/manual/installation/

# Or PostgreSQL
sudo apt install -y postgresql postgresql-contrib
```

### Step 2: Application Setup

```bash
# Create app directory
sudo mkdir -p /opt/open-wallet
sudo chown $USER:$USER /opt/open-wallet
cd /opt/open-wallet

# Clone repository
git clone https://github.com/ThomasC3/open-wallet.git .

# Install dependencies
npm ci --only=production

# Create environment file
cp .env.example .env
nano .env  # Edit with production values
```

### Step 3: Configure Environment

```bash
# /opt/open-wallet/.env

NODE_ENV=production
PORT=3000
API_BASE_URL=https://api.yourapp.com

# Database (choose one)
DATABASE_URL=mongodb://localhost:27017/openwallet_production
# DATABASE_URL=postgresql://user:pass@localhost:5432/openwallet_production

# Tokenization
TOKENIZATION_API_KEY=your_production_key
TOKENIZATION_BASE_URL=https://api.basistheory.com
TOKENIZATION_TENANT_ID=your_production_tenant

# Security (MUST change these!)
JWT_SECRET=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -base64 32)
WEBHOOK_SECRET=$(openssl rand -base64 32)

# Payment Providers
APPLE_PAY_MERCHANT_ID=merchant.com.yourapp
GOOGLE_PAY_MERCHANT_ID=your_google_merchant_id

# Monitoring (optional)
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=warn
```

### Step 4: Database Setup

#### MongoDB

```bash
# Connect to MongoDB
mongosh

# Create database and user
use openwallet_production
db.createUser({
  user: "openwallet",
  pwd: "secure_password",
  roles: [{ role: "readWrite", db: "openwallet_production" }]
})

# Update DATABASE_URL in .env with credentials
```

#### PostgreSQL

```bash
# Create database
sudo -u postgres createdb openwallet_production

# Create user
sudo -u postgres createuser openwallet

# Grant permissions
sudo -u postgres psql
ALTER USER openwallet WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE openwallet_production TO openwallet;
\q

# Run migrations
npm run migrate
```

### Step 5: Start with PM2

```bash
# Start application
pm2 start src/index.js --name open-wallet

# Configure auto-restart
pm2 startup
pm2 save

# Monitor
pm2 status
pm2 logs open-wallet
pm2 monit
```

### Step 6: Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt install -y nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/open-wallet
```

```nginx
server {
    listen 80;
    server_name api.yourapp.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/open-wallet /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 7: SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d api.yourapp.com

# Auto-renewal is configured automatically
# Test renewal:
sudo certbot renew --dry-run
```

### Step 8: Firewall Configuration

```bash
# Configure UFW
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster (GKE, EKS, AKS, or self-hosted)
- kubectl configured
- Helm 3.x (optional)

### Kubernetes Manifests

#### Deployment

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: open-wallet
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: open-wallet
  template:
    metadata:
      labels:
        app: open-wallet
    spec:
      containers:
      - name: api
        image: your-registry/open-wallet:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: open-wallet-secrets
              key: database-url
        - name: TOKENIZATION_API_KEY
          valueFrom:
            secretKeyRef:
              name: open-wallet-secrets
              key: tokenization-api-key
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

#### Service

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: open-wallet-service
spec:
  selector:
    app: open-wallet
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

#### Secrets

```bash
# Create secrets
kubectl create secret generic open-wallet-secrets \
  --from-literal=database-url='mongodb://...' \
  --from-literal=tokenization-api-key='your_key' \
  --from-literal=jwt-secret='your_secret' \
  --from-literal=encryption-key='your_key'
```

#### Deploy

```bash
# Apply manifests
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Check status
kubectl get pods
kubectl get services

# View logs
kubectl logs -f deployment/open-wallet
```

## Docker Production Build

```dockerfile
# Dockerfile.production
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

CMD ["node", "src/index.js"]
```

```bash
# Build
docker build -f Dockerfile.production -t open-wallet:latest .

# Run
docker run -d \
  --name open-wallet \
  -p 3000:3000 \
  --env-file .env \
  open-wallet:latest
```

## Monitoring Setup

### Application Monitoring

```bash
# Install PM2 monitoring
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30

# Or use external monitoring
# - New Relic
# - Datadog
# - Prometheus + Grafana
```

### Health Checks

```bash
# Add to cron for health monitoring
*/5 * * * * curl -f http://localhost:3000/health || systemctl restart open-wallet
```

## Backup Strategy

### Database Backups

#### MongoDB

```bash
# Create backup script
#!/bin/bash
# backup-mongodb.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mongodb"

mkdir -p $BACKUP_DIR

mongodump \
  --uri="mongodb://user:pass@localhost:27017/openwallet_production" \
  --out="$BACKUP_DIR/backup_$DATE"

# Keep only last 30 days
find $BACKUP_DIR -type d -mtime +30 -exec rm -rf {} +
```

#### PostgreSQL

```bash
# Create backup script
#!/bin/bash
# backup-postgresql.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/postgresql"

mkdir -p $BACKUP_DIR

pg_dump -U openwallet -d openwallet_production \
  > "$BACKUP_DIR/backup_$DATE.sql"

# Compress
gzip "$BACKUP_DIR/backup_$DATE.sql"

# Keep only last 30 days
find $BACKUP_DIR -type f -mtime +30 -delete
```

```bash
# Add to cron
0 2 * * * /path/to/backup-mongodb.sh
```

## Scaling Considerations

### Horizontal Scaling

- Use load balancer (Nginx, HAProxy, AWS ALB)
- Enable session affinity for payment sessions
- Use Redis for shared session storage
- Scale API servers independently

### Database Scaling

#### MongoDB
- Enable replica sets
- Use sharding for large datasets
- Read replicas for read-heavy workloads

#### PostgreSQL
- Configure streaming replication
- Use connection pooling (pgBouncer)
- Partition large tables by date

### Caching

```bash
# Install Redis
sudo apt install redis-server

# Configure in .env
REDIS_URL=redis://localhost:6379
```

## Troubleshooting

### Common Issues

**Application won't start:**
```bash
# Check logs
pm2 logs open-wallet --lines 100

# Check environment
pm2 env 0

# Restart
pm2 restart open-wallet
```

**Database connection issues:**
```bash
# Test MongoDB connection
mongosh "mongodb://localhost:27017/openwallet_production"

# Test PostgreSQL connection
psql -U openwallet -d openwallet_production
```

**High memory usage:**
```bash
# Monitor with PM2
pm2 monit

# Limit memory
pm2 start src/index.js --name open-wallet --max-memory-restart 1G
```

## Security Checklist

- [ ] Change all default secrets
- [ ] Enable HTTPS with valid SSL certificate
- [ ] Configure firewall rules
- [ ] Set up regular backups
- [ ] Enable monitoring and alerting
- [ ] Configure rate limiting
- [ ] Review and audit logs regularly
- [ ] Keep dependencies updated
- [ ] Use strong database passwords
- [ ] Restrict database access to application only

## Support

For deployment assistance:
- Documentation: [README.md](README.md)
- Issues: [GitHub Issues](https://github.com/ThomasC3/open-wallet/issues)
- Community: [Discord](https://discord.gg/openwallet)
