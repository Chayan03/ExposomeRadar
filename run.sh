#!/bin/bash
# Wrapper script that forwards everything to the Python launcher
# It natively handles the Windows/Mac concurrency differences!
python run.py "$@"
