(function () {
  const outputEl = document.getElementById("terminal-output");
  const formEl = document.getElementById("command-form");
  const inputEl = document.getElementById("command-input");
  const demoPanel = document.getElementById("demo-panel");
  const demoCloseBtn = document.getElementById("demo-close");

  const history = [];
  let historyIndex = -1;

  const sections = {
    about: `
Darren Gray — electrician running real systems and moving into DevOps / infrastructure.

• Time-served electrician working mainly on domestic and light commercial work.
• Runs a production Odoo ERP stack for his own electrical business.
• Builds and maintains a secure home lab + remote stack using Linux, Docker,
  WireGuard, and automation scripts.
• Focused on reliability: backups, firewalls, VPN-only access, and clear docs.

Goal: roles where practical field experience and real infrastructure work meet:
DevOps / infra / SRE-adjacent or OT/ICS support roles.`,

    skills: `
Core
• Fault-finding mindset: used to tracing issues from physical wiring to software.
• Comfortable reading standards, documentation, and implementing them in practice.

DevOps & Infrastructure
• Linux (Debian/Ubuntu): service management, logs, permissions, backups.
• Docker & Docker Compose: multi-service stacks, volumes, networks.
• Reverse proxy & routing: Traefik with TLS, routing for Odoo & web services.
• VPNs & remote access: WireGuard-based remote access for lab and workloads.
• Firewalling: iptables rules for exposed services and VPN-only admin access.
• Backups & encryption: GPG-encrypted backups, restore-tested procedures.

Automation & Tooling
• PowerShell: interactive tooling (ssh-login-helper, usb-verifier).
• Bash / shell: automation scripts for sync, backup, and maintenance.
• Config-driven design: JSON/YAML-style configs to drive scripts and tools.

Application Layer
• Odoo 18: custom modules (odoo-job-request) and deployment with Docker.
• PostgreSQL basics via Odoo stack administration.
• AWS S3-compatible storage via Boto3 (job request file uploads).

Electrical & OT
• BS 7671-based inspection, testing, and remedials (EICRs, boards, external lighting).
• Comfortable working around real constraints: limited downtime, live clients,
  and safety-critical environments.
• Familiar with KNX/BMS/SCADA concepts and keen to bridge them with modern infra.

Currently exploring
• Hardware-backed SSH key storage (YubiKey) and stronger key workflows.
• More structured monitoring/metrics for home lab and production Odoo.`,

    experience: `
Recent Focus (infra & dev)
• Built and maintain secure-media-lab:
  - Secure home lab + remote stack with WSL2/Debian, Docker, WireGuard,
    and automation scripts for syncing and backups.
  - VPN-only access to services and reduced attack surface.

• Built graylogic-erp-site:
  - Production Odoo ERP powering a real electrical business.
  - Docker + Traefik deployment, GPG-encrypted backups, and iptables hardening.
  - Documentation and scripting so the stack is repeatable and recoverable.

• Developed ssh-login-helper:
  - PowerShell tool that parses SSH config + JSON metadata.
  - Presents an interactive menu, handles key discovery, and post-connect commands.
  - Designed to make SSH access safer and more repeatable.

• Developed usb-verifier:
  - PowerShell-based Windows install USB integrity scanner.
  - Compares USB contents against ISO, computes hashes, and performs deep
    WIM/ESD/SWM analysis for tampering or corruption.

• Developed odoo-job-request:
  - Odoo 18 module for a public-facing job request portal.
  - Creates CRM leads with structured metadata and file uploads to S3-compatible
    storage using Boto3.
  - Built for real electrical work: sockets, circuits, and on-site photos.

On the tools side
• Writes READMEs and operational notes aimed at other practitioners, not just devs.
• Treats personal infrastructure like production: backups, testing, rollback paths.`,

    projects: `
Selected GitHub projects

• secure-media-lab
  Secure home lab + remote stack with WSL2/Debian, Docker, WireGuard, and
  automation scripts for syncing and backups.
  -> https://github.com/nerrad567/secure-media-lab

• graylogic-erp-site
  Production-grade Odoo ERP powering a real electrical business.
  Docker & Traefik, GPG-encrypted backups, firewall hardening (iptables),
  and robust automation scripts.
  -> https://github.com/nerrad567/graylogic-erp-site

• ssh-login-helper
  PowerShell-based SSH login helper that parses your SSH config and JSON
  metadata to present an interactive menu. Handles key discovery and
  post-connect commands.
  -> https://github.com/nerrad567/ssh-login-helper

• usb-verifier
  Windows install USB integrity & threat scanner (PowerShell).
  Compares USB vs ISO, verifies hashes, and performs deep WIM/ESD/SWM analysis.
  -> https://github.com/nerrad567/usb-verifier

• odoo-job-request
  Custom Odoo 18 module for a public electrical job request portal.
  Creates CRM leads, uploads files to S3-compatible storage via Boto3,
  and captures structured socket data.
  -> https://github.com/nerrad567/odoo-job-request

All repositories
-> https://github.com/nerrad567`,

    cv: `
Role snapshot

Target roles
• Junior DevOps / Infrastructure Engineer.
• Platform / SRE-style roles with a focus on reliability and operations.
• OT / ICS support roles blending field work with secure infrastructure.

What I already do
• Run a real Odoo ERP stack for my electrical business.
• Maintain a secure home lab + remote stack (VPNs, firewalls, backups).
• Build practical tooling in PowerShell and Bash to automate repetitive work.
• Communicate technical findings in plain language to non-technical clients.

What I’m looking for
• A team where running and improving real systems matters more than buzzwords.
• Mentorship and exposure to larger-scale infra (k8s, cloud, CI/CD),
  while contributing immediately on Linux, Docker, networking, and tooling.
• Roles that value that I know both ends of the cable: what happens in the
  consumer unit and what happens in the container cluster.

Delivery style
• Pragmatic, safety-conscious, and documentation-friendly.
• Happy in terminals and log files; equally happy explaining outcomes to users.`,

    contact: `
Contact

• Terminal CV:    https://terminal.electrician.onl
• Root overview:  https://electrician.onl
• GitHub:         https://github.com/nerrad567

Email / LinkedIn are intentionally not hard-coded here.
They can be wired in as you decide how you want to be contacted for roles
(standard email alias, LinkedIn profile, or both).`,

    help: `
Available commands

• about      — who is Darren and what is this site?
• skills     — technical + practical capabilities grounded in shipped work.
• experience — recent work and how it maps to DevOps/infra.
• projects   — GitHub highlight reel with links.
• cv         — summary aimed at hiring managers.
• contact    — how to reach out.
• demo       — preview slide-out panel for future video/animation.
• clear      — clear the screen.

Tip: use the chips below the prompt on mobile, or ↑↓ to browse history.`,
  };

  function createLine(text, className) {
    const line = document.createElement("div");
    line.className = "line" + (className ? " " + className : "");
    line.textContent = text;
    return line;
  }

  function printRaw(text, className) {
    const lines = String(text).split("\n");
    lines.forEach((l) => {
      if (!l.trim().length) {
        outputEl.appendChild(createLine("", className));
      } else {
        outputEl.appendChild(createLine(l, className));
      }
    });
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function printSectionTitle(title) {
    printRaw(`// ${title}`, "line--section line--muted");
  }

  function printCommandEcho(cmd) {
    printRaw(`darren@electrician:~$ ${cmd}`, "line--command");
  }

  function clearScreen() {
    outputEl.innerHTML = "";
  }

  function handleCommand(rawInput) {
    const input = rawInput.trim();
    if (!input) return;

    history.push(input);
    historyIndex = history.length;

    printCommandEcho(input);
    const key = input.toLowerCase();

    if (key === "clear") {
      clearScreen();
      return;
    }

    if (key === "help" || key === "?") {
      printSectionTitle("help");
      printRaw(sections.help);
      return;
    }

    if (sections[key]) {
      printSectionTitle(key);
      printRaw(sections[key]);
      if (key === "projects") {
        printRaw(
          "\nTip: use middle-click (desktop) or long-press (mobile) to open links in new tabs.",
          "line--muted"
        );
      }
      if (key === "cv") {
        printRaw(
          "\nLater, this command can trigger a PDF download or link to a printable CV.",
          "line--muted"
        );
      }
      return;
    }

    if (key === "demo") {
      printSectionTitle("demo");
      printRaw(
        "Toggling demo panel. In production this would show short clips of your stacks and tools in use."
      );
      toggleDemoPanel(true);
      return;
    }

    printRaw(
      `Unknown command: "${input}". Type "help" for a list of commands.`,
      "line--muted"
    );
  }

  function toggleDemoPanel(forceVisible) {
    if (!demoPanel) return;
    const shouldShow =
      typeof forceVisible === "boolean"
        ? forceVisible
        : !demoPanel.classList.contains("is-visible");
    if (shouldShow) {
      demoPanel.classList.add("is-visible");
    } else {
      demoPanel.classList.remove("is-visible");
    }
  }

  // Simple typewriter intro
  function typewriter(lines, idx = 0, charIdx = 0) {
    if (idx >= lines.length) {
      printRaw("", "");
      printRaw("Type 'help' or use the chips below to explore.", "line--muted");
      return;
    }

    if (charIdx === 0) {
      outputEl.appendChild(createLine("", ""));
    }

    const currentLine = lines[idx];
    const lastLineEl = outputEl.lastElementChild;
    lastLineEl.textContent = currentLine.slice(0, charIdx + 1);
    outputEl.scrollTop = outputEl.scrollHeight;

    if (charIdx < currentLine.length - 1) {
      window.setTimeout(() => typewriter(lines, idx, charIdx + 1), 22);
    } else {
      window.setTimeout(() => typewriter(lines, idx + 1, 0), 60);
    }
  }

  function boot() {
    const introLines = [
      "booting terminal.electrician.onl...",
      "loading interactive terminal CV...",
      "",
      "Darren Gray — electrician running real infrastructure.",
      "Live Odoo ERP. Secure home lab. Practical tooling.",
    ];
    typewriter(introLines);
  }

  // Event listeners
  formEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const value = inputEl.value;
    handleCommand(value);
    inputEl.value = "";
    inputEl.focus();
  });

  inputEl.addEventListener("keydown", (evt) => {
    if (evt.key === "ArrowUp") {
      evt.preventDefault();
      if (history.length === 0) return;
      historyIndex = Math.max(0, historyIndex - 1);
      inputEl.value = history[historyIndex] || "";
      inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
    } else if (evt.key === "ArrowDown") {
      evt.preventDefault();
      if (history.length === 0) return;
      historyIndex = Math.min(history.length, historyIndex + 1);
      if (historyIndex === history.length) {
        inputEl.value = "";
      } else {
        inputEl.value = history[historyIndex] || "";
        inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
      }
    }
  });

  document.querySelectorAll("[data-command]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-command") || "";
      handleCommand(cmd);
      inputEl.focus();
    });
  });

  if (demoCloseBtn) {
    demoCloseBtn.addEventListener("click", () => toggleDemoPanel(false));
  }

  window.addEventListener("load", () => {
    boot();
    inputEl.focus();
  });
})();
