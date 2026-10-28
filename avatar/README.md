# César: retratos

Base: `cesar-neutral.png` (128×160), generada con PixelLab (`create_image_pro`) a partir de una descripción fiel a los
bustos de Tusculum y Chiaramonti; de cuatro candidatos se eligió el de boca realmente neutral y rasgos más secos.

Las cinco emociones base (`happy`, `surprised`, `stern`, `sad`, `think`) y las tres aperturas de boca (`m1`, `m2`, `m3`,
que se usan al hablar) se pintan con **inpainting** de PixelLab (`inpaint_image`, 10 generaciones cada una) sobre la
propia base y con una máscara que cubre solo cejas y ojos (`fuentes/mascara-cara.png`) y boca (`fuentes/mascara-boca.png`,
solo la boca para m1–m3). Todo lo que queda fuera de la máscara —contorno, nariz, mejillas, arrugas, pelo, corona,
toga— es idéntico píxel a píxel a la base, así que los rasgos no se deforman. Comprobado: 0 píxeles distintos fuera de la
máscara en las ocho imágenes.

Para otra emoción: `inpaint_image` con la base como `image_url`, la máscara como `mask_image_url` (data URL del PNG,
copiado exacto del archivo) y una descripción del tipo «The same lean Roman man's brows, eyes and mouth showing … Keep his
brown eyes, grey brows, deep wrinkles and hollow cheeks, same lighting and pixel style».

Se descartó editar la imagen entera (`edit_image_pixen`): repinta todo y cambia mandíbula, tono de piel y corona; y
trasplantar cejas/ojos/boca de otras imágenes: sus rasgos estaban dibujados para otro ángulo de cabeza y no encajan.
