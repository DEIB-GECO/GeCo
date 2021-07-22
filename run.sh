#!/usr/bin/env bash
echo "starting on localhost:12347"
open http://localhost:12347
python -m http.server 12347