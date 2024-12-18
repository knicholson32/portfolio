// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Keenan Nicholson';
export const SITE_DESCRIPTION = 'Welcome to my website!';
export const BASE_GITHUB_USER = 'knicholson32';


type Author = {
  name: string,
  gravatarID: string,
  home: string,
  pronoun: string,
}

export const authors: { [key: string]: Author } = {
  'keenan': {
    name: 'Keenan Nicholson',
    gravatarID: '864e54eec9ff4475d52468ed02089212',
    home: 'https://keenannicholson.com',
    pronoun: 'his'
  },
  'norris': {
    name: 'Norris Nicholson',
    gravatarID: 'b87dfe5ab6639ae3db06e11b90fd35d4',
    home: 'https://norrisnicholson.com',
    pronoun: 'his'
  }
}