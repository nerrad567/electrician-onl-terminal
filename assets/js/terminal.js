(function () {
  const outputEl = document.getElementById("terminal-output");
  const formEl = document.getElementById("command-form");
  const inputEl = document.getElementById("command-input");
  const demoPanel = document.getElementById("demo-panel");
  const demoCloseBtn = document.getElementById("demo-close");

  const history = [];
  let historyIndex = -1;

  // -----------------------------
  // Content sections (synced with manager view)
  // -----------------------------
  const sections = {
    about: `
Darren Gray — time-served electrician running real production systems and moving into DevOps / infrastructure and OT/ICS support roles.

• Domestic, commercial & light industrial work: EICRs, board changes, diagnosis, repairs and compliance to BS 7671.
• Runs a production Odoo 18 ERP stack for his own electrical business (CRM, quotes, jobs, invoicing).
• Built and operates a secure home lab + remote stack with VPN-only access, hardened firewalls, and encrypted backups.
• Writes practical tooling in PowerShell and Bash: usb-verifier, ssh-login-helper, Odoo job portal integrations, and more.

He treats infrastructure like a live installation: planned work, tested rollback paths, and documentation that future-you (or another engineer) can actually use.

Goal: join a team where real-world constraints matter more than buzzwords — junior DevOps / infra / SRE-adjacent roles or OT/ICS support roles that bridge field work and infrastructure.`,

    skills: `
How he works
• Reliability mindset: changes treated as “live work” with isolation, tests, and clear rollback.
• Security-aware by default: WireGuard VPNs, minimal exposed services, and hardened entry points.
• Communicator: used to explaining technical findings to non-technical clients in EICRs and reports.

DevOps & Infrastructure
• Linux (Debian/Ubuntu): service management, systemd, logs, permissions, backup/restore workflows.
• Docker & Docker Compose: multi-service stacks, persistent volumes, networks, health-aware design.
• Reverse proxy & routing: Traefik with TLS for Odoo and web services, deliberate routing and minimal surface area.
• VPNs & remote access: WireGuard-based “VPN-first” design for lab and production systems.
• Firewalling: iptables rulesets to keep admin surfaces VPN-only and reduce exposed ports.
• Backups & restores: GPG-encrypted database/filestore backups, fully tested rebuild-from-bare-VM flows.

Automation & Tooling
• PowerShell: large, structured scripts (usb-verifier, ssh-login-helper) with logging, config files, and error handling.
• Bash / shell: sync, backup, and maintenance scripts for secure-media-lab and remote VPS flows.
• Config-driven design: JSON/YAML-style configs used as the source of truth for scripts and tooling.

Application Layer
• Odoo 18: custom modules (e.g. odoo-job-request portal), ORM models, controllers, templates.
• S3-compatible object storage: file uploads from Odoo via Boto3 to keep instances lean.
• PostgreSQL basics via Odoo administration, with an operator mindset (backup/restore, not DBA).

Electrical & OT
• Inspection & testing under BS 7671: EICRs, remedials, and external circuits under real-world constraints.
• Comfortable bridging panels, boards, and field wiring with modern infra (VPNs, Docker, automation).
• Familiar with KNX/BMS/SCADA concepts and keen to bring infra discipline to OT and ICS stacks.

Currently exploring
• Hardware-backed SSH keys (YubiKey) and stronger SSH workflows.
• More structured monitoring/metrics for the home lab and production Odoo (time-series + dashboards).
• Clamp-to-cloud energy monitoring: CT + ESP32 + MQTT + containerised backend for live power profiles.`,

    experience: `
Recent focus — where infra meets real work

secure-media-lab
• VPN-only home/remote lab built on Debian/WSL2, Docker, and WireGuard.
• Uses iptables hardening, SSH lockdown, and automation scripts for encrypted backups and media sync.
• Designed to behave like “real infra”, not a throwaway lab: logs, runbooks, and recovery paths.

graylogic-erp-site
• Production Odoo 18 ERP + website for a real electrical business (graylogic.uk).
• Docker + Traefik stack on a hardened Linux VM (Hetzner-style cloud).
• GPG-encrypted backups, restore-tested, with firewall rules keeping the exposed surface intentionally small.

usb-verifier
• ~2k-line PowerShell verification engine for Windows install USBs.
• Compares USB vs ISO, classifies modified/extra/missing files, and performs deep WIM/ESD/SWM analysis.
• Designed for tampering detection and clear human-readable integrity reports, not just checksums.

Tooling: ssh-login-helper, odoo-job-request, bookish-funicular
• ssh-login-helper:
  - PowerShell-first SSH launcher that parses OpenSSH config + a JSON conf.json.
  - Presents an interactive menu, sets sane defaults, and runs post-connect commands (e.g. cd, tail logs, attach tmux).
• odoo-job-request:
  - Odoo 18 module turning a public-facing job form into clean crm.lead records.
  - Handles structured metadata and file uploads to S3-compatible storage, with sanitised inputs.
• bookish-funicular:
  - A toolbox of shell/Python utilities for WireGuard, Docker, firewalling, monitoring, and systemd service wiring.
  - Only “earned” scripts live here: ones that actually support running systems.

Clamp-to-cloud 100A energy monitor (Phase 0)
• Planning a non-invasive 100 A “clamp-to-cloud” node using a split-core CT on the mains incomer.
• ESP32 analog front-end (burden + mid-rail bias) sampling current and publishing telemetry via MQTT.
• Containerised backend: MQTT broker, time-series DB, FastAPI worker, and a web dashboard for live and historical power.
• Security options from “simple and safe” (MQTT over TLS) to “hardened” (MQTT over QUIC + WireGuard overlay).

Thread running through all of this:
• Treating personal and business infrastructure like production: careful changes, backups, and honest documentation.`,

    projects: `
Highlight projects (GitHub)

• secure-media-lab
  Secure home lab + remote stack using Debian/WSL2, Docker, WireGuard, and automation scripts.
  Focused on VPN-only access, iptables hardening, encrypted backups, and repeatable runbooks.
  -> https://github.com/nerrad567/secure-media-lab

• graylogic-erp-site
  Production Odoo 18 ERP + website for a real electrical business (graylogic.uk).
  Docker & Traefik, GPG-encrypted backups, firewall rules, and full rebuild-from-bare-VM procedures.
  -> https://github.com/nerrad567/graylogic-erp-site

• usb-verifier
  Windows install USB integrity & tamper scanner (PowerShell).
  Compares USB vs ISO, classifies modified/extra/missing files, and performs deep WIM/ESD/SWM analysis with structured reports.
  -> https://github.com/nerrad567/usb-verifier

Tooling
• ssh-login-helper
  PowerShell-based SSH launcher that reads ~/.ssh/config + JSON metadata.
  Presents an interactive menu, discovers keys, and runs post-connect commands.
  -> https://github.com/nerrad567/ssh-login-helper

• odoo-job-request
  Odoo 18 module for a public job request portal.
  Creates clean crm.lead records and ships file uploads to S3-compatible storage via Boto3, while keeping Odoo lean.
  -> https://github.com/nerrad567/odoo-job-request

• bookish-funicular
  Toolbox repo of real-world shell and Python utilities: WireGuard helpers, Docker scripts, firewall rules,
  monitoring helpers, and systemd service units.
  -> https://github.com/nerrad567/bookish-funicular

Roadmap / experiments
• Clamp-to-cloud 100A energy monitor: CT + ESP32 + MQTT + FastAPI dashboard.
• Additional OT/ICS-flavoured projects that bridge electrical panels with modern infra.

All repositories
-> https://github.com/nerrad567

Tip: use middle-click (desktop) or long-press (mobile) to open links in new tabs.`,

    cv: `
Role snapshot — for hiring managers

Target roles
• Junior DevOps / Infrastructure Engineer.
• Platform / SRE-style roles with a focus on reliability and operability.
• OT / ICS support roles where electrical work meets infrastructure (SCADA, secure remote access, field wiring).

What he already does
• Runs a real Odoo 18 ERP stack in Docker for his electrical business, including CRM, jobs, and invoicing.
• Maintains a secure home lab + remote stack with WireGuard VPNs, hardened firewalls, and encrypted backups.
• Builds practical tooling in PowerShell and Bash (usb-verifier, ssh-login-helper, automation scripts).
• Communicates clearly with non-technical stakeholders via EICRs, reports, and structured READMEs.

What he’s looking for
• Teams that value reliability, safety, and operations more than chasing buzzwords.
• A place to grow from “serious hobbyist with production responsibilities” into a professional DevOps/infra/OT engineer.
• Exposure to larger-scale infra (k8s, cloud, CI/CD) while immediately contributing on Linux, Docker, VPNs, and tooling.

How he works
• Prefers small, iterative changes with logging, metrics, and a tested rollback path.
• Writes documentation and operational notes as part of the work, not as an afterthought.
• Honest about unknowns and comfortable asking the right questions instead of bluffing.

Later, this command can trigger a CV PDF download or link to a printable CV hosted alongside the sites.`,

    contact: `
Contact & links

Primary places to explore
• Terminal CV (this site):   https://terminal.electrician.onl
• Manager/overview view:     https://electrician.onl
• GitHub (code & tooling):   https://github.com/nerrad567

Direct contact
• Email and phone are shared with serious opportunities rather than hard-coded in the UI.
• This keeps spam down and lets contact details evolve without stale copies in code.

Future wiring
• A dedicated CV download endpoint (PDF) can sit behind the 'cv' command here.
• Optional LinkedIn / email alias can be added as the outreach strategy firms up.`,

    help: `
Available commands

• about      — who is Darren and what is this terminal?
• skills     — technical & working-style overview.
• experience — recent work and how it maps to DevOps/infra/OT.
• projects   — GitHub highlight reel with links.
• cv         — condensed role snapshot for hiring managers.
• contact    — how to explore further and reach out.
• demo       — toggle the “demo reel” side panel (future video/animation).
• clear      — clear the screen.

Tip: on desktop, use ↑↓ to browse your command history.
On mobile, tap the chips under the prompt to run commands quickly.`,
  };

  // -----------------------------
  // Rendering helpers
  // -----------------------------
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

  // -----------------------------
  // Command handling
  // -----------------------------
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
      return;
    }

    if (key === "demo") {
      printSectionTitle("demo");
      printRaw(
        "Toggling demo panel. In production this would show short clips of live stacks (Odoo ERP, secure-media-lab, usb-verifier, ssh-login-helper, clamp-to-cloud) in use."
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

  // -----------------------------
  // Boot sequence (typewriter intro)
  // -----------------------------
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
      "Darren Gray — electrician running real production systems.",
      "Odoo ERP, secure home lab, and practical tooling for real work.",
    ];
    typewriter(introLines);
  }

  // -----------------------------
  // Event listeners
  // -----------------------------
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
