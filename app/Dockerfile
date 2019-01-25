###############################################################################
# Stage 1.0: Image used to develop and build application
###############################################################################

FROM node:10-alpine as base

# -----------------------------------------------------------------------------
# Install dependencies
# -----------------------------------------------------------------------------

WORKDIR /opt

COPY package* ./

RUN npm install --quiet && \
    npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH
ENV NODE_PATH /opt/node_modules/:$NODE_PATH

# -----------------------------------------------------------------------------
# Copy source code to build
# -----------------------------------------------------------------------------

WORKDIR /opt/app

COPY . .

# Weird trick to make react see absolute path to src in imports

ENV NODE_PATH ./src/:$NODE_PATH 

###############################################################################
# Stage 1.1: Image ready to start development server
###############################################################################

FROM base as development

CMD ["npm", "start"]

###############################################################################
# Stage 1.2: Image that ready to build production bundle
###############################################################################

FROM base as builder

RUN apk add --no-cache zip

RUN npm run build

WORKDIR /opt/app/build/

CMD rm -rf /opt/app/build-prod/*; \
    zip -r build .; \
    cp -r . /opt/app/build-prod/;

###############################################################################
# Stage 2: Image used to serve end  application through http
###############################################################################

FROM nginx:alpine

# -----------------------------------------------------------------------------
# Configure nginx
# -----------------------------------------------------------------------------

COPY nginx.conf /etc/nginx/conf.d/default.conf

# -----------------------------------------------------------------------------
# Copy static build files
# -----------------------------------------------------------------------------

COPY --from=builder /opt/app/build /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
