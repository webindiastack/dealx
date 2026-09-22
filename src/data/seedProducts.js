export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: '2026 Porsche Taycan Turbo S GTS',
    category: 'cars',
    price: 185000,
    location: 'San Francisco, CA',
    condition: 'Brand New',
    description: 'Electric performance redefined with 750hp twin electric motors, 0-60 in 2.6s, carbon ceramic brakes, and adaptive air suspension.',
    specs: {
      'Drivetrain': 'All-Wheel Drive (Dual Motor)',
      'Range': '290 Miles',
      'Power': '750 HP',
      'Exterior': 'Frozen Blue Metallic',
      'Interior': 'Race-Tex Slate Gray'
    },
    images: [
      '/luxury_taycan.png',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    featured: true,
    createdDate: '2026-08-15T10:00:00.000Z'
  },
  {
    id: 'prod-2',
    title: 'Ducati Panigale V4 S Superbike',
    category: 'bikes',
    price: 31995,
    location: 'Austin, TX',
    condition: 'Brand New',
    description: '1,103cc Desmosedici Stradale V4 engine delivering 215.5 hp. Öhlins electronically controlled suspension and Akrapovič titanium exhaust system.',
    specs: {
      'Engine': '1103 cc V4',
      'Power': '215.5 HP',
      'Weight': '384 lbs (Dry)',
      'Electronics': 'DTC EVO 3, DWC EVO',
      'Brakes': 'Brembo Stylema R'
    },
    images: [
      '/ducati_v4s.png',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    featured: true,
    createdDate: '2026-08-20T14:30:00.000Z'
  },
  {
    id: 'prod-3',
    title: 'Apple MacBook Pro 16" M3 Max (64GB / 2TB SSD)',
    category: 'electronics',
    price: 3899,
    location: 'Seattle, WA',
    condition: 'Open Box / Like New',
    description: '16-core CPU, 40-core GPU M3 Max workstation in Space Black. Liquid Retina XDR screen with 120Hz ProMotion and 22-hour battery life.',
    specs: {
      'Processor': 'Apple M3 Max 16-Core',
      'Memory': '64GB Unified RAM',
      'Storage': '2TB NVMe SSD',
      'Display': '16.2" Liquid Retina XDR',
      'Color': 'Space Black'
    },
    images: [
      '/macbook_m3_pro.png',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    featured: true,
    createdDate: '2026-09-01T09:15:00.000Z'
  },
  {
    id: 'prod-4',
    title: 'Rolex Submariner Date 41mm "Kermit" Starburst',
    category: 'other',
    price: 15450,
    location: 'New York, NY',
    condition: 'Certified Pre-Owned',
    description: 'Reference 126610LV with green Cerachrom ceramic bezel insert, black dial, Oystersteel bracelet, and caliber 3235 automatic movement with papers.',
    specs: {
      'Reference': '126610LV',
      'Case Diameter': '41 mm',
      'Material': 'Oystersteel',
      'Bezel': 'Green Cerachrom Ceramic',
      'Power Reserve': '70 Hours'
    },
    images: [
      '/rolex_kermit_watch.png',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    featured: true,
    createdDate: '2026-09-05T11:45:00.000Z'
  },
  {
    id: 'prod-5',
    title: 'BMW M4 Competition xDrive Convertible',
    category: 'cars',
    price: 93500,
    location: 'Miami, FL',
    condition: 'Brand New',
    description: '503 hp TwinPower Turbo inline-6 engine, Isle of Man Green Metallic finish, Kyalami Orange leather interior, M Carbon bucket seats.',
    specs: {
      'Engine': '3.0L Inline-6 Twin-Turbo',
      'Power': '503 HP',
      'Transmission': '8-Speed Sport Automatic',
      'Color': 'Isle of Man Green',
      '0-60 mph': '3.4 Seconds'
    },
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    featured: false,
    createdDate: '2026-09-08T16:20:00.000Z'
  },
  {
    id: 'prod-6',
    title: 'BMW CE 04 Futuristic Electric Urban Scooter',
    category: 'bikes',
    price: 12195,
    location: 'Los Angeles, CA',
    condition: 'Brand New',
    description: 'Next-gen electric mobility with 10.25" TFT display, integrated navigation, 80-mile city range, fast charging capability, and futuristic floating seat design.',
    specs: {
      'Motor': 'Permanent Magnet Electric',
      'Max Power': '42 HP',
      'Top Speed': '75 mph',
      'Charge Time': '65 mins (Fast Charger)',
      'Range': '80 Miles'
    },
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    featured: false,
    createdDate: '2026-09-10T08:00:00.000Z'
  },
  {
    id: 'prod-7',
    title: 'Sony Alpha A1 II Mirrorless Camera Body',
    category: 'electronics',
    price: 6499,
    location: 'Chicago, IL',
    condition: 'Brand New',
    description: '50.1 MP full-frame stacked CMOS sensor, 8K 30p video, AI subject recognition processing unit, 30 fps blackout-free continuous shooting.',
    specs: {
      'Sensor': '50.1 MP Full-Frame Exmor RS',
      'Video': '8K 30p / 4K 120p 10-bit',
      'Autofocus': '759 Phase Detection Points',
      'Stabilization': '8.5-Stop 5-Axis IBIS',
      'Connectivity': 'Wi-Fi 6E & 2.5G LAN'
    },
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    featured: false,
    createdDate: '2026-09-12T13:10:00.000Z'
  },
  {
    id: 'prod-8',
    title: 'Herman Miller x Logitech G Embody Gaming Chair',
    category: 'other',
    price: 1795,
    location: 'Denver, CO',
    condition: 'Brand New',
    description: 'Ergonomic precision engineering with enhanced cooling foam, matrix back support, multi-zone pressure distribution, and matte black finish.',
    specs: {
      'Material': 'Sync Fabric & Copper Fusion Foam',
      'Adjustability': 'BackFit, Armrest, Tilt',
      'Warranty': '12-Year Herman Miller Warranty',
      'Max Capacity': '300 lbs'
    },
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d85d5?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    featured: false,
    createdDate: '2026-09-14T15:40:00.000Z'
  }
];
