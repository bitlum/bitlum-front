###############################################################################
# Stage #1.0: Common builder image
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
# Stage #1.1: Image ready to start development server
###############################################################################

FROM base as development

CMD ["npm", "start"]

###############################################################################
# Stage #1.2: Image that ready to build production bundle
###############################################################################

FROM base as builder

RUN npm run build

CMD ["cp","-r", "/opt/app/build/.", "/opt/app/build-prod/"]

###############################################################################
# Stage #2: Bundled build with server image
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
