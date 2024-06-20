import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Simon W. Jackson",
  DESCRIPTION: "Frontend developer, design technologist, and perpetual tinkerer.",
  EMAIL: "hello[at]simonwjackson.io",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Frontend developer, design technologist, and perpetual tinkerer.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/simonwjackson",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/simonwjackson",
  },
];
