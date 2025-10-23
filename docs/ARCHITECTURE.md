# Open Wallet Architecture

## Overview

Open Wallet is designed as a modular, service-oriented system that provides secure wallet management with tokenized payment processing. The architecture emphasizes security, scalability, and developer experience.

## System Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                  Client Applications                      │
│         (iOS, Android, Web, Server-to-Server)            │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ HTTPS/TLS 1.3
                     │
┌────────────────────▼─────────────────────────────────────┐
│                   API Gateway Layer                       │
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────────┐ │
│  │ Rate Limiter │ │ Auth Middleware│ │ Request Logger │ │
│  └──────────────┘ └──────────────┘ └─────────────────┘ │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│                  Service Layer                            │
│  ┌───────────────┐ ┌────────────────┐ ┌──────────────┐ │
│  │ Wallet Service│ │ Payment Service│ │ Token Service│ │
│  └───────────────┘ └────────────────┘ └──────────────┘ │
│  ┌───────────────┐ ┌────────────────┐                  │
│  │ Transaction   │ │ Admin Service  │                  │
│  │ Service       │ │                │                  │
│  └───────────────┘ └────────────────┘                  │
└────────────────────┬─────────────────────────────────────┘
                     │
        ┌────────────┴──────────────┐
        │                           │
┌───────▼──────────┐    ┌──────────▼──────────┐
│   Data Layer     │    │  External Services  │
│ ┌──────────────┐ │    │ ┌─────────────────┐│
│ │  MongoDB /   │ │    │ │ Basis Theory    ││
│ │  PostgreSQL  │ │    │ │ (Tokenization)  ││
│ └──────────────┘ │    │ └─────────────────┘│
│ ┌──────────────┐ │    │ ┌─────────────────┐│
│ │    Redis     │ │    │ │ Apple Pay /     ││
│ │  (Caching)   │ │    │ │ Google Pay APIs ││
│ └──────────────┘ │    │ └─────────────────┘│
└──────────────────┘    └─────────────────────┘
```

## Core Components

### 1. API Gateway Layer

**Responsibilities:**
- Request authentication and authorization
- Rate limiting and throttling
- Request/response logging
- CORS handling
- Security headers (Helmet.js)

**Technologies:**
- Express.js middleware
- JWT for authentication
- express-rate-limit for throttling

### 2. Service Layer

#### Wallet Service
Manages wallet lifecycle and balance operations.

**Key Operations:**
- Create/read/update wallet
- Balance management with atomic operations
- Auto top-up functionality
- Wallet status management

**Design Patterns:**
- Repository pattern for data access
- Transaction script for business logic
- Observer pattern for balance notifications

#### Payment Service (Mobile Payment)
Handles Apple Pay and Google Pay integrations.

**Key Operations:**
- Initialize payment sessions
- Process encrypted payment data
- Token creation and management
- Session management

**Security Features:**
- Encrypted payment data handling
- Session expiration (15 minutes)
- Token validation
- PCI DSS compliance through tokenization

#### Token Service (Tokenization)
Interfaces with tokenization providers (Basis Theory, Stripe, etc.).

**Key Operations:**
- Create payment tokens from card data
- Create tokens from mobile payment data
- Token retrieval and validation
- Token deletion

**Provider Support:**
- Basis Theory (primary)
- Stripe (compatible)
- Custom provider support through adapter pattern

#### Transaction Service
Manages transaction lifecycle and history.

**Key Operations:**
- Transaction creation and tracking
- Transaction history queries
- Transaction status updates
- Audit trail maintenance

**Features:**
- Idempotency support
- Retry logic
- Transaction linking (transfers, refunds)

#### Admin Service
Provides administrative capabilities.

**Key Operations:**
- Dashboard analytics
- Refund processing
- Customer management
- Transaction monitoring

**Access Control:**
- Role-based permissions
- Audit logging
- Admin action tracking

### 3. Data Layer

#### Primary Database (MongoDB/PostgreSQL)

**Collections/Tables:**
- `wallets`: Wallet records
- `transactions`: Transaction history
- `refunds`: Refund requests
- `admin_users`: Admin accounts (if applicable)

**Indexing Strategy:**
- Wallet: userId, status, createdAt
- Transaction: walletId + createdAt, status, transferId
- Refund: walletId, status, transactionId

#### Cache Layer (Redis - Optional)

**Use Cases:**
- Session storage for mobile payments
- Rate limiting counters
- Frequently accessed wallet data
- API response caching

**TTL Strategy:**
- Payment sessions: 15 minutes
- Wallet cache: 5 minutes
- Rate limit counters: 15 minutes

## Data Flow

### Wallet Funding Flow

```
1. Client initiates payment
   └─> POST /api/v1/payment/apple-pay/init

2. API creates payment session
   └─> Returns session configuration

3. Client processes payment with Apple/Google
   └─> Obtains encrypted payment data

