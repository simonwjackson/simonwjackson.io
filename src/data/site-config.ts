export type Image = {
  src: string;
  alt?: string;
  caption?: string;
};

export type Link = {
  text: string;
  href: string;
};

export type Hero = {
  title?: string;
  text?: string;
  image?: Image;
  actions?: Link[];
};

export type Subscribe = {
  title?: string;
  text?: string;
  formUrl: string;
};

export type SiteConfig = {
  logo?: Image;
  title: string;
  subtitle?: string;
  description: string;
  image?: Image;
  headerNavLinks?: Link[];
  footerNavLinks?: Link[];
  socialLinks?: Link[];
  hero?: Hero;
  subscribe?: Subscribe;
  postsPerPage?: number;
  projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
  title: 'Simon W. Jackson',
  subtitle: 'Creative Technologist, UI Developer & Perpetual Tinkerer',
  description: '',
  image: {
    src: '/dante-preview.jpg',
    alt: 'Dante - Astro.js and Tailwind CSS theme'
  },
  headerNavLinks: [
    {
      text: 'Home',
      href: '/'
    },
    // {
    //   text: 'Projects',
    //   href: '/projects'
    // },
    {
      text: 'Blog',
      href: '/blog'
    },
    {
      text: 'Resume',
      href: '/resume'
    },
  ],
  footerNavLinks: [
    // {
    //   text: 'About',
    //   href: '/about'
    // },
    // {
    //   text: 'Contact',
    //   href: '/contact'
    // },
  ],
  socialLinks: [
    {
      text: 'GitHub',
      href: 'https://www.github.com/simonwjackson'
    },
    {
      text: 'LinkedIn',
      href: 'https://www.linkedin.com/in/simonwjackson'
    },
    {
      text: 'X',
      href: 'https://x.com/simonwjackson'
    }, {
      text: 'Bluesky',
      href: 'https://bsky.app/profile/simonwjackson.bsky.social'
    }
  ],
  hero: {
    title: "Reimagining digital experiences. One idea at a time.",
    text: "I'm **Simon**, a software developer at Hilton. I've worked on a wide range of projects, from contributing to design systems @ Dell to developing bespoke websites for small businesses.  Feel free to explore some of my work below or follow me on <a href='https://github.com/simonwjackson'>GitHub</a>, <a href='https://bsky.app/profile/simonwjackson.bsky.social'>Bluesky</a> &amp; <a href='https://www.linkedin.com/in/simonwjackson'>LinkedIn</a>.",
    image: {
      src: '/heading.jpg',
      alt: 'Heading image'
    },
    actions: [
      {
        text: 'Get in Touch',
        href: '/contact'
      }
    ]
  },
  subscribe: {
    title: 'Subscribe to My Newsletter',
    text: 'One update per week. All the latest posts directly in your inbox.',
    formUrl: '#'
  },
  postsPerPage: 8,
  projectsPerPage: 8
};

export default siteConfig;
