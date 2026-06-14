# Deploying GOOB (free, always-on, one-time setup)

The bot must run **24/7 unattended** (the QOTD scheduler waits up to 24h between
posts). Free hosts that sleep or need manual renewal (Pella, Render free) break
that. The setup below is **free and one-time** on an **Oracle Cloud Always Free**
VM, and works the same on any VPS, home server, or Raspberry Pi.

Everything runs in Docker with `restart: unless-stopped`, so it comes back up on
crash or reboot. `data/` is a mounted volume, so `roles.json` survives restarts.

---

## 1. Get a free always-on box (Oracle Cloud Always Free)

1. Sign up at https://www.oracle.com/cloud/free/ (needs a card for verification;
   Always Free resources are never charged).
2. Create a **Compute instance** → image **Ubuntu 22.04**, shape **VM.Standard.A1.Flex**
   (Ampere/ARM, part of Always Free). 1 OCPU / 6 GB RAM is plenty.
3. Save the SSH key it gives you, then SSH in:
   ```bash
   ssh -i your_key ubuntu@<VM_PUBLIC_IP>
   ```

> No card / don't want a cloud account? Any machine that stays on works — a home
> PC or Raspberry Pi. Skip to step 2 on that machine.

## 2. Install Docker (once)

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER && newgrp docker
```

## 3. Get the code + secrets onto the box

```bash
git clone <your-repo-url> goob && cd goob
cp .env.example .env
nano .env        # fill in DISCORD_TOKEN, CLIENT_ID, GUILD_ID, role IDs, QOTD_CHANNEL...
```

## 4. Start it (always-on)

```bash
docker compose up -d --build
docker compose logs -f          # should show "online" and "[qotd] next post in ... min"
```

That's it — it now runs forever and restarts itself on crash/reboot.

---

## One-time only: register slash commands

Slash commands are stored on Discord's side, not the host, so you only do this
**once per change** to a command's definition (you've already done it locally):

```bash
docker compose run --rm goob node dist/deploy.js
```

## Updating later

```bash
git pull
docker compose up -d --build     # rebuild + restart, data/ is preserved
```
