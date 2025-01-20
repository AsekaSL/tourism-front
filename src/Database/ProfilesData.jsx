let usersDatas = [
    {   
        id: 1,
        name: 'Saranga Samarakoon',
        email: 'saranga@gmail.com',
        password: '1234',
        avatar: 'https://media.licdn.com/dms/image/v2/D5603AQGlIdCGqKOwqQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1699759751068?e=1743033600&v=beta&t=lipkSUg1qGIyhdOrgUiaUE94hR6V00OVzGeUZZFZnmg',
        level: 'Explorer',
        xp: 7500,
        nextLevelXp: 10000,
        joinDate: 'January 2024',
        location: 'Kadawatha, Sri Lanka',
        bio: 'Adventure seeker | Photography enthusiast | World explorer',
        stats: {
          countriesVisited: 15,
          citiesExplored: 47,
          totalTrips: 23,
          photosShared: 156
        },
        badges: [
          { id: 1, name: 'Mountain Climber', icon: '🏔️', description: 'Conquered 5 mountain peaks' },
          { id: 2, name: 'Beach Lover', icon: '🏖️', description: 'Visited 10 tropical beaches' },
          { id: 3, name: 'City Explorer', icon: '🌆', description: 'Explored 25 major cities' },
          { id: 4, name: 'Cultural Expert', icon: '🏛️', description: 'Visited 20 historical sites' },
          { id: 5, name: 'Foodie', icon: '🍜', description: 'Tried local cuisine in 15 countries' }
        ],
        trips: [
          {
            id: 1,
            destination: 'Nuwara Eliya',
            date: 'Dec 2024',
            image: 'https://scenicventures.com/wp-content/uploads/2019/03/Nuwaraeliya-Tea.jpg',
            status: 'Upcoming',
            places: ['Gegary Lake', "Lover's Leap Waterfall", 'Victoria Park'],
          },
          {
            id: 2,
            destination: 'Galle',
            date: 'Sep 2024',
            image: 'https://www.wondersofceylon.com/content/images/2023/08/WoC-Galle-Fort.webp',
            status: 'Completed',
            places: ['Dutch Fort', 'Lighthouse', 'Dutch Reformed Church'],
          },
          {
            id: 3,
            destination: 'Kandy',
            date: 'May 2024',
            image: 'https://lankatravels.lk/wp-content/uploads/2023/10/10010088-kandy-lake-0-1024x683.jpg',
            status: 'Completed',
            places: ['Sri Dalada Maligawa', 'Royal Botanic Gardens, Peradeniya', 'Kandy view point'],
          },
        ],
        photos: [
          { id: 1, url: 'https://images.squarespace-cdn.com/content/v1/5a3bb03b4c326d76de73ddaa/64166deb-5566-459e-9c4d-a4d8413c97fd/The_Common_Wanderer_-4336.jpg', likes: 124 },
          { id: 2, url: 'https://www.torntackies.com/wp-content/uploads/2020/06/Kandy-itinerary.jpg', likes: 89 },
          { id: 3, url: 'https://www.kandyescapes.com/wp-content/uploads/2020/04/lake-mob.jpg', likes: 232 },
          { id: 4, url: 'https://cdn.audleytravel.com/1050/749/79/15978821-galle-fort-lighthouse-sri-lanka.webp', likes: 156 },
          { id: 5, url: 'https://luxuryholidaysasia.com/wp-content/uploads/2023/09/Galle-City.jpg', likes: 198 },
          { id: 6, url: 'https://www.teardrop-hotels.com/fort-bazaar/wp-content/uploads/sites/3/2024/07/EXPERIENCE-GALLE-FORT-710x915-2.jpg', likes: 167 },
        ],
      }
];

export default usersDatas;