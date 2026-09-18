#!/usr/bin/env bash
set -e

# Replit workspace run command: builds the app and serves the real
# `output: "standalone"` production server (node .next/standalone/server.js)
# instead of `next dev`. The performance audit found the deployed
# environment was running `next dev`, whose per-route on-first-request
# compilation is what produced the reported 5-7 second "first load" times
# on Attractions/Event pages — a real production build responds in well
# under 100ms for the same routes. This script is what makes the Replit
# "Start application" workflow use that production server instead.
#
# The standalone output doesn't include static assets normally served by
# `next start` from the project root — Next's own standalone-mode docs
# require copying these in manually every build.
export PORT="${PORT:-3000}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"

npm run build

rm -rf .next/standalone/public .next/standalone/.next/static
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

exec node .next/standalone/server.js
