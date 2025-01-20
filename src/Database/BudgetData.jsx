const budgetPackagesData = {
    low: {
      name: 'Budget Friendly',
      priceRange: {
        single: '15,000 - 30,000 LKR',
        family: '37,500 - 75,000 LKR'
      },
      daysRange: '2-3 days',
      perks: ['Basic accommodations', 'Local restaurants', 'Public transport'],
      maxHotelPrice: {
        single: 15000,
        family: 37500
      },
      maxRestaurantPrice: {
        single: 1000,
        family: 2500
      }
    },
    medium: {
      name: 'Comfort',
      priceRange: {
        single: '30,000 - 60,000 LKR',
        family: '75,000 - 150,000 LKR'
      },
      daysRange: '3-5 days',
      perks: ['3-star hotels', 'Mix of local and international dining', 'Private transport'],
      maxHotelPrice: {
        single: 30000,
        family: 75000
      },
      maxRestaurantPrice: {
        single: 2000,
        family: 5000
      }
    },
    high: {
      name: 'Luxury',
      priceRange: {
        single: '60,000+ LKR',
        family: '150,000+ LKR'
      },
      daysRange: '5-7 days',
      perks: ['4-5 star resorts', 'Premium dining', 'Private tours'],
      maxHotelPrice: {
        single: 100000,
        family: 250000
      },
      maxRestaurantPrice: {
        single: 5000,
        family: 12500
      }
    }
  };


  export default budgetPackagesData;