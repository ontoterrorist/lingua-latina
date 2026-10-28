"""Expresiones de César sin deformar la cara.

PixelLab (edit_image_pixen) repinta toda la imagen en cada edición: la mandíbula, el tono de piel y hasta
los reflejos de la corona cambian un poco. Aquí la cara base queda intacta y, de cada expresión, solo se
trasplantan las cejas y los ojos y la boca; esos píxeles se ajustan a la paleta de la base.

    python tools/cesar_caras.py avatar/cesar-neutral.png avatar/fuentes avatar          # todas
    python tools/cesar_caras.py base.png fuentes salida talk think                       # solo algunas

Cada fuente es <pose>.png, de 128x160, la base editada por PixelLab (descripción: «Same man ... Change only
the face: ...»). Necesita Pillow y numpy."""
import os, sys
import numpy as np
from PIL import Image, ImageFilter

# zonas de la cara que cambian con la emoción (x0, y0, x1, y1), en píxeles de la imagen de 128x160
CEJAS_OJOS = (55, 52, 96, 74)
BOCA = (61, 86, 93, 106)
BORDE = 3  # el contorno de la cara no se toca: se erosiona la silueta 3 píxeles


def a_lab(rgb):
    c = rgb / 255.0
    c = np.where(c > 0.04045, ((c + 0.055) / 1.055) ** 2.4, c / 12.92)
    m = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]])
    xyz = c @ m.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)


def desplazamiento(base, fuente):
    """(dx, dy) que alinea la fuente con la base, medido en la túnica (que no cambia)."""
    zona = (slice(128, 156), slice(20, 110))
    b = base[zona][..., :3].astype(float)
    mejor = (1e18, 0, 0)
    for dy in range(-2, 3):
        for dx in range(-2, 3):
            s = np.roll(np.roll(fuente, dy, 0), dx, 1)[zona][..., :3].astype(float)
            e = ((s - b) ** 2).sum()
            if e < mejor[0]:
                mejor = (e, dx, dy)
    return mejor[1], mejor[2]


def trasplanta(base_img, fuente_img):
    base = np.asarray(base_img.convert('RGBA'))
    fuente = np.asarray(fuente_img.convert('RGBA'))
    dx, dy = desplazamiento(base, fuente)
    fuente = np.roll(np.roll(fuente, dy, 0), dx, 1)
    alfa = Image.fromarray(((base[..., 3] > 0) * 255).astype('uint8')).filter(ImageFilter.MinFilter(2 * BORDE + 1))
    interior = np.asarray(alfa) > 0
    zona = np.zeros(interior.shape, bool)
    for x0, y0, x1, y1 in (CEJAS_OJOS, BOCA):
        zona[y0:y1, x0:x1] = True
    zona &= interior & (fuente[..., 3] > 0)
    paleta = np.unique(base[base[..., 3] > 0][:, :3], axis=0)
    lab_paleta = a_lab(paleta.astype(float))
    out = base.copy()
    ys, xs = np.nonzero(zona)
    lab = a_lab(fuente[ys, xs, :3].astype(float))
    cerca = ((lab[:, None, :] - lab_paleta[None, :, :]) ** 2).sum(-1).argmin(1)
    out[ys, xs, :3] = paleta[cerca]
    return Image.fromarray(out), (dx, dy), int(zona.sum())


if __name__ == '__main__':
    base, fuentes, salida = sys.argv[1:4]
    solo = set(sys.argv[4:])
    b = Image.open(base)
    os.makedirs(salida, exist_ok=True)
    for f in sorted(os.listdir(fuentes)):
        pose, ext = os.path.splitext(f)
        if ext != '.png' or (solo and pose not in solo):
            continue
        img, desp, n = trasplanta(b, Image.open(os.path.join(fuentes, f)))
        img.save(os.path.join(salida, f'cesar-{pose}.png'))
        print(pose, 'desplazamiento', desp, 'píxeles trasplantados', n)
