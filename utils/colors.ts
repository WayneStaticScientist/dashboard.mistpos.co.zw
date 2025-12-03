export class MaterialColors {
  static MaterialGreen = "#00aa8d";
  static MaterialRed = "#c62828";
  static MaterialBlue = "#1565c0";
  static MaterialOrange = "#ef6c00";
  static MaterialPink = "#ad1457";
  static MaterialTeal = "#009688";
  static intToHexARGB(intColor: number, includeAlpha = false) {
    const rgb = intColor & 0xffffff;
    const hexRGB = ("000000" + rgb.toString(16)).slice(-6);

    // 2. If alpha is needed, extract it (first 8 bits)
    if (includeAlpha) {
      // Right-shift by 24 bits to isolate the alpha value (AA)
      const alpha = intColor >>> 24;
      const hexAlpha = ("00" + alpha.toString(16)).slice(-2);
      console.log(`color----------- #${hexRGB}${hexAlpha}`);
      // Format: #RRGGBBAA (CSS standard for transparency)
      return `#${hexRGB}${hexAlpha}`;
    }

    // 3. Format: #RRGGBB
    return `#${hexRGB}`;
  }
  static listColors: number[] = [
    // 1. "Transparent" but Opaque White Smoke (0xFF F5F5F5) - As requested, Alpha is FF
    0xfff5f5f5,

    // 2. Red 500
    0xfff44336,

    // 3. Pink 500
    0xffe91e63,

    // 4. Purple 500
    0xff9c27b0,

    // 5. Deep Purple 500
    0xff673ab7,

    // 6. Indigo 500
    0xff3f51b5,

    // 7. Blue 500
    0xff2196f3,

    // 8. Light Blue 500
    0xff03a9f4,

    // 9. Cyan 500
    0xff00bcd4,

    // 10. Teal 500
    0xff009688,

    // 11. Green 500
    0xff4caf50,

    // 12. Light Green 500
    0xff8bc34a,

    // 13. Lime 500
    0xffcddc39,

    // 14. Yellow 500
    0xffffeb3b,

    // 15. Amber 500
    0xffffc107,

    // 16. Orange 500
    0xffff9800,

    // 17. Deep Orange 500
    0xffff5722,

    // 18. Brown 500
    0xff795548,

    // 19. Gray 500 (Muted)
    0xff9e9e9e,

    // 20. Blue Gray 500 (Subtle)
    0xff607d8b,
  ];

  static listIcons: string[] = [
    // 1. Default / General Product
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,

    // 2. Food / Groceries
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h7l5 15h6"/><path d="M14 18l-5-15h7"/><path d="M10 21l-3.5-3.5m0 0l-1.5 1.5M14 21l3.5-3.5m0 0l1.5 1.5"/></svg>`,

    // 3. Clothing / Fashion / Wear
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-6a2 2 0 01-2-2V3a1 1 0 00-1-1H7a1 1 0 00-1 1v2a2 2 0 01-2 2H4"/><path d="M12 2v20"/></svg>`,

    // 4. Tools / Hardware
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z"/></svg>`,

    // 5. Electronics / Devices
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,

    // 6. Furniture / Home Goods
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20v2h20v-2H2zm2-4V4a2 2 0 012-2h12a2 2 0 012 2v12h-2V4H6v12h12v4H6"/></svg>`,

    // 7. Health / Medical
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 00-3 3v2h6V5a3 3 0 00-3-3zM5 7h14v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7z"/></svg>`,

    // 8. Books / Media
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20v2.5a2.5 2.5 0 01-2.5 2.5H4z"/><path d="M20 17V5.5A2.5 2.5 0 0017.5 3H6a2 2 0 00-2 2v12h2.5"/><path d="M2 19.5v-12A2.5 2.5 0 014.5 5H6"/></svg>`,

    // 9. Jewelry / Accessories
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h.5A2.5 2.5 0 015 5.5v2.5a2.5 2.5 0 01-2.5 2.5H2v-5"/><path d="M22 3h-.5A2.5 2.5 0 0019 5.5v2.5a2.5 2.5 0 002.5 2.5H22v-5"/><circle cx="12" cy="15" r="5"/><path d="M12 22l-1-4h2l-1 4"/></svg>`,

    // 10. Sports / Fitness
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13.5V22l-2-2-2 2-2-2-2 2V13.5M9.5 7.5A4.5 4.5 0 1114 3a4.5 4.5 0 01-4.5 4.5z"/></svg>`,

    // 11. Gaming / Entertainment
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10H4a2 2 0 010-4h2M18 10h2a2 2 0 000-4h-2"/><rect x="2" y="6" width="20" height="12" rx="3"/><line x1="12" y1="12" x2="12" y2="12"/><line x1="15" y1="9" x2="15" y2="9"/><line x1="15" y1="15" x2="15" y2="15"/></svg>`,

    // 12. Pets / Animals
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 8.5L12 3 4 8.5V20a2 2 0 002 2h12a2 2 0 002-2v-11.5z"/><path d="M9 12v6"/><path d="M15 12v6"/><path d="M10 12h4"/></svg>`,

    // 13. Office / Stationery
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,

    // 14. Travel / Outdoor Gear
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12V6a2 2 0 00-2-2h-5m-2 0H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-4"/><path d="M15 2H9v8h6V2zM12 18h.01"/></svg>`,

    // 15. Cleaning / Household
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2a1 1 0 00-1 1v11a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1h-4z"/><path d="M12 15v8"/><path d="M12 23h3"/><path d="M12 23h-3"/></svg>`,

    // 16. Baby / Kids
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v10m-3-3h6"/></svg>`, // Simple pacifier/dummy representation

    // 17. Automotive / Vehicles
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5l-1.5-1.5"/><path d="M2 17h20"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17h14l-1.5-7.5h-11L5 17z"/></svg>`,

    // 18. Financial / Services
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" ry="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="7" y1="14" x2="9" y2="14"/><line x1="15" y1="14" x2="17" y2="14"/></svg>`, // Credit Card

    // 19. Music / Audio Equipment
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4A2 2 0 0012 2a2 2 0 00-2 1.27l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4A2 2 0 0012 22a2 2 0 002-1.27l7-4A2 2 0 0021 16z"/></svg>`, // Disc/Record

    // 20. Photography / Art Supplies
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="4"/><path d="M3 7h.01"/><path d="M7 3h.01"/><path d="M17 3h.01"/><path d="M21 7h.01"/><path d="M21 17h.01"/><path d="M17 21h.01"/><path d="M7 21h.01"/><path d="M3 17h.01"/></svg>`, // Focus/Camera target
  ];
}
