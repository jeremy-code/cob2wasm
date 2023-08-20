# Using Node 16 as base image
FROM node:16-buster-slim

# ENV
ENV EMSDK /emsdk
ENV EMSCRIPTEN_VERSION 3.1.20
ENV COBOL_BASENAME gnucobol-3.1-rc1
ENV DEBIAN_FRONTEND=noninteractive
ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib/
ENV PATH $EMSDK:$EMSDK/upstream/emscripten/:$PATH

# Cloning and installing Emscripten and gnucobol, cleaning up afterwards
RUN apt-get update && apt-get upgrade -y \
  && apt-get install -y python3 git wget build-essential autoconf libdb-dev libncurses5-dev libgmp3-dev \
  && git clone https://github.com/emscripten-core/emsdk.git $EMSDK \
  && cd ${EMSDK} \
  && . ./emsdk_env.sh \
  && ./emsdk install ${EMSCRIPTEN_VERSION} \
  && ./emsdk activate ${EMSCRIPTEN_VERSION} \
  && chmod 777 ${EMSDK}/upstream/emscripten \
  && chmod -R 777 ${EMSDK}/upstream/emscripten/cache \
  && echo "int main() { return 0; }" > hello.c \
  && ${EMSDK}/upstream/emscripten/emcc -c hello.c \
  && echo ". /emsdk/emsdk_env.sh" >> /etc/bash.bashrc \
  && echo 'export EM_NODE_JS="$EMSDK_NODE"' >> /etc/bash.bashrc \
  && wget https://sourceforge.net/projects/gnucobol/files/gnucobol/3.1/"${COBOL_BASENAME}".tar.gz/download -O "${COBOL_BASENAME}".tar.gz \
  && tar xvfz "${COBOL_BASENAME}".tar.gz \
  && cd "${COBOL_BASENAME}" \
  && ./configure \
  && make \
  && make install \
  && apt-get clean \
  && apt-get autoremove \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf "${COBOL_BASENAME}".tar.gz "${COBOL_BASENAME}"

# Cleanup Emscripten installation
RUN cd ${EMSDK} && . ./emsdk_env.sh \
  && strip -s `which node` \
  && rm -fr ${EMSDK}/upstream/emscripten/tests \
  && rm -fr ${EMSDK}/upstream/fastcomp \
  && find ${EMSDK}/upstream/bin -type f -exec strip -s {} + || true

# Indicate Docker to use this as the base directory
WORKDIR /app

# Install your application's dependencies
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile && yarn cache clean

# Copy your application
COPY . ./
