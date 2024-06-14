import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import portraitImage from '@/images/photos/simon-w-jackson-portrait.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Simon W. Jackson</title>
        <meta
          name="description"
          content="I’m Spencer Sharp. I live in New York City, where I design the future."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"> Hello world!</h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
<p> The web, for me, isn’t just a place to create—it’s a medium to experiment and innovate. I love the constant evolution of the web and how it offers endless opportunities for creativity.</p>
              <figure class="mt-10 border-l border-teal-600 pl-9">
                <blockquote class="font-semibold">
                  <p>“Simon set a tone of excitement that pushed our team to greater and greater heights.”</p>
                </blockquote>
                <figcaption class="mt-6 flex gap-x-4">
                  <img class="h-6 w-6 flex-none rounded-full bg-gray-50" src="https://media.licdn.com/dms/image/C4E03AQGHSiaBuTWB6A/profile-displayphoto-shrink_100_100/0/1637285255957?e=1693440000&v=beta&t=CKVxaCJ81GJ8EGmZyzqdqGy645Q_cXJ9TIQSUidcYHk" alt="" />
                  <div class="text-sm leading-6"><strong class="font-semibold"><a href="https://www.linkedin.com/in/kaveet">Kaveet Laxmidas</a></strong> – Software Engineer</div>
                </figcaption>
              </figure>

              <p> I have had the privilege of working on several diverse projects that span across different sectors - the trendy homeware site <a href="domino.com">domino.com</a>, cancer-support initiative <a href="chemobeanies.com">chemobeanies.com</a>, AI-driven scheduling platform <a href="kronologic.com">kronologic.com</a>, to name a few. </p>
              <figure class="mt-10 border-l border-teal-600 pl-9">
                <blockquote class="font-semibold">
                  <p>“A solid UI developer with integrity, passion, and curiosity.”</p>
                </blockquote>
                <figcaption class="mt-6 flex gap-x-4">

                  <img class="h-6 w-6 flex-none rounded-full bg-gray-50" src="https://media.licdn.com/dms/image/C4E03AQFyBAxLjb2vrQ/profile-displayphoto-shrink_100_100/0/1547045401114?e=1693440000&v=beta&t=TQExL6hy-hBI80p8Ot6gZM3Ao89Gm1zT4RXV_zfL8Ww" alt="" />

                  <div class="text-sm leading-6"><strong class="font-semibold"><a href="https://www.linkedin.com/in/tylerwain">Tyler Wain</a></strong> – UX Designer</div>
                </figcaption>
              </figure>
              <p>I’m also experienced in planning, launching, and maintaining the websites I build. Learning, untangling, reprogramming, and creative explorations still continue to fuel my days.</p>

              {/*<figure class="mt-10 border-l border-teal-600 pl-9">
                <blockquote class="font-semibold">
                  <p>“Simon is my go-to for catching up on the latest developments in the frontend ecosystem.”</p>
                </blockquote>
                <figcaption class="mt-6 flex gap-x-4">
                  <img class="h-6 w-6 flex-none rounded-full bg-gray-50" src="https://media.licdn.com/dms/image/C5603AQGpcar1fUFKfQ/profile-displayphoto-shrink_100_100/0/1521940995495?e=1693440000&v=beta&t=RnNWE-WywBUDDJyMDxo7LdJCxEvJ8WV2S1rzCqxPzo4" alt="" />

                  <div class="text-sm leading-6"><strong class="font-semibold"><a href="https://www.linkedin.com/in/alexkolody">Alex Kolody</a></strong> – Frontend Engineer</div>
                </figcaption>
              </figure>
              */}

              

            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href="https://github.com/simonwjackson" icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/simonwjackson" icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:hello@simonwjackson.io"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                hello@simonwjackson.io
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
