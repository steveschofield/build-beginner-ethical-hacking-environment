#!/usr/bin/env bash

set -euo pipefail

# Simple wrapper to install Ansible on Ubuntu and run the included playbooks
# against a local host. Extra args are forwarded to ansible-playbook.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLAYBOOKS=(
  "${SCRIPT_DIR}/local_playbook_base.yml"
  "${SCRIPT_DIR}/local_playbook_docker.yml"
  "${SCRIPT_DIR}/local_playbook_vulnapps.yml"
)

TARGET_HOST=${TARGET_HOST:-127.0.0.1}
TARGET_CONNECTION=${TARGET_CONNECTION:-local}

cleanup() {
  [[ -n "${INVENTORY:-}" && -f "$INVENTORY" ]] && rm -f "$INVENTORY"
}
trap cleanup EXIT

need_sudo() {
  if [[ "$EUID" -ne 0 ]]; then
    echo "sudo"
  else
    echo ""
  fi
}

ensure_ansible() {
  if command -v ansible-playbook >/dev/null 2>&1; then
    return
  fi

  echo "Installing Ansible via apt..."
  local sudo_bin
  sudo_bin=$(need_sudo)
  ${sudo_bin:+$sudo_bin }apt-get update -y
  ${sudo_bin:+$sudo_bin }apt-get install -y ansible
}

write_inventory() {
  INVENTORY=$(mktemp)
  cat >"$INVENTORY" <<EOF
[local]
${TARGET_HOST} ansible_connection=${TARGET_CONNECTION} ansible_python_interpreter=/usr/bin/python3
EOF
  echo "Using inventory: $INVENTORY"
}

run_playbooks() {
  for pb in "${PLAYBOOKS[@]}"; do
    if [[ ! -f "$pb" ]]; then
      echo "Playbook not found: $pb" >&2
      exit 1
    fi

    echo "Running $pb..."
    ansible-playbook -i "$INVENTORY" "$pb" "$@"
  done
}

ensure_ansible
write_inventory
run_playbooks "$@"
