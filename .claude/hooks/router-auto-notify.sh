#!/bin/bash
# Router Auto-Notify Hook
# Triggered by Claude Code PostToolUse when AGENT_STATUS.md or INBOX.md is modified.
# Pure bash — khong dung jq, khong dung python.
# Human KHONG can lam gi — hook tu dong chay.

BOT_TOKEN="8621207614:AAFM3H7r67bihJnPMniM9YJM0JLaKXCO_-E"
CHAT_ID="EDULIVE_CHAT_ID"  # TODO: Replace with actual Edulive Telegram group chat ID

# Read hook input from stdin
INPUT=$(cat)

# Extract file_path from JSON using grep/sed
FILE_PATH=$(echo "$INPUT" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"file_path"[[:space:]]*:[[:space:]]*"//;s/"$//')

# Only process AGENT_STATUS.md and INBOX.md files
if [[ "$FILE_PATH" != *"AGENT_STATUS.md" ]] && [[ "$FILE_PATH" != *"INBOX.md" ]]; then
  exit 0
fi

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Extract new_string or content from JSON
NEW_CONTENT=$(echo "$INPUT" | grep -o '"new_string"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"new_string"[[:space:]]*:[[:space:]]*"//;s/"$//')
if [ -z "$NEW_CONTENT" ]; then
  NEW_CONTENT=$(echo "$INPUT" | grep -o '"content"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"content"[[:space:]]*:[[:space:]]*"//;s/"$//')
fi

# Unescape \n to real newlines
NEW_CONTENT=$(echo -e "$NEW_CONTENT")

if [ -z "$NEW_CONTENT" ]; then
  exit 0
fi

# --- AGENT_STATUS.md changed ---
if [[ "$FILE_PATH" == *"AGENT_STATUS.md" ]]; then
  if [[ "$FILE_PATH" == *"_hq/"* ]]; then
    SCOPE="Workspace"
  else
    SCOPE=$(echo "$FILE_PATH" | sed -n 's|.*projects/\([^/]*\)/.*|\1|p')
  fi

  ROLE=$(echo "$NEW_CONTENT" | grep -o '@[A-Z_]*' | head -1 | sed 's/@//')
  STATUS=$(echo "$NEW_CONTENT" | grep 'Status:' | head -1 | sed 's/.*Status:[[:space:]]*//')
  TASK=$(echo "$NEW_CONTENT" | grep 'Task:' | head -1 | sed 's/.*Task:[[:space:]]*//')
  MODEL=$(echo "$NEW_CONTENT" | grep 'Model:' | head -1 | sed 's/.*Model:[[:space:]]*//')

  case "$STATUS" in
    ONLINE)  ICON="🟢" ;;
    WORKING) ICON="⚙️" ;;
    WAITING) ICON="⏳" ;;
    DONE)    ICON="✅" ;;
    OFFLINE) ICON="🔴" ;;
    *)       ICON="🤖" ;;
  esac

  TEXT="${ICON} [${SCOPE}] @${ROLE} — ${STATUS}
Model: ${MODEL}
Task: ${TASK}
${TIMESTAMP}"

# --- INBOX.md changed ---
elif [[ "$FILE_PATH" == *"INBOX.md" ]]; then
  SCOPE=$(echo "$FILE_PATH" | sed -n 's|.*projects/\([^/]*\)/.*|\1|p')

  MSG_TYPE=$(echo "$NEW_CONTENT" | grep -o 'TASK_ASSIGNED\|TASK_DONE\|REVIEW_REQUEST\|DEPLOY_READY\|ESCALATION\|INFO\|BUG_REPORT' | head -1)
  TASK=$(echo "$NEW_CONTENT" | grep 'Task:' | head -1 | sed 's/.*Task:[[:space:]]*//')
  FROM=$(echo "$NEW_CONTENT" | grep -o '@[A-Z_]*' | head -1 | sed 's/@//')
  PRIORITY=$(echo "$NEW_CONTENT" | grep 'Priority:' | head -1 | sed 's/.*Priority:[[:space:]]*//')

  case "$MSG_TYPE" in
    TASK_ASSIGNED)   ICON="📋" ;;
    TASK_DONE)       ICON="✅" ;;
    REVIEW_REQUEST)  ICON="👀" ;;
    DEPLOY_READY)    ICON="🚀" ;;
    ESCALATION)      ICON="🚨" ;;
    *)               ICON="📨" ;;
  esac

  TEXT="${ICON} [${SCOPE}] ${MSG_TYPE} — @${FROM}
Task: ${TASK}
Priority: ${PRIORITY:-MEDIUM}
${TIMESTAMP}"
fi

# Send Telegram — escape JSON using bash only
if [ -n "$TEXT" ]; then
  # Escape special chars for JSON
  ESCAPED=$(echo "$TEXT" | sed 's/\\/\\\\/g; s/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')

  curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
    -H "Content-Type: application/json" \
    -d "{\"chat_id\":\"${CHAT_ID}\",\"text\":\"${ESCAPED}\"}" > /dev/null 2>&1
fi

exit 0
