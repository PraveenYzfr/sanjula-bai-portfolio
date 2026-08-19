"""Generates og-image.png and apple-touch-icon.png for the site.
Run once locally; output is committed as a static asset, not regenerated at build time.
"""
from PIL import Image, ImageDraw, ImageFont

NAVY = (11, 28, 51)
NAVY_2 = (16, 35, 63)
GOLD = (199, 154, 62)
GOLD_LIGHT = (228, 197, 121)
CREAM = (233, 226, 207)
WHITE = (255, 255, 255)

FONTS = "C:/Windows/Fonts/"

def font(path, size):
    return ImageFont.truetype(FONTS + path, size)

# ---------- OG image, 1200x630 ----------
W, H = 1200, 630
img = Image.new("RGB", (W, H), NAVY)
draw = ImageDraw.Draw(img)

# subtle vertical gradient navy -> slightly lighter navy
for y in range(H):
    t = y / H
    r = int(NAVY[0] + (NAVY_2[0] - NAVY[0]) * t)
    g = int(NAVY[1] + (NAVY_2[1] - NAVY[1]) * t)
    b = int(NAVY[2] + (NAVY_2[2] - NAVY[2]) * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# gold top rule
draw.rectangle([0, 0, W, 6], fill=GOLD)

# left accent bar
draw.rectangle([90, 150, 96, 470], fill=GOLD)

name_font = font("georgiab.ttf", 68)
role_font = font("segoeuib.ttf", 30)
sub_font = font("segoeui.ttf", 24)
stat_num_font = font("georgiab.ttf", 34)
stat_label_font = font("segoeui.ttf", 17)

draw.text((130, 155), "SANJULA BAI", font=name_font, fill=WHITE)
draw.text((132, 245), "Global Risk & Compliance Executive", font=role_font, fill=GOLD_LIGHT)
draw.text((132, 288), "Certified Independent Director (IICA, Ministry of Corporate Affairs, GoI)", font=sub_font, fill=CREAM)

# stat row
stats = [
    ("24+", "Years Global Banking"),
    ("800+", "FTE Teams Led"),
    ("$70M+", "Portfolio Managed"),
    ("5", "Board Committees Ready"),
]
x = 132
y_num = 400
y_label = 445
for num, label in stats:
    draw.text((x, y_num), num, font=stat_num_font, fill=GOLD)
    draw.text((x, y_label), label, font=stat_label_font, fill=CREAM)
    w = draw.textlength(label, font=stat_label_font)
    x += max(w, draw.textlength(num, font=stat_num_font)) + 60

draw.rectangle([0, H - 6, W, H], fill=GOLD)

img.save("assets/img/og-image.png", "PNG", optimize=True)
print("wrote og-image.png", img.size)

# ---------- apple-touch-icon, 180x180 ----------
icon = Image.new("RGB", (180, 180), NAVY)
d2 = ImageDraw.Draw(icon)
mono_font = font("georgiab.ttf", 84)
bbox = d2.textbbox((0, 0), "SB", font=mono_font)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
d2.text(((180 - tw) / 2 - bbox[0], (180 - th) / 2 - bbox[1]), "SB", font=mono_font, fill=GOLD)
icon.save("assets/img/apple-touch-icon.png", "PNG")
print("wrote apple-touch-icon.png", icon.size)
