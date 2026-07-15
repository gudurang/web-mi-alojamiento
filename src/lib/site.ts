// Datos de contacto y constantes del sitio — El Rincón de Gredos

export const site = {
  name: "El Rincón de Gredos",
  location: "Navaluenga, Ávila",
  email: "reservas@elrincondegredos.com",
  // WhatsApp: +1 754 299 8204
  whatsappNumber: "17542998204",
  whatsappDisplay: "+1 754 299 8204",
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}`;
  },
  get mailto() {
    return `mailto:${this.email}`;
  },
  // Navaluenga en Google Maps (embed)
  mapEmbed:
    "https://www.google.com/maps?q=Navaluenga,%20%C3%81vila,%20Espa%C3%B1a&output=embed",
};
