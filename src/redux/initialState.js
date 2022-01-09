export const initialState = {
  headerOptions: {
    welcome: {
      name: 'Welcome',
      link: '/',
    },
    products: {
      name: 'Products',
      link: '/Products',
    },
    about: {
      name: 'About Us',
      link: '/about',
    },
    cart: {
      name: 'Cart',
      link: '/cart',
    },
  },
  about: {
    crew: [
      { name: 'Stacy',
        speciality: 'Glazing',
        photo: 'stacy.jpg',
        bio: 'Even when I was a little kid, I always knew that I want to work with glass. There was always something magical and mysterious in physical matter that cannot be seen. At least for me. I am proud to say, that I have achieved my dream and now I work here as a glazier and in free time I\'m an artistic glass worker.',
      },
      { name: 'Doug',
        speciality: 'Electronics',
        photo: 'doug.jpg',
        bio: 'Engineer and science nerd. I worked as an IT guy, programmer and security engineer, but I always longed for something more physical, yet still covering my geeky interests. I finally found something that hits this spot when I started working with electronics. Now, I can challenge myself in this field while working here and it is all I ever wanted from a job.',
      },
      { name: 'Lila',
        speciality: 'Design',
        photo: 'lila.jpg',
        bio: 'At start I wanted to be an architect. But as I grew older I stared to notice, that all I really loved about that is the process of design. I refocused my efforts and started to develop my designer skills to turn my imagination into the work tool I needed. Know I design here at GnG, working with magnificent people  and being challenged by needs of our clients.',
      },
    ],
    contact: {
      email: 'contact@glassngas.com',
      tel: '123 321 123',
      adress: '123 North Street, Detroit',
      hours: '10-20',
    },
  },
  summary: {
    active: false,
    success: false,
    fail: false,
    items: [],
  },
};
