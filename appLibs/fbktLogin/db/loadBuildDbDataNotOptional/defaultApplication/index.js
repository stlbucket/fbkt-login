module.exports = {
    name: 'Function Bucket',
    uid: "f754dae8-1bf0-01f9-c15f-48eef1f1dff6",
    version: '1.0.0',
    attributesJson: {
      requirePromoCodeForRegistration: false,
      defaultNewRegistrationLicenseKey: 'FBKT_ADMIN',
      defaultNewUserLicenseKey: 'FBKT_USER'
    },
    licenseTypes: [
      {
        name: 'Fbkt Worker',
        licenseTypeKey: 'FBKT_WORKER'
      },
      {
        name: 'Super Administrator',
        licenseTypeKey: 'FBKT_SUPER_ADMIN'
      },
      {
        name: 'Administrator',
        licenseTypeKey: 'FBKT_ADMIN',
        promoCodes: [
          {
            name: 'Admin Promo Code',
            thePromoCode: 'PROMO_ADMIN'
          }
        ],
        attributesJson: {
          permissions: [
            'Admin'
          ]
        }
      },
      {
        name: 'User',
        licenseTypeKey: 'FBKT_USER',
        promoCodes: [
          {
            name: 'User Promo Code',
            thePromoCode: 'PROMO_USER'
          }
        ]
      }
    ],
  };
