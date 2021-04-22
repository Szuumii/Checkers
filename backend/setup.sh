#!/bin/bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo "Starting checkers server"
gunicorn --threads 50 app:app