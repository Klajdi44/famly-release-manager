#!/bin/sh

echo "Entered the entrypoint.sh"
npm rebuild esbuild

exec "$@"