terraform {
  required_providers {
    proxmox = {
      source  = "bpg/proxmox"
      version = "~> 0.46"
    }
  }
}

provider "proxmox" {
  endpoint  = "https://192.168.1.33:8006/api2/json"
  username  = "root@pam"
  password  = "<EnvVariable>"
  insecure  = true
}

resource "proxmox_virtual_environment_vm" "ubuntu_lab" {
  name      = "ubuntu-lab"
  node_name = "proxmox"

  clone {
    vm_id = 100   # Your template ID
  }

  cpu {
    cores = 2
  }

  memory {
    dedicated = 4096
  }

  network_device {
    bridge = "vmbr0"
  }
}
