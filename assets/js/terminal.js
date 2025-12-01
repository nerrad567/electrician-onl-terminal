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
Darren Gray — an electrician-turned infrastructure / systems / OT engineer running real Linux and Docker platforms for his own business.

• Strong electrical foundation: domestic, commercial & light industrial work, EICRs, board changes, BS 7671 compliance.
• Runs a production Odoo 18 ERP stack for Gray Logic Electrical (CRM, jobs, invoicing) on a self-managed Linux VPS.
• Built and operates a secure home/remote lab with VPN-only access, hardened firewalls, and encrypted backups.
• Writes practical tooling in PowerShell, Bash, and Python: usb-verifier, ssh-login-helper, secure-media-lab automation, and more.

He treats infrastructure like a live installation: planned changes, tested rollback paths, and documentation that future-you (or another engineer) can actually use.

Current direction: junior Infrastructure / Systems / OT roles where real-world constraints matter — infra-focused DevOps, OT/ICS support, and network/automation positions that bridge electrical work with Linux, Docker, and VPNs.`,

    skills: `
How he works
• Reliability mindset: changes treated as “live work” with isolation, tests, and clear rollback.
• Security-aware by default: WireGuard VPNs, minimal exposed services, and hardened entry points.
• Communicator: used to explaining technical findings to non-technical clients via EICRs and written reports.
• Heavy use of documentation and AI tools to move quickly in unfamiliar areas without bluffing.

DevOps & Infrastructure
• Linux (Debian/Ubuntu): service management, systemd, logs, permissions, backup/restore workflows.
• Docker & Docker Compose: multi-service stacks, persistent volumes, networks, health-aware design.
• Reverse proxy & routing: Traefik/nginx with TLS for Odoo and web services, deliberate routing and minimal surface area.
• Self-hosted platforms: Odoo ERP, content services, and monitoring-style stacks on VPS and home lab.

Networking & Security
• WireGuard VPN: remote access and site-to-site, “VPN-first” network design.
• Firewalling: iptables rulesets to keep admin surfaces VPN-only and reduce exposed ports.
• Encrypted backups: rsync/rclone + GPG for off-site copies and restore-tested flows.
• OS image integrity: custom PowerShell usb-verifier for Windows install media; threat-aware tooling.

Automation & Tooling
• PowerShell: large, structured scripts (usb-verifier, ssh-login-helper) with logging, config files, and error handling.
• Bash / shell: sync, backup, and maintenance scripts for secure-media-lab and remote VPS flows.
• Python: API integrations (blockchain marketplaces, monitoring), data processing, and automation utilities.
• Config-driven design: JSON/YAML-style configs used as the source of truth for scripts and tooling.
• Git/GitHub: version control, branching, structured READMEs, and living documentation.

Application Layer
• Odoo 18: Dockerised deployment, backup/restore, and custom modules (e.g. Odoo job request portal).
• Web basics: HTTP/HTTPS, DNS, TLS termination, reverse proxying, JSON/REST APIs.
• ERP mindset: treating the Odoo stack as the operational heart of the business, not a toy.

Electrical & OT
• Inspection & testing under BS 7671: EICRs, remedials, and external circuits under real-world constraints.
• Bridging panels/wiring with infra: comfortable mapping boards and field devices onto VPNs, servers, and dashboards.
• Familiar with KNX/BMS/SCADA concepts and keen to apply infra discipline to OT and ICS stacks.

Currently exploring
• Hardware-backed SSH keys (YubiKey) and stronger SSH workflows on Windows.
• Monitoring/metrics for the home lab and Odoo (time-series + dashboards).
• “Clamp-to-cloud” energy monitoring: CT + ESP32 + MQTT + containerised backend for live power profiles.`,

    experience: `
Recent focus — where infra meets real work

secure-media-lab
• VPN-only home/remote lab built on Debian/WSL2, Docker, and WireGuard.
• Uses iptables hardening, SSH lockdown, and automation scripts for encrypted backups and media sync.
• Designed to behave like “real infra”, not a throwaway lab: logs, runbooks, and recovery paths.

graylogic-erp-site
• Production Odoo 18 ERP + website for a real electrical business (graylogic.uk).
• Docker + Traefik stack on a hardened Linux VM in the cloud.
• GPG-encrypted backups, restore-tested, with firewall rules keeping the exposed surface intentionally small.

Secure remote monitoring site over Starlink (OT-style)
• Remote monitoring site behind a Starlink connection, treated as a small OT field location.
• Ubiquiti wireless bridge + OpenWrt-based Brume router as a WireGuard client back to a VPS.
• Segmented local network; NVR and monitoring gear reachable only over VPN, with routing and firewall rules.

usb-verifier
• ~2k-line PowerShell verification engine for Windows install USBs.
• Compares USB vs ISO, classifies modified/extra/missing files, and performs deep WIM/ESD/SWM analysis.
• Designed for tampering detection and clear human-readable integrity reports, not just raw checksums.

Tooling: ssh-login-helper, odoo-job-request, bookish-funicular
• ssh-login-helper:
  - PowerShell-first SSH launcher that parses OpenSSH config + a JSON conf.json.
  - Presents an interactive menu, sets sane defaults, and runs post-connect commands (cd, tail logs, attach tmux, etc.).
• odoo-job-request:
  - Odoo 18 module turning a public-facing job form into clean crm.lead records.
  - Handles structured metadata and file uploads, with sanitised inputs and a lean instance.
• bookish-funicular:
  - Toolbox of shell/Python utilities for WireGuard, Docker, firewalling, monitoring, and systemd service wiring.
  - Only “earned” scripts live here: ones that actually support running systems.

Thread running through all of this:
• Treating personal and business infrastructure like production: careful changes, backups, and honest documentation.`,

    projects: `
