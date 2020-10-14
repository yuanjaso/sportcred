#!/bin/sh

# hooks directory
HOOKS_DIRECTORY=$(pwd)

# point git to look at this directory for the hooks
git config core.hooksPath $HOOKS_DIRECTORY

# need to give these files executable permission to run their sccripts
chmod +x prepare-commit-msg 
chmod +x pre-commit
