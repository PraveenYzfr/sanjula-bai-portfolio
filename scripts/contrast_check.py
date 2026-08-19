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

pairs = [
    ("ink on paper", "#1a2230", "#ffffff"),
    ("ink-soft on paper", "#4a5468", "#ffffff"),
    ("ink-soft on cream-100", "#4a5468", "#f6f1e4"),
    ("ink-faint on paper", "#6b7688", "#ffffff"),
    ("gold-600 on paper (kicker)", "#a9791f", "#ffffff"),
    ("gold-500 on navy-900 (stat num)", "#c79a3e", "#0b1c33"),
    ("white on navy-900", "#ffffff", "#0b1c33"),
    ("cream-100 on navy-900 (hero meta)", "#f6f1e4", "#0b1c33"),
    ("gold-300 on navy-900 (nav link hover)", "#e4c579", "#0b1c33"),
    ("e9e2cf navlink on navy-900", "#e9e2cf", "#0b1c33"),
    ("dark: ink on paper", "#e9ecf2", "#0d1520"),
    ("dark: ink-soft on paper", "#b7c0d0", "#0d1520"),
    ("dark: ink-soft on cream-100", "#b7c0d0", "#16202f"),
    ("dark: gold-600 kicker on paper", "#d8ac4e", "#0d1520"),
]
for name, a, b in pairs:
    print("%-42s %.2f" % (name, ratio(a, b)))