Highlight projects (GitHub)

• secure-media-lab
  Secure home lab + remote stack using Debian/WSL2, Docker, WireGuard, and automation scripts.
  Focused on VPN-only access, iptables hardening, encrypted backups, and repeatable runbooks.
  -> https://github.com/nerrad567/secure-media-lab

• graylogic-erp-site
  Production Odoo 18 ERP + website for Gray Logic Electrical (graylogic.uk).
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
  Creates clean crm.lead records and handles file uploads while keeping Odoo lean.
  -> https://github.com/nerrad567/odoo-job-request

• bookish-funicular
  Toolbox repo of real-world shell and Python utilities: WireGuard helpers, Docker scripts, firewall rules,
  monitoring helpers, and systemd service units.
  -> https://github.com/nerrad567/bookish-funicular

Other experiments
• Clamp-to-cloud 100A energy monitor: CT + ESP32 + MQTT + FastAPI/dashboard concepts.
• NFT / blockchain integrations and a Cardano stake pool node (now retired) for decentralised systems experience.

All repositories
-> https://github.com/nerrad567

Tip: use middle-click (desktop) or long-press (mobile) to open links in new tabs.`,

    cv: `
Role snapshot — for hiring managers

Target roles
• Junior Infrastructure / Systems Engineer (Linux, Docker, VPN, firewalls).
• OT / ICS Support or Field Engineer (secure remote access, industrial / building automation, monitoring systems).
• Network / Automation Engineer (bridging electrical installations with networking and Linux systems).
• Junior DevOps / Platform Engineer (infra-focused roles using Linux, containers, scripting, and CI rather than pure app dev).

What he already does
• Runs a real Odoo 18 ERP stack in Docker for his electrical business (graylogic.uk).
• Maintains a secure home/remote lab with WireGuard VPNs, hardened firewalls, and encrypted backups.
• Designs OT-style remote sites (e.g. Starlink + WireGuard field location) as part of a wider secure network.
• Builds practical tooling in PowerShell, Bash, and Python for verification, SSH workflows, and automation.

How he works
• Prefers small, iterative changes with logging, metrics, and a tested rollback path.
• Writes documentation and operational notes as part of the work, not as an afterthought.
• Honest about unknowns and comfortable asking the right questions instead of guessing.

Download full CV (PDF)
-> https://terminal.electrician.onl/assets/docs/cv_ICT_FULL.pdf`,

    contact: `
Contact & links

Primary places to explore
• Terminal CV (this site):    https://terminal.electrician.onl
• Portfolio / overview:       https://electrician.onl
• Electrical business site:   https://www.graylogic.uk
• Local landing (Colchester): https://colchester.electrician.onl
• GitHub (code & tooling):    https://github.com/nerrad567

Direct contact
• Email: darren@graylogic.uk
• Phone: +44 (0)7749 962 690

Business enquiries can also go via graylogic.uk, where the public contact details live.
This keeps the terminal CV focused on technical context while still making it easy to reach out.`,

    help: `
Available commands

• about      — who is Darren and what this terminal is about.
• skills     — technical skills and how he works.
• experience — recent work and how it maps to infra/OT/DevOps.
• projects   — GitHub highlight reel with links.
• cv         — role snapshot + link to the full downloadable CV.
• contact    — how to explore further and reach out.
• demo       — toggle the “demo reel” side panel (future video/animation).
• clear      — clear the screen.

Tip: on desktop, use ↑↓ to browse your command history.
On mobile, tap the chips under the prompt to run commands quickly.

Also try 'projects' for code and 'cv' for a hiring-manager-friendly snapshot.`,
  };

  // -----------------------------
  // Rendering helpers
  // -----------------------------
  function createLine(text, className) {
    const line = document.createElement("div");
    line.className = "line" + (className ? " " + className : "");

    const str = String(text || "");

    if (!str.trim().length) {
      // Blank line
      return line;
    }

    // Simple URL matcher for http(s) links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let lastIndex = 0;
    let match;

    while ((match = urlRegex.exec(str)) !== null) {
      // Text before the URL
      if (match.index > lastIndex) {
        line.appendChild(
          document.createTextNode(str.slice(lastIndex, match.index))
        );
      }

      // The URL itself as a clickable link
      const url = match[0];
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.textContent = url;
      line.appendChild(a);

      lastIndex = urlRegex.lastIndex;
    }

    // Any remaining text after the last URL
    if (lastIndex < str.length) {
      line.appendChild(document.createTextNode(str.slice(lastIndex)));
    }

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
        "Toggling demo panel. This area is for a short reel showing real tools in action (secure-media-lab, graylogic-erp-site, usb-verifier, ssh-login-helper). For now it plays a generic terminal/server loop while the final montage is prepared."
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
      // Vimeo handles autoplay via URL params; no direct play() here.
    } else {
      demoPanel.classList.remove("is-visible");
      // We’re not controlling pause/seek on the iframe – fullscreen/controls
      // are handled inside the Vimeo player.
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
      "Darren Gray — electrician turned infrastructure / OT engineer.",
      "Linux, Docker, VPN-first networks, and practical tooling for real systems.",
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
    // Do NOT focus input here – let the user tap it if they want
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
    btn.addEventListener("click", (evt) => {
      evt.preventDefault();
      const cmd = btn.getAttribute("data-command") || "";
      handleCommand(cmd);
      // IMPORTANT: no inputEl.focus() here
    });
  });

  if (demoCloseBtn) {
    demoCloseBtn.addEventListener("click", () => toggleDemoPanel(false));
  }

  window.addEventListener("load", () => {
    boot();
    // No auto-focus on load; avoids mobile keyboard popping up
  });
})();
