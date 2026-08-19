def lum(hex_color):
    hex_color = hex_color.lstrip('#')
    r, g, b = [int(hex_color[i:i+2], 16) / 255 for i in (0, 2, 4)]
    def lin(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = lin(r), lin(g), lin(b)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def ratio(h1, h2):
    l1, l2 = lum(h1), lum(h2)
    l1, l2 = max(l1, l2), min(l1, l2)
    return (l1 + 0.05) / (l2 + 0.05)

THEMES = {
    "boardroom-navy-light": dict(bg="#ffffff", panel="#f6f1e4", ink="#1a2230", ink_soft="#4a5468", ink_faint="#6b7688",
        band_bg="#0b1c33", band_ink="#ffffff", band_ink_soft="#d7dbe6", band_ink_faint="#b7bfd0",
        accent="#8c6110", accent_strong="#c79a3e", accent_soft="#e4c579"),
    "boardroom-navy-dark": dict(bg="#0d1520", panel="#16202f", ink="#e9ecf2", ink_soft="#b7c0d0", ink_faint="#8a95a8",
        band_bg="#060e1c", band_ink="#ffffff", band_ink_soft="#cfd4e0", band_ink_faint="#8fa0bb",
        accent="#d8ac4e", accent_strong="#e0b95c", accent_soft="#eecf8b"),
    "ivory-classic": dict(bg="#fbf7ee", panel="#f0e6d2", ink="#241a12", ink_soft="#5c4a3a", ink_faint="#7a6a5a",
        band_bg="#5c1a1a", band_ink="#fdf6ec", band_ink_soft="#eaddc9", band_ink_faint="#c9b79e",
        accent="#8a5a1f", accent_strong="#e8c477", accent_soft="#f2dca0"),
    "slate-graphite": dict(bg="#f5f6f7", panel="#e9ebee", ink="#1c2126", ink_soft="#4b545c", ink_faint="#6c7680",
        band_bg="#20262d", band_ink="#ffffff", band_ink_soft="#d3d8dd", band_ink_faint="#a7afb8",
        accent="#8a6a1f", accent_strong="#cda44a", accent_soft="#e2c483"),
    "midnight-emerald": dict(bg="#0b1512", panel="#12211c", ink="#e8f2ee", ink_soft="#b9cdc4", ink_faint="#87a297",
        band_bg="#04100b", band_ink="#f2ede0", band_ink_soft="#d9d2bd", band_ink_faint="#a79f8a",
        accent="#c9a24b", accent_strong="#d8b869", accent_soft="#e8cf94"),
    "royal-indigo": dict(bg="#141227", panel="#1d1a38", ink="#eceaf6", ink_soft="#c1bcd9", ink_faint="#8f88ad",
        band_bg="#0b0920", band_ink="#ffffff", band_ink_soft="#d8d4ec", band_ink_faint="#a9a2c9",
        accent="#c0a6e8", accent_strong="#c9b3ea", accent_soft="#dccbf2"),
    "warm-bronze": dict(bg="#fbf3e7", panel="#f2e2c8", ink="#2c1d10", ink_soft="#5c4527", ink_faint="#7d6540",
        band_bg="#5a3418", band_ink="#fbf1df", band_ink_soft="#ecd8b8", band_ink_faint="#c9ab7d",
        accent="#8a5a1f", accent_strong="#e0b15c", accent_soft="#eec685"),
}

FAIL = []
for name, t in THEMES.items():
    checks = [
        ("ink/bg", t["ink"], t["bg"]),
        ("ink-soft/bg", t["ink_soft"], t["bg"]),
        ("ink-soft/panel", t["ink_soft"], t["panel"]),
        ("ink-faint/bg", t["ink_faint"], t["bg"]),
        ("accent/bg", t["accent"], t["bg"]),
        ("accent/panel", t["accent"], t["panel"]),
        ("band-ink/band-bg", t["band_ink"], t["band_bg"]),
        ("band-ink-soft/band-bg", t["band_ink_soft"], t["band_bg"]),
        ("band-ink-faint/band-bg", t["band_ink_faint"], t["band_bg"]),
        ("accent-strong/band-bg", t["accent_strong"], t["band_bg"]),
        ("accent-soft/band-bg", t["accent_soft"], t["band_bg"]),
    ]
    print(f"\n== {name} ==")
    for label, fg, bg in checks:
        r = ratio(fg, bg)
        # normal text needs 4.5, large/bold headings and faint metadata we allow 3.0 minimum
        floor = 3.0 if "faint" in label or "band-ink-soft" in label else 4.5
        status = "OK" if r >= floor else "FAIL"
        if status == "FAIL":
            FAIL.append((name, label, r))
        print(f"  {label:24s} {r:5.2f}  {status}")

print("\n\nSUMMARY:", "ALL PASS" if not FAIL else f"{len(FAIL)} FAILURES")
for f in FAIL:
    print("  FAIL:", f)