4. Client submits payment data
   └─> POST /api/v1/payment/apple-pay/process

5. API validates session
   └─> Checks expiration and authenticity

6. API creates token
   └─> Calls Tokenization Service

7. Tokenization Service creates token
   └─> Returns secure token ID

8. API adds funds to wallet
   └─> Atomic balance update

9. API creates transaction record
   └─> Audit trail

10. API returns success
    └─> Client receives confirmation
```

### Transfer Flow

```
1. Client initiates transfer
   └─> POST /api/v1/wallet/transfer

2. API validates request
   └─> Checks balance, wallet status

3. API starts transaction
   └─> Creates transfer ID

4. API debits source wallet
   └─> Atomic operation with lock

5. API credits destination wallet
   └─> Atomic operation with lock

6. API creates transaction records
   └─> Links via transfer ID

7. API returns success
   └─> Both transactions completed
```

## Security Architecture

### Authentication & Authorization

**JWT-based Authentication:**
```
1. User authenticates
2. Server issues JWT with claims
3. Client includes JWT in requests
4. Server validates JWT on each request
```

**Token Structure:**
```json
{
  "sub": "user-123",
  "role": "user",
  "permissions": ["wallet:read", "wallet:write"],
  "iat": 1234567890,
  "exp": 1234654290
}
```

### Data Security

**Encryption at Rest:**
- Sensitive data encrypted using AES-256-GCM
- Encryption keys stored in environment variables
- Key rotation support

**Encryption in Transit:**
- TLS 1.3 for all API communication
- Certificate pinning recommended for mobile apps

**PCI DSS Compliance:**
- No raw card data stored
- All payment data tokenized
- Tokens stored with encryption
- Audit logging enabled

### Rate Limiting

**Strategies:**
- Global: 100 requests per 15 minutes
- Per user: 50 requests per 15 minutes
- Payment endpoints: 10 requests per 15 minutes

## Scalability

### Horizontal Scaling

**Stateless Design:**
- API servers are stateless
- Session data in Redis (shared)
- Database connection pooling

**Load Balancing:**
- Round-robin distribution
- Health checks on `/health`
- Graceful shutdown support

### Vertical Scaling

**Database Optimization:**
- Proper indexing strategy
- Query optimization
- Connection pooling

**Caching Strategy:**
- Redis for hot data
- CDN for static assets
- API response caching

### Database Scaling

**MongoDB:**
- Replica sets for high availability
- Sharding by walletId for horizontal scaling
- Read replicas for read-heavy operations

**PostgreSQL:**
- Streaming replication
- Partitioning by date ranges
- Connection pooling with pgBouncer

## Monitoring & Observability

### Logging

**Structured Logging:**
- Winston for application logs
- Log levels: error, warn, info, debug
- JSON format for log aggregation

**Log Aggregation:**
- Centralized logging (ELK, Splunk)
- Log retention policies
- Alert configuration

### Metrics

**Key Metrics:**
- Request rate and latency
- Error rates by endpoint
- Wallet creation rate
- Transaction volume
- Payment success rate

**Tools:**
- Prometheus for metrics collection
- Grafana for visualization
- Custom dashboards

### Tracing

**Distributed Tracing:**
- Request ID propagation
- Span tracking across services
- Performance bottleneck identification

## Deployment

### Containerization

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mongodb://mongo:27017/openwallet
    depends_on:
      - mongo
      - redis
  mongo:
    image: mongo:6
  redis:
    image: redis:7-alpine
```

### Kubernetes

**Deployment:**
- Horizontal Pod Autoscaling
- Rolling updates
- Health checks and readiness probes
- ConfigMaps and Secrets for configuration

### CI/CD

**Pipeline:**
1. Code commit
2. Run linter and tests
3. Build Docker image
4. Push to registry
5. Deploy to staging
6. Run integration tests
7. Deploy to production

## Disaster Recovery

### Backup Strategy

**Database:**
- Daily full backups
- Hourly incremental backups
- 30-day retention

**Recovery:**
- Point-in-time recovery
- Automated recovery testing
- Documented recovery procedures

### High Availability

**Database:**
- Multi-region replication
- Automatic failover
- Read replicas

**Application:**
- Multi-AZ deployment
- Auto-scaling groups
- Health monitoring

## Future Enhancements

### Planned Features

1. **Cryptocurrency Support**
   - Bitcoin/Ethereum integration
   - Token swaps
   - DeFi integration

2. **Advanced Analytics**
   - Machine learning fraud detection
   - Predictive balance management
   - Spending insights

3. **Multi-Tenant Support**
   - Tenant isolation
   - Custom branding
   - Tenant-specific configuration

4. **GraphQL API**
   - GraphQL alongside REST
   - Real-time subscriptions
   - Improved query flexibility

---

For implementation details, see source code documentation and API reference.
