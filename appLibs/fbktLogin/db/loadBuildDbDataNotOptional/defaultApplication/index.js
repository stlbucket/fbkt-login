module.exports = {
    name: 'Function Bucket',
    uid: "f754dae8-1bf0-01f9-c15f-48eef1f1dff6",
    version: '1.0.0',
    licenseTypes: [
      {
        name: 'Super Administrator',
        licenseTypeKey: 'SUPER_ADMIN',
        permissions: [
          'READ_ALL',
          'WRITE_ALL',
          'MANGE_PERMISSIONS'
        ]
      },
      {
        name: 'Administrator',
        licenseTypeKey: 'ADMIN',
        promoCodes: [
          {
            name: 'Admin Promo Code',
            thePromoCode: 'PROMO_ADMIN'
          }
        ],
        permissions: [
        ]
      },
      {
        name: 'User',
        licenseTypeKey: 'USER',
        promoCodes: [
          {
            name: 'User Promo Code',
            thePromoCode: 'PROMO_USER'
          }
        ],
        permissions: [
        ]
      },
      {
        name: 'Fbkt Worker',
        licenseTypeKey: 'WORKER',
        permissions: []
      }
    ],
  };
