#!/usr/bin/env bash
echo "starting on localhost:12345"
open http://localhost:12345
python -m http.server 12345