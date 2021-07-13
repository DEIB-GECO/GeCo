#!/usr/bin/env bash
echo "starting on localhost:12345"
open http://localhost:12346
python -m http.server 12346