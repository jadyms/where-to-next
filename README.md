# General Info

- [Where to Next?] is a web based application that display countries information, allowing users to select from a country list and find more details as: currencies, population and bordering countries.

All country data relies on the [Rest Countries API ](https://restcountries.com/#rest-countries).

## Main Technologies

A list of technologies used within the project:

- [NextJs](https://nextjs.org/) - React Framework to improve performance and development experience
- [Typescript](https://www.typescriptlang.org/docs/) - Open-source language which builds on JavaScript by adding static type definitions
- [Styled-Components](https://styled-components.com/) - ES6 and CSS to style your apps
- [Storybook](https://storybook.js.org/) - Tool for developing UI components in isolation
- [Tailwindcss](https://tailwindcss.com/docs) - CSS Framework

## Getting Started

Clone the repository

```
git clone https://github.com/jadyms/where-to-next.git
```

Install dependencies

```
yarn install
```

Run the app in development mode

```
yarn dev
```

You can accessed the deployed app [here](https://where-to-next.vercel.app/geo)
Code sandbox [here](https://codesandbox.io/s/github/jadyms/where-to-next)

## Future implementations

- Dark mode and follow accessibility guidelines
- Implement filters and data sort features
- When user click on the country, a modal popup using dynamic route should open, instead of a new page
- Include scroll to top button
- Use storybook to build UI in isolation
- Improve types for the api response object
- Better breakdown of styled components
- Unit and visual regression tests

## Requirement considerations

To consider the requirements of reduced JS bundle size and SEO implementation, the app is using getStaticProps feature from NextJS. The pages are pre rendered on the server-side and server do the user on client side, using a revalidate interval of 24 hours (assuming the API data could be updated once per day).
Meta tags have been used on the <Head> of the pages to improve SEO.
