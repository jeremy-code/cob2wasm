#!/bin/bash
# Script to build and run the docker container for the Cob2Wasm tool

# Build the Docker image
docker build --platform=linux/amd64 -t my-cobol-app .

# Check that at least one argument has been provided
if [ $# -eq 0 ]; then
    echo "No arguments provided. Please provide a path to the COBOL file."
    exit 1
fi

# Check if the run argument has been provided
RUN_ARG=""
if [ $# -eq 2 ]; then
    if [ $2 = "true" ]; then
        RUN_ARG="--run"
    fi
fi

# Run the Docker container and execute the CLI tool
docker run -v $(pwd):/usr/src/app my-cobol-app yarn start --file $1 $RUN_ARG
