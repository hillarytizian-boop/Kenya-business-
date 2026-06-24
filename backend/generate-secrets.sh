#!/bin/bash

echo "🔐 Generating Secure Secrets..."

# Generate JWT Secret
JWT_SECRET=$(openssl rand -base64 32)
echo "JWT_SECRET=$JWT_SECRET"

# Generate Refresh Secret
JWT_REFRESH_SECRET=$(openssl rand -base64 32)
echo "JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET"

# Generate Encryption Key
ENCRYPTION_KEY=$(openssl rand -hex 32)
echo "ENCRYPTION_KEY=$ENCRYPTION_KEY"

# Generate CSRF Secret
CSRF_SECRET=$(openssl rand -base64 32)
echo "CSRF_SECRET=$CSRF_SECRET"

# Generate Webhook Secret
WEBHOOK_SECRET=$(openssl rand -base64 32)
echo "WEBHOOK_SECRET=$WEBHOOK_SECRET"

# Generate Admin Password
ADMIN_PASSWORD=$(openssl rand -base64 20)
echo "ADMIN_PASSWORD=$ADMIN_PASSWORD"

echo "✅ Secrets generated successfully!"
echo "⚠️  Save these securely in your .env file"
