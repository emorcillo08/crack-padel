"""Genera los íconos de Android a partir de icon-512.png e icon-foreground.png."""
import os
from PIL import Image, ImageDraw

RES = 'android/app/src/main/res'
legacy_src = Image.open('icon-512.png').convert('RGBA')
foreground_src = Image.open('icon-foreground.png').convert('RGBA')

SIZES = [('mdpi', 48, 108), ('hdpi', 72, 162), ('xhdpi', 96, 216), ('xxhdpi', 144, 324), ('xxxhdpi', 192, 432)]

for density, legacy_px, fg_px in SIZES:
    folder = f'{RES}/mipmap-{density}'
    os.makedirs(folder, exist_ok=True)

    legacy = legacy_src.resize((legacy_px, legacy_px), Image.LANCZOS)
    legacy.save(f'{folder}/ic_launcher.png')

    big = legacy_px * 4
    mask = Image.new('L', (big, big), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, big - 1, big - 1), fill=255)
    mask = mask.resize((legacy_px, legacy_px), Image.LANCZOS)
    round_icon = Image.new('RGBA', (legacy_px, legacy_px), (0, 0, 0, 0))
    round_icon.paste(legacy, (0, 0), mask)
    round_icon.save(f'{folder}/ic_launcher_round.png')

    foreground_src.resize((fg_px, fg_px), Image.LANCZOS).save(f'{folder}/ic_launcher_foreground.png')

os.makedirs(f'{RES}/values', exist_ok=True)
with open(f'{RES}/values/ic_launcher_background.xml', 'w', encoding='utf-8') as f:
    f.write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#0A1322</color>\n</resources>\n')

print('Íconos de Android generados.')
