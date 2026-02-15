
**Assumptions:**

* Deploy Ubuntu Server (minimized)
* **echo **"ss ALL=(ALL) NOPASSWD:ALL"| sudo **tee** /etc/sudoers.d/ss
* Setup Ansible

### **Step 1: Install Ansible**

```bash
brew install ansible
```

### **Step 2: Create Ansible Project Structure**

bash

```bash
mkdir -p ~/code/ansible
cd ~/code/ansible

# Create directory structure
mkdir -p {inventory,playbooks,roles,group_vars}
```

### **Step 3: Create Inventory File**

bash

```bash
# ~/guardian-automation/ansible/inventory/hosts.ini
[guardian_workers]
ubuntu-automation1 ansible_host=192.168.1.10 ansible_user=ss

[guardian_workers:vars]
ansible_python_interpreter=/usr/bin/python3
mac_ip=192.168.1.69  # Replace with your Mac's IP
ollama_url=http://192.168.1.60:11434
ollama_model=llama3.1:8b
guardian_repo=https://github.com/steveschofield/guardian-cli-deluxe.git
```

### **Run Guardian workflows and publish logs**

```bash
ansible-playbook -i inventory/hosts.ini environments/ansible-playbooks/run_guardian_workflows.yml
```

Optional overrides:

```bash
ansible-playbook -i inventory/hosts.ini environments/ansible-playbooks/run_guardian_workflows.yml \
  -e target_url=https://juiceshop.ss.hackme \
  -e results_web_port=8080 \
  -e guardian_dir=/root/code/guardian-cli-deluxe
```

### **Detached Guardian runs (service + timer)**

One-time setup:

```bash
ansible-playbook -i inventory/hosts.ini environments/ansible-playbooks/setup_guardian_workflow_service.yml
```

Kick off a run without keeping the Mac connected:

```bash
ansible-playbook -i inventory/hosts.ini environments/ansible-playbooks/kickoff_guardian_workflows.yml
```

Optional overrides:

```bash
ansible-playbook -i inventory/hosts.ini environments/ansible-playbooks/setup_guardian_workflow_service.yml \
  -e target_url=https://juiceshop.ss.hackme \
  -e results_web_port=8080 \
  -e guardian_dir=/root/code/guardian-cli-deluxe \
  -e start_now=true \
  -e enable_timer=false
```

Note: `run_guardian_workflows.yml` and the systemd service runner update the Guardian repo before executing (defaults to a forced update) and then run `pip install -e .` (and `setup.sh` if present). Reports are also copied to `/apps/results/reports/` for easy browsing. Override with `-e guardian_force_update=false` if you want to avoid discarding local changes.

### **Combined setup**

```bash
ansible-playbook -i inventory/hosts.ini environments/ansible-playbooks/setup_guardian_all.yml
```
